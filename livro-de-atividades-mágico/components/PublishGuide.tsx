
import React, { useState } from 'react';
import { CopyIcon } from './Icons';

interface PublishGuideProps {
  isOpen: boolean;
  onClose: () => void;
}

const CodeBlock: React.FC<{ command: string }> = ({ command }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(command).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    return (
        <div className="relative">
            <pre className="bg-gray-800 text-white p-3 pr-20 rounded-md overflow-x-auto text-sm my-2 font-mono">
                <code>{command}</code>
            </pre>
            <button
                onClick={handleCopy}
                className="absolute top-2 right-2 p-2 rounded-md bg-gray-600 text-gray-200 hover:bg-gray-500 transition-colors text-xs flex items-center gap-1"
                aria-label="Copiar comando"
            >
                <CopyIcon />
                {copied ? 'Copiado!' : 'Copiar'}
            </button>
        </div>
    );
};

const Step: React.FC<{ number: string; title: string; children: React.ReactNode }> = ({ number, title, children }) => (
    <div className="bg-white/70 backdrop-blur-sm p-5 rounded-xl shadow-md border border-white/30">
        <h3 className="text-xl font-bold text-sky-800 mb-3">
            <span className="bg-sky-500 text-white rounded-full w-8 h-8 inline-flex items-center justify-center mr-3 font-lilita text-2xl">{number}</span>
            {title}
        </h3>
        <div className="pl-11 space-y-3">{children}</div>
    </div>
);


const PublishGuide: React.FC<PublishGuideProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-50 flex justify-center items-center p-4 animate-fade-in"
            onClick={onClose}
            aria-modal="true"
            role="dialog"
        >
            <div 
                className="bg-gradient-to-br from-sky-50 to-indigo-100 rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 border border-white/50"
                onClick={e => e.stopPropagation()}
            >
                <div className="flex justify-between items-start mb-4">
                    <h2 className="text-3xl font-bold text-sky-600 font-lilita tracking-wider">Sua Jornada para a Play Store</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors" aria-label="Fechar">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                
                <div className="space-y-6 text-gray-700">
                    <p>Publicar seu app é um grande passo! Este guia vai te levar pelo processo de transformar este site em um aplicativo de verdade. Primeiro, vamos garantir que você tem tudo o que precisa.</p>
                    
                    <Step number="0" title="Preparando o Terreno (Pré-requisitos)">
                        <p>Antes de começar, precisamos de 3 coisas essenciais. Sem elas, os próximos passos não funcionarão.</p>
                        <div className="space-y-4 pt-2">
                            <div>
                                <h4 className="font-bold text-sky-700">1. Ferramentas de Construção (Node.js e JDK)</h4>
                                <p className="text-sm">O Bubblewrap (nossa 'fábrica' de apps) precisa do <strong>Node.js</strong> para rodar e do <strong>Java Development Kit (JDK)</strong> para construir o aplicativo Android. Se ainda não os tiver, é só baixar e instalar:</p>
                                <ul className="list-disc list-inside pl-2 mt-1 text-sm">
                                    <li><a href="https://nodejs.org/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Baixar Node.js</a> (recomendo a versão LTS)</li>
                                    <li><a href="https://www.google.com/search?q=download+openjdk" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Baixar o JDK</a> (OpenJDK é uma ótima opção gratuita)</li>
                                </ul>
                            </div>
                             <div>
                                <h4 className="font-bold text-sky-700">2. Seu Site Online (com HTTPS)</h4>
                                <p className="text-sm">Para o Bubblewrap funcionar, este site precisa estar publicado na internet com um endereço seguro (aquele com cadeado <code className="text-xs">https://</code>). É este site que o aplicativo vai mostrar.</p>
                                <p className="text-sm bg-indigo-100 p-2 rounded-lg mt-1"><strong>Não publicou ainda?</strong> Existem serviços gratuitos e fáceis de usar como <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-600 hover:underline">Vercel</a>, <a href="https://netlify.com" target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-600 hover:underline">Netlify</a> ou <a href="https://pages.github.com/" target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-600 hover:underline">GitHub Pages</a>.</p>
                            </div>
                             <div>
                                <h4 className="font-bold text-sky-700">3. Conta de Desenvolvedor Google Play</h4>
                                <p className="text-sm">Para colocar seu app na loja oficial do Android, você precisa se registrar como desenvolvedor. O Google cobra uma taxa única de registro de $25.</p>
                                 <ul className="list-disc list-inside pl-2 mt-1 text-sm">
                                    <li><a href="https://play.google.com/console/signup" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Criar sua conta de desenvolvedor</a></li>
                                </ul>
                            </div>
                        </div>
                    </Step>

                    <Step number="1" title="Instale a 'Fábrica' de Apps">
                        <p>Com os pré-requisitos prontos, vamos instalar a ferramenta do Google chamada <strong>Bubblewrap</strong>. Pense nela como a fábrica que coloca seu site dentro de uma "caixa" de aplicativo Android.</p>
                        <p>Abra o terminal do seu computador (se estiver no Windows, pode ser o 'Prompt de Comando' ou 'PowerShell') e cole o comando abaixo para instalar:</p>
                        <CodeBlock command="npm install -g @bubblewrap/cli" />
                    </Step>

                    <Step number="2" title="Crie o Projeto do seu App">
                        <p>No terminal, navegue até a pasta onde está o código do seu projeto e execute o comando abaixo, <strong className="text-sky-700">substituindo o link de exemplo pelo link real do seu site</strong>:</p>
                        <CodeBlock command="bubblewrap init --manifest https://seu-site.com/manifest.json" />
                        <p className="mt-2 text-sm bg-indigo-100 p-3 rounded-lg">A ferramenta fará perguntas. A mais importante é o "Application ID" (ou ID do Pacote). Use um formato como `br.com.seunome.livromagico`. Ela também criará uma "chave de assinatura". <strong className="text-red-600">Guarde essa chave e a senha em um lugar MUITO seguro! Você precisará dela para todas as atualizações futuras.</strong></p>
                    </Step>

                    <Step number="3" title="Prove que o Site é Seu">
                        <p>Este é o passo mais importante para que seu app pareça profissional (sem a barra de endereço do navegador).</p>
                        <div className="mt-2 p-3 bg-yellow-100 border-l-4 border-yellow-400 text-yellow-800">
                           <strong>Por que isso é importante?</strong>
                           <p className="text-sm">Isso cria uma ligação de confiança entre seu site e seu app. O Google só remove a barra de endereço se tiver certeza que o dono do app é o mesmo dono do site.</p>
                        </div>
                        <p>1. O Bubblewrap vai te mostrar uma "impressão digital SHA-256" no final do passo 2. Copie essa linha de código estranha.</p>
                        <p>2. No seu projeto, crie uma pasta chamada `.well-known` e, dentro dela, um arquivo chamado `assetlinks.json`.</p>
                        <p>3. Cole o texto abaixo nesse arquivo, substituindo os textos em maiúsculas:</p>
                         <CodeBlock command={`[{
  "relation": ["delegate_permission/common.handle_all_urls"],
  "target": {
    "namespace": "android_app",
    "package_name": "COLOQUE_SEU_ID_DE_PACOTE_AQUI",
    "sha256_cert_fingerprints":
    ["COLOQUE_SUA_IMPRESSAO_DIGITAL_SHA256_AQUI"]
  }
}]`} />
                         <p className="mt-2 text-sm">Depois de colocar este arquivo no seu site, o link `https://seu-site.com/.well-known/assetlinks.json` deve funcionar.</p>
                    </Step>

                    <Step number="4" title="Construa o Arquivo Final">
                        <p>Agora que tudo está configurado, vamos mandar a "fábrica" construir o seu app. Execute este comando no terminal:</p>
                        <CodeBlock command="bubblewrap build" />
                        <p className="mt-2">Isso vai gerar um arquivo chamado <code className="text-sm bg-gray-200 p-1 rounded">app-release.aab</code>. <strong>Este é o arquivo que você enviará para a Play Store.</strong></p>
                    </Step>

                     <Step number="5" title="Envie para a Play Store!">
                        <p>A parte final! Você precisará de uma conta de desenvolvedor no Google Play (há uma taxa única de $25).</p>
                        <p>1. Acesse o <a href="https://play.google.com/console" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-semibold">Google Play Console</a>.</p>
                        <p>2. Siga os passos para "Criar app", preenchendo o nome, descrição, adicionando ícones e capturas de tela.</p>
                        <p>3. Na seção de "Produção", crie uma "nova versão" e faça o upload do seu arquivo <code className="text-sm bg-gray-200 p-1 rounded">app-release.aab</code>.</p>
                        <p>4. Preencha o resto das informações que a página pedir e envie para revisão. Em alguns dias, seu app estará no ar!</p>
                    </Step>
                </div>
                
                <div className="mt-8 text-center">
                    <button 
                        onClick={onClose}
                        className="px-8 py-3 bg-sky-500 text-white font-bold text-lg rounded-lg shadow-md hover:bg-sky-600 transition-all duration-200 transform hover:scale-105 border-b-4 border-sky-700 active:border-b-2 active:scale-100"
                    >
                        Entendi, vou tentar!
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PublishGuide;
