import productsData from '../data/products.json';

// Simula un retraso de red
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// API simulada que usa el JSON local
const api = {
  // Obtener todos los productos
  get: async (endpoint: string) => {
    await delay(500); // Simula latencia de red
    
    if (endpoint === '/products') {
      return { 
        data: productsData.products 
      };
    }
    
    throw new Error(`Endpoint no encontrado: ${endpoint}`);
  },
  
  // Obtener un producto por ID
  getById: async (id: number) => {
    await delay(300);
    const product = productsData.products.find(p => p.id === id);
    
    if (product) {
      return { data: product };
    } else {
      throw new Error('Producto no encontrado');
    }
  },
  
  // Eliminar un producto (simulado)
  delete: async (endpoint: string) => {
    await delay(300);
    
    // Solo simulamos la respuesta exitosa
    // La eliminación real se maneja en el componente actualizando el estado
    return { success: true };
  },
  
  // Crear un nuevo producto
  post: async (endpoint: string, data: any) => {
    await delay(500);
    
    if (endpoint === '/products') {
      // Generamos un nuevo ID (en un backend real esto lo haría la base de datos)
      const newId = Math.max(...productsData.products.map(p => p.id)) + 1;
      
      const newProduct = { ...data, id: newId };
      
      // En un entorno real, esto guardaría en la base de datos
      // Aquí solo devolvemos el nuevo producto
      return { data: newProduct };
    }
    
    throw new Error(`Endpoint no encontrado: ${endpoint}`);
  },
  
  // Actualizar un producto existente
  put: async (endpoint: string, data: any) => {
    await delay(500);
    
    if (endpoint.startsWith('/products/')) {
      // Simulamos la actualización exitosa
      return { data: data };
    }
    
    throw new Error(`Endpoint no encontrado: ${endpoint}`);
  }
};

export default api;