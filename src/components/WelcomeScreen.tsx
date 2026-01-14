import { motion } from 'framer-motion';
import { 
  BookOpen, Clock, Target, GraduationCap, Building2, 
  TrendingUp, ArrowRight 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import stoneridgeLogo from '@/assets/stoneridge-logo.png';

interface WelcomeScreenProps {
  onStart: () => void;
  progress: number;
}

export function WelcomeScreen({ onStart, progress }: WelcomeScreenProps) {
  const hasProgress = progress > 0;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-primary">
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, hsl(var(--accent)) 0%, transparent 50%), radial-gradient(circle at 75% 75%, hsl(var(--primary-foreground)) 0%, transparent 30%)`
          }}
        />
        
        <div className="container mx-auto px-4 py-12 md:py-20">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.img 
              src={stoneridgeLogo} 
              alt="Stoneridge Software" 
              className="h-12 md:h-16 w-auto mx-auto mb-8"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
            />

            <motion.div
              className="inline-flex items-center gap-2 bg-primary-foreground/10 text-primary-foreground px-4 py-2 rounded-full mb-6 border border-primary-foreground/20"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <GraduationCap className="w-4 h-4" />
              <span className="text-sm font-semibold">Internal Training Module</span>
            </motion.div>

            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
              How We Make Money
            </h1>

            <p className="text-base md:text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Understand the business models behind Stoneridge Software and Levridge. 
              This course will help you see how your work contributes to our success.
            </p>

            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Button
                size="lg"
                onClick={onStart}
                className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8 font-semibold relative z-10"
              >
                {hasProgress ? 'Continue Learning' : 'Start Course'}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>

              {hasProgress && (
                <p className="text-sm text-primary-foreground/70">
                  You're {progress}% complete
                </p>
              )}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Course Overview */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
              What You'll Learn
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              By the end of this module, you'll have a clear understanding of how 
              both companies generate revenue and what drives our costs.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              {
                icon: Building2,
                title: "Two Companies",
                description: "Understand the difference between Stoneridge Software and Levridge"
              },
              {
                icon: TrendingUp,
                title: "Revenue Streams",
                description: "Identify primary revenue sources for each company"
              },
              {
                icon: Target,
                title: "Cost Drivers",
                description: "Recognize major costs for consulting vs. SaaS"
              },
              {
                icon: BookOpen,
                title: "Strategic Fit",
                description: "See how Levridge fits into the Microsoft ecosystem"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-background rounded-xl p-6 text-center shadow-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="icon-circle mx-auto mb-4">
                  <item.icon className="w-5 h-5 text-primary-foreground" />
                </div>
                <h3 className="font-display font-semibold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Course Details */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="grid sm:grid-cols-3 gap-6 mb-12">
              {[
                { icon: BookOpen, label: "8 Lessons", sublabel: "Bite-sized learning" },
                { icon: Clock, label: "~30 Minutes", sublabel: "Self-paced" },
                { icon: Target, label: "Interactive", sublabel: "Knowledge checks" }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-4 p-4 bg-card rounded-xl shadow-card"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="icon-circle-accent">
                    <item.icon className="w-5 h-5 text-accent-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{item.label}</p>
                    <p className="text-sm text-muted-foreground">{item.sublabel}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <p className="text-sm text-muted-foreground mb-6">
                Designed for all team members across Sales, Delivery, and Corporate. 
                No finance background required.
              </p>
              <Button
                size="lg"
                onClick={onStart}
                className="bg-primary hover:bg-primary/90 relative z-10"
              >
                {hasProgress ? 'Continue Where You Left Off' : 'Begin Course'}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}