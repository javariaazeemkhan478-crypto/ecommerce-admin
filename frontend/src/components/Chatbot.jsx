import { useState } from 'react';
import api from '../api/axios';
import { MessageCircle, X } from 'lucide-react';

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([{ from: 'bot', text: 'Hi! Ask me about sales, orders, or products.' }]);
  const [input, setInput] = useState('');

  const send = async () => {
    if (!input.trim()) return;
    const userMsg = { from: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    const res = await api.post('ml/chatbot/', { message: input });
    setMessages(prev => [...prev, { from: 'bot', text: res.data.response }]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {open && (
        <div className="bg-gray-900 border border-gray-700 rounded-2xl w-80 mb-4 shadow-2xl">
          <div className="bg-indigo-600 rounded-t-2xl px-4 py-3 flex justify-between items-center">
            <span className="font-semibold text-white">AI Assistant</span>
            <button onClick={() => setOpen(false)}><X size={18} className="text-white" /></button>
          </div>
          <div className="p-4 h-64 overflow-y-auto space-y-2">
            {messages.map((m, i) => (
              <div key={i} className={`text-sm px-3 py-2 rounded-xl max-w-xs ${m.from === 'bot' ? 'bg-gray-800 text-gray-200' : 'bg-indigo-600 text-white ml-auto'}`}>
                {m.text}
              </div>
            ))}
          </div>
          <div className="flex gap-2 p-3 border-t border-gray-700">
            <input className="flex-1 bg-gray-800 text-white px-3 py-2 rounded-lg text-sm outline-none"
              value={input} onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && send()} placeholder="Ask something..." />
            <button onClick={send} className="bg-indigo-600 px-3 py-2 rounded-lg text-white text-sm">Send</button>
          </div>
        </div>
      )}
      <button onClick={() => setOpen(!open)}
        className="bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-full shadow-lg">
        <MessageCircle size={24} />
      </button>
    </div>
  );
}