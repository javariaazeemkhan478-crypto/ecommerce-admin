import Chatbot from '../components/Chatbot';
import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import api from '../api/axios';
import { DollarSign, ShoppingCart, Package, Star } from 'lucide-react';

const StatCard = ({ title, value, icon, color }) => (
  <div className={`bg-gray-900 rounded-xl p-6 flex items-center gap-4 border border-gray-800`}>
    <div className={`p-3 rounded-lg ${color}`}>{icon}</div>
    <div>
      <p className="text-gray-400 text-sm">{title}</p>
      <p className="text-white text-2xl font-bold">{value}</p>
    </div>
  </div>
);

export default function Dashboard() {
  const [stats, setStats] = useState({});

  useEffect(() => {
    api.get('dashboard/stats/').then(r => setStats(r.data));
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-950 text-white">
      <Sidebar />
      <main className="flex-1 p-8">
        <h2 className="text-2xl font-bold mb-8">Dashboard Overview</h2>
        <div className="grid grid-cols-2 gap-6 mb-8">
          <StatCard title="Total Revenue" value={`$${stats.total_revenue || 0}`} icon={<DollarSign />} color="bg-green-600" />
          <StatCard title="Total Orders" value={stats.total_orders || 0} icon={<ShoppingCart />} color="bg-blue-600" />
          <StatCard title="Products" value={stats.total_products || 0} icon={<Package />} color="bg-purple-600" />
          <StatCard title="Reviews" value={stats.total_reviews || 0} icon={<Star />} color="bg-yellow-600" />
        </div>
      </main>
    <Chatbot />
    </div>
  );
}