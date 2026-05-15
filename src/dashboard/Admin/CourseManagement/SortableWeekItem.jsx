// SortableWeekItem.jsx
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { v4 as uuid } from "uuid";
import { Field, FieldArray, ErrorMessage } from "formik";
import { useTheme } from '@/context/ThemeContext';

// Icons
import { FiPlus, FiTrash2, FiAlertCircle, FiClock } from "react-icons/fi";
import { BsGripVertical } from "react-icons/bs";

const SortableWeekItem = ({ week, weekIndex, removeWeek }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: week.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative rounded-lg border transition-all duration-150
        ${isDragging
          ? `border-primary shadow-property z-10 opacity-90 ${
              isDark ? 'bg-semidark' : 'bg-white'
            }`
          : `${isDark 
              ? 'border-dark_border bg-semidark' 
              : 'border-border bg-white'} shadow-sm`
        }
      `}
    >
      <div className="p-6 space-y-6">

        {/* ───── Week Header ───── */}
        <div className="flex items-start gap-4">
          
          {/* Drag Handle */}
          <button
            type="button"
            {...attributes}
            {...listeners}
            className={`flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-150 cursor-grab active:cursor-grabbing ${
              isDark
                ? 'bg-darklight text-cyan hover:bg-darklight/80 hover:text-light'
                : 'bg-light text-gray hover:bg-light/80 hover:text-midnight_text'
            }`}
          >
            <BsGripVertical className="w-5 h-5" />
          </button>

          {/* Title */}
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <div className={`flex items-center justify-center w-9 h-9 rounded-lg font-semibold transition-colors duration-150 ${
                isDark
                  ? 'bg-primary/10 text-cyan'
                  : 'bg-primary/5 text-primary'
              }`}>
                {weekIndex + 1}
              </div>

              <Field
                name={`curriculum.${weekIndex}.title`}
                placeholder="Week title (e.g. Introduction to Web Development)"
                className={`flex-1 text-lg font-semibold rounded-lg px-3 py-2 transition-all duration-150 focus:outline-none focus:ring-2 ${
                  isDark
                    ? 'bg-semidark border-dark_border text-light placeholder-darkgray focus:border-primary focus:ring-primary/30'
                    : 'bg-white border-border text-midnight_text placeholder-gray focus:border-primary focus:ring-primary/20'
                }`}
              />
            </div>

            <ErrorMessage
              name={`curriculum.${weekIndex}.title`}
              component="div"
              className={`mt-1 flex items-center gap-1 text-sm transition-colors duration-150 ${
                isDark ? 'text-rose-500' : 'text-rose-600'
              }`}
            >
              {msg => (
                <>
                  <FiAlertCircle className="w-4 h-4" />
                  {msg}
                </>
              )}
            </ErrorMessage>
          </div>

          {/* Delete Week */}
          {removeWeek && (
            <button
              type="button"
              onClick={() => removeWeek(weekIndex)}
              className={`flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-150 ${
                isDark
                  ? 'btn-delete-dark'
                  : 'btn-delete bg-rose-500/10'
              }`}
            >
              <FiTrash2 className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* ───── Sessions Section ───── */}
        <div className="ml-14 space-y-4">

          {/* Sessions Header */}
          <div className={`flex items-center gap-2 text-sm font-medium transition-colors duration-150 ${
            isDark ? 'text-gray' : 'text-gray'
          }`}>
            <div className={`flex items-center justify-center w-8 h-8 rounded-lg transition-colors duration-150 ${
              isDark ? 'bg-darklight' : 'bg-light'
            }`}>
              <FiClock className={`w-4 h-4 transition-colors duration-150 ${
                isDark ? 'text-gray' : 'text-gray'
              }`} />
            </div>
            <span>Sessions</span>
            <span className={`text-xs px-2 py-0.5 rounded-full transition-colors duration-150 ${
              isDark
                ? 'bg-gray text-darkgray'
                : 'bg-light text-gray'
            }`}>
              {week.sessions.length}
            </span>
          </div>

          <FieldArray name={`curriculum.${weekIndex}.sessions`}>
            {({ push, remove }) => (
              <div className="space-y-3">

                {week.sessions.map((session, sessionIndex) => (
                  <div
                    key={session.id}
                    className={`flex items-center gap-3 rounded-lg p-3 transition-all duration-150 ${
                      isDark
                        ? ''
                        : 'bg-light'
                    }`}
                  >
                    <div className={`flex items-center justify-center w-7 h-7 rounded-full text-sm transition-colors duration-150 ${
                      isDark
                        ? 'bg-darklight text-gray'
                        : 'bg-border text-gray'
                    }`}>
                      {sessionIndex + 1}
                    </div>

                    <div className="flex-1">
                      <Field
                        name={`curriculum.${weekIndex}.sessions.${sessionIndex}.title`}
                        placeholder={`Session ${sessionIndex + 1}`}
                        className={`w-full px-3 py-2 transition-all duration-150  `}
                      />
                      <ErrorMessage
                        name={`curriculum.${weekIndex}.sessions.${sessionIndex}.title`}
                        component="div"
                        className={`mt-1 text-sm transition-colors duration-150 ${
                          isDark ? 'text-rose-500' : 'text-rose-600'
                        }`}
                      />
                    </div>

                    {week.sessions.length > 1 && (
                      <button
                        type="button"
                        onClick={() => remove(sessionIndex)}
                        className={`flex items-center justify-center w-9 h-9 rounded-lg transition-all duration-150 ${
                          isDark
                            ? 'bg-rose-500/10 btn-delete-dark'
                            : 'bg-rose-50 btn-delete'
                        }`}
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}

                {/* Add Session */}
                <button
                  type="button"
                  onClick={() => push({ id: uuid(), title: "" })}
                  className={`inline-flex items-center gap-2 text-sm font-medium px-3 py-2 rounded-lg transition-all duration-150 ${
                    isDark
                      ? 'text-cyan hover:text-cyan hover:bg-primary/10'
                      : 'text-primary hover:text-secondary hover:bg-primary/5'
                  }`}
                >
                  <FiPlus className="w-4 h-4" />
                  Add Session
                </button>
              </div>
            )}
          </FieldArray>
        </div>
      </div>

      {/* Drag Overlay */}
      {isDragging && (
        <div className={`absolute inset-0 border-2 border-dashed rounded-lg pointer-events-none ${
          isDark ? 'border-primary' : 'border-primary'
        }`} />
      )}
    </div>
  );
};

export default SortableWeekItem;