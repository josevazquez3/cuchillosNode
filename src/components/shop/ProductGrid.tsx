import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types';

interface ProductGridProps {
  products: Product[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map(product => (
        <div
          key={product.id}
          className="group bg-white rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
        >
          <Link to={`/product/${product.id}`} className="block relative overflow-hidden aspect-square">
            <img
              src={product.image1}
              alt={product.title}
              className="w-full h-full object-cover object-center transform transition-transform duration-500 group-hover:scale-110"
            />
            {product.image2 && (
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <img
                  src={product.image2}
                  alt={`${product.title} - Vista alternativa`}
                  className="w-full h-full object-cover object-center"
                />
              </div>
            )}
            <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/60 to-transparent">
              <span className="inline-block bg-accent text-white px-3 py-1 text-sm rounded-full">
                {product.category}
              </span>
            </div>
          </Link>

          <div className="p-6">
            <Link to={`/product/${product.id}`}>
              <h3 className="text-lg font-semibold text-primary mb-2 group-hover:text-accent transition-colors">
                {product.title}
              </h3>
            </Link>
            <p className="text-gray-600 mb-4 line-clamp-2">
              {product.description}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-xl font-bold text-accent">
                ${product.price.toLocaleString()}
              </span>
              <Link
                to={`/product/${product.id}`}
                className="text-primary hover:text-accent transition-colors flex items-center font-medium"
              >
                Ver Detalle
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;