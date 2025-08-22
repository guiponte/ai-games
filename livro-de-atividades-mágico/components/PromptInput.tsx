
import React from 'react';
import { ActivityType } from '../types';
import { MagicWandIcon } from './Icons';

interface PromptInputProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  onGenerate: () => void;
  onSuggest: () => void;
  isLoading: boolean;
  isSuggesting: boolean;
  activityType: ActivityType;
}

const PROMPT_PLACEHOLDERS: Record<ActivityType, string> = {
    [ActivityType.Coloring]: "um dinossauro feliz andando de skate...",
    [ActivityType.Story]: "um gatinho corajoso que queria voar...",
    [ActivityType.FunFact]: "por que o céu é azul?...",
};

const PromptInput: React.FC<PromptInputProps> = ({ prompt, setPrompt, onGenerate, onSuggest, isLoading, isSuggesting, activityType }) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onGenerate();
    }
  };

  const showSpinner = isLoading || isSuggesting;

  return (
    <div className="flex flex-col sm:flex-row items-stretch gap-3">
       <div className="relative flex-grow">
        <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={PROMPT_PLACEHOLDERS[activityType]}
            disabled={showSpinner}
            className="w-full h-full p-4 text-lg border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-sky-400 transition-shadow duration-200 disabled:bg-slate-100"
        />
        <button
            onClick={onSuggest}
            disabled={showSpinner}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-yellow-300 text-yellow-800 hover:bg-yellow-400 transition-all transform hover:scale-110 disabled:bg-slate-300 disabled:text-slate-500 disabled:cursor-not-allowed"
            aria-label="Surpreenda-me com uma ideia"
        >
            <MagicWandIcon />
        </button>
       </div>
      <button
        onClick={onGenerate}
        disabled={showSpinner || !prompt.trim()}
        className="px-8 py-4 bg-orange-500 text-white font-bold text-lg rounded-lg shadow-md hover:bg-orange-600 transition-all duration-200 disabled:bg-slate-400 disabled:cursor-not-allowed transform hover:scale-105 disabled:scale-100 flex items-center justify-center gap-2 border-b-4 border-orange-700 active:border-b-2 active:scale-100"
      >
        {showSpinner ? (
            <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Gerando...
            </>
        ) : (
            'Criar Magia!'
        )}
      </button>
    </div>
  );
};

export default PromptInput;