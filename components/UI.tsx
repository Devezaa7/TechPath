
import React, { useEffect, useState, useRef } from 'react';
import { LucideIcon, X, Send, Bot, CheckSquare, Square, ChevronDown, ChevronUp, Link as LinkIcon, FileCode, CheckCircle, Lock, Sparkles, Clock, BookOpen, PlayCircle } from 'lucide-react';
import { ChatMessage, RoadmapStep } from '../types';

// --- Types ---
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'success' | 'ai';
  fullWidth?: boolean;
  icon?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

interface CardProps {
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
  type?: 'success' | 'error';
}

// --- Components ---

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth, 
  icon,
  size = 'md',
  className = '', 
  ...props 
}) => {
  const baseStyles = "rounded-xl font-semibold transition-all duration-200 active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100";
  
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-6 py-3",
    lg: "px-8 py-4 text-lg"
  };

  const variants = {
    primary: "bg-gradient-to-r from-neonBlue to-softPurple text-white shadow-lg shadow-neonBlue/20 hover:shadow-neonBlue/40",
    secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300 dark:bg-darkSurface dark:text-white dark:hover:bg-gray-800 border border-transparent dark:border-gray-700",
    outline: "bg-transparent border-2 border-neonBlue text-neonBlue hover:bg-neonBlue/10",
    ghost: "bg-transparent text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white",
    success: "bg-green-500 text-white hover:bg-green-600 shadow-lg shadow-green-500/20",
    ai: "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 border border-purple-400/30"
  };

  return (
    <button 
      className={`${baseStyles} ${sizes[size]} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {icon && <span className="flex items-center justify-center">{icon}</span>}
      {children}
    </button>
  );
};

export const Card: React.FC<CardProps> = ({ children, className = '', onClick }) => {
  return (
    <div 
      onClick={onClick}
      className={`bg-lightCard text-lightText dark:bg-darkSurface dark:text-darkText border border-lightBorder dark:border-gray-800 rounded-2xl p-4 md:p-6 shadow-sm hover:shadow-md transition-shadow ${onClick ? 'cursor-pointer hover:border-gray-400 dark:hover:border-gray-600 transition-colors' : ''} ${className}`}
    >
      {children}
    </div>
  );
};

export const Input: React.FC<InputProps> = ({ label, className = '', type, ...props }) => {
  if (type === 'range') {
    return (
       <div className="w-full">
         {label && <label className="block text-sm text-gray-500 dark:text-gray-400 mb-2">{label}</label>}
         <input 
          type="range"
          className={`w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-neonBlue ${className}`}
          {...props}
        />
       </div>
    )
  }
  return (
    <div className="w-full">
      {label && <label className="block text-sm text-gray-500 dark:text-gray-400 mb-2">{label}</label>}
      <input 
        type={type}
        className={`w-full bg-white dark:bg-darkSurface border border-lightBorder dark:border-gray-700 rounded-xl px-4 py-3 text-lightText dark:text-darkText focus:outline-none focus:border-neonBlue focus:ring-1 focus:ring-neonBlue transition-all placeholder-gray-400 ${className}`}
        {...props}
      />
    </div>
  );
};

export const Badge: React.FC<{ children?: React.ReactNode; color?: string }> = ({ children, color = 'bg-neonBlue' }) => {
  const isCustom = color.includes('bg-');
  return (
    <span className={`${color} ${isCustom ? 'bg-opacity-20' : ''} text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wider ${color === 'bg-neonBlue' ? 'text-neonBlue' : 'text-gray-700 dark:text-gray-300'}`}>
      {children}
    </span>
  );
};

export const NavItem: React.FC<{ 
  icon: LucideIcon; 
  label: string; 
  isActive: boolean; 
  onClick: () => void; 
}> = ({ icon: Icon, label, isActive, onClick }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center gap-1 p-2 w-full md:w-auto md:flex-row md:gap-3 md:px-4 md:py-3 md:rounded-xl transition-colors ${
      isActive ? 'text-neonBlue md:bg-neonBlue/10' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
    }`}
  >
    <Icon size={24} />
    <span className="text-[10px] md:text-sm font-medium">{label}</span>
  </button>
);

export const Toast: React.FC<ToastProps> = ({ message, isVisible, onClose, type = 'success' }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className={`fixed top-4 right-4 z-[60] flex items-center gap-3 px-6 py-4 rounded-xl shadow-2xl animate-pulse-slow ${type === 'success' ? 'bg-green-500/90 text-white' : 'bg-red-500/90 text-white'}`}>
      <span className="font-bold">{message}</span>
      <button onClick={onClose}><X size={18} /></button>
    </div>
  );
};

export const VideoPlayer: React.FC<{ videoId: string }> = ({ videoId }) => (
  <div className="relative w-full pb-[56.25%] bg-black rounded-xl overflow-hidden shadow-lg border border-gray-800">
    <iframe
      className="absolute top-0 left-0 w-full h-full"
      src={`https://www.youtube.com/embed/${videoId}`}
      title="YouTube video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  </div>
);

export const CheckboxList: React.FC<{ items: string[] }> = ({ items }) => {
  const [checked, setChecked] = useState<number[]>([]);
  const toggle = (index: number) => {
    if (checked.includes(index)) {
      setChecked(checked.filter(i => i !== index));
    } else {
      setChecked([...checked, index]);
    }
  };
  return (
    <div className="space-y-3">
      {items.map((item, idx) => (
        <div key={idx} onClick={() => toggle(idx)} className="flex items-start gap-3 p-3 rounded-lg cursor-pointer bg-lightCard dark:bg-darkSurface border border-lightBorder dark:border-gray-700">
          <div className="mt-1">{checked.includes(idx) ? <CheckSquare size={20} className="text-neonBlue"/> : <Square size={20} className="text-gray-400"/>}</div>
          <span className={checked.includes(idx) ? 'line-through text-gray-500' : ''}>{item}</span>
        </div>
      ))}
    </div>
  );
};

export const StepCard: React.FC<{
  step: RoadmapStep;
  index: number;
  onComplete: (link?: string) => void;
  t: any; // Translation object passed from parent
}> = ({ step, index, onComplete, t }) => {
  const [linkInput, setLinkInput] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false); // Progressive Disclosure State

  const handleAction = () => {
    if (step.validationType === 'link' && linkInput.length < 5) {
      alert("Por favor, insira um link válido.");
      return;
    }
    if (step.validationType === 'checkbox' && !isChecked) {
      alert("Por favor, marque a caixa de confirmação.");
      return;
    }
    onComplete(linkInput);
  };

  return (
    <div className={`rounded-2xl border transition-all duration-300 overflow-hidden ${step.isCompleted ? 'border-green-500 bg-green-50 dark:bg-green-900/10' : 'border-lightBorder dark:border-gray-700 bg-white dark:bg-darkSurface'}`}>
      
      {/* Header - Always Visible */}
      <div className="p-5 flex items-start gap-4 cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
         <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 mt-1 ${step.isCompleted ? 'bg-green-500 text-white' : 'bg-neonBlue text-white'}`}>
            {step.isCompleted ? <CheckCircle size={18}/> : index + 1}
         </div>
         <div className="flex-1">
             <div className="flex justify-between items-center mb-1">
                <h4 className="font-bold text-lg text-lightText dark:text-white leading-tight">{step.title}</h4>
                {isExpanded ? <ChevronUp className="text-gray-400"/> : <ChevronDown className="text-gray-400"/>}
             </div>
             
             {/* Objective Summary (Progressive) */}
             <div className="flex flex-col gap-1">
                <p className="text-sm font-semibold text-neonBlue uppercase tracking-wider text-[10px]">{t.objective}</p>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{step.description}</p>
             </div>

             {/* Metadata Bar */}
             {!isExpanded && (
                 <div className="mt-3 flex items-center gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1"><Clock size={12}/> {t.timeEstimate}: 20 min</span>
                    <span className="flex items-center gap-1"><BookOpen size={12}/> {step.instructions.length} steps</span>
                 </div>
             )}
         </div>
      </div>

      {/* Detailed Content - Collapsible */}
      {isExpanded && (
          <div className="px-5 pb-5 ml-12 border-l-2 border-gray-100 dark:border-gray-800 space-y-4 animate-in fade-in slide-in-from-top-2">
            
            {/* Instructions Accordion */}
            <div className="bg-lightCard dark:bg-charcoal p-4 rounded-xl">
              <p className="text-xs font-bold text-gray-500 uppercase mb-3 flex items-center gap-2"><Sparkles size={12} className="text-yellow-500"/> {t.instructionsTitle}</p>
              <ul className="space-y-2">
                 {step.instructions.map((inst, i) => (
                    <li key={i} className="flex gap-2 text-sm text-gray-700 dark:text-gray-200">
                        <span className="text-neonBlue font-bold">•</span>
                        {inst}
                    </li>
                 ))}
              </ul>
            </div>

            {step.example && (
               <div>
                 <p className="text-xs font-bold text-gray-500 uppercase mb-2">{t.exampleTitle}</p>
                 <div className="bg-gray-900 text-green-400 p-3 rounded-lg text-xs font-mono border border-gray-700 overflow-x-auto">
                   {step.example}
                 </div>
               </div>
            )}

            {/* Action Area */}
            <div className="mt-2 pt-4 border-t border-lightBorder dark:border-gray-700">
               <p className="text-sm font-bold mb-3 flex items-center gap-2">
                 <span className="text-neonBlue">{t.stepDeliverable}:</span> {step.deliverable}
               </p>
               
               {!step.isCompleted && (
                 <div className="space-y-3">
                   {step.validationType === 'link' && (
                     <Input 
                       placeholder="https://..." 
                       value={linkInput}
                       onChange={(e) => setLinkInput(e.target.value)}
                     />
                   )}
                   {step.validationType === 'checkbox' && (
                     <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 border border-transparent hover:border-gray-200 dark:hover:border-gray-700 transition-all">
                        <div onClick={() => setIsChecked(!isChecked)} className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${isChecked ? 'bg-neonBlue border-neonBlue' : 'border-gray-400'}`}>
                          {isChecked && <CheckSquare size={14} className="text-white"/>}
                        </div>
                        <span className="text-sm select-none">Confirm action</span>
                     </label>
                   )}
                   <Button fullWidth size="md" variant="primary" onClick={handleAction}>
                     {step.validationType === 'manual' ? t.stepMarkDone : t.submit}
                   </Button>
                 </div>
               )}
               {step.isCompleted && (
                 <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center gap-2 text-green-700 dark:text-green-300 font-bold text-sm">
                   <CheckCircle size={18}/> {t.stepCompleted}
                 </div>
               )}
            </div>
            
            <Button variant="ghost" size="sm" fullWidth onClick={() => setIsExpanded(false)} className="mt-2">
                <ChevronUp size={16}/> {t.hideInstructions}
            </Button>
          </div>
      )}
      
      {!isExpanded && !step.isCompleted && (
           <div className="px-5 pb-5 pl-14">
               <Button variant="secondary" size="sm" onClick={() => setIsExpanded(true)}>
                   {t.viewInstructions}
               </Button>
           </div>
      )}
    </div>
  );
};
