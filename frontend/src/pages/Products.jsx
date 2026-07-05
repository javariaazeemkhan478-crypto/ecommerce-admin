import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import api from '../api/axios';
import toast, { Toaster } from 'react-hot-toast';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: '', category: '', price: '' });

  useEffect(() => {
    api.get('products/').then(r => setProducts(r.data)).catch(() => {});
  }, []);

  const addProduct = async () => {
    try {
      const res = await api.post('products/', form);
      setProducts([...products, res.data]);
      setForm({ name: '', category: '', price: '' });
      toast.success('Product added!');
    } catch {
      toast.error('Error adding product');
    }
  };

  const deleteProduct = async (id) => {
    await api.delete(`products/${id}/`);
    setProducts(products.filter(p => p.id !== id));
    toast.success('Deleted!');
  };

  return (
    <div className="flex min-h-screen bg-gray-950 text-white">
      <Toaster />
      <Sidebar />
      <main className="flex-1 p-8">
        <h2 className="text-2xl font-bold mb-8">Products</h2>
        <div className="bg-gray-900 rounded-xl p-6 mb-8">
          <h3 className="text-lg font-semibold mb-4">Add Product</h3>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <input className="bg-gray-800 text-white px-4 py-2 rounded-lg"
              placeholder="Name" value={form.name}
              onChange={e => setForm({...form, name: e.target.value})} />
            <input className="bg-gray-800 text-white px-4 py-2 rounded-lg"
              placeholder="Category" value={form.category}
              onChange={e => setForm({...form, category: e.target.value})} />
            <input type="number" className="bg-gray-800 text-white px-4 py-2 rounded-lg"
              placeholder="Price" value={form.price}
              onChange={e => setForm({...form, price: e.target.value})} />
          </div>
          <button onClick={addProduct}
            className="bg-indigo-600 hover:bg-indigo-700 px-6 py-2 rounded-lg font-semibold">
            Add Product
          </button>
        </div>
        <div className="bg-gray-900 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-gray-400">Name</th>
                <th className="px-6 py-3 text-left text-gray-400">Category</th>
                <th className="px-6 py-3 text-left text-gray-400">Price</th>
                <th className="px-6 py-3 text-left text-gray-400">Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map(p => (
                <tr key={p.id} className="border-t border-gray-800">
                  <td className="px-6 py-4">{p.name}</td>
                  <td className="px-6 py-4">{p.category}</td>
                  <td className="px-6 py-4">${p.price}</td>
                  <td className="px-6 py-4">
                    <button onClick={() => deleteProduct(p.id)}
                      className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm">
                      Delete
                    </button>
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