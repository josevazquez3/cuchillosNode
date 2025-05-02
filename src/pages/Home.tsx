import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import ProductGrid from '../components/shop/ProductGrid';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

const Home: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await api.get('/products?limit=4');
        setFeaturedProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching featured products:', error);
        setLoading(false);
      }
    };
    
    fetchFeaturedProducts();
  }, []);
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="relative bg-primary text-white">
          <div className="absolute inset-0 overflow-hidden">
            <img
              src="/images/hero-bg.jpg"
              alt="Cuchillos artesanales"
              className="w-full h-full object-cover opacity-40"
            />
          </div>
          
          <div className="relative container-custom py-24">
            <div className="max-w-xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Cuchillos Artesanales de Alta Calidad
              </h1>
              <p className="text-lg md:text-xl mb-8">
                Diseñados con precisión y fabricados con los mejores materiales para los amantes de la cocina y profesionales.
              </p>
              <Link
                to="/shop"
                className="bg-accent hover:bg-accent/90 text-white font-medium px-6 py-3 rounded-md transition-colors inline-block"
              >
                Ver Colección
              </Link>
            </div>
          </div>
        </div>
        
        {/* Características */}
        <div className="py-16 bg-gray-50">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="w-16 h-16 bg-accent/10 text-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Calidad Premium</h3>
                <p className="text-gray-600">
                  Materiales cuidadosamente seleccionados y técnicas artesanales para garantizar durabilidad y precisión.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="w-16 h-16 bg-accent/10 text-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Diseño Ergonómico</h3>
                <p className="text-gray-600">
                  Cada cuchillo está diseñado para proporcionar un equilibrio perfecto y comodidad durante su uso.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="w-16 h-16 bg-accent/10 text-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Hecho a Mano</h3>
                <p className="text-gray-600">
                  Cada pieza es única, fabricada a mano por artesanos con años de experiencia y pasión por su oficio.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Productos Destacados */}
        <div className="py-16">
          <div className="container-custom">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold">Productos Destacados</h2>
              <Link
                to="/shop"
                className="text-accent hover:underline font-medium"
              >
                Ver Todos
              </Link>
            </div>
            
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-accent"></div>
              </div>
            ) : (
              <ProductGrid products={featuredProducts} />
            )}
          </div>
        </div>
        
        {/* Banner */}
        <div className="bg-primary py-16">
          <div className="container-custom flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                ¿Buscas un cuchillo personalizado?
              </h2>
              <p className="text-gray-300 text-lg mb-6">
                Ofrecemos servicios de personalización para adaptarnos a tus necesidades específicas. Contáctanos para más información.
              </p>
              <Link
                to="/contact"
                className="bg-white text-primary hover:bg-gray-100 font-medium px-6 py-3 rounded-md transition-colors inline-block"
              >
                Contactar
              </Link>
            </div>
            
            <div className="md:w-1/3">
              <img
                src="/images/custom-knife.jpg"
                alt="Cuchillo personalizado"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Home;