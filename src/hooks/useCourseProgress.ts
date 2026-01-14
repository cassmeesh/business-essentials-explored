import { useState, useEffect } from 'react';

export interface LessonProgress {
  lessonId: number;
  completed: boolean;
  quizScore?: number;
}

export interface CourseProgress {
  currentLesson: number;
  lessons: LessonProgress[];
  overallProgress: number;
}

const STORAGE_KEY = 'stoneridge-course-progress';

const initialProgress: CourseProgress = {
  currentLesson: 1,
  lessons: Array.from({ length: 8 }, (_, i) => ({
    lessonId: i + 1,
    completed: false,
  })),
  overallProgress: 0,
};

export function useCourseProgress() {
  const [progress, setProgress] = useState<CourseProgress>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return initialProgress;
      }
    }
    return initialProgress;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  const completeLesson = (lessonId: number, quizScore?: number) => {
    setProgress((prev) => {
      const newLessons = prev.lessons.map((l) =>
        l.lessonId === lessonId
          ? { ...l, completed: true, quizScore }
          : l
      );
      const completedCount = newLessons.filter((l) => l.completed).length;
      const overallProgress = Math.round((completedCount / newLessons.length) * 100);
      
      return {
        ...prev,
        lessons: newLessons,
        overallProgress,
        currentLesson: lessonId < 8 ? lessonId + 1 : lessonId,
      };
    });
  };

  const setCurrentLesson = (lessonId: number) => {
    setProgress((prev) => ({
      ...prev,
      currentLesson: lessonId,
    }));
  };

  const resetProgress = () => {
    setProgress(initialProgress);
    localStorage.removeItem(STORAGE_KEY);
  };

  const isLessonAccessible = (lessonId: number): boolean => {
    if (lessonId === 1) return true;
    const previousLesson = progress.lessons.find((l) => l.lessonId === lessonId - 1);
    return previousLesson?.completed ?? false;
  };

  return {
    progress,
    completeLesson,
    setCurrentLesson,
    resetProgress,
    isLessonAccessible,
  };
}