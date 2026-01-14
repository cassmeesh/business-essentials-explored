import { BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeaderProps {
  progress: number;
}

export function Header({ progress }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <motion.div 
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="icon-circle">
              <BookOpen className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-display text-lg font-bold text-foreground">
                How We Make Money
              </h1>
              <p className="text-xs text-muted-foreground">
                Stoneridge Software & Levridge
              </p>
            </div>
          </motion.div>

          <motion.div 
            className="flex items-center gap-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="text-right hidden sm:block">
              <p className="text-xs text-muted-foreground">Course Progress</p>
              <p className="text-sm font-semibold text-foreground">{progress}% Complete</p>
            </div>
            <div className="w-24 sm:w-32 progress-bar">
              <motion.div 
                className="progress-fill"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </header>
  );
}