
import React from 'react';

interface StoryPageProps {
  story: string | null;
}

const StoryPage: React.FC<StoryPageProps> = ({ story }) => {
  if (!story) {
    return null;
  }

  return (
    <div className="w-full max-w-2xl text-center flex flex-col items-center p-4">
        <h2 className="text-2xl font-bold text-sky-700 mb-4">Era uma vez...</h2>
        <div className="bg-white p-6 rounded-lg shadow-md border-2 border-gray-200">
            <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-wrap">{story}</p>
        </div>
    </div>
  );
};

export default StoryPage;
