import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Clock, CheckCircle2, BookOpen } from 'lucide-react';
import { Lesson } from '@/data/lessons';
import { LessonContent } from './LessonContent';
import { KnowledgeCheck } from './KnowledgeCheck';
import { MatchingExercise } from './MatchingExercise';
import { AudioPlayer } from './AudioPlayer';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type ViewState = 'content' | 'quiz' | 'matching' | 'complete';

interface LessonViewProps {
  lesson: Lesson;
  isCompleted: boolean;
  onComplete: (score: number) => void;
  onPrevious: () => void;
  onNext: () => void;
  hasPrevious: boolean;
  hasNext: boolean;
}

export function LessonView({
  lesson,
  isCompleted,
  onComplete,
  onPrevious,
  onNext,
  hasPrevious,
  hasNext,
}: LessonViewProps) {
  const [viewState, setViewState] = useState<ViewState>(
    isCompleted ? 'complete' : 'content'
  );
  const [quizScore, setQuizScore] = useState<number | null>(null);

  const hasMatching = lesson.matching && lesson.matching.length > 0;

  const handleStartQuiz = () => {
    setViewState('quiz');
  };

  const handleQuizComplete = (score: number) => {
    setQuizScore(score);
    if (hasMatching) {
      setViewState('matching');
    } else {
      setViewState('complete');
      onComplete(score);
    }
  };

  const handleMatchingComplete = () => {
    setViewState('complete');
    onComplete(quizScore || 100);
  };

  const handleReview = () => {
    setViewState('content');
  };

  return (
    <motion.div
      key={lesson.id}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex-1"
    >
      {/* Lesson Header */}
      <div className="bg-card rounded-xl p-6 mb-6 shadow-card">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded-full">
                Lesson {lesson.id}
              </span>
              {isCompleted && (
                <span className="text-xs font-semibold text-success bg-success-light px-2 py-1 rounded-full flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  Completed
                </span>
              )}
            </div>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
              {lesson.title}
            </h2>
            <p className="text-muted-foreground mt-2">{lesson.description}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{lesson.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <BookOpen className="w-4 h-4" />
            <span>{lesson.quiz.length} question{lesson.quiz.length !== 1 ? 's' : ''}</span>
          </div>
        </div>
      </div>

      {/* View State Content */}
      <AnimatePresence mode="wait">
        {viewState === 'content' && (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {lesson.audioUrl && (
              <AudioPlayer src={lesson.audioUrl} title="Listen to Lesson" />
            )}
            <LessonContent lesson={lesson} />

            <div className="mt-8 flex justify-center">
              <Button
                onClick={handleStartQuiz}
                size="lg"
                className="bg-primary hover:bg-primary/90"
              >
                Take Knowledge Check
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </motion.div>
        )}

        {viewState === 'quiz' && (
          <motion.div
            key="quiz"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <KnowledgeCheck
              questions={lesson.quiz}
              onComplete={handleQuizComplete}
            />
          </motion.div>
        )}

        {viewState === 'matching' && lesson.matching && (
          <motion.div
            key="matching"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <MatchingExercise
              items={lesson.matching}
              onComplete={handleMatchingComplete}
            />
          </motion.div>
        )}

        {viewState === 'complete' && (
          <motion.div
            key="complete"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-12"
          >
            <motion.div
              className="w-20 h-20 rounded-full bg-success mx-auto mb-6 flex items-center justify-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            >
              <CheckCircle2 className="w-10 h-10 text-success-foreground" />
            </motion.div>

            <h3 className="font-display text-2xl font-bold text-foreground mb-2">
              Lesson Complete!
            </h3>
            <p className="text-muted-foreground mb-8">
              You've successfully completed this lesson.
              {quizScore !== null && ` Quiz Score: ${quizScore}%`}
            </p>

            <div className="flex flex-wrap justify-center gap-3">
              <Button variant="outline" onClick={handleReview}>
                Review Content
              </Button>
              {hasNext && (
                <Button onClick={onNext} className="bg-primary hover:bg-primary/90">
                  Next Lesson
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation Footer */}
      <div className={cn(
        "mt-8 pt-6 border-t border-border flex justify-between",
        viewState !== 'content' && viewState !== 'complete' && "hidden"
      )}>
        <Button
          variant="outline"
          onClick={onPrevious}
          disabled={!hasPrevious}
          className={cn(!hasPrevious && "invisible")}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Previous
        </Button>

        {isCompleted && viewState === 'content' && (
          <Button
            onClick={onNext}
            disabled={!hasNext}
            className="bg-primary hover:bg-primary/90"
          >
            Next Lesson
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        )}
      </div>
    </motion.div>
  );
}