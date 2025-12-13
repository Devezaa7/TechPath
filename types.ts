
export enum Language {
  PT = 'PT',
  EN = 'EN',
  ES = 'ES'
}

export enum Theme {
  DARK = 'dark',
  LIGHT = 'light',
  AUTO = 'auto'
}

export enum AppScreen {
  WELCOME = 'WELCOME',
  LOGIN = 'LOGIN',
  CREATE_ACCOUNT = 'CREATE_ACCOUNT',
  DIAGNOSIS = 'DIAGNOSIS',
  DASHBOARD = 'DASHBOARD',
  ROADMAP = 'ROADMAP',
  PORTFOLIO = 'PORTFOLIO',
  JOBS = 'JOBS',
  CONTENT = 'CONTENT',
  GAMIFICATION = 'GAMIFICATION',
  COMMUNITY = 'COMMUNITY',
  TOOLS = 'TOOLS',
  SETTINGS = 'SETTINGS',
  FEEDBACK = 'FEEDBACK',
  MENTORSHIP = 'MENTORSHIP',
  NEWS = 'NEWS',
  TASK_DETAILS = 'TASK_DETAILS',
  PROJECT_DETAILS = 'PROJECT_DETAILS',
  JOB_DETAILS = 'JOB_DETAILS',
  AI_CHAT = 'AI_CHAT'
}

export interface UserProfile {
  name: string;
  email: string;
  level: string;
  xp: number;
  streak: number;
  roadmapProgress: number;
  language: Language;
  avatar?: string;
}

export type SimpleValidationType = 'manual' | 'link' | 'checkbox';

export interface RoadmapStep {
  id: string;
  title: string;
  description: string;
  instructions: string[];
  example?: string;
  deliverable: string;
  validationType: SimpleValidationType;
  isCompleted: boolean;
  userLink?: string;
}

export interface RoadmapItem {
  id: string;
  title: string;
  description: string;
  status: 'locked' | 'active' | 'completed';
  type: 'video' | 'project' | 'reading' | 'soft-skill';
  category?: 'tech' | 'soft';
  videoId?: string; 
  steps: RoadmapStep[];
  duration?: string;
}

export interface ProjectGuide {
  id: string;
  title: string;
  description: string;
  difficulty: 'Fácil' | 'Médio' | 'Difícil';
  techStack: string[];
  requirements: string[];
  repoUrl: string;
  demoUrl?: string;
  steps: RoadmapStep[];
}

export interface RecommendedProject {
  title: string;
  description: string;
  level: 'Iniciante' | 'Júnior' | 'Transição';
  techStack: string[];
  url: string;
}

export interface Job {
  id: string;
  title: string;
  company: string; // Must be fictional
  location: string;
  type: string; 
  tags: string[];
  level: 'Estágio' | 'Júnior' | 'Trainee' | 'Pleno';
  platform: 'Interna'; // Always Internal
  url: string; // Format: https://app.exemplo.com/vaga/ID
  description?: string;
  requirements?: string[];
  salary?: string;
  // AI Specific fields
  matchScore?: number;
  matchReason?: string;
  missingSkills?: string[];
}

export interface PortfolioAnalysisResult {
  strengths: string[];
  weaknesses: string[];
  complexityLevel: 'Iniciante' | 'Intermediário' | 'Avançado';
  score: number; // 0-100
  suggestions: string[];
  linkedinPost: string;
}

export type CommunityTopic = 'Dúvidas' | 'Projetos' | 'Compartilhamentos' | 'Vagas';

export interface Post {
  id: string;
  author: string;
  role: string;
  topic: CommunityTopic;
  content: string;
  likes: number;
  comments: number;
  timestamp: string;
}

export interface NewsItem {
  id: string;
  source: string;
  title: string;
  summary: string;
  date: string;
  url: string;
  imageUrl?: string; 
}

export interface Mentor {
  id: string;
  name: string;
  role: string;
  company: string;
  expertise: string[];
  available: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: number;
}
