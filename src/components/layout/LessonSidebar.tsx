import { motion } from 'framer-motion';
import { Check, Lock, ChevronRight, Clock } from 'lucide-react';
import { lessons } from '@/data/lessons';
import { CourseProgress } from '@/hooks/useCourseProgress';
import { cn } from '@/lib/utils';

interface LessonSidebarProps {
  progress: CourseProgress;
  currentLesson: number;
  onSelectLesson: (lessonId: number) => void;
  isLessonAccessible: (lessonId: number) => boolean;
}

export function LessonSidebar({
  progress,
  currentLesson,
  onSelectLesson,
  isLessonAccessible,
}: LessonSidebarProps) {
  return (
    <aside className="w-full lg:w-80 bg-card rounded-xl p-4 lg:p-6 shadow-card h-fit lg:sticky lg:top-24">
      <h2 className="font-display text-lg font-bold text-foreground mb-4">
        Course Outline
      </h2>
      
      <nav className="space-y-2" role="navigation" aria-label="Course lessons">
        {lessons.map((lesson, index) => {
          const lessonProgress = progress.lessons.find(
            (l) => l.lessonId === lesson.id
          );
          const isCompleted = lessonProgress?.completed ?? false;
          const isCurrent = lesson.id === currentLesson;
          const isAccessible = isLessonAccessible(lesson.id);

          return (
            <motion.button
              key={lesson.id}
              onClick={() => isAccessible && onSelectLesson(lesson.id)}
              disabled={!isAccessible}
              className={cn(
                "w-full text-left p-3 rounded-lg transition-all duration-200 group",
                "flex items-center gap-3",
                isCompleted && "lesson-card-complete bg-success-light/30",
                isCurrent && !isCompleted && "lesson-card-current bg-primary/5",
                !isAccessible && "opacity-50 cursor-not-allowed",
                isAccessible && !isCurrent && !isCompleted && "hover:bg-secondary"
              )}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              aria-current={isCurrent ? "step" : undefined}
              aria-disabled={!isAccessible}
            >
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-semibold",
                  isCompleted && "bg-success text-success-foreground",
                  isCurrent && !isCompleted && "bg-primary text-primary-foreground",
                  !isCompleted && !isCurrent && isAccessible && "bg-secondary text-secondary-foreground",
                  !isAccessible && "bg-muted text-muted-foreground"
                )}
              >
                {isCompleted ? (
                  <Check className="w-4 h-4" aria-hidden="true" />
                ) : !isAccessible ? (
                  <Lock className="w-3 h-3" aria-hidden="true" />
                ) : (
                  lesson.id
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <p
                  className={cn(
                    "text-sm font-medium truncate",
                    isCurrent ? "text-primary" : "text-foreground"
                  )}
                >
                  {lesson.shortTitle}
                </p>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" aria-hidden="true" />
                  <span>{lesson.duration}</span>
                </div>
              </div>

              {isAccessible && (
                <ChevronRight
                  className={cn(
                    "w-4 h-4 text-muted-foreground transition-transform",
                    "group-hover:translate-x-1"
                  )}
                  aria-hidden="true"
                />
              )}
            </motion.button>
          );
        })}
      </nav>
    </aside>
  );
}