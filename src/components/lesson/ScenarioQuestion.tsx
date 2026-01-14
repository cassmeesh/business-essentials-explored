import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Lightbulb, CheckCircle2, XCircle, ArrowRight, Building2, Leaf 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ScenarioQuestionProps {
  onComplete: () => void;
}

const scenario = {
  title: "Real-World Scenario",
  situation: `A mid-sized grain cooperative in the Midwest needs help managing their commodity accounting, grain trading, and patronage tracking. They already use Microsoft Dynamics 365 for their core financials but need specialized agriculture features.

They're evaluating two options:
- Hire consultants to build custom solutions on top of Dynamics 365
- Adopt a purpose-built platform designed for agribusinesses`,
  question: "Which company would be PRIMARILY involved in providing the specialized agriculture platform, and why?",
  options: [
    {
      company: "Stoneridge Software",
      icon: Building2,
      answer: "They would build custom consulting solutions specific to this client's needs.",
      isCorrect: false,
    },
    {
      company: "Levridge",
      icon: Leaf,
      answer: "They offer a purpose-built agriculture platform with commodity accounting, grain trading, and patronage features already built in.",
      isCorrect: true,
    },
  ],
  feedback: {
    correct: "Exactly right! Levridge was specifically created to address gaps in agriculture-focused Microsoft solutions. Their platform includes commodity accounting, grain trading, agronomy, and patronage tracking — all the features this cooperative needs. While Stoneridge Software might assist with implementation and support, Levridge is the product that solves the core need.",
    incorrect: "Not quite. While Stoneridge Software excels at consulting and custom solutions, Levridge was specifically built to address this exact scenario. Levridge's platform already includes commodity accounting, grain trading, and patronage tracking — purpose-built for agribusinesses. This is precisely why Stoneridge created Levridge in 2018.",
  },
};

export function ScenarioQuestion({ onComplete }: ScenarioQuestionProps) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const isCorrect = selectedOption !== null && scenario.options[selectedOption].isCorrect;

  const handleSubmit = () => {
    if (selectedOption === null) return;
    setIsSubmitted(true);
  };

  return (
    <motion.div
      className="knowledge-check"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="icon-circle" style={{ background: 'linear-gradient(135deg, hsl(38 92% 50%), hsl(45 93% 47%))' }}>
          <Lightbulb className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="font-display text-lg font-bold text-foreground">
            {scenario.title}
          </h3>
          <p className="text-sm text-muted-foreground">
            Apply what you've learned
          </p>
        </div>
      </div>

      <div className="bg-secondary/50 rounded-lg p-5 mb-6">
        <p className="text-foreground leading-relaxed whitespace-pre-line">
          {scenario.situation}
        </p>
      </div>

      <p className="text-foreground font-medium text-lg mb-6">
        {scenario.question}
      </p>

      <div className="space-y-4 mb-6">
        {scenario.options.map((option, index) => {
          const isSelected = selectedOption === index;
          const showCorrect = isSubmitted && option.isCorrect;
          const showIncorrect = isSubmitted && isSelected && !option.isCorrect;

          return (
            <motion.button
              key={index}
              onClick={() => !isSubmitted && setSelectedOption(index)}
              disabled={isSubmitted}
              className={cn(
                "w-full text-left p-4 rounded-xl border-2 transition-all",
                isSelected && !isSubmitted && "border-primary bg-primary/5",
                showCorrect && "border-success bg-success-light",
                showIncorrect && "border-destructive bg-destructive/10",
                !isSelected && !isSubmitted && "border-border hover:border-primary/50"
              )}
              whileHover={!isSubmitted ? { scale: 1.01 } : {}}
            >
              <div className="flex items-start gap-4">
                <div
                  className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0",
                    index === 0 && "bg-primary/10",
                    index === 1 && "bg-accent/10"
                  )}
                >
                  <option.icon
                    className={cn(
                      "w-6 h-6",
                      index === 0 && "text-primary",
                      index === 1 && "text-accent"
                    )}
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-foreground">
                      {option.company}
                    </span>
                    {showCorrect && <CheckCircle2 className="w-5 h-5 text-success" />}
                    {showIncorrect && <XCircle className="w-5 h-5 text-destructive" />}
                  </div>
                  <p className="text-sm text-muted-foreground">{option.answer}</p>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      {isSubmitted && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className={cn(
            "p-4 rounded-lg mb-6",
            isCorrect ? "bg-success-light" : "bg-warning/10"
          )}
        >
          <div className="flex items-start gap-3">
            {isCorrect ? (
              <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
            ) : (
              <Lightbulb className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
            )}
            <p className="text-foreground text-sm leading-relaxed">
              {isCorrect ? scenario.feedback.correct : scenario.feedback.incorrect}
            </p>
          </div>
        </motion.div>
      )}

      <div className="flex justify-end gap-3">
        {!isSubmitted ? (
          <Button
            onClick={handleSubmit}
            disabled={selectedOption === null}
            className="bg-primary hover:bg-primary/90"
          >
            Submit Answer
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