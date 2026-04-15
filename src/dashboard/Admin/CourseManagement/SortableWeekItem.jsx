// SortableWeekItem.jsx
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { v4 as uuid } from "uuid";
import { Field, FieldArray, ErrorMessage } from "formik";

// Icons
import { FiPlus, FiTrash2, FiAlertCircle, FiClock } from "react-icons/fi";
import { BsGripVertical } from "react-icons/bs";

const SortableWeekItem = ({ week, weekIndex, removeWeek }) => {
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
      className={`relative rounded-2xl border bg-white
        ${isDragging
          ? "border-indigo-400 shadow-xl z-10 opacity-90"
          : "border-gray-200 shadow-sm"}
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
            className="flex items-center justify-center
              w-10 h-10 rounded-xl
              bg-gray-100 text-gray-500
              hover:bg-gray-200 hover:text-gray-700
              cursor-grab active:cursor-grabbing"
          >
            <BsGripVertical className="w-5 h-5" />
          </button>

          {/* Title */}
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center
                w-9 h-9 rounded-xl
                bg-indigo-100 text-indigo-600
                font-semibold"
              >
                {weekIndex + 1}
              </div>

              <Field
                name={`curriculum.${weekIndex}.title`}
                placeholder="Week title (e.g. Introduction to Web Development)"
                className="input text-lg font-semibold"
              />
            </div>

            <ErrorMessage
              name={`curriculum.${weekIndex}.title`}
              component="div"
              className="mt-1 flex items-center gap-1 text-sm text-red-500"
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
              className="flex items-center justify-center
                w-10 h-10 rounded-xl
                bg-red-50 text-red-500
                hover:bg-red-100"
            >
              <FiTrash2 className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* ───── Sessions Section ───── */}
        <div className="ml-14 space-y-4">

          {/* Sessions Header */}
          <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <div className="flex items-center justify-center
              w-8 h-8 rounded-lg bg-gray-100">
              <FiClock className="w-4 h-4 text-gray-600" />
            </div>
            <span>Sessions</span>
            <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full">
              {week.sessions.length}
            </span>
          </div>

          <FieldArray name={`curriculum.${weekIndex}.sessions`}>
            {({ push, remove }) => (
              <div className="space-y-3">

                {week.sessions.map((session, sessionIndex) => (
                  <div
                    key={session.id}
                    className="flex items-center gap-3
                      bg-gray-50 border border-gray-200
                      rounded-xl p-3"
                  >
                    <div className="flex items-center justify-center
                      w-7 h-7 rounded-full
                      bg-gray-200 text-gray-700 text-sm"
                    >
                      {sessionIndex + 1}
                    </div>

                    <div className="flex-1">
                      <Field
                        name={`curriculum.${weekIndex}.sessions.${sessionIndex}.title`}
                        placeholder={`Session ${sessionIndex + 1}`}
                        className="input"
                      />
                      <ErrorMessage
                        name={`curriculum.${weekIndex}.sessions.${sessionIndex}.title`}
                        component="div"
                        className="mt-1 text-sm text-red-500"
                      />
                    </div>

                    {week.sessions.length > 1 && (
                      <button
                        type="button"
                        onClick={() => remove(sessionIndex)}
                        className="flex items-center justify-center
                          w-9 h-9 rounded-lg
                          bg-red-50 text-red-500 hover:bg-red-100"
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
                  className="inline-flex items-center gap-2
                    text-sm font-medium text-indigo-600
                    hover:text-indigo-700
                    px-3 py-2 rounded-lg hover:bg-indigo-50"
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
        <div className="absolute inset-0 border-2 border-dashed border-indigo-400 rounded-2xl pointer-events-none" />
      )}
    </div>
  );
};

export default SortableWeekItem;
