import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { CartContext } from '../../context/CartContext';

const Header: React.FC = () => {
  const { isAuthenticated, isAdmin, user, logout } = useContext(AuthContext);
  const { totalItems } = useContext(CartContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  return (
    <header className="bg-primary text-white">
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold">
            FILO
            <span className="text-accent ml-1">SHARP</span>
          </Link>
          
          {/* Navegación Desktop */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="hover:text-accent transition-colors">Inicio</Link>
            <Link to="/shop" className="hover:text-accent transition-colors">Tienda</Link>
            <Link to="/about" className="hover:text-accent transition-colors">Nosotros</Link>
            <Link to="/contact" className="hover:text-accent transition-colors">Contacto</Link>
          </nav>
          
          {/* Acciones */}
          <div className="flex items-center space-x-4">
            {/* Carrito */}
            <Link to="/cart" className="relative">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>
            
            {/* Usuario */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="flex items-center space-x-1"
                >
                  <span>{user?.username}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {mobileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white text-primary rounded shadow-lg z-10">
                    <div className="py-1">
                      <Link
                        to="/profile"
                        className="block px-4 py-2 hover:bg-gray-100"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Mi Perfil
                      </Link>
                      
                      <Link
                        to="/orders"
                        className="block px-4 py-2 hover:bg-gray-100"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Mis Pedidos
                      </Link>
                      
                      {isAdmin && (
                        <Link
                          to="/admin"
                          className="block px-4 py-2 hover:bg-gray-100"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Panel Admin
                        </Link>
                      )}
                      
                      <button
                        onClick={() => {
                          handleLogout();
                          setMobileMenuOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        Cerrar Sesión
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login" className="hover:text-accent transition-colors">
                  Iniciar Sesión
                </Link>
                <span>/</span>
                <Link to="/register" className="hover:text-accent transition-colors">
                  Registrarse
                </Link>
              </div>
            )}
            
            {/* Menú móvil */}
            <button
              className="md:hidden focus:outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Menú móvil */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <nav className="flex flex-col space-y-3">
              <Link to="/" className="hover:text-accent transition-colors" onClick={() => setMobileMenuOpen(false)}>
                Inicio
              </Link>
              <Link to="/shop" className="hover:text-accent transition-colors" onClick={() => setMobileMenuOpen(false)}>
                Tienda
              </Link>
              <Link to="/about" className="hover:text-accent transition-colors" onClick={() => setMobileMenuOpen(false)}>
                Nosotros
              </Link>
              <Link to="/contact" className="hover:text-accent transition-colors" onClick={() => setMobileMenuOpen(false)}>
                Contacto
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;