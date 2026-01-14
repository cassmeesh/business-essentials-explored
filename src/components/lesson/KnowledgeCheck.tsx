import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, Brain, ArrowRight } from 'lucide-react';
import { QuizQuestion } from '@/data/lessons';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface KnowledgeCheckProps {
  questions: QuizQuestion[];
  onComplete: (score: number) => void;
}

export function KnowledgeCheck({ questions, onComplete }: KnowledgeCheckProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  const question = questions[currentQuestion];
  const isCorrect = selectedAnswer === question.correctIndex;
  const isLastQuestion = currentQuestion === questions.length - 1;

  const handleSubmit = () => {
    if (selectedAnswer === null) return;
    setIsSubmitted(true);
    if (isCorrect) {
      setCorrectCount((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (isLastQuestion) {
      const finalScore = Math.round(
        ((correctCount + (isCorrect ? 1 : 0)) / questions.length) * 100
      );
      onComplete(finalScore);
    } else {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsSubmitted(false);
    }
  };

  return (
    <motion.div
      className="knowledge-check"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="icon-circle">
          <Brain className="w-5 h-5 text-primary-foreground" />
        </div>
        <div>
          <h3 className="font-display text-lg font-bold text-foreground">
            Knowledge Check
          </h3>
          <p className="text-sm text-muted-foreground">
            Question {currentQuestion + 1} of {questions.length}
          </p>
        </div>
      </div>

      <div className="mb-4 progress-bar">
        <motion.div
          className="progress-fill"
          initial={{ width: 0 }}
          animate={{
            width: `${((currentQuestion + (isSubmitted ? 1 : 0)) / questions.length) * 100}%`,
          }}
        />
      </div>

      <p className="text-foreground font-medium text-lg mb-6">
        {question.question}
      </p>

      <div className="space-y-3 mb-6" role="radiogroup" aria-label="Answer options">
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer === index;
          const showCorrect = isSubmitted && index === question.correctIndex;
          const showIncorrect = isSubmitted && isSelected && !isCorrect;

          return (
            <motion.button
              key={index}
              onClick={() => !isSubmitted && setSelectedAnswer(index)}
              disabled={isSubmitted}
              className={cn(
                "quiz-option",
                isSelected && !isSubmitted && "quiz-option-selected",
                showCorrect && "quiz-option-correct",
                showIncorrect && "quiz-option-incorrect"
              )}
              whileHover={!isSubmitted ? { scale: 1.01 } : {}}
              whileTap={!isSubmitted ? { scale: 0.99 } : {}}
              role="radio"
              aria-checked={isSelected}
              aria-disabled={isSubmitted}
            >
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0",
                    isSelected && !isSubmitted && "border-primary bg-primary/10",
                    showCorrect && "border-success bg-success text-success-foreground",
                    showIncorrect && "border-destructive bg-destructive text-destructive-foreground",
                    !isSelected && !isSubmitted && "border-border"
                  )}
                >
                  {showCorrect && <CheckCircle2 className="w-4 h-4" aria-hidden="true" />}
                  {showIncorrect && <XCircle className="w-4 h-4" aria-hidden="true" />}
                </div>
                <span className="text-foreground">{option}</span>
              </div>
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        {isSubmitted && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className={cn(
              "p-4 rounded-lg mb-6",
              isCorrect ? "bg-success-light" : "bg-destructive/10"
            )}
          >
            <div className="flex items-start gap-3">
              {isCorrect ? (
                <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-0.5" aria-hidden="true" />
              ) : (
                <XCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" aria-hidden="true" />
              )}
              <p className="text-foreground text-sm">
                {isCorrect ? question.feedback.correct : question.feedback.incorrect}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex justify-end gap-3">
        {!isSubmitted ? (
          <Button
            onClick={handleSubmit}
            disabled={selectedAnswer === null}
            className="bg-primary hover:bg-primary/90"
          >
            Submit Answer
          </Button>
        ) : (
          <Button onClick={handleNext} className="bg-primary hover:bg-primary/90">
            {isLastQuestion ? "Complete Lesson" : "Next Question"}
            <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
          </Button>
        )}
      </div>
    </motion.div>
  );
}