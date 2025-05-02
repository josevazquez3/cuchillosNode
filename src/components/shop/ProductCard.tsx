import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';

interface Product {
  id: number;
  title: string;
  price: number;
  image1: string;
  image2: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { addItem } = useContext(CartContext);
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image1,
    });
  };
  
  return (
    <Link 
      to={`/product/${product.id}`}
      className="group block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="bg-white overflow-hidden rounded-lg shadow-md transition-transform group-hover:shadow-lg">
        {/* Imagen con efecto de transición */}
        <div className="relative overflow-hidden aspect-w-1 aspect-h-1 h-64">
          <img
            src={product.image1}
            alt={product.title}
            className={`object-cover w-full h-full transition-opacity duration-300 ${isHovered ? 'opacity-0' : 'opacity-100'}`}
          />
          <img
            src={product.image2 || product.image1}
            alt={product.title}
            className={`absolute inset-0 object-cover w-full h-full transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
          />
        </div>
        
        {/* Información del producto */}
        <div className="p-4">
          <h3 className="text-lg font-medium text-gray-900 truncate">{product.title}</h3>
          <div className="mt-2 flex justify-between items-center">
            <p className="text-accent font-bold">${product.price.toLocaleString()}</p>
            <button
              onClick={handleAddToCart}
              className="bg-primary hover:bg-primary/90 text-white px-3 py-1 rounded-full text-sm transition-colors"
            >
              Comprar
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;