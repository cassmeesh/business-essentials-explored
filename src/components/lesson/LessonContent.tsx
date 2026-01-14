import { motion } from 'framer-motion';
import { 
  Handshake, Target, Building2, Users, Key, Settings, 
  Clock, RefreshCw, Home, Utensils, TrendingUp, Rocket, 
  Globe, Leaf, Volume2, ChevronDown, Headphones 
} from 'lucide-react';
import { Lesson, ContentSection, AccordionItem } from '@/data/lessons';
import lesson1Audio from '@/assets/lesson1-audio.mp3';
import {
  Accordion,
  AccordionContent,
  AccordionItem as AccordionItemUI,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

interface LessonContentProps {
  lesson: Lesson;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  handshake: Handshake,
  target: Target,
  building: Building2,
  users: Users,
  key: Key,
  settings: Settings,
  clock: Clock,
  refresh: RefreshCw,
  home: Home,
  utensils: Utensils,
  'trending-up': TrendingUp,
  rocket: Rocket,
  globe: Globe,
  leaf: Leaf,
};

function getIcon(iconName: string) {
  return iconMap[iconName] || Target;
}

function renderMarkdown(text: string) {
  return text.split(/(\*\*.*?\*\*)/g).map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="font-semibold text-foreground">{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}

export function LessonContent({ lesson }: LessonContentProps) {
  const renderSection = (section: ContentSection, index: number) => {
    switch (section.type) {
      case 'text':
        return (
          <motion.div
            key={index}
            className="content-block"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <p className="text-foreground leading-relaxed">
              {renderMarkdown(section.content || '')}
            </p>
          </motion.div>
        );

      case 'highlight':
        return (
          <motion.div
            key={index}
            className="highlight-box mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <p className="text-foreground leading-relaxed">
              {renderMarkdown(section.content || '')}
            </p>
          </motion.div>
        );

      case 'list':
        return (
          <motion.div
            key={index}
            className="content-block"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            {section.title && (
              <h3 className="font-display text-lg font-semibold text-foreground mb-4">
                {section.title}
              </h3>
            )}
            <ul className="space-y-2" role="list">
              {(section.items as string[])?.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" aria-hidden="true" />
                  <span className="text-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        );

      case 'accordion':
        return (
          <motion.div
            key={index}
            className="content-block"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            {section.title && (
              <h3 className="font-display text-lg font-semibold text-foreground mb-4">
                {section.title}
              </h3>
            )}
            <Accordion type="single" collapsible className="w-full">
              {(section.items as AccordionItem[])?.map((item, i) => (
                <AccordionItemUI key={i} value={`item-${i}`}>
                  <AccordionTrigger className="text-left font-medium hover:text-primary">
                    {item.title}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {item.content}
                  </AccordionContent>
                </AccordionItemUI>
              ))}
            </Accordion>
          </motion.div>
        );

      case 'comparison':
        const compData = section.data as {
          left: { title: string; description: string; icon: string };
          right: { title: string; description: string; icon: string };
        };
        const LeftIcon = getIcon(compData.left.icon);
        const RightIcon = getIcon(compData.right.icon);

        return (
          <motion.div
            key={index}
            className="mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            {section.title && (
              <h3 className="font-display text-lg font-semibold text-foreground mb-4">
                {section.title}
              </h3>
            )}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="content-block border-t-4 border-primary">
                <div className="flex items-center gap-3 mb-3">
                  <div className="icon-circle">
                    <LeftIcon className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <h4 className="font-display font-semibold text-foreground">
                    {compData.left.title}
                  </h4>
                </div>
                <p className="text-muted-foreground">{compData.left.description}</p>
              </div>
              <div className="content-block border-t-4 border-accent">
                <div className="flex items-center gap-3 mb-3">
                  <div className="icon-circle-accent">
                    <RightIcon className="w-5 h-5 text-accent-foreground" />
                  </div>
                  <h4 className="font-display font-semibold text-foreground">
                    {compData.right.title}
                  </h4>
                </div>
                <p className="text-muted-foreground">{compData.right.description}</p>
              </div>
            </div>
          </motion.div>
        );

      case 'stats':
        const statsData = section.data as {
          items: { label: string; icon: string; description?: string }[];
        };

        return (
          <motion.div
            key={index}
            className="mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            {section.title && (
              <h3 className="font-display text-lg font-semibold text-foreground mb-4">
                {section.title}
              </h3>
            )}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {statsData.items.map((item, i) => {
                const Icon = getIcon(item.icon);
                return (
                  <motion.div
                    key={i}
                    className="stat-card"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="icon-circle mx-auto mb-3">
                      <Icon className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <p className="font-semibold text-foreground">{item.label}</p>
                    {item.description && (
                      <p className="text-xs text-muted-foreground mt-1">
                        {item.description}
                      </p>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        );

      case 'audio':
        return (
          <motion.div
            key={index}
            className="relative overflow-hidden rounded-2xl mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-icon opacity-95" />
            
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
            
            {/* Waveform Decoration */}
            <div className="absolute bottom-4 right-4 flex items-end gap-1 opacity-20">
              {[40, 60, 35, 80, 50, 70, 45, 55, 75, 40, 65, 50].map((h, i) => (
                <div 
                  key={i} 
                  className="w-1 bg-white rounded-full"
                  style={{ height: `${h}px` }}
                />
              ))}
            </div>
            
            <div className="relative z-10 p-6 md:p-8">
              {/* Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <Headphones className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-white">
                    Listen & Learn
                  </h3>
                </div>
              </div>
              
              {/* Audio Player Container */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-4">
                <audio 
                  controls 
                  className="w-full [&::-webkit-media-controls-panel]:bg-transparent"
                  src={lesson1Audio}
                >
                  Your browser does not support the audio element.
                </audio>
              </div>
              
              {/* Transcript Toggle */}
              {section.transcript && (
                <Collapsible>
                  <CollapsibleTrigger className="flex items-center gap-2 text-white/90 hover:text-white transition-colors group">
                    <ChevronDown className="w-4 h-4 transition-transform group-data-[state=open]:rotate-180" />
                    <span className="text-sm font-medium">View Transcript</span>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mt-3 border border-white/10">
                      <p className="text-white/90 leading-relaxed whitespace-pre-line text-sm">
                        {section.transcript}
                      </p>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              )}
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-2">
      {lesson.content.sections.map((section, index) => renderSection(section, index))}
    </div>
  );
}