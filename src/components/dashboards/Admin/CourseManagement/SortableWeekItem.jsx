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
      className={`tw-relative tw-rounded-2xl tw-border tw-bg-white
        ${isDragging
          ? "tw-border-indigo-400 tw-shadow-xl tw-z-10 tw-opacity-90"
          : "tw-border-gray-200 tw-shadow-sm"}
      `}
    >
      <div className="tw-p-6 tw-space-y-6">

        {/* ───── Week Header ───── */}
        <div className="tw-flex tw-items-start tw-gap-4">
          
          {/* Drag Handle */}
          <button
            type="button"
            {...attributes}
            {...listeners}
            className="tw-flex tw-items-center tw-justify-center
              tw-w-10 tw-h-10 tw-rounded-xl
              tw-bg-gray-100 tw-text-gray-500
              hover:tw-bg-gray-200 hover:tw-text-gray-700
              tw-cursor-grab active:tw-cursor-grabbing"
          >
            <BsGripVertical className="tw-w-5 tw-h-5" />
          </button>

          {/* Title */}
          <div className="tw-flex-1">
            <div className="tw-flex tw-items-center tw-gap-3">
              <div className="tw-flex tw-items-center tw-justify-center
                tw-w-9 tw-h-9 tw-rounded-xl
                tw-bg-indigo-100 tw-text-indigo-600
                tw-font-semibold"
              >
                {weekIndex + 1}
              </div>

              <Field
                name={`curriculum.${weekIndex}.title`}
                placeholder="Week title (e.g. Introduction to Web Development)"
                className="tw-input tw-text-lg tw-font-semibold"
              />
            </div>

            <ErrorMessage
              name={`curriculum.${weekIndex}.title`}
              component="div"
              className="tw-mt-1 tw-flex tw-items-center tw-gap-1 tw-text-sm tw-text-red-500"
            >
              {msg => (
                <>
                  <FiAlertCircle className="tw-w-4 tw-h-4" />
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
              className="tw-flex tw-items-center tw-justify-center
                tw-w-10 tw-h-10 tw-rounded-xl
                tw-bg-red-50 tw-text-red-500
                hover:tw-bg-red-100"
            >
              <FiTrash2 className="tw-w-4 tw-h-4" />
            </button>
          )}
        </div>

        {/* ───── Sessions Section ───── */}
        <div className="tw-ml-14 tw-space-y-4">

          {/* Sessions Header */}
          <div className="tw-flex tw-items-center tw-gap-2 tw-text-sm tw-font-medium tw-text-gray-700">
            <div className="tw-flex tw-items-center tw-justify-center
              tw-w-8 tw-h-8 tw-rounded-lg tw-bg-gray-100">
              <FiClock className="tw-w-4 tw-h-4 tw-text-gray-600" />
            </div>
            <span>Sessions</span>
            <span className="tw-text-xs tw-bg-gray-100 tw-px-2 tw-py-0.5 tw-rounded-full">
              {week.sessions.length}
            </span>
          </div>

          <FieldArray name={`curriculum.${weekIndex}.sessions`}>
            {({ push, remove }) => (
              <div className="tw-space-y-3">

                {week.sessions.map((session, sessionIndex) => (
                  <div
                    key={session.id}
                    className="tw-flex tw-items-center tw-gap-3
                      tw-bg-gray-50 tw-border tw-border-gray-200
                      tw-rounded-xl tw-p-3"
                  >
                    <div className="tw-flex tw-items-center tw-justify-center
                      tw-w-7 tw-h-7 tw-rounded-full
                      tw-bg-gray-200 tw-text-gray-700 tw-text-sm"
                    >
                      {sessionIndex + 1}
                    </div>

                    <div className="tw-flex-1">
                      <Field
                        name={`curriculum.${weekIndex}.sessions.${sessionIndex}.title`}
                        placeholder={`Session ${sessionIndex + 1}`}
                        className="tw-input"
                      />
                      <ErrorMessage
                        name={`curriculum.${weekIndex}.sessions.${sessionIndex}.title`}
                        component="div"
                        className="tw-mt-1 tw-text-sm tw-text-red-500"
                      />
                    </div>

                    {week.sessions.length > 1 && (
                      <button
                        type="button"
                        onClick={() => remove(sessionIndex)}
                        className="tw-flex tw-items-center tw-justify-center
                          tw-w-9 tw-h-9 tw-rounded-lg
                          tw-bg-red-50 tw-text-red-500 hover:tw-bg-red-100"
                      >
                        <FiTrash2 className="tw-w-4 tw-h-4" />
                      </button>
                    )}
                  </div>
                ))}

                {/* Add Session */}
                <button
                  type="button"
                  onClick={() => push({ id: uuid(), title: "" })}
                  className="tw-inline-flex tw-items-center tw-gap-2
                    tw-text-sm tw-font-medium tw-text-indigo-600
                    hover:tw-text-indigo-700
                    tw-px-3 tw-py-2 tw-rounded-lg hover:tw-bg-indigo-50"
                >
                  <FiPlus className="tw-w-4 tw-h-4" />
                  Add Session
                </button>
              </div>
            )}
          </FieldArray>
        </div>
      </div>

      {/* Drag Overlay */}
      {isDragging && (
        <div className="tw-absolute tw-inset-0 tw-border-2 tw-border-dashed tw-border-indigo-400 tw-rounded-2xl tw-pointer-events-none" />
      )}
    </div>
  );
};

export default SortableWeekItem;
