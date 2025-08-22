import React, { useState, useCallback } from 'react';
import { ActivityType, Source } from './types';
import { generateImage, generateStory, findFunFact, generateIdea } from './services/geminiService';
import Header from './components/Header';
import ActivitySelector from './components/ActivitySelector';
import PromptInput from './components/PromptInput';
import ColoringPage from './components/ColoringPage';
import StoryPage from './components/StoryPage';
import FunFactPage from './components/FunFactPage';
import LoadingSpinner from './components/LoadingSpinner';
import Welcome from './components/Welcome';

function App() {
  const [activityType, setActivityType] = useState<ActivityType>(ActivityType.Coloring);
  const [prompt, setPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuggesting, setIsSuggesting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedContent, setGeneratedContent] = useState<string | null>(null);
  const [sources, setSources] = useState<Source[]>([]);
  const [contentId, setContentId] = useState<number>(0);

  const handleGenerate = useCallback(async () => {
    if (!prompt.trim() || isLoading) return;

    setIsLoading(true);
    setError(null);
    setGeneratedContent(null);
    setSources([]);

    try {
      if (activityType === ActivityType.Coloring) {
        const imageB64 = await generateImage(prompt);
        setGeneratedContent(`data:image/png;base64,${imageB64}`);
      } else if (activityType === ActivityType.Story) {
        const story = await generateStory(prompt);
        setGeneratedContent(story);
      } else if (activityType === ActivityType.FunFact) {
        const result = await findFunFact(prompt);
        setGeneratedContent(result.fact);
        setSources(result.sources);
      }
      setContentId(prevId => prevId + 1); // Update key to re-trigger animation
    } catch (err) {
      console.error(err);
      setError('Oops! Algo deu errado. Por favor, tente novamente.');
    } finally {
      setIsLoading(false);
    }
  }, [prompt, isLoading, activityType]);
  
  const handleSuggest = useCallback(async () => {
    setIsSuggesting(true);
    setError(null);
    try {
        const idea = await generateIdea(activityType);
        setPrompt(idea);
    } catch (err) {
        console.error(err);
        setError('Não foi possível gerar uma ideia. Tente novamente.');
    } finally {
        setIsSuggesting(false);
    }
  }, [activityType]);

  const renderContent = () => {
    if (isLoading || isSuggesting) {
      return <div className="flex justify-center items-center h-full"><LoadingSpinner /></div>;
    }
    if (error) {
      return <div className="text-center text-red-500 font-medium p-4">{error}</div>;
    }
    if (!generatedContent) {
        return <Welcome activityType={activityType} />;
    }

    switch (activityType) {
      case ActivityType.Coloring:
        return <ColoringPage image={generatedContent} />;
      case ActivityType.Story:
        return <StoryPage story={generatedContent} />;
      case ActivityType.FunFact:
        return <FunFactPage fact={generatedContent} sources={sources} />;
      default:
        return null;
    }
  };
  
  const handleSelectActivity = (type: ActivityType) => {
    setActivityType(type);
    setPrompt('');
    setError(null);
    setGeneratedContent(null);
    setSources([]);
    setContentId(0);
  }

  return (
    <div className="min-h-screen text-gray-800 flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-4xl mx-auto">
        <Header />
        <main className="mt-6">
          <ActivitySelector 
            selectedActivity={activityType} 
            onSelectActivity={handleSelectActivity}
          />
          <div className="mt-6 bg-white/70 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-white/30">
            <PromptInput
              prompt={prompt}
              setPrompt={setPrompt}
              onGenerate={handleGenerate}
              onSuggest={handleSuggest}
              isLoading={isLoading}
              isSuggesting={isSuggesting}
              activityType={activityType}
            />
            <div className="mt-6 min-h-[400px] bg-white/50 backdrop-blur-sm rounded-xl p-4 flex justify-center items-center border border-white/20 shadow-inner">
             {generatedContent && !isLoading && !isSuggesting ? (
                <div key={contentId} className="w-full h-full flex justify-center items-center animate-fade-in">
                    {renderContent()}
                </div>
             ) : (
                renderContent()
             )}
            </div>
          </div>
        </main>
      </div>
       <footer className="text-center py-6 mt-8 text-sm text-indigo-100 font-medium">
        <p>Cria e diverte-te com Ai</p>
      </footer>
    </div>
  );
}

export default App;