import { FiLoader } from "react-icons/fi";

const Loader = ({ message = "Loading…" }) => {
  return (
    <div className="tw-flex tw-h-screen tw-w-full tw-flex-col tw-items-center tw-justify-center tw-bg-slate-50">
      {/* Spinner */}
      <FiLoader className="tw-h-10 tw-w-10 tw-animate-spin tw-text-indigo-600" />

      {/* Message */}
      <p className="tw-mt-4 tw-text-sm tw-font-medium tw-text-slate-500">
        {message}
      </p>
    </div>
  );
};

export default Loader;
