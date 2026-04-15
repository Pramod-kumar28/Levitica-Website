// hooks/useCurriculumAutosave.js
import { useEffect } from "react";
import debounce from "lodash.debounce";

const useCurriculumAutosave = (
  curriculum,
  courseId,
  updateCurriculum,
  enabled
) => {
  useEffect(() => {
    if (!enabled) return;

    const autosave = debounce(() => {
      updateCurriculum({
        courseId,
        curriculum,
      });
    }, 1200);

    autosave();
    return autosave.cancel;
  }, [curriculum, courseId, enabled]);
};

export default useCurriculumAutosave;
