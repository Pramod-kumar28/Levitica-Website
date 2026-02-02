import React from "react";
import { useModal, MODAL_TYPES } from "../Modals/ModalContext";
import { useGetLiveClassesQuery } from "../../../../Services/admin/zoomService";
import { format } from "date-fns";
import {
  FiEdit2,
  FiVideo,
  FiCalendar,
  FiClock,
  FiPlus,
} from "react-icons/fi";

const LiveClassesTable = () => {
  const { data: liveClasses, isLoading } = useGetLiveClassesQuery();
  const { openModal } = useModal();

  if (isLoading) {
    return (
      <div className="tw-flex tw-justify-center tw-items-center tw-py-10 tw-text-gray-500">
        Loading live classes…
      </div>
    );
  }

  return (
    <div className="tw-bg-white tw-border tw-rounded-xl tw-shadow-sm">
      {/* Header */}
      <div className="tw-flex tw-items-center tw-justify-between tw-p-5 tw-border-b">
        <div>
          <h2 className="tw-text-lg tw-font-semibold">Scheduled Live Classes</h2>
          <p className="tw-text-sm tw-text-gray-500">
            Manage upcoming Zoom live sessions
          </p>
        </div>

        <button
          onClick={() => openModal(MODAL_TYPES.CREATE_MEETING)}
          className="
            tw-flex tw-items-center tw-gap-2
            tw-bg-blue-600 hover:tw-bg-blue-700
            tw-text-white tw-text-sm tw-font-medium
            tw-px-4 tw-py-2 tw-rounded-lg
          "
        >
          <FiPlus />
          Schedule Class
        </button>
      </div>

      {/* Table */}
      <div className="tw-overflow-x-auto">
        <table className="tw-w-full tw-text-sm">
          <thead className="tw-bg-gray-50 tw-border-b tw-text-gray-600">
            <tr>
              <th className="tw-text-left tw-p-4">Title</th>
              <th className="tw-text-left tw-p-4">Course</th>
              <th className="tw-text-left tw-p-4">Batch</th>
              <th className="tw-text-left tw-p-4">Start Time</th>
              <th className="tw-text-left tw-p-4">Duration</th>
              <th className="tw-text-center tw-p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {liveClasses?.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="tw-text-center tw-py-10 tw-text-gray-500"
                >
                  No live classes scheduled
                </td>
              </tr>
            )}

            {liveClasses?.map((liveClass) => (
              <tr
                key={liveClass._id}
                className="tw-border-b hover:tw-bg-gray-50"
              >
                <td className="tw-p-4 tw-font-medium">
                  {liveClass.title}
                </td>

                <td className="tw-p-4">
                  {liveClass.course?.name || "—"}
                </td>

                <td className="tw-p-4">
                  {liveClass.batch?.name || "—"}
                </td>

                <td className="tw-p-4">
                  <div className="tw-flex tw-items-center tw-gap-2 tw-text-gray-600">
                    <FiCalendar />
                    {format(new Date(liveClass.startTime), "dd MMM yyyy")}
                  </div>
                  <div className="tw-flex tw-items-center tw-gap-2 tw-text-xs tw-text-gray-500">
                    <FiClock />
                    {format(new Date(liveClass.startTime), "hh:mm a")}
                  </div>
                </td>

                <td className="tw-p-4">
                  <span className="tw-inline-flex tw-items-center tw-rounded-full tw-bg-purple-100 tw-text-purple-700 tw-text-xs tw-font-semibold tw-px-3 tw-py-1">
                    {liveClass.duration} mins
                  </span>
                </td>

                <td className="tw-p-4">
                  <div className="tw-flex tw-items-center tw-justify-center tw-gap-2">
                    <button
                      onClick={() =>
                        openModal(MODAL_TYPES.EDIT_MEETING, {
                          initialData: liveClass,
                        })
                      }
                      className="
                        tw-p-2 tw-rounded-lg
                        tw-border tw-border-gray-300
                        hover:tw-bg-gray-100
                        tw-text-gray-700
                      "
                      title="Edit"
                    >
                      <FiEdit2 />
                    </button>

                    <a
                      href={liveClass.zoomJoinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                        tw-p-2 tw-rounded-lg
                        tw-bg-blue-600 hover:tw-bg-blue-700
                        tw-text-white
                      "
                      title="Join class"
                    >
                      <FiVideo />
                    </a>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LiveClassesTable;
