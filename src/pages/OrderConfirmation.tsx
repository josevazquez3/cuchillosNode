import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../services/api';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

// Define interfaces para los objetos
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

const OrderConfirmation: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await api.get(`/orders/${orderId}`);
        setOrder(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener la información del pedido:', error);
        setLoading(false);
      }
    };
    
    fetchOrder();
  }, [orderId]);
  
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
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 bg-accent text-white">
              <div className="flex items-center">
                <div className="bg-white rounded-full p-2 mr-4 text-accent">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-2xl font-bold">¡Gracias por tu compra!</h1>
                  <p className="text-white/80">Tu pedido ha sido recibido y está siendo procesado.</p>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <div className="mb-8">
                <h2 className="text-lg font-semibold mb-4">Detalles del Pedido</h2>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Número de Pedido</p>
                    <p className="font-medium">{order?.id}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500">Fecha</p>
                    <p className="font-medium">
                      {order?.created_at ? new Date(order.created_at).toLocaleDateString() : ''}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500">Total</p>
                    <p className="font-medium">${order?.total_amount.toLocaleString()}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500">Estado</p>
                    <p className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      {order?.status}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mb-8">
                <h2 className="text-lg font-semibold mb-4">Productos</h2>
                
                <div className="border rounded-md overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Producto
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Cantidad
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Precio
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Total
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {order?.items?.map(item => (
                        <tr key={item.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-10 w-10 flex-shrink-0">
                                <img
                                  src={item.image1}
                                  alt={item.title}
                                  className="h-10 w-10 rounded object-cover"
                                />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {item.title}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {item.quantity}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            ${item.price.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            ${(item.price * item.quantity).toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className="text-center space-y-4">
                <p className="text-gray-600">
                  Recibirás un correo electrónico con los detalles de tu pedido y la información de seguimiento una vez que sea enviado.
                </p>
                
                <div className="flex justify-center space-x-4">
                  <Link
                    to="/"
                    className="bg-accent hover:bg-accent/90 text-white font-medium px-6 py-3 rounded-md transition-colors inline-block"
                  >
                    Volver a la Tienda
                  </Link>
                  
                  <Link
                    to={`/orders/${orderId}`}
                    className="border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 font-medium px-6 py-3 rounded-md transition-colors inline-block"
                  >
                    Ver Detalles del Pedido
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

export default OrderConfirmation;