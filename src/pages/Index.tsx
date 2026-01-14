import { useState } from 'react';
import { WelcomeScreen } from '@/components/WelcomeScreen';
import { CourseView } from '@/components/CourseView';
import { useCourseProgress } from '@/hooks/useCourseProgress';

const Index = () => {
  const { progress } = useCourseProgress();
  const [showCourse, setShowCourse] = useState(false);

  if (showCourse) {
    return <CourseView onExit={() => setShowCourse(false)} />;
  }

  return (
    <WelcomeScreen
      onStart={() => setShowCourse(true)}
      progress={progress.overallProgress}
    />
  );
};

export default Index;