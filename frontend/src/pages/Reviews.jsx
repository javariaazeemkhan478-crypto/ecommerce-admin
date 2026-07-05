import Chatbot from '../components/Chatbot';
import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import api from '../api/axios';

export default function Reviews() {
  const [text, setText] = useState('');
  const [productId, setProductId] = useState('');
  const [result, setResult] = useState(null);

  const analyze = async () => {
    const res = await api.post('ml/analyze-review/', { text, product_id: productId });
    setResult(res.data);
  };

  const sentimentColor = { positive: 'text-green-400', negative: 'text-red-400', neutral: 'text-yellow-400' };

  return (
    <div className="flex min-h-screen bg-gray-950 text-white">
      <Sidebar />
      <main className="flex-1 p-8">
        <h2 className="text-2xl font-bold mb-8">Review Analyzer</h2>
        <div className="bg-gray-900 rounded-xl p-6 max-w-2xl">
          <input className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg mb-4"
            placeholder="Product ID" value={productId} onChange={e => setProductId(e.target.value)} />
          <textarea className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg mb-4 h-32 resize-none"
            placeholder="Enter review text..." value={text} onChange={e => setText(e.target.value)} />
          <button onClick={analyze} className="bg-indigo-600 hover:bg-indigo-700 px-6 py-2 rounded-lg font-semibold">
            Analyze Review
          </button>
          {result && (
            <div className="mt-6 space-y-2">
              <p className={`text-lg font-semibold ${sentimentColor[result.sentiment]}`}>
                Sentiment: {result.sentiment?.toUpperCase()}
              </p>
              <p className={`text-lg font-semibold ${result.is_fake ? 'text-red-400' : 'text-green-400'}`}>
                {result.is_fake ? '⚠️ Fake Review Detected' : '✅ Genuine Review'}
              </p>
            </div>
          )}
        </div>
      </main>
    <Chatbot />
    </div>
  );
}