
import React from 'react';
import { PrintIcon } from './Icons';

interface ColoringPageProps {
  image: string | null;
}

const ColoringPage: React.FC<ColoringPageProps> = ({ image }) => {
  if (!image) {
    return null;
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full flex flex-col items-center justify-center p-4">
      <div className="printable-area w-full flex flex-col items-center">
        <h2 className="text-2xl font-bold text-sky-700 mb-4">Sua Página para Colorir!</h2>
        <div className="w-full max-w-md aspect-square bg-white rounded-lg shadow-lg border-2 border-gray-200 overflow-hidden">
          <img src={image} alt="Generated coloring page" className="w-full h-full object-cover" />
        </div>
      </div>
      <button 
        onClick={handlePrint}
        className="mt-4 px-6 py-3 bg-green-500 text-white font-bold text-lg rounded-lg shadow-md hover:bg-green-600 transition-all duration-200 transform hover:scale-105 flex items-center gap-2 border-b-4 border-green-700 active:border-b-2 active:scale-100"
      >
        <PrintIcon />
        Imprimir Desenho
      </button>
      <p className="mt-2 text-gray-600 text-sm">Imprima e divirta-se colorindo!</p>
    </div>
  );
};

export default ColoringPage;