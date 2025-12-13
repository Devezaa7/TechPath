
import { Language, Job, Post, NewsItem, Mentor, Achievement, RoadmapItem, ProjectGuide, ChatMessage, RecommendedProject } from './types';

export const TRANSLATIONS = {
  [Language.PT]: {
    welcome: "Seu caminho para a primeira vaga tech começa aqui.",
    start: "Começar Agora",
    login: "Entrar",
    emailPlaceholder: "Seu e-mail",
    passwordPlaceholder: "Sua senha",
    loginGoogle: "Entrar com Google",
    loginLinkedIn: "Entrar com LinkedIn",
    loginGithub: "Entrar com GitHub",
    createAccount: "Criar conta",
    diagnosisTitle: "Vamos montar seu plano",
    q1: "Você já programou antes?",
    q2: "Quanto tempo você tem por semana?",
    q3: "Qual seu objetivo principal?",
    genRoadmap: "Gerar Meu Roadmap",
    dashboard: "Foco",
    roadmap: "Roadmap",
    portfolio: "Hub de Portfólio",
    jobs: "Vagas",
    community: "Comunidade",
    tools: "Ferramentas",
    settings: "Configurações",
    feedback: "Feedback",
    mentorship: "Mentoria",
    news: "Notícias Tech",
    streak: "dias de ofensiva",
    level: "Nível",
    nextStep: "Próximo Passo",
    recJobs: "Vagas Recomendadas",
    toolsDaily: "Ferramentas Úteis",
    gamification: "Conquistas",
    points: "Pontos",
    tips: "Dica do Dia",
    sendFeedback: "Enviar Sugestão",
    placeholderFeedback: "O que podemos melhorar?",
    submit: "Enviar",
    hello: "Olá",
    search: "Buscar...",
    back: "Voltar",
    language: "Idioma",
    theme: "Aparência",
    generating: "Criando seu plano personalizado com IA...",
    apply: "Ver Vaga",
    readMore: "Ler notícia completa",
    softSkills: "Soft Skills",
    deployGuide: "Guía de Deploy",
    mandatoryProjects: "Projetos Obrigatórios",
    helpPortfolio: "Ajuda Rápida",
    mentorTitle: "Mentoria TechPath",
    mentorDesc: "Conecte-se com quem já chegou lá.",
    getMentor: "Buscar Mentor",
    newsTitle: "Giro Tech",
    loginSuccess: "Login realizado com sucesso!",
    jobApplied: "Candidatura enviada com sucesso!",
    toolOpen: "Abrir Ferramenta",
    chatTitle: "Assistente TechPath",
    chatPlaceholder: "Digite sua dúvida aqui...",
    markComplete: "Finalizar Módulo",
    startProject: "Iniciar Projeto",
    openRepo: "Ver Repositório",
    requirements: "Requisitos",
    difficulty: "Dificuldade",
    techStack: "Tecnologias",
    steps: "Passo a Passo",
    logout: "Sair da Conta",
    notifications: "Notificações",
    privacy: "Privacidade",
    about: "Sobre o App",
    themeLight: "Claro",
    themeDark: "Escuro",
    themeAuto: "Automático",
    salary: "Salario Estimado",
    description: "Descrição da Vaga",
    createAccountTitle: "Crie sua conta",
    namePlaceholder: "Nome completo",
    alreadyHaveAccount: "Já tem uma conta? Entre aqui.",
    accountCreatedSuccess: "Conta criada com sucesso! Bem-vindo.",
    fillAllFields: "Preencha todos os campos.",
    stepResources: "Recursos de Estudo",
    stepDeliverable: "Entregável esperado",
    stepVerify: "Verificar URL",
    stepPlaceholderUrl: "Cole a URL aqui...",
    stepMarkDone: "Marcar como feito",
    stepCompleted: "Concluído",
    videoWatch: "Marcar vídeo como assistido",
    needHelp: "Precisa de ajuda?",
    aiAgent: "Agente IA",
    // UX Improvements
    viewInstructions: "Ver Instruções",
    hideInstructions: "Recolher Instruções",
    objective: "Objetivo da Etapa",
    timeEstimate: "Tempo estimado",
    instructionsTitle: "Como Fazer",
    exampleTitle: "Exemplo Prático",
    // Dashboard Focus
    currentFocus: "Foco Atual",
    continueJourney: "Continuar Trilha",
    aiInsight: "Insight da IA",
    quickAccess: "Acesso Rápido",
    totalProgress: "Progresso Total",
    motivation: "Um passo por vez. Continue daqui."
  },
  [Language.EN]: {
    welcome: "Your path to your first tech job starts here.",
    start: "Start Now",
    login: "Login",
    emailPlaceholder: "Your email",
    passwordPlaceholder: "Your password",
    loginGoogle: "Login with Google",
    loginLinkedIn: "Login with LinkedIn",
    loginGithub: "Login with GitHub",
    createAccount: "Create Account",
    diagnosisTitle: "Let's build your plan",
    q1: "Have you coded before?",
    q2: "How much time do you have per week?",
    q3: "What is your main goal?",
    genRoadmap: "Generate My Roadmap",
    dashboard: "Focus",
    roadmap: "Roadmap",
    portfolio: "Portfolio Hub",
    jobs: "Jobs",
    community: "Community",
    tools: "Tools",
    settings: "Settings",
    feedback: "Feedback",
    mentorship: "Mentorship",
    news: "Tech News",
    streak: "day streak",
    level: "Level",
    nextStep: "Next Step",
    recJobs: "Recommended Jobs",
    toolsDaily: "Useful Tools",
    gamification: "Achievements",
    points: "Points",
    tips: "Daily Tip",
    sendFeedback: "Send Suggestion",
    placeholderFeedback: "What can we improve?",
    submit: "Submit",
    hello: "Hello",
    search: "Search...",
    back: "Back",
    language: "Language",
    theme: "Appearance",
    generating: "Creating your custom plan with AI...",
    apply: "View Job",
    readMore: "Read full story",
    softSkills: "Soft Skills",
    deployGuide: "Deploy Guide",
    mandatoryProjects: "Mandatory Projects",
    helpPortfolio: "Quick Help",
    mentorTitle: "TechPath Mentorship",
    mentorDesc: "Connect with those who made it.",
    getMentor: "Find a Mentor",
    newsTitle: "Tech Roundup",
    loginSuccess: "Login successful!",
    jobApplied: "Application sent successfully!",
    toolOpen: "Open Tool",
    chatTitle: "TechPath Assistant",
    chatPlaceholder: "Type your question here...",
    markComplete: "Finish Module",
    startProject: "Start Project",
    openRepo: "Open Repository",
    requirements: "Requirements",
    difficulty: "Difficulty",
    techStack: "Technologies",
    steps: "Step by Step",
    logout: "Logout",
    notifications: "Notifications",
    privacy: "Privacy",
    about: "About App",
    themeLight: "Light",
    themeDark: "Dark",
    themeAuto: "Auto",
    salary: "Estimated Salary",
    description: "Job Description",
    createAccountTitle: "Create your account",
    namePlaceholder: "Full Name",
    alreadyHaveAccount: "Already have an account? Login here.",
    accountCreatedSuccess: "Account created successfully! Welcome.",
    fillAllFields: "Please fill all fields.",
    stepResources: "Resources",
    stepDeliverable: "Expected Deliverable",
    stepVerify: "Verify URL",
    stepPlaceholderUrl: "Paste URL here...",
    stepMarkDone: "Mark as done",
    stepCompleted: "Step completed",
    videoWatch: "Mark video as watched",
    needHelp: "Need help?",
    aiAgent: "AI Agent",
    // UX Improvements
    viewInstructions: "View Instructions",
    hideInstructions: "Hide Instructions",
    objective: "Step Objective",
    timeEstimate: "Est. Time",
    instructionsTitle: "How to do it",
    exampleTitle: "Practical Example",
    // Dashboard Focus
    currentFocus: "Current Focus",
    continueJourney: "Continue Journey",
    aiInsight: "AI Insight",
    quickAccess: "Quick Access",
    totalProgress: "Total Progress",
    motivation: "One step at a time. Continue from here."
  },
  [Language.ES]: {
    welcome: "Tu camino hacia tu primer empleo tech comienza aquí.",
    start: "Comenzar Ahora",
    login: "Entrar",
    emailPlaceholder: "Tu correo",
    passwordPlaceholder: "Tu contraseña",
    loginGoogle: "Entrar con Google",
    loginLinkedIn: "Entrar con LinkedIn",
    loginGithub: "Entrar con GitHub",
    createAccount: "Crear cuenta",
    diagnosisTitle: "Vamos a crear tu plan",
    q1: "¿Has programado antes?",
    q2: "¿Cuánto tiempo tienes por semana?",
    q3: "¿Cuál es tu objetivo principal?",
    genRoadmap: "Generar Mi Roadmap",
    dashboard: "Foco",
    roadmap: "Roadmap",
    portfolio: "Hub Portafolio",
    jobs: "Empleos",
    community: "Comunidad",
    tools: "Herramientas",
    settings: "Ajustes",
    feedback: "Feedback",
    mentorship: "Mentoría",
    news: "Noticias Tech",
    streak: "días en racha",
    level: "Nivel",
    nextStep: "Siguiente Paso",
    recJobs: "Empleos Recomendados",
    toolsDaily: "Herramientas Útiles",
    gamification: "Logros",
    points: "Puntos",
    tips: "Consejo del Día",
    sendFeedback: "Enviar Sugerencia",
    placeholderFeedback: "¿Qué podemos mejorar?",
    submit: "Enviar",
    hello: "Hola",
    search: "Buscar...",
    back: "Volver",
    language: "Idioma",
    theme: "Apariencia",
    generating: "Creando tu plan personalizado con IA...",
    apply: "Ver Empleo",
    readMore: "Leer noticia completa",
    softSkills: "Habilidades Blandas",
    deployGuide: "Guía de Deploy",
    mandatoryProjects: "Proyectos Obligatorios",
    helpPortfolio: "Ayuda Rápida",
    mentorTitle: "Mentoría TechPath",
    mentorDesc: "Conecta con quienes ya llegaron.",
    getMentor: "Buscar Mentor",
    newsTitle: "Resumen Tech",
    loginSuccess: "¡Inicio de sesión exitoso!",
    jobApplied: "¡Solicitud enviada con éxito!",
    toolOpen: "Abrir Herramienta",
    chatTitle: "Asistente TechPath",
    chatPlaceholder: "Escribe tu duda aquí...",
    markComplete: "Finalizar Módulo",
    startProject: "Iniciar Proyecto",
    openRepo: "Ver Repositorio",
    requirements: "Requisitos",
    difficulty: "Dificultad",
    techStack: "Tecnologías",
    steps: "Paso a Paso",
    logout: "Cerrar Sesión",
    notifications: "Notificaciones",
    privacy: "Privacidad",
    about: "Sobre la App",
    themeLight: "Claro",
    themeDark: "Oscuro",
    themeAuto: "Automático",
    salary: "Salario Estimado",
    description: "Descripción del Empleo",
    createAccountTitle: "Crea tu cuenta",
    namePlaceholder: "Nombre completo",
    alreadyHaveAccount: "¿Ya tienes cuenta? Entra aquí.",
    accountCreatedSuccess: "¡Cuenta creada con éxito! Bienvenido.",
    fillAllFields: "Por favor llena todos los campos.",
    stepResources: "Recursos",
    stepDeliverable: "Entregable",
    stepVerify: "Verificar URL",
    stepPlaceholderUrl: "Pega la URL aquí...",
    stepMarkDone: "Marcar como hecho",
    stepCompleted: "Paso completado",
    videoWatch: "Marcar video como visto",
    needHelp: "¿Necesitas ayuda?",
    aiAgent: "Agente IA",
    // UX Improvements
    viewInstructions: "Ver Instrucciones",
    hideInstructions: "Ocultar Instrucciones",
    objective: "Objetivo del Paso",
    timeEstimate: "Tiempo est.",
    instructionsTitle: "Cómo hacerlo",
    exampleTitle: "Ejemplo Práctico",
    // Dashboard Focus
    currentFocus: "Foco Actual",
    continueJourney: "Continuar Camino",
    aiInsight: "Insight de IA",
    quickAccess: "Acceso Rápido",
    totalProgress: "Progreso Total",
    motivation: "Un paso a la vez. Continúa desde aquí."
  }
};

// REAL JOBS (Root URLs Only)
export const MOCK_JOBS: Job[] = [
  { 
    id: 'linkedin', 
    title: 'Vagas no LinkedIn', 
    company: 'LinkedIn Jobs', 
    location: 'Global', 
    type: 'Variado', 
    level: 'Júnior', 
    tags: ['Networking', 'Vagas'], 
    platform: 'Interna', 
    url: 'https://www.linkedin.com/jobs',
    description: 'A maior rede profissional do mundo. Explore milhares de vagas de tecnologia filtrando por "Júnior" ou "Estágio".'
  },
  { 
    id: 'gupy', 
    title: 'Portal Gupy', 
    company: 'Gupy', 
    location: 'Brasil', 
    type: 'Variado', 
    level: 'Estágio', 
    tags: ['Processos', 'Vagas'], 
    platform: 'Interna', 
    url: 'https://portal.gupy.io',
    description: 'Plataforma líder em recrutamento no Brasil. Muitas empresas de tecnologia usam a Gupy para gerenciar seus processos.'
  },
  { 
    id: 'indeed', 
    title: 'Busca no Indeed', 
    company: 'Indeed Brasil', 
    location: 'Brasil', 
    type: 'Variado', 
    level: 'Júnior', 
    tags: ['Busca', 'Vagas'], 
    platform: 'Interna', 
    url: 'https://br.indeed.com',
    description: 'Um dos maiores motores de busca de empregos. Ótimo para encontrar oportunidades locais e remotas.'
  },
  { 
    id: 'programathor', 
    title: 'ProgramaThor', 
    company: 'ProgramaThor', 
    location: 'Remoto/Brasil', 
    type: 'Tech', 
    level: 'Júnior', 
    tags: ['Dev', 'Específico'], 
    platform: 'Interna', 
    url: 'https://programathor.com.br',
    description: 'Plataforma focada exclusivamente em vagas para desenvolvedores e profissionais de TI.'
  },
  { 
    id: 'ciee', 
    title: 'Estágios CIEE', 
    company: 'CIEE', 
    location: 'Brasil', 
    type: 'Estágio', 
    level: 'Estágio', 
    tags: ['Estudantes', 'Aprendiz'], 
    platform: 'Interna', 
    url: 'https://portal.ciee.org.br',
    description: 'O lugar ideal para quem busca a primeira oportunidade de estágio ou jovem aprendiz.'
  }
];

export const MOCK_POSTS: Post[] = [
  { id: '1', author: 'Ana Souza', role: 'Dev Júnior', topic: 'Projetos', content: 'Acabei de finalizar o módulo 2! O projeto de To-Do List ficou ótimo.', likes: 15, comments: 2, timestamp: '2h atrás' },
  { id: '2', author: 'Carlos Lima', role: 'Estudante', topic: 'Dúvidas', content: 'Alguém pode me explicar a diferença entre let e const de forma simples?', likes: 3, comments: 8, timestamp: '5h atrás' },
  { id: '3', author: 'Beatriz Silva', role: 'Transição', topic: 'Compartilhamentos', content: 'Dica: Usem o console.log para debugar, salvou meu dia hoje.', likes: 22, comments: 0, timestamp: '1d atrás' },
  { id: '4', author: 'João Pedro', role: 'Dev Pleno', topic: 'Vagas', content: 'O LinkedIn está com muitas vagas para iniciantes essa semana, vale conferir.', likes: 45, comments: 10, timestamp: '2d atrás' },
];

export const MOCK_NEWS: NewsItem[] = [
  { 
    id: '1', 
    source: 'Google Blog', 
    title: 'Google lança Gemini 1.5: Próxima geração de IA', 
    summary: 'Novo modelo de inteligência artificial promete processar grandes volumes de informações com maior precisão e eficiência.', 
    date: '15/02/2024', 
    url: 'https://blog.google/technology/ai/google-gemini-next-generation-model-february-2024/',
    imageUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=600&auto=format&fit=crop'
  },
  { 
    id: '2', 
    source: 'OpenAI', 
    title: 'Sora: Criando vídeos a partir de texto', 
    summary: 'Ferramenta impressiona pela qualidade realista e capacidade de gerar cenas complexas com múltiplos personagens.', 
    date: '16/02/2024', 
    url: 'https://openai.com/sora',
    imageUrl: 'https://images.unsplash.com/photo-1617791160505-6f00504e3519?q=80&w=600&auto=format&fit=crop'
  },
  { 
    id: '3', 
    source: 'G1 Tecnologia', 
    title: 'Últimas notícias de Tecnologia e Inovação', 
    summary: 'Acompanhe as principais novidades do mercado de tecnologia, startups e inovação no Brasil e no mundo.', 
    date: 'Hoje', 
    url: 'https://g1.globo.com/tecnologia/',
    imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=600&auto=format&fit=crop'
  },
  { 
    id: '4', 
    source: 'The Verge', 
    title: 'Tech News: As principais manchetes globais', 
    summary: 'Análises aprofundadas sobre gadgets, ciência e cultura digital direto de um dos maiores portais do mundo.', 
    date: 'Hoje', 
    url: 'https://www.theverge.com/tech',
    imageUrl: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=600&auto=format&fit=crop'
  },
  { 
    id: '5', 
    source: 'React Blog', 
    title: 'React 19 e o futuro do desenvolvimento web', 
    summary: 'Confira as atualizações oficiais da equipe do React sobre compiladores, server actions e melhorias de performance.', 
    date: '20/02/2024', 
    url: 'https://react.dev/blog/2024/02/15/react-labs-what-we-have-been-working-on-february-2024',
    imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=600&auto=format&fit=crop'
  },
  { 
    id: '6', 
    source: 'GitHub Blog', 
    title: 'Novidades do GitHub Copilot Enterprise', 
    summary: 'Saiba como a nova versão do assistente de codificação oferece personalização profunda para empresas.', 
    date: '27/02/2024', 
    url: 'https://github.blog/2024-02-27-github-copilot-enterprise-is-now-generally-available/',
    imageUrl: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=600&auto=format&fit=crop'
  }
];

export const MOCK_MENTORS: Mentor[] = [
  { id: '1', name: 'Juliana Paes', role: 'Senior Software Engineer', company: 'DevCorp', expertise: ['Backend', 'Java', 'Carreira'], available: true },
  { id: '2', name: 'Roberto Firmino', role: 'Tech Lead', company: 'SoftSystems', expertise: ['Frontend', 'React', 'Liderança'], available: false },
  { id: '3', name: 'Carla Dias', role: 'DevOps Engineer', company: 'CloudBase', expertise: ['Cloud', 'Docker', 'AWS'], available: true },
];

// DYNAMIC ACHIEVEMENTS GETTER
export const getAchievements = (lang: Language): Achievement[] => {
  const isEn = lang === Language.EN;
  const isEs = lang === Language.ES;

  const t = {
    welcomeTitle: isEn ? 'Hello World' : 'Hello World',
    welcomeDesc: isEn ? 'Account created' : (isEs ? 'Cuenta creada' : 'Criou a conta no TechPath'),
    firstStepTitle: isEn ? 'First Steps' : (isEs ? 'Primeros Pasos' : 'Primeiros Passos'),
    firstStepDesc: isEn ? 'Finished first roadmap step' : (isEs ? 'Terminó el primer paso' : 'Concluiu a primeira etapa'),
    p25Title: isEn ? 'Gaining Traction' : (isEs ? 'Ganando Tracción' : 'Ganhando Tração'),
    p25Desc: isEn ? 'Completed 25% of roadmap' : (isEs ? 'Completado 25% del roadmap' : 'Completou 25% do roadmap'),
    p50Title: isEn ? 'Halfway There' : (isEs ? 'A Mitad de Camino' : 'Metade do Caminho'),
    p50Desc: isEn ? 'Completed 50% of roadmap' : (isEs ? 'Completado 50% del roadmap' : 'Completou 50% do roadmap'),
    p75Title: isEn ? 'Almost There' : (isEs ? 'Casi Allí' : 'Quase Lá'),
    p75Desc: isEn ? 'Completed 75% of roadmap' : (isEs ? 'Completado 75% del roadmap' : 'Completou 75% do roadmap'),
    doneTitle: isEn ? 'Tech Master' : (isEs ? 'Tech Master' : 'Tech Master'),
    doneDesc: isEn ? 'Finished initial roadmap' : (isEs ? 'Roadmap inicial terminado' : 'Finalizou todo o roadmap inicial'),
  };

  return [
    { id: 'welcome', title: t.welcomeTitle, description: t.welcomeDesc, icon: '👋', unlocked: true },
    { id: 'first-step', title: t.firstStepTitle, description: t.firstStepDesc, icon: '🦶', unlocked: false },
    { id: '25-percent', title: t.p25Title, description: t.p25Desc, icon: '🚀', unlocked: false },
    { id: '50-percent', title: t.p50Title, description: t.p50Desc, icon: '🔥', unlocked: false },
    { id: '75-percent', title: t.p75Title, description: t.p75Desc, icon: '🎯', unlocked: false },
    { id: 'completed', title: t.doneTitle, description: t.doneDesc, icon: '🏆', unlocked: false },
  ];
};

// DYNAMIC FALLBACK ROADMAP
export const getFallbackRoadmap = (lang: Language): RoadmapItem[] => {
  const isEn = lang === Language.EN;
  const isEs = lang === Language.ES;

  return [
    { 
      id: '1', 
      title: isEn ? 'Programming Logic' : (isEs ? 'Lógica de Programación' : 'Lógica de Programação'), 
      description: isEn ? 'The foundation. Variables, loops, conditionals.' : (isEs ? 'La base. Variables, bucles, condicionales.' : 'O alicerce. Variáveis, loops, condicionais e funções.'), 
      status: 'active', 
      type: 'video', 
      category: 'tech',
      videoId: '8mei6uVtTh8', 
      steps: [
        { 
          id: '1-1', 
          title: isEn ? 'Understanding Variables' : (isEs ? 'Entendiendo Variables' : 'Entendendo Variáveis'), 
          description: isEn ? 'Core concept of storage.' : (isEs ? 'Concepto base de almacenamiento.' : 'Conceito base de armazenamento.'), 
          instructions: [
            isEn ? 'Watch the introductory video.' : (isEs ? 'Mira el video introductorio.' : 'Veja o vídeo introdutório.'),
            isEn ? 'Write down definitions of Var, Let, Const.' : (isEs ? 'Escribe definiciones de Var, Let, Const.' : 'Anote as definições de Var, Let e Const.')
          ], 
          deliverable: isEn ? 'Summary text.' : (isEs ? 'Resumen de texto.' : 'Resumo.'), 
          validationType: 'manual', 
          isCompleted: false 
        },
        { 
          id: '1-2', 
          title: 'Hello World', 
          description: isEn ? 'Your first code.' : (isEs ? 'Tu primer código.' : 'Seu primeiro código.'), 
          instructions: [
            isEn ? 'Open browser console (F12).' : (isEs ? 'Abre la consola del navegador (F12).' : 'Abra o console do navegador (F12).'),
            isEn ? 'Type the print command.' : (isEs ? 'Escribe el comando de impresión.' : 'Escreva o comando de print.')
          ], 
          example: 'console.log("Olá")', 
          deliverable: isEn ? 'Code running.' : (isEs ? 'Código ejecutándose.' : 'Código rodando.'), 
          validationType: 'checkbox', 
          isCompleted: false 
        }
      ]
    },
    { 
      id: '2', 
      title: 'Git & GitHub', 
      description: isEn ? 'Code versioning.' : (isEs ? 'Versionado de código.' : 'Versionamento de código.'), 
      status: 'locked', 
      type: 'video', 
      category: 'tech',
      videoId: 'c8I84E5wzF0', 
      steps: [
        { 
          id: '2-1', 
          title: isEn ? 'Install Git' : (isEs ? 'Instalar Git' : 'Instalar Git'), 
          description: isEn ? 'Initial setup.' : (isEs ? 'Configuración inicial.' : 'Setup inicial.'), 
          instructions: [isEn ? 'Download and install.' : (isEs ? 'Descarga e instala.' : 'Baixe e instale.')], 
          deliverable: 'Git version.', 
          validationType: 'checkbox', 
          isCompleted: false 
        }
      ]
    }
  ];
};

export const PROJECT_GUIDES: ProjectGuide[] = [
  {
    id: '1',
    title: 'Clone de Interface',
    description: 'Recrie uma interface simples usando HTML e CSS.',
    difficulty: 'Fácil',
    techStack: ['HTML5', 'CSS3', 'Flexbox'],
    requirements: ['Header fixo', 'Responsividade'],
    repoUrl: 'https://github.com/topics/clone',
    steps: [
      { id: 'p1-1', title: 'HTML', description: 'Estrutura.', instructions: ['Crie as tags.'], deliverable: 'index.html', validationType: 'manual', isCompleted: false }
    ]
  }
];

export const DAILY_TIPS = [
  "Faça um commit hoje, mesmo que pequeno.",
  "Leia 1 vaga por dia para entender o mercado.",
  "Portfólio vale mais que certificado.",
  "O erro é seu amigo. Leia o console.",
  "Soft skills te contratam, hard skills te mantêm."
];

export const CHAT_INITIAL_MESSAGES: ChatMessage[] = [
  { id: '0', text: "Olá! Sou seu assistente TechPath. Posso analisar seu perfil ou tirar dúvidas. O que precisa?", sender: 'bot', timestamp: Date.now() }
];

// --- PORTFOLIO CONTENT ---

export const PORTFOLIO_CHECKLIST = [
  "Foto de perfil profissional (rosto visível, fundo neutro)",
  "Mini biografia objetiva (Quem sou, O que faço, Tecnologias)",
  "Lista clara de Hard Skills (Linguagens, Frameworks)",
  "Destaque para Soft Skills (Comunicação, Trabalho em equipe)",
  "Pelo menos 3 projetos 'Estrela' (bem documentados)",
  "Link para demonstração ao vivo (Deploy funcional)",
  "README.md completo em cada projeto",
  "Contatos atualizados (LinkedIn, Email)",
  "Design responsivo (funciona no celular)"
];

export const PORTFOLIO_TIPS = [
  { title: "Qualidade > Quantidade", text: "3 projetos completos e bem feitos valem mais que 20 tutoriais inacabados." },
  { title: "O README Vende", text: "Recrutadores leem o README. Explique o problema, a solução e como rodar o projeto." },
  { title: "Seja Fullstack", text: "Mesmo que sua vaga seja front, mostre que entende como o dado chega do back." },
  { title: "Deploy é Vida", text: "Se não tem link para clicar, o recrutador dificilmente vai baixar o código." },
  { title: "Conte uma História", text: "Não jogue código. Explique por que você tomou aquelas decisões técnicas." }
];

export const PORTFOLIO_STEPS = [
  {
    title: "Passo 1: Escolher Projetos Fortes",
    desc: "Selecione projetos que resolvam problemas reais, não apenas exercícios.",
    inst: "Evite 'Calculadora' ou 'To-do List' simples. Prefira E-commerces, Dashboards ou Clones de Apps complexos.",
  },
  {
    title: "Passo 2: Montar o README Perfeito",
    desc: "O documento mais importante do seu repositório.",
    inst: "Inclua: Título, Screenshots/GIFs, Tecnologias usadas, Como rodar localmente e Link do Deploy.",
  },
  {
    title: "Passo 3: Identidade Visual",
    desc: "Seu portfólio é seu produto.",
    inst: "Use um template limpo ou construa o seu. Cores sóbrias, tipografia legível e boa hierarquia.",
  },
  {
    title: "Passo 4: Fazer Deploy",
    desc: "Coloque seus projetos no ar.",
    inst: "Use Vercel ou Netlify para Frontend. Render ou Railway para Backend.",
  },
  {
    title: "Passo 5: Revisão Final",
    desc: "Garanta que tudo funciona.",
    inst: "Clique em todos os links. Teste no celular. Peça para um amigo navegar.",
  }
];

export const COMMON_ERRORS = [
  "Portfólio visualmente poluído ou difícil de navegar.",
  "Links quebrados (Erro 404).",
  "Screenshots com baixa resolução ou distorcidos.",
  "Projetos sem descrição do que fazem.",
  "Falta de informações de contato visíveis."
];

export const RECOMMENDED_PROJECTS_BY_LEVEL: Record<string, RecommendedProject[]> = {
  "Iniciante": [
    { 
      title: "FreeCodeCamp", 
      description: "Sugestão: Construa uma Página Pessoal ou Tributo.",
      level: 'Iniciante',
      techStack: ["HTML", "CSS", "Básico"],
      url: "https://www.freecodecamp.org"
    },
    { 
      title: "Curso em Vídeo", 
      description: "Sugestão: Siga a trilha de HTML5 e JS do Guanabara.",
      level: 'Iniciante',
      techStack: ["Lógica", "Vídeo-aulas"],
      url: "https://www.cursoemvideo.com"
    },
    { 
      title: "CodePen", 
      description: "Sugestão: Crie pequenos snippets (Botões, Cards).",
      level: 'Iniciante',
      techStack: ["CSS", "Playground"],
      url: "https://codepen.io"
    }
  ],
  "Júnior": [
    { 
      title: "Frontend Mentor", 
      description: "Sugestão: Desafios de E-commerce e Dashboards.",
      level: 'Júnior',
      techStack: ["React", "Layout", "Figma"],
      url: "https://www.frontendmentor.io"
    },
    { 
      title: "Public APIs", 
      description: "Sugestão: App de Clima ou Pokedex com API Real.",
      level: 'Júnior',
      techStack: ["Fetch", "Async", "JSON"],
      url: "https://github.com/public-apis/public-apis"
    },
    { 
      title: "DevChallenges", 
      description: "Sugestão: Cat Wiki ou Image Uploader.",
      level: 'Júnior',
      techStack: ["Fullstack", "UI"],
      url: "https://www.devchallenges.io"
    }
  ],
  "Transição": [
    { 
      title: "Frontend Mentor", 
      description: "Sugestão: Clone interfaces complexas (Pixel Perfect).",
      level: 'Transição',
      techStack: ["Advanced CSS", "Acessibilidade"],
      url: "https://www.frontendmentor.io"
    },
    { 
      title: "GitHub", 
      description: "Sugestão: Contribua com Open Source ou estude códigos.",
      level: 'Transição',
      techStack: ["Git", "Code Review"],
      url: "https://github.com"
    },
    { 
      title: "FreeCodeCamp", 
      description: "Sugestão: Projetos de Algoritmos e Dados.",
      level: 'Transição',
      techStack: ["Backend", "Certificações"],
      url: "https://www.freecodecamp.org"
    }
  ]
};

export const USEFUL_LINKS = [
  { name: "GitHub Docs", url: "https://docs.github.com/pt" },
  { name: "Roadmap.sh", url: "https://roadmap.sh" },
  { name: "Curso em Vídeo", url: "https://www.youtube.com/c/CursoemVídeo" },
  { name: "FreeCodeCamp", url: "https://www.freecodecamp.org/" },
  { name: "Vercel Docs", url: "https://vercel.com/docs" }
];
