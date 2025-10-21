import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ArrowLeft, Minus, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import PageWrapper from '@/components/PageWrapper';

const CartPage = ({ items, onUpdateQuantity, onRemove, onCheckoutSuccess }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [shippingData, setShippingData] = useState({
    street: '',
    city: '',
    zipCode: '',
  });
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
  });

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 0 ? 15 : 0;
  const total = subtotal + shipping;

  const handleNextStep = () => {
    if (step === 1) {
      if (!shippingData.street || !shippingData.city || !shippingData.zipCode) {
        toast({
          title: "Datos incompletos",
          description: "Por favor completa todos los campos de envío",
          variant: "destructive",
        });
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!paymentData.cardNumber || !paymentData.expiry || !paymentData.cvv) {
        toast({
          title: "Datos incompletos",
          description: "Por favor completa todos los campos de pago",
          variant: "destructive",
        });
        return;
      }
      setStep(3);
      onCheckoutSuccess();
      toast({
          title: "¡Compra exitosa!",
          description: "Tu pedido ha sido confirmado.",
      });
    }
  };
  
  const renderContent = () => {
    if (step === 3) {
      return (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-primary mb-4">¡Compra confirmada!</h1>
          <p className="text-gray-600 mb-8">
            Tu pedido ha sido procesado exitosamente. Recibirás un email con los detalles.
          </p>
          <Button
            onClick={() => {
                navigate('/');
                setStep(1);
            }}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
            size="lg"
          >
            Volver al inicio
          </Button>
        </div>
      );
    }
    
    if (items.length === 0) {
        return (
             <div className="text-center py-12">
              <h1 className="text-2xl font-semibold text-primary mb-4">Tu carrito está vacío</h1>
              <p className="text-gray-600 mb-6">Agrega productos para comenzar tu compra</p>
              <Button onClick={() => navigate('/')} className="bg-primary text-primary-foreground hover:bg-primary/90">
                Ir al catálogo
              </Button>
            </div>
        )
    }

    if (step === 1) {
      return (
        <div>
          <h2 className="text-2xl font-semibold text-primary mb-6">Datos de envío</h2>
          <div className="space-y-4 mb-8">
            <div>
              <label htmlFor="street" className="block text-sm font-medium text-gray-700 mb-2">
                Calle y número
              </label>
              <input
                id="street"
                type="text"
                value={shippingData.street}
                onChange={(e) => setShippingData({ ...shippingData, street: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                Ciudad
              </label>
              <input
                id="city"
                type="text"
                value={shippingData.city}
                onChange={(e) => setShippingData({ ...shippingData, city: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
            <div>
              <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-2">
                Código postal
              </label>
              <input
                id="zipCode"
                type="text"
                value={shippingData.zipCode}
                onChange={(e) => setShippingData({ ...shippingData, zipCode: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-semibold text-primary mb-4">Resumen del pedido</h3>
            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-gray-100 rounded flex-shrink-0 overflow-hidden">
                    <img className="w-full h-full object-cover" alt={item.name} src={item.image} />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-primary">{item.name}</p>
                    <p className="text-sm text-gray-600">USD {item.price}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                      className="p-1 border border-gray-300 rounded hover:bg-gray-50"
                      aria-label="Disminuir cantidad"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      className="p-1 border border-gray-300 rounded hover:bg-gray-50"
                      aria-label="Aumentar cantidad"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onRemove(item.id)}
                      className="p-1 text-destructive hover:bg-red-50 rounded ml-2"
                      aria-label="Eliminar producto"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">USD {subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Envío</span>
                <span className="font-medium">USD {shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-semibold pt-2 border-t border-gray-200">
                <span>Total</span>
                <span>USD {total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <Button
            onClick={handleNextStep}
            className="w-full mt-6 bg-primary text-primary-foreground hover:bg-primary/90"
            size="lg"
          >
            Continuar al pago
          </Button>
        </div>
      );
    }

    if (step === 2) {
      return (
        <div>
          <h2 className="text-2xl font-semibold text-primary mb-6">Datos de pago</h2>
          <div className="space-y-4 mb-8">
            <div>
              <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-2">
                Número de tarjeta
              </label>
              <input
                id="cardNumber"
                type="text"
                placeholder="1234 5678 9012 3456"
                value={paymentData.cardNumber}
                onChange={(e) => setPaymentData({ ...paymentData, cardNumber: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="expiry" className="block text-sm font-medium text-gray-700 mb-2">
                  Vencimiento
                </label>
                <input
                  id="expiry"
                  type="text"
                  placeholder="MM/AA"
                  value={paymentData.expiry}
                  onChange={(e) => setPaymentData({ ...paymentData, expiry: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
              <div>
                <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-2">
                  CVV
                </label>
                <input
                  id="cvv"
                  type="text"
                  placeholder="123"
                  value={paymentData.cvv}
                  onChange={(e) => setPaymentData({ ...paymentData, cvv: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <div className="flex justify-between text-lg font-semibold">
              <span>Total a pagar</span>
              <span>USD {total.toFixed(2)}</span>
            </div>
          </div>

          <div className="flex gap-4">
            <Button
              onClick={() => setStep(1)}
              variant="outline"
              className="flex-1"
              size="lg"
            >
              Volver
            </Button>
            <Button
              onClick={handleNextStep}
              className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
              size="lg"
            >
              Confirmar pago
            </Button>
          </div>
        </div>
      );
    }
  };


  return (
    <PageWrapper>
      <Helmet>
        <title>Checkout - SimpleMarket360</title>
        <meta name="description" content="Completa tu compra en SimpleMarket360" />
      </Helmet>
      <div className="min-h-screen bg-white py-8">
        <div className="max-w-4xl mx-auto px-4">
          <button
            onClick={() => step === 1 ? navigate(-1) : setStep(step - 1)}
            className={`flex items-center gap-2 text-gray-600 hover:text-primary mb-6 ${step === 3 ? 'hidden' : ''}`}
            aria-label="Volver"
          >
            <ArrowLeft className="w-5 h-5" />
            Volver
          </button>

          <div className={`mb-8 ${step === 3 ? 'hidden' : ''}`}>
            <div className="flex items-center justify-between mb-4">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center flex-1">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      s <= step ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {step === 3 && s <= 3 ? '✓' : s}
                  </div>
                  {s < 3 && (
                    <div
                      className={`flex-1 h-1 mx-2 ${
                        s < step ? 'bg-primary' : 'bg-gray-200'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Envío</span>
              <span>Pago</span>
              <span>Confirmación</span>
            </div>
          </div>

          {renderContent()}
        </div>
      </div>
    </PageWrapper>
  );
};

export default CartPage;