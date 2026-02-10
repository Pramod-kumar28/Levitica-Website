
import { useGetCoursesQuery } from '../Services/sharedServices/courses.Services';

export const useCourses = () => {
  const {
    data: courses,
    error,
    isLoading,
    isError,
    refetch,
    isSuccess
  } = useGetCoursesQuery();

  return {
    courses,
    error,
    isLoading,
    isError,
    refetch,
    isSuccess,
    hasData: courses && courses.length > 0
  };
};