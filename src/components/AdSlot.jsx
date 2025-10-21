import React from 'react';

const AdSlot = ({ id, type = 'horizontal' }) => {
  const containerClass = type === 'horizontal' 
    ? 'h-24 my-8 mx-auto max-w-4xl' 
    : 'h-96';
  
  return (
    <div 
      id={id}
      className={`bg-gray-100 border border-gray-200 flex items-center justify-center ${containerClass}`}
      aria-label="Espacio publicitario"
    >
      <div className="text-center">
        <span className="text-xs text-gray-400 uppercase tracking-wider">Anuncio</span>
        <p className="text-sm text-gray-500 mt-1">Espacio publicitario</p>
      </div>
    </div>
  );
};

export default AdSlot;