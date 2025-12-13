
import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowRight, User, Briefcase, Map, Layout, Zap, 
  MessageSquare, Settings, Award, Code, Linkedin, 
  Github, Globe, CheckCircle, Lock, PlayCircle, BookOpen, Star, Menu, X, LogOut, Search,
  Users, Newspaper, Rocket, Heart, Send, ExternalLink, Smile, ChevronLeft, Moon, Sun, Bell, Shield, Info, LogIn, Mail, DollarSign, Sparkles, Copy, ThumbsUp, ThumbsDown, AlertTriangle, GraduationCap, RefreshCw, Bot, PenTool, LayoutTemplate, Layers, AlertCircle, Terminal, FileCode, Link as LinkIcon
} from 'lucide-react';
import { 
  TRANSLATIONS, MOCK_JOBS, MOCK_POSTS, MOCK_NEWS, MOCK_MENTORS, 
  getAchievements, getFallbackRoadmap, PROJECT_GUIDES, DAILY_TIPS, CHAT_INITIAL_MESSAGES,
  PORTFOLIO_CHECKLIST, PORTFOLIO_TIPS, PORTFOLIO_STEPS, COMMON_ERRORS, RECOMMENDED_PROJECTS_BY_LEVEL, USEFUL_LINKS
} from './constants';
import { Language, AppScreen, UserProfile, RoadmapItem, Post, Job, ChatMessage, ProjectGuide, Theme, PortfolioAnalysisResult, CommunityTopic, Achievement } from './types';
import { Button, Card, Input, NavItem, Badge, Toast, VideoPlayer, StepCard, CheckboxList } from './components/UI';
import { generatePersonalizedRoadmap, getChatResponse, analyzeProjectUrl, getAIJobRecommendations } from './services/geminiService';

// --- Helper Components ---

const Logo = () => (
  <div className="flex items-center gap-2">
    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-tr from-neonBlue to-softPurple flex items-center justify-center">
      <div className="w-3 h-3 md:w-4 md:h-4 bg-white rounded-full"></div>
    </div>
    <span className="text-xl md:text-2xl font-bold tracking-tight text-lightText dark:text-darkText">TechPath</span>
  </div>
);

const ProgressBar = ({ progress }: { progress: number }) => (
  <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-3 overflow-hidden">
    <div 
      className="bg-gradient-to-r from-neonBlue to-softPurple h-full transition-all duration-500" 
      style={{ width: `${progress}%` }}
    ></div>
  </div>
);

// --- Logic Helpers ---

const getInitialLanguage = (): Language => {
  // 1. Check Local Storage (User Preference Persistence)
  try {
    const savedLang = localStorage.getItem('techpath-language');
    if (savedLang && Object.values(Language).includes(savedLang as Language)) {
      return savedLang as Language;
    }
  } catch (e) {
    console.error("Error accessing local storage for language", e);
  }

  // 2. Check Browser Language (Auto-detection)
  const browserLang = navigator.language.split('-')[0].toLowerCase();
  if (browserLang === 'en') return Language.EN;
  if (browserLang === 'es') return Language.ES;

  // 3. Default Fallback
  return Language.PT;
};


// --- Isolated Components ---

const LoginScreen = ({ t, onLogin, onNavigate, isLoading }: { t: any, onLogin: (p: string) => void, onNavigate: (s: AppScreen) => void, isLoading: boolean }) => (
    <div className="min-h-screen bg-lightBg dark:bg-darkBg flex items-center justify-center p-4 transition-colors">
       <Card className="w-full max-w-md p-8 animate-in fade-in zoom-in duration-300">
         <div className="flex justify-center mb-6"><Logo /></div>
         <h2 className="text-2xl font-bold text-center mb-2 text-lightText dark:text-darkText">{t.login}</h2>
         <p className="text-center text-gray-500 mb-8">{t.welcome}</p>
         
         <div className="space-y-4">
            <Input placeholder={t.emailPlaceholder} />
            <Input type="password" placeholder={t.passwordPlaceholder} />
            <Button fullWidth onClick={() => onLogin('Email')} disabled={isLoading}>{isLoading ? 'Carregando...' : t.login}</Button>
            
            <div className="relative my-6">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-300 dark:border-gray-700"></div></div>
                <div className="relative flex justify-center text-sm"><span className="px-2 bg-lightBg dark:bg-darkSurface text-gray-500">Ou continue com</span></div>
            </div>

            <div className="grid grid-cols-3 gap-3">
               <Button variant="secondary" onClick={() => onLogin('Google')}><Globe size={20}/></Button>
               <Button variant="secondary" onClick={() => onLogin('LinkedIn')}><Linkedin size={20}/></Button>
               <Button variant="secondary" onClick={() => onLogin('GitHub')}><Github size={20}/></Button>
            </div>
         </div>
         <p className="mt-8 text-center text-sm text-gray-500">
            {t.createAccountTitle}? <button onClick={() => onNavigate(AppScreen.CREATE_ACCOUNT)} className="text-neonBlue font-bold hover:underline">{t.createAccount}</button>
         </p>
       </Card>
    </div>
);

const CreateAccountScreen = ({ t, onCreate, onNavigate, isLoading }: { t: any, onCreate: (p: string) => void, onNavigate: (s: AppScreen) => void, isLoading: boolean }) => (
    <div className="min-h-screen bg-lightBg dark:bg-darkBg flex items-center justify-center p-4 transition-colors">
       <Card className="w-full max-w-md p-8 animate-in fade-in zoom-in duration-300">
         <div className="flex justify-center mb-6"><Logo /></div>
         <h2 className="text-2xl font-bold text-center mb-2 text-lightText dark:text-darkText">{t.createAccount}</h2>
         
         <div className="space-y-4">
            <Input placeholder={t.namePlaceholder} />
            <Input placeholder={t.emailPlaceholder} />
            <Input type="password" placeholder={t.passwordPlaceholder} />
            <Button fullWidth onClick={() => onCreate('Email')} disabled={isLoading}>{isLoading ? 'Criando...' : t.createAccount}</Button>
         </div>
         <p className="mt-8 text-center text-sm text-gray-500">
            {t.alreadyHaveAccount} <button onClick={() => onNavigate(AppScreen.LOGIN)} className="text-neonBlue font-bold hover:underline">{t.login}</button>
         </p>
       </Card>
    </div>
);

const DiagnosisScreen = ({ t, answers, setAnswers, onSubmit, isLoading }: { t: any, answers: any, setAnswers: any, onSubmit: () => void, isLoading: boolean }) => {
    
    const goalOptions = [
        { 
            id: 'estagio', 
            label: 'Vaga de Estágio', 
            desc: 'Para quem nunca trabalhou na área e busca iniciar a carreira.',
            icon: GraduationCap 
        },
        { 
            id: 'junior', 
            label: 'Vaga Júnior', 
            desc: 'Para quem já tem base e quer a primeira vaga CLT/Dev Jr.',
            icon: Briefcase 
        },
        { 
            id: 'trainee', 
            label: 'Trainee', 
            desc: 'Para formação acelerada dentro da empresa.',
            icon: Rocket 
        },
        { 
            id: 'estudar', 
            label: 'Apenas Estudar', 
            desc: 'Para quem quer aprender sem buscar vaga no momento.',
            icon: BookOpen 
        },
        { 
            id: 'transicao', 
            label: 'Transição de Carreira', 
            desc: 'Para quem vem de outra área e quer migrar para tecnologia.',
            icon: RefreshCw 
        }
    ];

    return (
    <div className="min-h-screen bg-lightBg dark:bg-darkBg flex items-center justify-center p-4 transition-colors">
       <div className="max-w-3xl w-full space-y-8 animate-in slide-in-from-bottom-10 duration-500 py-10">
          <div className="text-center">
             <Logo />
             <h2 className="text-3xl font-bold mt-4 mb-2 text-lightText dark:text-darkText">{t.diagnosisTitle}</h2>
             <p className="text-gray-500">Responda 3 perguntas rápidas para a IA criar seu plano.</p>
          </div>

          <Card className="space-y-8 p-6 md:p-8">
             {/* Question 1 */}
             <div>
                <label className="block text-lg font-bold mb-4 text-lightText dark:text-darkText">{t.q1}</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                   {['Nunca', 'Básico', 'Intermediário'].map(opt => (
                      <div key={opt} onClick={() => setAnswers({...answers, q1: opt})} className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center justify-center md:justify-start ${answers.q1 === opt ? 'border-neonBlue bg-neonBlue/10 text-neonBlue dark:bg-neonBlue/20' : 'border-lightBorder dark:border-gray-700 hover:border-gray-400 text-gray-600 dark:text-gray-300'}`}>
                         <span className="font-medium">{opt}</span>
                      </div>
                   ))}
                </div>
             </div>

             {/* Question 2 */}
             <div>
                <label className="block text-lg font-bold mb-4 text-lightText dark:text-darkText">{t.q2} <span className="text-neonBlue">({answers.q2}h)</span></label>
                <Input type="range" min="1" max="40" value={answers.q2} onChange={(e) => setAnswers({...answers, q2: e.target.value})} />
                <div className="flex justify-between text-xs text-gray-500 mt-2"><span>1h/semana</span><span>40h/semana</span></div>
             </div>

             {/* Question 3 */}
             <div>
                <label className="block text-lg font-bold mb-4 text-lightText dark:text-darkText">{t.q3}</label>
                <div className="grid grid-cols-1 gap-3">
                   {goalOptions.map((goal) => (
                      <div 
                        key={goal.id} 
                        onClick={() => setAnswers({...answers, q3: goal.label})} 
                        className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center gap-4 group
                            ${answers.q3 === goal.label 
                                ? 'border-neonBlue bg-neonBlue/5 text-neonBlue dark:bg-neonBlue/20' 
                                : 'border-lightBorder dark:border-gray-700 hover:border-gray-400 bg-white dark:bg-darkSurface text-gray-600 dark:text-gray-300'
                            }`}
                      >
                         <div className={`p-3 rounded-full transition-colors ${answers.q3 === goal.label ? 'bg-neonBlue text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-500 group-hover:bg-gray-200 dark:group-hover:bg-gray-700'}`}>
                            <goal.icon size={24} />
                         </div>
                         <div className="flex-1">
                            <h4 className={`font-bold text-lg ${answers.q3 === goal.label ? 'text-neonBlue' : 'text-gray-900 dark:text-white'}`}>{goal.label}</h4>
                            <p className="text-sm opacity-80 mt-0.5">{goal.desc}</p>
                         </div>
                         {answers.q3 === goal.label && <CheckCircle className="text-neonBlue" size={24} />}
                      </div>
                   ))}
                </div>
             </div>

             <Button fullWidth size="lg" onClick={onSubmit} disabled={!answers.q1 || !answers.q3 || isLoading}>
                {isLoading ? <span className="flex items-center gap-2"><Sparkles className="animate-spin"/> {t.generating}</span> : t.genRoadmap}
             </Button>
          </Card>
       </div>
    </div>
    );
};

const CommunityScreen = ({ 
    posts, 
    user, 
    onPostSubmit, 
    t, 
    showToast 
}: { 
    posts: Post[], 
    user: UserProfile | null, 
    onPostSubmit: (topic: CommunityTopic, content: string) => void, 
    t: any, 
    showToast: (msg: string) => void 
}) => {
    const [selectedTopic, setSelectedTopic] = useState<CommunityTopic | 'Todos'>('Todos');
    const [newPostContent, setNewPostContent] = useState("");
    const [localPosts, setLocalPosts] = useState(posts);

    useEffect(() => {
        setLocalPosts(posts);
    }, [posts]);

    const filteredPosts = selectedTopic === 'Todos' 
        ? localPosts 
        : localPosts.filter(p => p.topic === selectedTopic);

    const handleLocalLike = (id: string) => {
        setLocalPosts(prev => prev.map(p => p.id === id ? { ...p, likes: p.likes + 1 } : p));
    };

    const handlePublish = () => {
        if (!newPostContent.trim()) return;
        const topicToUse = selectedTopic === 'Todos' ? 'Compartilhamentos' : selectedTopic as CommunityTopic;
        onPostSubmit(topicToUse, newPostContent);
        setNewPostContent("");
    };

    return (
     <div className="max-w-2xl mx-auto space-y-6">
        <h2 className="text-3xl font-bold text-lightText dark:text-darkText">{t.community}</h2>
        
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
            {['Todos', 'Dúvidas', 'Projetos', 'Compartilhamentos', 'Vagas'].map(topic => (
                <button 
                    key={topic}
                    onClick={() => setSelectedTopic(topic as any)}
                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors border flex-shrink-0 ${selectedTopic === topic ? 'bg-neonBlue border-neonBlue text-white' : 'bg-lightBg dark:bg-darkSurface border-lightBorder dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
                >
                    {topic}
                </button>
            ))}
        </div>

        <Card className="p-4 border-2 border-dashed border-gray-300 dark:border-gray-700">
           <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-neonBlue flex items-center justify-center text-white font-bold flex-shrink-0">{user?.avatar}</div>
              <div className="flex-1">
                 <textarea 
                    className="w-full bg-transparent border-none resize-none focus:ring-0 text-gray-900 dark:text-white placeholder-gray-500 text-base"
                    placeholder={`Escreva algo sobre ${selectedTopic === 'Todos' ? 'Tecnologia' : selectedTopic}...`}
                    rows={3}
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                 />
                 <div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-100 dark:border-gray-800">
                    <div className="flex gap-2 text-gray-400">
                       <button className="hover:text-neonBlue"><Layout size={18}/></button>
                       <button className="hover:text-neonBlue"><Smile size={18}/></button>
                    </div>
                    <Button size="sm" onClick={handlePublish} disabled={!newPostContent.trim()}>Publicar</Button>
                 </div>
              </div>
           </div>
        </Card>

        <div className="space-y-4 pb-20">
           {filteredPosts.map(post => (
              <Card key={post.id}>
                 <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center font-bold text-gray-500">
                        {post.author[0]}
                        </div>
                        <div>
                        <p className="font-bold text-sm text-lightText dark:text-darkText">{post.author}</p>
                        <p className="text-xs text-gray-500">{post.role} • {post.timestamp}</p>
                        </div>
                    </div>
                    <Badge color="bg-gray-500">{post.topic}</Badge>
                 </div>
                 <p className="text-gray-800 dark:text-gray-200 mb-4 whitespace-pre-wrap">{post.content}</p>
                 <div className="flex justify-between items-center text-gray-500 text-sm">
                    <div className="flex gap-6">
                        <button onClick={() => handleLocalLike(post.id)} className="flex items-center gap-1 hover:text-red-500 transition-colors">
                        <Heart size={18} className={post.likes > 0 ? 'fill-red-500 text-red-500' : ''}/> {post.likes}
                        </button>
                        <button className="flex items-center gap-1 hover:text-neonBlue transition-colors">
                        <MessageSquare size={18}/> {post.comments}
                        </button>
                    </div>
                    <button onClick={() => showToast("Conteúdo denunciado para análise.")} className="text-gray-400 hover:text-red-500" title="Denunciar">
                        <AlertTriangle size={16}/>
                    </button>
                 </div>
              </Card>
           ))}
        </div>
     </div>
    );
};

const AIChatScreen = ({ 
  messages, 
  onSendMessage, 
  t 
}: { 
  messages: ChatMessage[], 
  onSendMessage: (text: string) => void, 
  t: any 
}) => {
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;
    onSendMessage(inputValue);
    setInputValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-140px)] flex flex-col animate-in fade-in duration-300">
      <div className="mb-4">
        <h2 className="text-3xl font-bold text-lightText dark:text-darkText">{t.chatTitle}</h2>
        <p className="text-gray-500">Seu mentor virtual para dúvidas de carreira e código.</p>
      </div>

      <Card className="flex-1 flex flex-col overflow-hidden p-0 border-lightBorder dark:border-gray-700 bg-white dark:bg-darkSurface">
        <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar bg-gray-50 dark:bg-black/20">
          {messages.length === 0 && (
             <div className="flex flex-col items-center justify-center h-full text-gray-400">
                <Bot size={48} className="mb-4 opacity-50"/>
                <p>Comece uma conversa...</p>
             </div>
          )}
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] md:max-w-[70%] p-4 rounded-2xl text-sm md:text-base shadow-sm ${
                msg.sender === 'user' 
                  ? 'bg-neonBlue text-white rounded-br-none' 
                  : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 rounded-bl-none'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 bg-white dark:bg-darkSurface border-t border-lightBorder dark:border-gray-700 flex gap-2 items-center">
          <div className="flex-1 relative">
            <input
              className="w-full bg-gray-100 dark:bg-gray-900 border border-transparent focus:border-neonBlue focus:ring-1 focus:ring-neonBlue rounded-xl px-4 py-3 text-lightText dark:text-darkText placeholder-gray-400 focus:outline-none transition-all"
              placeholder={t.chatPlaceholder}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
          <Button 
            onClick={handleSend} 
            disabled={!inputValue.trim()} 
            className="rounded-xl w-12 h-12 flex items-center justify-center p-0"
          >
            <Send size={20} className={inputValue.trim() ? "ml-1" : ""} />
          </Button>
        </div>
      </Card>
    </div>
  );
};

const PortfolioHubScreen = ({ t }: { t: any }) => {
  const [githubUser, setGithubUser] = useState("");
  const [loadingRepos, setLoadingRepos] = useState(false);
  const [repos, setRepos] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'Iniciante' | 'Júnior' | 'Transição'>('Iniciante');

  const handleGithubImport = () => {
    if (!githubUser) return;
    setLoadingRepos(true);
    setTimeout(() => {
      setRepos([
        "my-first-site",
        "todo-react-app",
        "weather-api-consumer",
        "techpath-clone"
      ]);
      setLoadingRepos(false);
    }, 1500);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-10 pb-20 animate-in fade-in slide-in-from-bottom-5 duration-500">
      
      <div className="text-center space-y-4">
         <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neonBlue to-softPurple">
            Hub de Portfólio Profissional
         </h1>
         <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            O portfólio é a sua vitrine. Aqui você tem todas as ferramentas para transformar código em oportunidades de carreira.
         </p>
      </div>

      <Card className="border-l-4 border-l-neonBlue">
         <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-neonBlue/10 rounded-lg"><CheckCircle className="text-neonBlue" size={24}/></div>
            <h2 className="text-2xl font-bold">Checklist do Portfólio Ideal</h2>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
            <CheckboxList items={PORTFOLIO_CHECKLIST} />
         </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
           <h2 className="text-2xl font-bold flex items-center gap-2"><Sparkles className="text-yellow-500"/> Dicas de Recrutadores</h2>
           <div className="space-y-4">
              {PORTFOLIO_TIPS.map((tip, i) => (
                 <Card key={i} className="hover:border-yellow-500/50 transition-colors">
                    <h4 className="font-bold text-lg mb-1">{tip.title}</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">{tip.text}</p>
                 </Card>
              ))}
           </div>
        </div>

        <div className="space-y-4">
           <h2 className="text-2xl font-bold flex items-center gap-2 text-red-500"><AlertTriangle/> Erros que Eliminam</h2>
           <Card className="bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-900/30">
              <ul className="space-y-3">
                 {COMMON_ERRORS.map((err, i) => (
                    <li key={i} className="flex gap-3 items-start text-red-700 dark:text-red-300">
                       <X size={18} className="mt-1 flex-shrink-0"/>
                       <span>{err}</span>
                    </li>
                 ))}
              </ul>
           </Card>
           
           <h2 className="text-2xl font-bold flex items-center gap-2 mt-8"><LayoutTemplate className="text-purple-500"/> Templates Visuais</h2>
           <div className="grid grid-cols-2 gap-3">
              {['Minimalista', 'Moderno', 'Backend Focus', 'Frontend Creative'].map(tpl => (
                 <div key={tpl} className="h-24 rounded-xl bg-gray-200 dark:bg-gray-800 flex items-center justify-center border border-dashed border-gray-400 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors">
                    <span className="text-xs font-bold text-gray-500">{tpl}</span>
                 </div>
              ))}
           </div>
        </div>
      </div>

      <div className="space-y-6">
         <h2 className="text-2xl font-bold flex items-center gap-2"><Map className="text-green-500"/> Passo a Passo: Do Zero ao Deploy</h2>
         <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {PORTFOLIO_STEPS.map((step, i) => (
               <Card key={i} className="relative overflow-hidden group hover:-translate-y-1 transition-transform">
                  <div className="absolute top-0 right-0 p-4 opacity-10 font-bold text-6xl text-gray-500">{i + 1}</div>
                  <h4 className="font-bold text-lg mb-2 relative z-10">{step.title}</h4>
                  <p className="text-xs font-bold text-neonBlue mb-2 relative z-10">{step.desc}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 relative z-10">{step.inst}</p>
               </Card>
            ))}
         </div>
      </div>

      <Card className="bg-gradient-to-br from-gray-50 to-white dark:from-darkSurface dark:to-black">
         <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <div className="flex items-center gap-3">
               <div className="p-2 bg-purple-500/10 rounded-lg"><PenTool className="text-purple-500" size={24}/></div>
               <h2 className="text-2xl font-bold">Projetos Recomendados</h2>
            </div>
            <div className="flex gap-2 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
               {(['Iniciante', 'Júnior', 'Transição'] as const).map(tab => (
                  <button 
                     key={tab}
                     onClick={() => setActiveTab(tab)}
                     className={`px-4 py-2 rounded-md text-sm font-bold transition-colors ${activeTab === tab ? 'bg-white dark:bg-gray-700 shadow-sm text-neonBlue' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'}`}
                  >
                     {tab}
                  </button>
               ))}
            </div>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {RECOMMENDED_PROJECTS_BY_LEVEL[activeTab].map((proj, i) => (
               <Card 
                  key={i} 
                  onClick={() => window.open(proj.url, '_blank')}
                  className="cursor-pointer group hover:border-neonBlue transition-all flex flex-col h-full"
               >
                  <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <Globe className="text-neonBlue" size={20} />
                        <h4 className="font-bold text-lg leading-tight">{proj.title}</h4>
                      </div>
                      <ExternalLink size={16} className="text-gray-400 group-hover:text-neonBlue transition-colors" />
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 flex-1">{proj.description}</p>
                  
                  <p className="text-xs font-bold text-neonBlue mb-3 uppercase tracking-wide">
                      Explore projetos nesta plataforma
                  </p>

                  <div className="flex flex-wrap gap-2">
                      {proj.techStack.map(tech => (
                          <Badge key={tech} color="bg-gray-100 dark:bg-gray-800">{tech}</Badge>
                      ))}
                  </div>
               </Card>
            ))}
         </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         <Card>
            <div className="flex items-center gap-3 mb-4">
               <Github size={24}/>
               <h2 className="text-xl font-bold">Importar do GitHub</h2>
            </div>
            <div className="flex gap-2 mb-4">
               <Input 
                  placeholder="Seu usuário GitHub..." 
                  value={githubUser}
                  onChange={(e) => setGithubUser(e.target.value)}
               />
               <Button onClick={handleGithubImport} disabled={loadingRepos || !githubUser}>
                  {loadingRepos ? '...' : 'Buscar'}
               </Button>
            </div>
            {repos.length > 0 && (
               <div className="space-y-2 max-h-40 overflow-y-auto custom-scrollbar">
                  {repos.map(repo => (
                     <div key={repo} className="flex justify-between items-center p-2 rounded bg-gray-50 dark:bg-gray-800 text-sm">
                        <span>{repo}</span>
                        <button className="text-neonBlue hover:underline text-xs font-bold">+ Adicionar</button>
                     </div>
                  ))}
               </div>
            )}
         </Card>

         <Card>
             <div className="flex items-center gap-3 mb-4">
               <LinkIcon size={24} className="text-blue-500"/>
               <h2 className="text-xl font-bold">Links Essenciais</h2>
            </div>
            <div className="grid grid-cols-1 gap-2">
               {USEFUL_LINKS.map((link, i) => (
                  <Button 
                     key={i} 
                     variant="ghost" 
                     className="justify-between bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
                     onClick={() => window.open(link.url, '_blank')}
                  >
                     {link.name}
                     <ExternalLink size={14}/>
                  </Button>
               ))}
            </div>
         </Card>
      </div>

    </div>
  );
};

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>(AppScreen.LOGIN);
  const [language, setLanguage] = useState<Language>(getInitialLanguage);
  const [theme, setTheme] = useState<Theme>(Theme.DARK);
  const [user, setUser] = useState<UserProfile | null>(null);
  
  const [roadmap, setRoadmap] = useState<RoadmapItem[]>(getFallbackRoadmap(Language.PT));
  const [achievements, setAchievements] = useState<Achievement[]>(getAchievements(Language.PT));
  
  const [isLoading, setIsLoading] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(CHAT_INITIAL_MESSAGES);

  const [selectedTask, setSelectedTask] = useState<RoadmapItem | null>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectGuide | null>(null);
  const [dailyTip, setDailyTip] = useState(DAILY_TIPS[0]);
  
  const [posts, setPosts] = useState<Post[]>(MOCK_POSTS);
  const [toast, setToast] = useState({ visible: false, message: "" });
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const [diagAnswers, setDiagAnswers] = useState({ q1: '', q2: '5', q3: '' });
  
  const [news, setNews] = useState(MOCK_NEWS);
  const [isNewsLoading, setIsNewsLoading] = useState(false);

  const t = TRANSLATIONS[language];

  useEffect(() => {
    const savedTheme = localStorage.getItem('techpath-theme') as Theme;
    if (savedTheme) {
        setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    
    if (theme === Theme.AUTO) {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }
    localStorage.setItem('techpath-theme', theme);
  }, [theme]);

  // Remove the old useEffect that forced language detection on every mount
  // The logic is now handled by getInitialLanguage() in useState

  useEffect(() => {
    setAchievements(getAchievements(language));
    setRoadmap(prev => {
        return getFallbackRoadmap(language);
    });
  }, [language]);

  useEffect(() => {
     if (currentScreen === AppScreen.NEWS) {
         setIsNewsLoading(true);
         setTimeout(() => {
             const shuffled = [...MOCK_NEWS].sort(() => 0.5 - Math.random());
             setNews(shuffled);
             setIsNewsLoading(false);
         }, 800);
     }
  }, [currentScreen]);

  useEffect(() => {
     if (!roadmap) return;

     let totalSteps = 0;
     let completedSteps = 0;

     roadmap.forEach(task => {
         if (task.steps) {
             totalSteps += task.steps.length;
             completedSteps += task.steps.filter(s => s.isCompleted).length;
         }
     });

     const percentage = totalSteps > 0 ? (completedSteps / totalSteps) * 100 : 0;
     let newUnlock = false;

     const updatedAchievements = achievements.map(ach => {
         let shouldUnlock = ach.unlocked;
         
         if (ach.id === 'first-step' && completedSteps >= 1) shouldUnlock = true;
         if (ach.id === '25-percent' && percentage >= 25) shouldUnlock = true;
         if (ach.id === '50-percent' && percentage >= 50) shouldUnlock = true;
         if (ach.id === '75-percent' && percentage >= 75) shouldUnlock = true;
         if (ach.id === 'completed' && percentage >= 100) shouldUnlock = true;

         if (!ach.unlocked && shouldUnlock) newUnlock = true;

         return { ...ach, unlocked: shouldUnlock };
     });

     if (JSON.stringify(updatedAchievements) !== JSON.stringify(achievements)) {
         setAchievements(updatedAchievements);
         if (newUnlock) {
             showToast("Parabéns! Você desbloqueou uma conquista. 🏆");
         }
     }

  }, [roadmap, achievements]);

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('techpath-language', lang);
    if (user) {
        setUser({ ...user, language: lang });
    }
    showToast(`Idioma alterado para ${lang}`);
  };

  const showToast = (msg: string) => {
    setToast({ visible: true, message: msg });
  };

  const handleLogin = (provider: string) => {
    setIsAuthLoading(true);
    const delay = 1500;
    
    setTimeout(() => {
      setUser({
        name: "João da Silva",
        email: "joao@email.com",
        level: "Iniciante",
        xp: 150,
        streak: 1,
        roadmapProgress: 0,
        language: language,
        avatar: "JS"
      });
      setIsAuthLoading(false);
      showToast(`${t.loginSuccess} (${provider})`);
      setCurrentScreen(AppScreen.DIAGNOSIS);
    }, delay);
  };

  const handleDiagnosisSubmit = async () => {
    setIsLoading(true);
    setTimeout(async () => {
        const generatedRoadmap = await generatePersonalizedRoadmap({
            q1: diagAnswers.q1,
            q2: diagAnswers.q2 + 'h',
            q3: diagAnswers.q3
        }, language.toString());
        setRoadmap(generatedRoadmap.length > 0 ? generatedRoadmap : getFallbackRoadmap(language));
        setUser(prev => prev ? { ...prev, roadmapProgress: 0 } : null);
        setIsLoading(false);
        setCurrentScreen(AppScreen.DASHBOARD);
    }, 2000);
  };

  const handleStepComplete = (taskId: string, stepId: string, link?: string) => {
    const newRoadmap = [...roadmap];
    const taskIndex = newRoadmap.findIndex(t => t.id === taskId);
    if (taskIndex === -1) return;

    const task = newRoadmap[taskIndex];
    if (!task.steps) return;

    const stepIndex = task.steps.findIndex(s => s.id === stepId);
    if (stepIndex === -1) return;

    task.steps[stepIndex] = { 
      ...task.steps[stepIndex], 
      isCompleted: true,
      userLink: link 
    };

    setRoadmap(newRoadmap);

    if (selectedTask && selectedTask.id === taskId) {
      setSelectedTask({ ...task });
    }

    showToast("Passo concluído com sucesso!");
  };

  const handleProjectStepComplete = (projectId: string, stepId: string) => {
    if (!selectedProject || !selectedProject.steps) return;
    
    const newSteps = selectedProject.steps.map(s => 
      s.id === stepId ? { ...s, isCompleted: true } : s
    );

    setSelectedProject({ ...selectedProject, steps: newSteps });
    showToast("Passo do projeto concluído!");
  };

  const handleFinishModule = () => {
    if (!selectedTask || !selectedTask.steps) return;
    const allDone = selectedTask.steps.every(s => s.isCompleted);
    if (!allDone) {
      showToast("Você precisa concluir todos os passos antes de avançar.");
      return;
    }
    const index = roadmap.findIndex(i => i.id === selectedTask.id);
    const newRoadmap = [...roadmap];
    newRoadmap[index].status = 'completed';
    if (index + 1 < newRoadmap.length) {
      newRoadmap[index + 1].status = 'active';
    }
    setRoadmap(newRoadmap);
    showToast("Módulo finalizado! Parabéns!");
    setCurrentScreen(AppScreen.ROADMAP);
  };

  const handlePostSubmit = (topic: CommunityTopic, content: string) => {
    const newPost: Post = {
      id: Date.now().toString(),
      author: user?.name || "Usuário",
      role: "Iniciante",
      topic: topic,
      content: content,
      likes: 0,
      comments: 0,
      timestamp: "Agora"
    };
    setPosts(prev => [newPost, ...prev]);
    showToast("Post publicado na comunidade!");
  };

  const handleSendMessage = async (text: string) => {
    const userMsg: ChatMessage = { id: Date.now().toString(), text, sender: 'user', timestamp: Date.now() };
    setChatMessages(prev => [...prev, userMsg]);
    
    setTimeout(async () => {
      const responseText = await getChatResponse(text, language);
      const botMsg: ChatMessage = { id: (Date.now() + 1).toString(), text: responseText, sender: 'bot', timestamp: Date.now() };
      setChatMessages(prev => [...prev, botMsg]);
    }, 600);
  };

  // --- Simplified Hub Content (Dashboard) ---
  const DashboardContent = () => {
    const nextTask = roadmap.find(t => t.status === 'active') || roadmap[0];
    const progress = Math.round((roadmap.filter(t => t.status === 'completed').length / roadmap.length) * 100);

    return (
      <div className="flex flex-col items-center justify-center h-[80vh] px-4 text-center">
        {/* 1. Simple Text */}
        <h2 className="text-2xl font-medium text-lightText dark:text-darkText mb-8">
          {t.motivation}
        </h2>

        {/* 2. Simple Progress */}
        <div className="w-full max-w-xs mb-10">
          <div className="flex justify-between text-sm text-gray-500 mb-2">
             <span>Progresso</span>
             <span>{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-4 overflow-hidden">
              <div 
                className="bg-neonBlue h-full transition-all duration-500" 
                style={{ width: `${progress}%` }}
              ></div>
          </div>
        </div>

        {/* 3. Single CTA */}
        <Button 
          size="lg" 
          className="px-10 py-4 text-lg"
          onClick={() => { setSelectedTask(nextTask); setCurrentScreen(AppScreen.TASK_DETAILS); }}
        >
          {t.continueJourney}
        </Button>
      </div>
    );
  };

  const RoadmapContent = () => (
     <div className="max-w-4xl mx-auto space-y-6">
        <header>
           <h2 className="text-3xl font-bold mb-2 text-lightText dark:text-darkText">{t.roadmap}</h2>
           <p className="text-gray-500">{t.diagnosisTitle}</p>
        </header>

        <div className="space-y-4">
           {roadmap.map((item, index) => (
              <Card 
                key={item.id} 
                className={`transition-all border-l-4 ${item.status === 'completed' ? 'border-l-green-500 opacity-70' : item.status === 'active' ? 'border-l-neonBlue transform scale-[1.02] shadow-lg' : 'border-l-gray-300 dark:border-l-gray-700 opacity-60'}`}
                onClick={() => {
                   if (item.status !== 'locked') {
                      setSelectedTask(item);
                      setCurrentScreen(AppScreen.TASK_DETAILS);
                   }
                }}
              >
                 <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                       <div className={`w-10 h-10 rounded-full flex items-center justify-center ${item.status === 'completed' ? 'bg-green-100 text-green-600' : item.status === 'active' ? 'bg-neonBlue text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500'}`}>
                          {item.status === 'completed' ? <CheckCircle size={20}/> : item.status === 'locked' ? <Lock size={20}/> : <span className="font-bold">{index + 1}</span>}
                       </div>
                       <div>
                          <h3 className="font-bold text-lg text-lightText dark:text-darkText">{item.title}</h3>
                          <p className="text-sm text-gray-500">{item.description}</p>
                       </div>
                    </div>
                    <div>
                       {item.status === 'active' && <Button size="sm">Continuar</Button>}
                       {item.status === 'locked' && <Lock className="text-gray-400" size={20}/>}
                    </div>
                 </div>
              </Card>
           ))}
        </div>
     </div>
  );

  const LayoutWrapper = ({ children }: { children?: React.ReactNode }) => (
    <div className={theme === Theme.DARK ? 'dark' : ''}>
      <div className="flex flex-col md:flex-row min-h-screen bg-lightBg text-lightText dark:bg-darkBg dark:text-darkText transition-colors duration-300 font-sans">
        <Toast message={toast.message} isVisible={toast.visible} onClose={() => setToast({...toast, visible: false})} />
        
        {/* Sidebar Desktop */}
        <aside className="hidden md:flex flex-col w-64 bg-white dark:bg-darkSurface border-r border-lightBorder dark:border-gray-800 p-6 sticky top-0 h-screen z-20 overflow-y-auto custom-scrollbar">
          <div className="mb-8 cursor-pointer" onClick={() => setCurrentScreen(AppScreen.DASHBOARD)}><Logo /></div>
          
          <nav className="flex-1 space-y-2">
            <NavItem icon={Layout} label={t.dashboard} isActive={currentScreen === AppScreen.DASHBOARD} onClick={() => setCurrentScreen(AppScreen.DASHBOARD)} />
            <NavItem icon={Bot} label={t.aiAgent} isActive={currentScreen === AppScreen.AI_CHAT} onClick={() => setCurrentScreen(AppScreen.AI_CHAT)} />
            <NavItem icon={Map} label={t.roadmap} isActive={[AppScreen.ROADMAP, AppScreen.TASK_DETAILS].includes(currentScreen)} onClick={() => setCurrentScreen(AppScreen.ROADMAP)} />
            <NavItem icon={Code} label={t.portfolio} isActive={[AppScreen.PORTFOLIO, AppScreen.PROJECT_DETAILS].includes(currentScreen)} onClick={() => setCurrentScreen(AppScreen.PORTFOLIO)} />
            <NavItem icon={Briefcase} label={t.jobs} isActive={currentScreen === AppScreen.JOBS} onClick={() => setCurrentScreen(AppScreen.JOBS)} />
            <NavItem icon={Newspaper} label={t.news} isActive={currentScreen === AppScreen.NEWS} onClick={() => setCurrentScreen(AppScreen.NEWS)} />
            <NavItem icon={Award} label={t.gamification} isActive={currentScreen === AppScreen.GAMIFICATION} onClick={() => setCurrentScreen(AppScreen.GAMIFICATION)} />
            <NavItem icon={MessageSquare} label={t.community} isActive={currentScreen === AppScreen.COMMUNITY} onClick={() => setCurrentScreen(AppScreen.COMMUNITY)} />
          </nav>

          <div className="pt-6 border-t border-lightBorder dark:border-gray-700">
            <NavItem icon={Settings} label={t.settings} isActive={currentScreen === AppScreen.SETTINGS} onClick={() => setCurrentScreen(AppScreen.SETTINGS)} />
            <div className="mt-4 flex items-center gap-3 p-2 rounded-lg bg-gray-100 dark:bg-gray-800">
                <div className="w-8 h-8 rounded-full bg-neonBlue text-white text-xs flex items-center justify-center font-bold">{user?.avatar}</div>
                <div className="overflow-hidden">
                  <p className="text-sm font-bold truncate w-32 dark:text-white text-gray-900">{user?.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Lvl 1 • 150 XP</p>
                </div>
            </div>
          </div>
        </aside>

        {/* Mobile Header */}
        <header className="md:hidden flex items-center justify-between p-4 bg-white dark:bg-darkSurface border-b border-lightBorder dark:border-gray-800 sticky top-0 z-50">
          <Logo />
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-900 dark:text-white">
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </header>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="md:hidden fixed inset-0 bg-lightBg dark:bg-charcoal z-40 pt-20 px-6 space-y-4 overflow-y-auto">
            <NavItem icon={Layout} label={t.dashboard} isActive={currentScreen === AppScreen.DASHBOARD} onClick={() => { setCurrentScreen(AppScreen.DASHBOARD); setIsMobileMenuOpen(false); }} />
            <NavItem icon={Bot} label={t.aiAgent} isActive={currentScreen === AppScreen.AI_CHAT} onClick={() => { setCurrentScreen(AppScreen.AI_CHAT); setIsMobileMenuOpen(false); }} />
            <NavItem icon={Map} label={t.roadmap} isActive={currentScreen === AppScreen.ROADMAP} onClick={() => { setCurrentScreen(AppScreen.ROADMAP); setIsMobileMenuOpen(false); }} />
            <NavItem icon={Code} label={t.portfolio} isActive={currentScreen === AppScreen.PORTFOLIO} onClick={() => { setCurrentScreen(AppScreen.PORTFOLIO); setIsMobileMenuOpen(false); }} />
            <NavItem icon={Briefcase} label={t.jobs} isActive={currentScreen === AppScreen.JOBS} onClick={() => { setCurrentScreen(AppScreen.JOBS); setIsMobileMenuOpen(false); }} />
            <NavItem icon={Newspaper} label={t.news} isActive={currentScreen === AppScreen.NEWS} onClick={() => { setCurrentScreen(AppScreen.NEWS); setIsMobileMenuOpen(false); }} />
            <NavItem icon={Settings} label={t.settings} isActive={currentScreen === AppScreen.SETTINGS} onClick={() => { setCurrentScreen(AppScreen.SETTINGS); setIsMobileMenuOpen(false); }} />
            <Button variant="ghost" fullWidth onClick={() => setCurrentScreen(AppScreen.LOGIN)} className="text-red-500 justify-start px-2"><LogOut size={20} className="mr-2"/> Sair</Button>
          </div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto pb-24 md:pb-8">
          {children}
        </main>

        {/* Mobile Bottom Nav */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-darkSurface border-t border-lightBorder dark:border-gray-800 px-6 py-3 flex justify-between z-30 safe-area-bottom">
          <button onClick={() => setCurrentScreen(AppScreen.DASHBOARD)} className={`${currentScreen === AppScreen.DASHBOARD ? 'text-neonBlue' : 'text-gray-400'}`}><Layout /></button>
          <button onClick={() => setCurrentScreen(AppScreen.ROADMAP)} className={`${currentScreen === AppScreen.ROADMAP ? 'text-neonBlue' : 'text-gray-400'}`}><Map /></button>
          <button onClick={() => setCurrentScreen(AppScreen.AI_CHAT)} className={`${currentScreen === AppScreen.AI_CHAT ? 'text-neonBlue' : 'text-gray-400'}`}><Bot /></button>
          <button onClick={() => setCurrentScreen(AppScreen.PORTFOLIO)} className={`${currentScreen === AppScreen.PORTFOLIO ? 'text-neonBlue' : 'text-gray-400'}`}><Code /></button>
          <button onClick={() => setCurrentScreen(AppScreen.JOBS)} className={`${currentScreen === AppScreen.JOBS ? 'text-neonBlue' : 'text-gray-400'}`}><Briefcase /></button>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (currentScreen) {
      case AppScreen.DASHBOARD:
        return <DashboardContent />;
      case AppScreen.ROADMAP:
        return <RoadmapContent />;
      case AppScreen.TASK_DETAILS:
        return selectedTask ? (
            <div className="max-w-3xl mx-auto animate-in slide-in-from-right-4">
              <Button variant="ghost" onClick={() => setCurrentScreen(AppScreen.ROADMAP)} className="mb-4"><ArrowRight className="rotate-180" size={18}/> {t.back}</Button>
              <div className="flex flex-col gap-6">
                <div className="flex justify-between items-start mb-2">
                   <h2 className="text-3xl font-bold text-lightText dark:text-darkText">{selectedTask.title}</h2>
                   <Badge>{selectedTask.category}</Badge>
                </div>
                <p className="text-gray-500 dark:text-gray-400 mb-4">{selectedTask.description}</p>
                
                {selectedTask.type === 'video' && selectedTask.videoId && (
                    <div className="mb-8">
                       <VideoPlayer videoId={selectedTask.videoId} />
                       <div className="mt-4 flex justify-end">
                          <Button variant="secondary" size="sm" onClick={() => {}}>{t.videoWatch}</Button>
                       </div>
                    </div>
                )}

                <div className="space-y-6">
                   {selectedTask.steps.map((step, i) => (
                      <StepCard 
                        key={step.id} 
                        step={step} 
                        index={i} 
                        onComplete={(link) => handleStepComplete(selectedTask.id, step.id, link)} 
                        t={t}
                      />
                   ))}
                </div>
                
                <div className="mt-8 pt-6 border-t border-lightBorder dark:border-gray-800 flex justify-end">
                    <Button size="lg" onClick={handleFinishModule} disabled={!selectedTask.steps.every(s => s.isCompleted)} variant="primary">
                       {t.markComplete} <CheckCircle size={20}/>
                    </Button>
                </div>
              </div>
            </div>
        ) : <RoadmapContent />;
      case AppScreen.COMMUNITY:
        return <CommunityScreen posts={posts} user={user} onPostSubmit={handlePostSubmit} t={t} showToast={showToast} />;
      case AppScreen.AI_CHAT:
        return <AIChatScreen messages={chatMessages} onSendMessage={handleSendMessage} t={t} />;
      case AppScreen.PORTFOLIO:
        return <PortfolioHubScreen t={t} />;
      case AppScreen.JOBS:
        return (
            <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in">
               <div className="flex justify-between items-center">
                   <div>
                       <h2 className="text-3xl font-bold text-lightText dark:text-darkText">{t.jobs}</h2>
                       <p className="text-gray-500">{t.recJobs}</p>
                   </div>
                   <Button variant="ai" onClick={async () => {
                       showToast("Buscando vagas com IA...");
                       const aiJobs = await getAIJobRecommendations();
                       showToast("Lista de vagas atualizada!");
                   }}>
                       <Sparkles size={16}/> IA Job Hunter
                   </Button>
               </div>
               
               <div className="grid gap-4">
                   {MOCK_JOBS.map(job => (
                       <Card key={job.id} onClick={() => window.open(job.url, '_blank')} className="hover:border-neonBlue cursor-pointer group">
                           <div className="flex justify-between items-start">
                               <div>
                                   <h4 className="font-bold text-lg group-hover:text-neonBlue transition-colors">{job.title}</h4>
                                   <p className="text-sm text-gray-500">{job.company} • {job.location}</p>
                                   <div className="flex gap-2 mt-2">
                                       <Badge color="bg-blue-100 dark:bg-blue-900/30">{job.level}</Badge>
                                       <Badge color="bg-purple-100 dark:bg-purple-900/30">{job.type}</Badge>
                                   </div>
                               </div>
                               <ExternalLink className="text-gray-400 group-hover:text-neonBlue"/>
                           </div>
                           <p className="mt-3 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">{job.description}</p>
                       </Card>
                   ))}
               </div>
            </div>
        );
      case AppScreen.NEWS:
         return (
             <div className="max-w-3xl mx-auto animate-in fade-in">
                 <h2 className="text-3xl font-bold mb-6 text-lightText dark:text-darkText">{t.news}</h2>
                 {isNewsLoading ? (
                     <div className="space-y-4">
                         {[1,2,3].map(i => <div key={i} className="h-40 bg-gray-200 dark:bg-gray-800 rounded-xl animate-pulse"></div>)}
                     </div>
                 ) : (
                     <div className="space-y-6">
                         {news.map(item => (
                             <Card key={item.id} onClick={() => window.open(item.url, '_blank')} className="cursor-pointer group hover:border-neonBlue">
                                 <div className="flex gap-4 flex-col md:flex-row">
                                     {item.imageUrl && (
                                         <div className="w-full md:w-48 h-32 rounded-lg overflow-hidden flex-shrink-0">
                                             <img src={item.imageUrl} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform"/>
                                         </div>
                                     )}
                                     <div className="flex-1">
                                         <div className="flex justify-between items-start">
                                             <span className="text-xs font-bold text-neonBlue mb-1 block">{item.source} • {item.date}</span>
                                             <ExternalLink size={14} className="text-gray-400 group-hover:text-neonBlue"/>
                                         </div>
                                         <h3 className="font-bold text-lg mb-2 leading-tight group-hover:text-neonBlue transition-colors">{item.title}</h3>
                                         <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{item.summary}</p>
                                     </div>
                                 </div>
                             </Card>
                         ))}
                     </div>
                 )}
             </div>
         );
      case AppScreen.SETTINGS:
          return (
              <div className="max-w-2xl mx-auto space-y-6">
                  <h2 className="text-3xl font-bold mb-6">{t.settings}</h2>
                  
                  <Card>
                      <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><Globe size={20}/> {t.language}</h3>
                      <div className="flex gap-2">
                          {[Language.PT, Language.EN, Language.ES].map(l => (
                              <button 
                                key={l}
                                onClick={() => handleLanguageChange(l)}
                                className={`px-4 py-2 rounded-lg border transition-colors ${language === l ? 'bg-neonBlue text-white border-neonBlue' : 'border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
                              >
                                  {l}
                              </button>
                          ))}
                      </div>
                  </Card>

                  <Card>
                      <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><Sun size={20}/> {t.theme}</h3>
                      <div className="flex gap-2">
                          {[
                              { val: Theme.LIGHT, icon: Sun, label: t.themeLight },
                              { val: Theme.DARK, icon: Moon, label: t.themeDark },
                              { val: Theme.AUTO, icon: Layout, label: t.themeAuto }
                          ].map(th => (
                              <button 
                                key={th.val}
                                onClick={() => setTheme(th.val)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${theme === th.val ? 'bg-neonBlue text-white border-neonBlue' : 'border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
                              >
                                  <th.icon size={16}/> {th.label}
                              </button>
                          ))}
                      </div>
                  </Card>

                  <Card className="border-red-200 dark:border-red-900/30">
                      <h3 className="font-bold text-lg mb-4 text-red-500">{t.logout}</h3>
                      <Button variant="outline" className="text-red-500 border-red-500 hover:bg-red-50" onClick={() => {
                          setUser(null);
                          setCurrentScreen(AppScreen.LOGIN);
                      }}>
                          {t.logout}
                      </Button>
                  </Card>
              </div>
          );
      case AppScreen.GAMIFICATION:
          return (
              <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in">
                  <div className="text-center mb-8">
                      <h2 className="text-3xl font-bold">{t.gamification}</h2>
                      <div className="flex justify-center gap-4 mt-4">
                          <div className="bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 px-6 py-3 rounded-2xl flex flex-col items-center">
                              <span className="text-2xl font-bold">150</span>
                              <span className="text-xs uppercase font-bold tracking-wider">XP Total</span>
                          </div>
                          <div className="bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400 px-6 py-3 rounded-2xl flex flex-col items-center">
                              <span className="text-2xl font-bold flex items-center gap-1">1 <Zap size={20} className="fill-orange-500"/></span>
                              <span className="text-xs uppercase font-bold tracking-wider">{t.streak}</span>
                          </div>
                      </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {achievements.map(ach => (
                          <Card key={ach.id} className={`text-center relative overflow-hidden ${ach.unlocked ? 'border-green-500 dark:border-green-500 shadow-green-500/20 shadow-lg' : 'opacity-60 grayscale'}`}>
                              {ach.unlocked && <div className="absolute top-2 right-2 text-green-500"><CheckCircle size={16}/></div>}
                              <div className="text-4xl mb-3">{ach.icon}</div>
                              <h3 className="font-bold text-lg">{ach.title}</h3>
                              <p className="text-sm text-gray-500">{ach.description}</p>
                              {!ach.unlocked && <div className="mt-3 text-xs bg-gray-200 dark:bg-gray-700 py-1 px-2 rounded-full inline-block">Bloqueado</div>}
                          </Card>
                      ))}
                  </div>
              </div>
          );
      default:
        return <DashboardContent />;
    }
  };

  if ([AppScreen.LOGIN, AppScreen.CREATE_ACCOUNT, AppScreen.DIAGNOSIS].includes(currentScreen)) {
      if (currentScreen === AppScreen.LOGIN) return <LoginScreen t={t} onLogin={handleLogin} onNavigate={setCurrentScreen} isLoading={isAuthLoading} />;
      if (currentScreen === AppScreen.CREATE_ACCOUNT) return <CreateAccountScreen t={t} onCreate={handleLogin} onNavigate={setCurrentScreen} isLoading={isAuthLoading} />;
      if (currentScreen === AppScreen.DIAGNOSIS) return <DiagnosisScreen t={t} answers={diagAnswers} setAnswers={setDiagAnswers} onSubmit={handleDiagnosisSubmit} isLoading={isLoading} />;
  }

  return (
      <LayoutWrapper>
          {renderContent()}
      </LayoutWrapper>
  );
}
