import { useState } from 'react';
import { motion } from 'framer-motion';
import { Shuffle, CheckCircle2, XCircle, ArrowRight } from 'lucide-react';
import { MatchingItem } from '@/data/lessons';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface MatchingExerciseProps {
  items: MatchingItem[];
  onComplete: () => void;
}

export function MatchingExercise({ items, onComplete }: MatchingExerciseProps) {
  const [selectedTerm, setSelectedTerm] = useState<string | null>(null);
  const [matches, setMatches] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [shuffledDefinitions] = useState(() =>
    [...items].sort(() => Math.random() - 0.5)
  );

  const handleTermClick = (termId: string) => {
    if (isSubmitted) return;
    setSelectedTerm(termId);
  };

  const handleDefinitionClick = (defId: string) => {
    if (isSubmitted || !selectedTerm) return;
    setMatches((prev) => ({
      ...prev,
      [selectedTerm]: defId,
    }));
    setSelectedTerm(null);
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  const isMatchCorrect = (termId: string) => {
    const matchedDefId = matches[termId];
    return matchedDefId === termId;
  };

  const allMatched = Object.keys(matches).length === items.length;
  const allCorrect = items.every((item) => isMatchCorrect(item.id));

  return (
    <motion.div
      className="knowledge-check"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="icon-circle-accent">
          <Shuffle className="w-5 h-5 text-accent-foreground" />
        </div>
        <div>
          <h3 className="font-display text-lg font-bold text-foreground">
            Matching Exercise
          </h3>
          <p className="text-sm text-muted-foreground">
            Match each term with its correct definition
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div>
          <p className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
            Terms
          </p>
          <div className="space-y-2">
            {items.map((item) => {
              const isMatched = matches[item.id];
              const isSelected = selectedTerm === item.id;
              const showResult = isSubmitted && isMatched;

              return (
                <motion.button
                  key={item.id}
                  onClick={() => handleTermClick(item.id)}
                  disabled={isSubmitted}
                  className={cn(
                    "w-full text-left p-3 rounded-lg border-2 transition-all",
                    isSelected && "border-primary bg-primary/10",
                    isMatched && !isSubmitted && "border-accent bg-accent/10",
                    showResult && isMatchCorrect(item.id) && "border-success bg-success-light",
                    showResult && !isMatchCorrect(item.id) && "border-destructive bg-destructive/10",
                    !isSelected && !isMatched && "border-border hover:border-primary/50"
                  )}
                  whileHover={!isSubmitted ? { scale: 1.02 } : {}}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-foreground">{item.term}</span>
                    {showResult && (
                      isMatchCorrect(item.id) ? (
                        <CheckCircle2 className="w-5 h-5 text-success" />
                      ) : (
                        <XCircle className="w-5 h-5 text-destructive" />
                      )
                    )}
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
            Definitions
          </p>
          <div className="space-y-2">
            {shuffledDefinitions.map((item) => {
              const isMatchedTo = Object.entries(matches).find(
                ([, defId]) => defId === item.id
              )?.[0];
              const isDisabled = isSubmitted || !!isMatchedTo;

              return (
                <motion.button
                  key={item.id}
                  onClick={() => handleDefinitionClick(item.id)}
                  disabled={isDisabled}
                  className={cn(
                    "w-full text-left p-3 rounded-lg border-2 transition-all",
                    selectedTerm && !isMatchedTo && "border-accent hover:bg-accent/10",
                    isMatchedTo && "border-accent/50 bg-accent/5 opacity-70",
                    !selectedTerm && !isMatchedTo && "border-border"
                  )}
                  whileHover={!isDisabled && selectedTerm ? { scale: 1.02 } : {}}
                >
                  <span className="text-foreground text-sm">{item.definition}</span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      {isSubmitted && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className={cn(
            "p-4 rounded-lg mb-6",
            allCorrect ? "bg-success-light" : "bg-warning/10"
          )}
        >
          <p className="text-foreground">
            {allCorrect
              ? "Great job! You matched all terms correctly."
              : "Some matches were incorrect. Review the content and try again next time!"}
          </p>
        </motion.div>
      )}

      <div className="flex justify-end gap-3">
        {!isSubmitted ? (
          <Button
            onClick={handleSubmit}
            disabled={!allMatched}
            className="bg-primary hover:bg-primary/90"
          >
            Check Answers
          </Button>
        ) : (
          <Button onClick={onComplete} className="bg-primary hover:bg-primary/90">
            Continue
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        )}
      </div>
    </motion.div>
  );
}