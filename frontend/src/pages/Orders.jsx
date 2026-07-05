import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import api from '../api/axios';

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.get('orders/').then(r => setOrders(r.data)).catch(() => {});
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-950 text-white">
      <Sidebar />
      <main className="flex-1 p-8">
        <h2 className="text-2xl font-bold mb-8">Orders</h2>
        <div className="bg-gray-900 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-gray-400">ID</th>
                <th className="px-6 py-3 text-left text-gray-400">Product</th>
                <th className="px-6 py-3 text-left text-gray-400">Quantity</th>
                <th className="px-6 py-3 text-left text-gray-400">Total</th>
                <th className="px-6 py-3 text-left text-gray-400">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(o => (
                <tr key={o.id} className="border-t border-gray-800">
                  <td className="px-6 py-4">{o.id}</td>
                  <td className="px-6 py-4">{o.product}</td>
                  <td className="px-6 py-4">{o.quantity}</td>
                  <td className="px-6 py-4">${o.total_price}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      o.status === 'completed' ? 'bg-green-600' :
                      o.status === 'pending' ? 'bg-yellow-600' : 'bg-red-600'
                    }`}>{o.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}