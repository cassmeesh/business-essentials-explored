import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Header } from './layout/Header';
import { LessonSidebar } from './layout/LessonSidebar';
import { LessonView } from './lesson/LessonView';
import { lessons } from '@/data/lessons';
import { useCourseProgress } from '@/hooks/useCourseProgress';
import { Button } from '@/components/ui/button';

interface CourseViewProps {
  onExit: () => void;
}

export function CourseView({ onExit }: CourseViewProps) {
  const {
    progress,
    completeLesson,
    setCurrentLesson,
    isLessonAccessible,
  } = useCourseProgress();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const currentLesson = lessons.find((l) => l.id === progress.currentLesson)!;
  const lessonProgress = progress.lessons.find(
    (l) => l.lessonId === progress.currentLesson
  );

  const handleLessonComplete = (score: number) => {
    completeLesson(progress.currentLesson, score);
  };

  const handleSelectLesson = (lessonId: number) => {
    setCurrentLesson(lessonId);
    setSidebarOpen(false);
  };

  const handlePrevious = () => {
    if (progress.currentLesson > 1) {
      setCurrentLesson(progress.currentLesson - 1);
    }
  };

  const handleNext = () => {
    if (progress.currentLesson < 8 && isLessonAccessible(progress.currentLesson + 1)) {
      setCurrentLesson(progress.currentLesson + 1);
    }
  };

  // Close sidebar on escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSidebarOpen(false);
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header progress={progress.overallProgress} />

      {/* Mobile Menu Toggle */}
      <div className="lg:hidden fixed bottom-4 right-4 z-50">
        <Button
          size="icon"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="w-14 h-14 rounded-full shadow-elevated bg-primary hover:bg-primary/90"
          aria-label={sidebarOpen ? "Close menu" : "Open menu"}
        >
          {sidebarOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </Button>
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar - Desktop */}
          <div className="hidden lg:block">
            <LessonSidebar
              progress={progress}
              currentLesson={progress.currentLesson}
              onSelectLesson={handleSelectLesson}
              isLessonAccessible={isLessonAccessible}
            />
          </div>

          {/* Sidebar - Mobile */}
          <AnimatePresence>
            {sidebarOpen && (
              <motion.div
                className="fixed top-0 left-0 h-full w-80 max-w-[85vw] bg-background z-50 lg:hidden overflow-y-auto"
                initial={{ x: -320 }}
                animate={{ x: 0 }}
                exit={{ x: -320 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <div className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-display font-bold text-foreground">
                      Course Menu
                    </h2>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setSidebarOpen(false)}
                      aria-label="Close menu"
                    >
                      <X className="w-5 h-5" />
                    </Button>
                  </div>
                  <LessonSidebar
                    progress={progress}
                    currentLesson={progress.currentLesson}
                    onSelectLesson={handleSelectLesson}
                    isLessonAccessible={isLessonAccessible}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              <LessonView
                key={currentLesson.id}
                lesson={currentLesson}
                isCompleted={lessonProgress?.completed ?? false}
                onComplete={handleLessonComplete}
                onPrevious={handlePrevious}
                onNext={handleNext}
                hasPrevious={progress.currentLesson > 1}
                hasNext={
                  progress.currentLesson < 8 &&
                  isLessonAccessible(progress.currentLesson + 1)
                }
                onExit={onExit}
              />
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  );
}