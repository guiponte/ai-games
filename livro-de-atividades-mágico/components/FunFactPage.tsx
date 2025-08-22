
import React from 'react';
import { Source } from '../types';

interface FunFactPageProps {
  fact: string | null;
  sources: Source[];
}

const FunFactPage: React.FC<FunFactPageProps> = ({ fact, sources }) => {
  if (!fact) {
    return null;
  }

  return (
    <div className="w-full max-w-2xl text-center flex flex-col items-center p-4">
      <h2 className="text-2xl font-bold text-sky-700 mb-4">Você Sabia?</h2>
      <div className="bg-white p-6 rounded-lg shadow-md border-2 border-gray-200 mb-6">
        <p className="text-xl text-gray-700 font-medium">{fact}</p>
      </div>

      {sources.length > 0 && (
        <div className="w-full">
          <h3 className="text-lg font-semibold text-gray-600 mb-2">Fontes:</h3>
          <ul className="list-disc list-inside text-left bg-white p-4 rounded-lg border-2 border-gray-200">
            {sources.map((source, index) => (
              <li key={index} className="mb-1">
                <a
                  href={source.uri}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline break-all"
                >
                  {source.title || source.uri}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FunFactPage;
