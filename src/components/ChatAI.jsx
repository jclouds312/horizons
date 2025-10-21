import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const ChatAI = () => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (!message.trim()) return;
    
    toast({
      title: "Chat IA",
      description: "Esta es una respuesta automática. La funcionalidad completa estará disponible próximamente.",
    });
    
    setMessage('');
  };

  return (
    <section className="py-12 bg-gray-50" aria-label="Chat con IA">
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Chat IA</h2>
          <p className="text-sm text-gray-500 mb-6">Respuestas automáticas para tus consultas</p>
          
          <div className="flex gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Escribe tu consulta aquí..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              aria-label="Campo de mensaje para chat IA"
            />
            <Button
              onClick={handleSend}
              className="bg-gray-900 text-white hover:bg-gray-800"
              aria-label="Enviar mensaje"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChatAI;