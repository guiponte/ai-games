
import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="w-16 h-16 border-8 border-dashed rounded-full animate-spin border-sky-500"></div>
      <p className="text-xl font-semibold text-sky-600">Criando algo mágico...</p>
    </div>
  );
};

export default LoadingSpinner;
