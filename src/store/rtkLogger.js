import toast from "react-hot-toast";

const rtkLogger = () => (next) => (action) => {
  if (action.type.endsWith('/rejected')) {
    // ❌ Ignore ConditionError (skip / abort)
    if (action.error?.name === 'ConditionError') {
      return next(action);
    }

    const message =
      action.error?.data?.message ||
      action.error?.message ||
      'Unknown API error';

    toast.error(`API Error: ${message}`);

    console.error('❌ RTK Query Error:', {
      type: action.type,
      error: action.error,
      payload: action.payload,
    });
  }

  return next(action);
};

export default rtkLogger;
