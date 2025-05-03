import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../services/api';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import ProductGrid from '../components/shop/ProductGrid';
import Filters from '../components/shop/Filters';
import { Product } from '../types'; // Importar el tipo compartido


const Shop: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  // Especifica los tipos correctos para los estados
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>([]);
  const [materials, setMaterials] = useState<string[]>([]);
  const [types, setTypes] = useState<string[]>([]);
  
  const selectedCategory = searchParams.get('category');
  const selectedMaterial = searchParams.get('material');
  const selectedType = searchParams.get('type');
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        
        const params = new URLSearchParams();
        if (selectedCategory) params.append('category', selectedCategory);
        if (selectedMaterial) params.append('material', selectedMaterial);
        if (selectedType) params.append('type', selectedType);
        
        const response = await api.get(`/products?${params.toString()}`);
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, [selectedCategory, selectedMaterial, selectedType]);
  
  useEffect(() => {
    const fetchFilters = async () => {
      try {
        // En un escenario real, tendríamos endpoints para obtener categorías, materiales y tipos
        // Aquí simulamos esto extrayendo valores únicos de los productos
        const response = await api.get('/products');
        const allProducts: Product[] = response.data;
        
        const uniqueCategories = [...new Set(allProducts.map(p => p.category))];
        const uniqueMaterials = [...new Set(allProducts.map(p => p.material))];
        const uniqueTypes = [...new Set(allProducts.map(p => p.type))];
        
        setCategories(uniqueCategories);
        setMaterials(uniqueMaterials);
        setTypes(uniqueTypes);
      } catch (error) {
        console.error('Error fetching filters:', error);
      }
    };
    
    fetchFilters();
  }, []);
  
  const handleCategoryChange = (category: string | null) => {
    const newParams = new URLSearchParams(searchParams);
    if (category) {
      newParams.set('category', category);
    } else {
      newParams.delete('category');
    }
    setSearchParams(newParams);
  };
  
  const handleMaterialChange = (material: string | null) => {
    const newParams = new URLSearchParams(searchParams);
    if (material) {
      newParams.set('material', material);
    } else {
      newParams.delete('material');
    }
    setSearchParams(newParams);
  };
  
  const handleTypeChange = (type: string | null) => {
    const newParams = new URLSearchParams(searchParams);
    if (type) {
      newParams.set('type', type);
    } else {
      newParams.delete('type');
    }
    setSearchParams(newParams);
  };
  
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow py-8">
        <div className="container-custom">
          <h1 className="text-3xl font-bold mb-8">Tienda</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filtros */}
            <div className="lg:col-span-1">
              <Filters
                categories={categories}
                materials={materials}
                types={types}
                selectedCategory={selectedCategory}
                selectedMaterial={selectedMaterial}
                selectedType={selectedType}
                onCategoryChange={handleCategoryChange}
                onMaterialChange={handleMaterialChange}
                onTypeChange={handleTypeChange}
              />
            </div>
            
            {/* Productos */}
            <div className="lg:col-span-3">
              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-accent"></div>
                </div>
              ) : products.length > 0 ? (
                <ProductGrid products={products} />
              ) : (
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-yellow-700">
                        No se encontraron productos con los filtros seleccionados.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Shop;