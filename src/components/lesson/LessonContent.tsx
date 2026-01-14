import { motion } from 'framer-motion';
import { 
  Handshake, Target, Building2, Users, Key, Settings, 
  Clock, RefreshCw, Home, Utensils, TrendingUp, Rocket, 
  Globe, Leaf 
} from 'lucide-react';
import { Lesson, ContentSection, AccordionItem } from '@/data/lessons';
import { AudioPlayer } from './AudioPlayer';
import {
  Accordion,
  AccordionContent,
  AccordionItem as AccordionItemUI,
  AccordionTrigger,
} from '@/components/ui/accordion';

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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <AudioPlayer 
              src={section.audioSrc || ''} 
              title={section.title}
              transcript={section.transcript}
            />
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