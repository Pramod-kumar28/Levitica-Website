import { toast } from 'react-hot-toast';

const rtkLogger = (store) => (next) => (action) => {
  if (action.type.endsWith('/rejected')) {
    const message =
      action.error?.data ||
      action.error?.message ||
      'Unknown API error';

    toast.error(`API Error: ${message}`);
    console.error('❌ RTK Query Rejected:', {
      type: action.type,
      error: action.error,
      payload: action.payload,
    });
  }

  return next(action);
};

export default rtkLogger;
