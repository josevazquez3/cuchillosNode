import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow py-12 flex items-center">
        <div className="container-custom text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-gray-300 mx-auto mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M12 14a2 2 0 100-4 2 2 0 000 4z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 22a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2H5z" />
          </svg>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">404</h1>
          <h2 className="text-2xl font-bold text-gray-700 mb-8">Página no encontrada</h2>
          
          <p className="max-w-md mx-auto text-gray-600 mb-10">
            Lo sentimos, la página que estás buscando no existe o podría haber sido movida.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              to="/"
              className="bg-accent hover:bg-accent/90 text-white font-medium px-6 py-3 rounded-md transition-colors inline-block"
            >
              Volver al Inicio
            </Link>
            
            <Link
              to="/shop"
              className="border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 font-medium px-6 py-3 rounded-md transition-colors inline-block"
            >
              Explorar Productos
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;