const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('./database');
const { authenticateToken, isAdmin, JWT_SECRET } = require('./auth');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Configurar multer para subida de archivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// Crear directorio de uploads si no existe
const fs = require('fs');
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

// Rutas de usuarios
app.post('/api/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    db.run(
      'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
      [username, email, hashedPassword],
      function(err) {
        if (err) {
          return res.status(400).json({ error: err.message });
        }
        
        const token = jwt.sign({ id: this.lastID, username, role: 'user' }, JWT_SECRET, { expiresIn: '24h' });
        res.status(201).json({ token, user: { id: this.lastID, username, role: 'user' } });
      }
    );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  
  db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!user) return res.status(401).json({ error: 'Credenciales inválidas' });
    
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(401).json({ error: 'Credenciales inválidas' });
    
    const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, JWT_SECRET, { expiresIn: '24h' });
    res.json({ token, user: { id: user.id, username: user.username, role: user.role } });
  });
});

// Rutas de productos
app.get('/api/products', (req, res) => {
  const { category, material, type } = req.query;
  let query = 'SELECT * FROM products';
  const params = [];
  
  if (category || material || type) {
    query += ' WHERE';
    if (category) {
      query += ' category = ?';
      params.push(category);
    }
    if (material) {
      query += (params.length > 0 ? ' AND' : '') + ' material = ?';
      params.push(material);
    }
    if (type) {
      query += (params.length > 0 ? ' AND' : '') + ' type = ?';
      params.push(type);
    }
  }
  
  db.all(query, params, (err, products) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(products);
  });
});

app.get('/api/products/:id', (req, res) => {
  db.get('SELECT * FROM products WHERE id = ?', [req.params.id], (err, product) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!product) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(product);
  });
});

app.post('/api/products', authenticateToken, isAdmin, upload.array('images', 2), (req, res) => {
  try {
    const { title, description, price, category, material, type } = req.body;
    const images = req.files.map(file => `/uploads/${file.filename}`);
    
    db.run(
      'INSERT INTO products (title, description, price, image1, image2, category, material, type) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [title, description, price, images[0] || '', images[1] || '', category, material, type],
      function(err) {
        if (err) return res.status(400).json({ error: err.message });
        
        db.get('SELECT * FROM products WHERE id = ?', [this.lastID], (err, product) => {
          if (err) return res.status(500).json({ error: err.message });
          res.status(201).json(product);
        });
      }
    );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/products/:id', authenticateToken, isAdmin, upload.array('images', 2), (req, res) => {
  try {
    const { title, description, price, category, material, type } = req.body;
    const productId = req.params.id;
    
    db.get('SELECT * FROM products WHERE id = ?', [productId], (err, product) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!product) return res.status(404).json({ error: 'Producto no encontrado' });
      
      const images = req.files.map(file => `/uploads/${file.filename}`);
      const image1 = images[0] || product.image1;
      const image2 = images[1] || product.image2;
      
      db.run(
        'UPDATE products SET title = ?, description = ?, price = ?, image1 = ?, image2 = ?, category = ?, material = ?, type = ? WHERE id = ?',
        [title, description, price, image1, image2, category, material, type, productId],
        function(err) {
          if (err) return res.status(400).json({ error: err.message });
          
          db.get('SELECT * FROM products WHERE id = ?', [productId], (err, updatedProduct) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(updatedProduct);
          });
        }
      );
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/products/:id', authenticateToken, isAdmin, (req, res) => {
  db.run('DELETE FROM products WHERE id = ?', [req.params.id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json({ message: 'Producto eliminado' });
  });
});

// Rutas de perfil de usuario
app.get('/api/user/profile', authenticateToken, (req, res) => {
  db.get('SELECT id, username, email, role FROM users WHERE id = ?', [req.user.id], (err, user) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(user);
  });
});

app.put('/api/user/profile', authenticateToken, (req, res) => {
  const { username, email } = req.body;
  
  db.run(
    'UPDATE users SET username = ?, email = ? WHERE id = ?',
    [username, email, req.user.id],
    function(err) {
      if (err) return res.status(400).json({ error: err.message });
      
      db.get('SELECT id, username, email, role FROM users WHERE id = ?', [req.user.id], (err, user) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(user);
      });
    }
  );
});

// Rutas de pedidos
app.post('/api/orders', authenticateToken, (req, res) => {
  const { items } = req.body;
  const userId = req.user.id;
  
  // Calcular importe total
  const itemIds = items.map(item => item.productId);
  const placeholders = itemIds.map(() => '?').join(',');
  
  db.all(`SELECT * FROM products WHERE id IN (${placeholders})`, itemIds, (err, products) => {
    if (err) return res.status(500).json({ error: err.message });
    
    // Mapear precios de productos
    const productMap = {};
    products.forEach(product => {
      productMap[product.id] = product;
    });
    
    // Calcular importe total
    let totalAmount = 0;
    items.forEach(item => {
      const product = productMap[item.productId];
      if (product) {
        totalAmount += product.price * item.quantity;
      }
    });
    
    // Crear pedido
    db.run(
      'INSERT INTO orders (user_id, total_amount) VALUES (?, ?)',
      [userId, totalAmount],
      function(err) {
        if (err) return res.status(400).json({ error: err.message });
        
        const orderId = this.lastID;
        
        // Insertar items del pedido
        const insertPromises = items.map(item => {
          return new Promise((resolve, reject) => {
            const product = productMap[item.productId];
            if (!product) {
              return reject(new Error(`Producto con ID ${item.productId} no encontrado`));
            }
            
            db.run(
              'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)',
              [orderId, item.productId, item.quantity, product.price],
              function(err) {
                if (err) return reject(err);
                resolve();
              }
            );
          });
        });
        
        Promise.all(insertPromises)
          .then(() => {
            res.status(201).json({ orderId, totalAmount });
          })
          .catch(error => {
            res.status(500).json({ error: error.message });
          });
      }
    );
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});