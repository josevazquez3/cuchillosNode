import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../services/api';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

// Define interfaces para los tipos de datos
interface OrderItem {
  id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  price: number;
  title: string;
  image1: string;
}

interface Order {
  id: number;
  user_id: number;
  total_amount: number;
  status: string;
  created_at: string;
  items: OrderItem[];
}

const OrderDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await api.get(`/orders/${id}`);
        setOrder(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener los detalles del pedido:', error);
        setLoading(false);
      }
    };
    
    fetchOrder();
  }, [id]);
  
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
  
  if (!order) {
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
                  Pedido no encontrado. <Link to="/orders" className="font-medium underline">Volver a mis pedidos</Link>
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
                    <Link to="/orders" className="ml-1 text-gray-500 hover:text-accent md:ml-2">
                      Mis Pedidos
                    </Link>
                  </div>
                </li>
                <li aria-current="page">
                  <div className="flex items-center">
                    <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="ml-1 text-gray-500 md:ml-2 font-medium">
                      Pedido #{order.id}
                    </span>
                  </div>
                </li>
              </ol>
            </nav>
          </div>
          
          <h1 className="text-3xl font-bold mb-8">Detalles del Pedido #{order.id}</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Información del pedido */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-lg font-semibold">Información del Pedido</h2>
                </div>
                
                <div className="p-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div>
                      <p className="text-sm text-gray-500">Número de Pedido</p>
                      <p className="font-medium">{order.id}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500">Fecha</p>
                      <p className="font-medium">
                        {new Date(order.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500">Total</p>
                      <p className="font-medium">${order.total_amount.toLocaleString()}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500">Estado</p>
                      <p className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        order.status === 'pendiente' ? 'bg-yellow-100 text-yellow-800' :
                        order.status === 'procesando' ? 'bg-blue-100 text-blue-800' :
                        order.status === 'enviado' ? 'bg-purple-100 text-purple-800' :
                        order.status === 'entregado' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {order.status}
                      </p>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="text-md font-semibold mb-4">Productos</h3>
                    
                    <ul className="divide-y divide-gray-200">
                      {order.items.map(item => (
                        <li key={item.id} className="py-4 flex">
                          <div className="h-16 w-16 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden">
                            <img
                              src={item.image1}
                              alt={item.title}
                              className="h-full w-full object-cover object-center"
                            />
                          </div>
                          
                          <div className="ml-4 flex-1 flex flex-col">
                            <div>
                              <div className="flex justify-between">
                                <h4 className="text-base font-medium text-gray-900">
                                  <Link to={`/product/${item.product_id}`} className="hover:text-accent transition-colors">
                                    {item.title}
                                  </Link>
                                </h4>
                                <p className="text-sm font-medium text-gray-900">
                                  ${item.price.toLocaleString()}
                                </p>
                              </div>
                              <p className="mt-1 text-sm text-gray-500">
                                Cantidad: {item.quantity}
                              </p>
                            </div>
                            <div className="mt-1 flex-1 flex items-end justify-between">
                              <p className="text-sm font-medium text-gray-900">
                                Total: ${(item.price * item.quantity).toLocaleString()}
                              </p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Resumen del pedido */}
            <div>
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
                <h2 className="text-lg font-semibold mb-6">Resumen</h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">${order.total_amount.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Envío</span>
                    <span className="font-medium">Gratis</span>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4 flex justify-between">
                    <span className="text-lg font-bold">Total</span>
                    <span className="text-lg font-bold text-accent">${order.total_amount.toLocaleString()}</span>
                  </div>
                </div>
                
                <div className="mt-6 space-y-4">
                  <Link
                    to="/shop"
                    className="w-full bg-accent hover:bg-accent/90 text-white font-bold py-3 px-4 rounded transition-colors block text-center"
                  >
                    Continuar Comprando
                  </Link>
                  
                  <Link
                    to="/orders"
                    className="w-full border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 font-medium py-3 px-4 rounded transition-colors block text-center"
                  >
                    Volver a Mis Pedidos
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default OrderDetail;