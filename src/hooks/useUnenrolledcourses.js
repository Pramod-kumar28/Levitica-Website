import { useCourses } from './useCourses';
import { useMemo } from 'react';

export const useUnenrolledCourses = (enrolledCourseIds = []) => {
  const {
    courses,
    isLoading,
    isError,
    error,
    isSuccess,
    refetch,

  } = useCourses();

  const filteredCourses = useMemo(() => {
    if (!courses || !Array.isArray(enrolledCourseIds)) return [];
    return courses.filter(course => !enrolledCourseIds.includes(course._id));
  }, [courses, enrolledCourseIds]);

  return {
    courses: filteredCourses,
    isLoading,
    isError,
    error,
    isSuccess,
    refetch,
    hasData: filteredCourses.length > 0
  };
};