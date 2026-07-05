import Chatbot from '../components/Chatbot';
import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import api from '../api/axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function Analytics() {
  const [form, setForm] = useState({ month: 1, price: 100, quantity: 10 });
  const [prediction, setPrediction] = useState(null);
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    api.get('analytics/sales/').then(r => setSalesData(r.data));
  }, []);

  const predict = async () => {
    const res = await api.post('ml/predict-sales/', form);
    setPrediction(res.data.predicted_sales);
  };

  return (
    <div className="flex min-h-screen bg-gray-950 text-white">
      <Sidebar />
      <main className="flex-1 p-8">
        <h2 className="text-2xl font-bold mb-8">Sales Analytics & AI Prediction</h2>

        <div className="bg-gray-900 rounded-xl p-6 mb-8">
          <h3 className="text-lg font-semibold mb-4">Monthly Revenue</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={salesData}>
              <XAxis dataKey="created_at__month" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip />
              <Bar dataKey="total" fill="#6366f1" radius={4} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-gray-900 rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4">🤖 AI Sales Predictor</h3>
          <div className="grid grid-cols-3 gap-4 mb-4">
            {['month','price','quantity'].map(field => (
              <div key={field}>
                <label className="text-gray-400 text-sm capitalize">{field}</label>
                <input type="number" className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg mt-1"
                  value={form[field]} onChange={e => setForm({...form, [field]: e.target.value})} />
              </div>
            ))}
          </div>
          <button onClick={predict} className="bg-indigo-600 hover:bg-indigo-700 px-6 py-2 rounded-lg font-semibold">
            Predict Sales
          </button>
          {prediction && (
            <p className="mt-4 text-green-400 text-xl font-bold">
              Predicted Sales: ${prediction}
            </p>
          )}
        </div>
      </main>
    <Chatbot />
    </div>
  );
}