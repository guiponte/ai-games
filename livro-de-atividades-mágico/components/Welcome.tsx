
import React from 'react';
import { ActivityType } from '../types';
import { IdeaIcon } from './Icons';

interface WelcomeProps {
    activityType: ActivityType;
}

const WELCOME_MESSAGES: Record<ActivityType, { title: string; description: string }> = {
    [ActivityType.Coloring]: {
        title: "Pronto para Colorir?",
        description: "Digite o que você quer desenhar na caixa acima, como 'um leão corajoso' ou 'um castelo nas nuvens', e vamos criar uma página para você colorir!"
    },
    [ActivityType.Story]: {
        title: "Que História Vamos Criar?",
        description: "Digite uma ideia para uma história, como 'um robô amigo' ou 'uma fada que perdeu sua varinha', e vamos inventar uma aventura juntos!"
    },
    [ActivityType.FunFact]: {
        title: "O que Você Quer Descobrir?",
        description: "Pergunte sobre qualquer coisa que te deixe curioso, como 'estrelas', 'formigas' ou 'vulcões', e vamos encontrar um fato super legal para você!"
    }
};


const Welcome: React.FC<WelcomeProps> = ({ activityType }) => {
    const { title, description } = WELCOME_MESSAGES[activityType];
    return (
        <div className="text-center text-slate-500 p-8 flex flex-col items-center justify-center h-full">
            <IdeaIcon />
            <h2 className="text-2xl font-bold text-slate-700 mt-4">{title}</h2>
            <p className="mt-2 max-w-md">{description}</p>
        </div>
    );
};

export default Welcome;
