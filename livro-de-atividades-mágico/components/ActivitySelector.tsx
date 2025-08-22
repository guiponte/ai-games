import React from 'react';
import { ActivityType } from '../types';
import { ColoringIcon, StoryIcon, FunFactIcon } from './Icons';

interface ActivitySelectorProps {
  selectedActivity: ActivityType;
  onSelectActivity: (activity: ActivityType) => void;
}

const ActivityButton: React.FC<{
  label: string;
  icon: React.ReactNode;
  isSelected: boolean;
  onClick: () => void;
}> = ({ label, icon, isSelected, onClick }) => {
  const baseClasses = "flex-1 flex flex-col sm:flex-row items-center justify-center gap-2 p-3 rounded-xl font-semibold text-lg transition-all duration-200 transform border-b-4 active:border-b-2 active:scale-100";
  const selectedClasses = "bg-sky-500 text-white border-sky-700 shadow-lg scale-105";
  const unselectedClasses = "bg-white/80 text-sky-800 border-sky-200/80 hover:bg-white hover:scale-105 hover:border-sky-300";

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${isSelected ? selectedClasses : unselectedClasses}`}
      aria-pressed={isSelected}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
};

const ActivitySelector: React.FC<ActivitySelectorProps> = ({ selectedActivity, onSelectActivity }) => {
  return (
    <div className="bg-white/40 backdrop-blur-sm p-2 rounded-2xl shadow-inner">
        <div className="flex flex-col sm:flex-row gap-2">
        <ActivityButton
            label="Colorir"
            icon={<ColoringIcon />}
            isSelected={selectedActivity === ActivityType.Coloring}
            onClick={() => onSelectActivity(ActivityType.Coloring)}
        />
        <ActivityButton
            label="Contar História"
            icon={<StoryIcon />}
            isSelected={selectedActivity === ActivityType.Story}
            onClick={() => onSelectActivity(ActivityType.Story)}
        />
        <ActivityButton
            label="Fato Divertido"
            icon={<FunFactIcon />}
            isSelected={selectedActivity === ActivityType.FunFact}
            onClick={() => onSelectActivity(ActivityType.FunFact)}
        />
        </div>
    </div>
  );
};

export default ActivitySelector;