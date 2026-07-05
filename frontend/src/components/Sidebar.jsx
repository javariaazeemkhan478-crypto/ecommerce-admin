import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingCart, BarChart2, Star, LogOut } from 'lucide-react';

const links = [
  { to: '/', icon: <LayoutDashboard size={18} />, label: 'Dashboard' },
  { to: '/products', icon: <Package size={18} />, label: 'Products' },
  { to: '/orders', icon: <ShoppingCart size={18} />, label: 'Orders' },
  { to: '/analytics', icon: <BarChart2 size={18} />, label: 'Analytics' },
  { to: '/reviews', icon: <Star size={18} />, label: 'Reviews' },
];

export default function Sidebar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const logout = () => { localStorage.removeItem('token'); navigate('/login'); };

  return (
    <div className="w-64 min-h-screen bg-gray-900 text-white flex flex-col p-4">
      <h1 className="text-xl font-bold mb-8 text-indigo-400">🛒 E-Admin</h1>
      <nav className="flex-1 space-y-1">
        {links.map(l => (
          <Link key={l.to} to={l.to}
            className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition ${pathname === l.to ? 'bg-indigo-600' : 'hover:bg-gray-800'}`}>
            {l.icon} {l.label}
          </Link>
        ))}
      </nav>
      <button onClick={logout} className="flex items-center gap-3 px-4 py-2.5 hover:bg-red-600 rounded-lg transition">
        <LogOut size={18} /> Logout
      </button>
    </div>
  );
}