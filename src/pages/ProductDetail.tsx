import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import productsData from '../data/products.json';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState('');
  const [quantity, setQuantity] = useState(1);
  
  useEffect(() => {
    setLoading(true);
    
    if (id && productsData && productsData.products) {
      const numericId = parseInt(id);
      const foundProduct = productsData.products.find(p => p.id === numericId);
      
      if (foundProduct) {
        setProduct(foundProduct);
        setActiveImage(foundProduct.image1);
        console.log("Producto encontrado:", foundProduct);
      } else {
        console.log("Producto no encontrado para ID:", numericId);
      }
    }
    
    setTimeout(() => {
      setLoading(false);
    }, 300); // Pequeño tiempo de carga para la animación
  }, [id]);
  
  const handleQuantityChange = (e) => {
    setQuantity(parseInt(e.target.value));
  };
  
  const handleAddToCart = () => {
    alert(`Producto ${product.title} añadido al carrito (${quantity} unidades)`);
    // Aquí iría la lógica real de añadir al carrito
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-red-600"></div>
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <svg className="mx-auto h-16 w-16 text-red-500 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-2xl font-bold mb-4">Producto no encontrado</h2>
          <p className="text-gray-600 mb-8">El producto que estás buscando no existe o ha sido eliminado.</p>
          <Link 
            to="/shop" 
            className="inline-block bg-red-600 hover:bg-red-700 text-white font-medium px-6 py-3 rounded-lg transition-all duration-200"
          >
            Volver a la tienda
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="flex mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-500">
            <li>
              <Link to="/" className="hover:text-red-600 transition-colors">Inicio</Link>
            </li>
            <li>
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </li>
            <li>
              <Link to="/shop" className="hover:text-red-600 transition-colors">Tienda</Link>
            </li>
            <li>
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </li>
            <li className="font-medium text-red-600">{product.title}</li>
          </ol>
        </nav>
        
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-0">
            {/* Sección de imágenes */}
            <div className="p-6 lg:p-8 bg-gray-50">
              <div className="aspect-square overflow-hidden rounded-xl bg-white flex items-center justify-center mb-4 border border-gray-200">
                <img
                  src={activeImage}
                  alt={product.title}
                  className="object-contain h-full w-full p-4"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setActiveImage(product.image1)}
                  className={`aspect-square overflow-hidden rounded-lg border-2 transition-all ${
                    activeImage === product.image1 
                      ? 'border-red-600 shadow-md' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <img
                    src={product.image1}
                    alt={`${product.title} - Vista principal`}
                    className="object-cover h-full w-full"
                  />
                </button>
                
                {product.image2 && (
                  <button
                    onClick={() => setActiveImage(product.image2)}
                    className={`aspect-square overflow-hidden rounded-lg border-2 transition-all ${
                      activeImage === product.image2 
                        ? 'border-red-600 shadow-md' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={product.image2}
                      alt={`${product.title} - Vista alternativa`}
                      className="object-cover h-full w-full"
                    />
                  </button>
                )}
              </div>
            </div>
            
            {/* Sección de información */}
            <div className="p-6 lg:p-8 flex flex-col">
              <div className="flex-grow">
                <div className="inline-block px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium mb-4">
                  {product.category}
                </div>
                
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                  {product.title}
                </h1>
                
                <div className="flex items-center mb-6">
                  <span className="text-3xl font-bold text-red-600">
                    ${product.price.toLocaleString()}
                  </span>
                  <span className="ml-2 text-sm text-gray-500">(Incluye impuestos)</span>
                </div>
                
                <div className="mb-6">
                  <h2 className="text-lg font-medium text-gray-900 mb-2">Descripción</h2>
                  <p className="text-gray-600">{product.description}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium text-gray-900 mb-1">Material</h3>
                    <p className="text-gray-600">{product.material}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium text-gray-900 mb-1">Tipo</h3>
                    <p className="text-gray-600">{product.type}</p>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-6">
                <div className="flex items-center justify-between mb-6">
                  <label htmlFor="quantity" className="text-gray-700 font-medium">
                    Cantidad:
                  </label>
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button 
                      onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                      className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      id="quantity"
                      min="1"
                      max="10"
                      value={quantity}
                      onChange={handleQuantityChange}
                      className="w-12 text-center border-0 focus:ring-0"
                    />
                    <button 
                      onClick={() => quantity < 10 && setQuantity(quantity + 1)}
                      className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={handleAddToCart}
                    className="w-full flex items-center justify-center bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-6 rounded-lg shadow-sm transition-colors"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Añadir al carrito
                  </button>
                  
                  <button
                    className="w-full flex items-center justify-center bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-3 px-6 rounded-lg shadow-sm transition-colors"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    Añadir a favoritos
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Sección de productos relacionados (opcional) */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">También te puede interesar</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {productsData.products
              .filter(p => p.category === product.category && p.id !== product.id)
              .slice(0, 4)
              .map(relatedProduct => (
                <Link 
                  key={relatedProduct.id} 
                  to={`/product/${relatedProduct.id}`}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="aspect-square overflow-hidden">
                    <img 
                      src={relatedProduct.image1} 
                      alt={relatedProduct.title} 
                      className="object-cover w-full h-full transition-transform hover:scale-105" 
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-gray-900 mb-1">{relatedProduct.title}</h3>
                    <p className="text-red-600 font-bold">${relatedProduct.price.toLocaleString()}</p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;