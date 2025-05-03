import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import Sidebar from './Sidebar';

const ProductForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    material: '',
    type: '',
  });
  
  const [images, setImages] = useState({
    image1: null,
    image2: null,
  });
  
  const [imagePreview, setImagePreview] = useState({
    image1: '',
    image2: '',
  });
  
  const [loading, setLoading] = useState(isEditMode);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Categorías, materiales y tipos disponibles
  const categories = ['Chef', 'Santoku', 'Utilitario', 'Para pelar'];
  const materials = ['Acero inoxidable', 'Acero de carbono', 'Damasco'];
  const types = ['Cocina', 'Caza', 'Parrilla'];
  
  useEffect(() => {
    if (isEditMode) {
      const fetchProduct = async () => {
        try {
          const response = await api.get(`/products/${id}`);
          const product = response.data;
          
          setFormData({
            title: product.title,
            description: product.description,
            price: product.price.toString(),
            category: product.category,
            material: product.material,
            type: product.type,
          });
          
          setImagePreview({
            image1: product.image1,
            image2: product.image2 || '',
          });
          
          setLoading(false);
        } catch (error) {
          console.error('Error al obtener producto:', error);
          setError('No se pudo cargar la información del producto.');
          setLoading(false);
        }
      };
      
      fetchProduct();
    }
  }, [id, isEditMode]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    
    if (files && files.length > 0) {
      const file = files[0];
      setImages(prevImages => ({
        ...prevImages,
        [name]: file,
      }));
      
      // Crear una URL para la vista previa de la imagen
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(prevPreviews => ({
        ...prevPreviews,
        [name]: imageUrl,
      }));
    }
  };
  
 // Busca esta parte del código y actualízala:
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  try {
    setSubmitting(true);
    setError(null);
    
    // Validar formulario
    if (!formData.title || !formData.description || !formData.price) {
      setError('Por favor, complete todos los campos obligatorios.');
      setSubmitting(false);
      return;
    }
    
    // En modo de creación, requerir al menos una imagen
    if (!isEditMode && !images.image1) {
      setError('Por favor, suba al menos una imagen.');
      setSubmitting(false);
      return;
    }
    
    // Crear FormData para enviar imágenes
    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('price', formData.price);
    formDataToSend.append('category', formData.category);
    formDataToSend.append('material', formData.material);
    formDataToSend.append('type', formData.type);
    
    if (images.image1) {
      formDataToSend.append('images', images.image1);
    }
    
    if (images.image2) {
      formDataToSend.append('images', images.image2);
    }
    
    // Elimina la variable response que no se usa
    if (isEditMode) {
      await api.put(`/products/${id}`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    } else {
      await api.post('/products', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    }
    
    // Redireccionar a la lista de productos
    navigate('/admin/products');
  } catch (error) {
    console.error('Error al guardar el producto:', error);
    setError('Ocurrió un error al guardar el producto. Por favor, inténtelo de nuevo.');
    setSubmitting(false);
  }
};
  
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
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow py-12">
        <div className="container-custom">
          <h1 className="text-3xl font-bold mb-8">
            {isEditMode ? 'Editar Producto' : 'Crear Producto'}
          </h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Sidebar />
            </div>
            
            {/* Contenido principal */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-lg font-semibold">
                    {isEditMode ? 'Editar Información del Producto' : 'Información del Producto'}
                  </h2>
                </div>
                
                {error && (
                  <div className="bg-red-50 border-l-4 border-red-400 p-4 m-6">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-red-700">
                          {error}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                        Título*
                      </label>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-accent focus:border-accent"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                        Precio*
                      </label>
                      <input
                        type="number"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-accent focus:border-accent"
                        min="0"
                        step="0.01"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                        Categoría
                      </label>
                      <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-accent focus:border-accent"
                      >
                        <option value="">Seleccione una categoría</option>
                        {categories.map(category => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="material" className="block text-sm font-medium text-gray-700 mb-1">
                        Material
                      </label>
                      <select
                        id="material"
                        name="material"
                        value={formData.material}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-accent focus:border-accent"
                      >
                        <option value="">Seleccione un material</option>
                        {materials.map(material => (
                          <option key={material} value={material}>
                            {material}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                        Tipo
                      </label>
                      <select
                        id="type"
                        name="type"
                        value={formData.type}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-accent focus:border-accent"
                      >
                        <option value="">Seleccione un tipo</option>
                        {types.map(type => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                      Descripción*
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-accent focus:border-accent"
                      required
                    ></textarea>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="image1" className="block text-sm font-medium text-gray-700 mb-1">
                        Imagen Principal*
                      </label>
                      <input
                        type="file"
                        id="image1"
                        name="image1"
                        onChange={handleImageChange}
                        accept="image/*"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-accent focus:border-accent"
                        required={!isEditMode}
                      />
                      {(imagePreview.image1 || isEditMode) && (
                        <div className="mt-2">
                          <img
                            src={imagePreview.image1}
                            alt="Vista previa"
                            className="h-32 w-auto object-cover rounded-md"
                          />
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="image2" className="block text-sm font-medium text-gray-700 mb-1">
                        Imagen Secundaria
                      </label>
                      <input
                        type="file"
                        id="image2"
                        name="image2"
                        onChange={handleImageChange}
                        accept="image/*"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-accent focus:border-accent"
                      />
                      {imagePreview.image2 && (
                        <div className="mt-2">
                          <img
                            src={imagePreview.image2}
                            alt="Vista previa"
                            className="h-32 w-auto object-cover rounded-md"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-4">
                    <button
                      type="button"
                      onClick={() => navigate('/admin/products')}
                      className="border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 font-medium px-4 py-2 rounded-md transition-colors"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="bg-accent hover:bg-accent/90 text-white font-medium px-4 py-2 rounded-md transition-colors"
                      disabled={submitting}
                    >
                      {submitting ? (
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Guardando...
                        </span>
                      ) : (
                        'Guardar Producto'
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductForm;