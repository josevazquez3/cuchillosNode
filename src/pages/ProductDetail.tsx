import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import { CartContext } from '../context/CartContext';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

// Definir la interfaz para el producto
interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image1: string;
  image2?: string;
  category: string;
  material: string;
  type: string;
}

// // Definir el tipo de los elementos del carrito (necesario para addItem)
// interface CartItem {
//   id: number;
//   title: string;
//   price: number;
//   image: string;
// }

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const { addItem } = useContext(CartContext);
  
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/products/${id}`);
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
        setLoading(false);
      }
    };
    
    fetchProduct();
  }, [id]);
  
  const handleAddToCart = () => {
    if (product) {
      // Añadir producto al carrito con la cantidad seleccionada
      for (let i = 0; i < quantity; i++) {
        addItem({
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image1,
        });
      }
      
      // Reset quantity after adding to cart
      setQuantity(1);
    }
  };
  
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      setQuantity(value);
    }
  };
  
  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };
  
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };
  
  // El resto del componente sigue igual...
  
  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-grow flex justify-center items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-accent"></div>
        </div>
        <Footer />
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-grow container-custom py-12">
          <div className="bg-red-50 border-l-4 border-red-400 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">
                  Producto no encontrado. <Link to="/shop" className="font-medium underline">Volver a la tienda</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow py-12">
        <div className="container-custom">
          {/* Breadcrumbs */}
          <div className="mb-6">
            <nav className="flex" aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-1 md:space-x-3">
                <li className="inline-flex items-center">
                  <Link to="/" className="text-gray-500 hover:text-accent">
                    Inicio
                  </Link>
                </li>
                <li>
                  <div className="flex items-center">
                    <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                    <Link to="/shop" className="ml-1 text-gray-500 hover:text-accent md:ml-2">
                      Tienda
                    </Link>
                  </div>
                </li>
                <li aria-current="page">
                  <div className="flex items-center">
                    <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="ml-1 text-gray-500 md:ml-2 font-medium">
                      {product.title}
                    </span>
                  </div>
                </li>
              </ol>
            </nav>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Imágenes del producto */}
            <div>
              <div className="mb-4 aspect-w-1 aspect-h-1 overflow-hidden rounded-lg bg-gray-100">
                <img
                  src={activeImage === 0 ? product.image1 : product.image2}
                  alt={product.title}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              
              {product.image2 && (
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setActiveImage(0)}
                    className={`aspect-w-1 aspect-h-1 overflow-hidden rounded-lg ${activeImage === 0 ? 'ring-2 ring-accent' : ''}`}
                  >
                    <img
                      src={product.image1}
                      alt={`${product.title} - Vista 1`}
                      className="h-full w-full object-cover object-center"
                    />
                  </button>
                  <button
                    onClick={() => setActiveImage(1)}
                    className={`aspect-w-1 aspect-h-1 overflow-hidden rounded-lg ${activeImage === 1 ? 'ring-2 ring-accent' : ''}`}
                  >
                    <img
                      src={product.image2}
                      alt={`${product.title} - Vista 2`}
                      className="h-full w-full object-cover object-center"
                    />
                  </button>
                </div>
              )}
            </div>
            
            {/* Información del producto */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.title}</h1>
              
              <div className="text-2xl font-bold text-accent mb-6">
                ${product.price.toLocaleString()}
              </div>
              
              <div className="mb-8">
                <p className="text-gray-700">{product.description}</p>
              </div>
              
              <div className="space-y-6">
                {/* Especificaciones */}
                <div className="border-t border-b border-gray-200 py-4 space-y-3">
                  {product.category && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">Categoría:</span>
                      <span className="font-medium">{product.category}</span>
                    </div>
                  )}
                  
                  {product.material && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">Material:</span>
                      <span className="font-medium">{product.material}</span>
                    </div>
                  )}
                  
                  {product.type && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">Tipo:</span>
                      <span className="font-medium">{product.type}</span>
                    </div>
                  )}
                </div>
                
                {/* Selección de cantidad */}
                <div>
                  <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
                    Cantidad
                  </label>
                  <div className="flex rounded-md">
                    <button
                      type="button"
                      onClick={decrementQuantity}
                      className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                    >
                      <span className="sr-only">Decrementar</span>
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                      </svg>
                    </button>
                    <input
                      type="number"
                      id="quantity"
                      name="quantity"
                      min="1"
                      value={quantity}
                      onChange={handleQuantityChange}
                      className="block w-24 border-gray-300 rounded-none focus:border-accent focus:ring-accent text-center"
                    />
                    <button
                      type="button"
                      onClick={incrementQuantity}
                      className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                    >
                      <span className="sr-only">Incrementar</span>
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v12M6 12h12" />
                      </svg>
                    </button>
                  </div>
                </div>
                
                {/* Botón de compra */}
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="w-full bg-accent hover:bg-accent/90 text-white font-bold py-3 px-4 rounded transition-colors"
                >
                  Añadir al Carrito
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;