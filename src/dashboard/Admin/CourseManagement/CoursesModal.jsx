import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { motion, AnimatePresence } from 'framer-motion';
import { useCourseHandlers } from './courseshooks.js';
import { useTheme } from '@/context/ThemeContext';
import { FiX, FiSave } from 'react-icons/fi';
import toast from 'react-hot-toast';

const CourseModal = ({ onSuccess, mode = 'add', course = {} }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const { handleAddCourseSubmit, handleUpdateCourseSubmit } = useCourseHandlers();
  const isEdit = mode === 'edit';

  const initialValues = isEdit
    ? {
      id: course._id,
      name: course.name ?? '',
      shortdescription: course.shortdescription ?? '',
      duration: course.duration ?? '',
      price: course.price ?? '',
      category: course.category ?? '',
      thumbnail: course.thumbnail ?? '',
      googleProductId: course.googleProductId ?? '',
    }
    : {
      name: '',
      shortdescription: '',
      duration: '',
      price: '',
      category: '',
      thumbnail: '',
      googleProductId: '', // Hidden or auto-generated in backend
    };
  const onSubmitFn = isEdit ? handleUpdateCourseSubmit : handleAddCourseSubmit;

  const validationSchema = Yup.object({
    name: Yup.string().required('Course name is required'),
    shortdescription: Yup.string().required('Short description is required'),
    duration: Yup.string().required('Duration is required'),
    price: Yup.number()
      .typeError('Price must be a number')
      .required('Price is required'),
    category: Yup.string().required('Category is required'),
    thumbnail: Yup.string().url('Must be a valid URL').required('Image URL is required'),
  });

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-999 flex items-center justify-center bg-midnight_text/60 backdrop-blur-lg p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          initial={{ scale: 0.96, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.96, opacity: 0, y: 20 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className={`w-full max-w-xl overflow-hidden rounded-lg shadow-property transition-all duration-150 ${
            isDark
              ? 'bg-darklight border border-dark_border'
              : 'bg-white border border-border'
          }`}
        >
          {/* Header */}
          <div className={`flex items-center justify-between border-b px-6 py-4 transition-colors duration-150 ${
            isDark
              ? 'border-dark_border'
              : 'border-border'
          }`}>
            <div>
              <h2 className={`text-lg font-semibold transition-colors duration-150 ${
                isDark
                  ? 'text-light'
                  : 'text-midnight_text'
              }`}>
                {isEdit ? 'Edit Course' : 'Add New Course'}
              </h2>
              <p className={`mt-1 text-sm transition-colors duration-150 ${
                isDark
                  ? 'text-gray'
                  : 'text-gray'
              }`}>
                {isEdit
                  ? 'Update course information'
                  : 'Create a new course for the platform'}
              </p>
            </div>
            <button
              onClick={onSuccess}
              className={`rounded-lg p-2 transition-all duration-150 ${
                isDark
                  ? 'text-gray hover:bg-darklight hover:text-light'
                  : 'text-gray hover:bg-light hover:text-midnight_text'
              }`}
            >
              <FiX className="h-5 w-5" />
            </button>
          </div>

          {/* Form */}
          <div className="max-h-[75vh] overflow-y-auto p-6">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={async (values, actions) => {
                try {
                  await onSubmitFn(values);
                  if (!isEdit) actions.resetForm();
                  onSuccess();
                } catch (error) {
                  console.error(`${isEdit ? 'Update' : 'Add'} failed:`, error);
                  toast.error(`Failed to ${isEdit ? 'update' : 'add'} course`);
                }
              }}
            >
              {({ isSubmitting }) => (
                <Form className="space-y-4">
                  {[
                    { name: 'name', label: 'Course Name', placeholder: 'React Mastery' },
                    {
                      name: 'thumbnail',
                      label: 'Thumbnail URL',
                      placeholder: 'https://image-url.com',
                    },
                    { name: 'duration', label: 'Duration', placeholder: '8 weeks' },
                    { name: 'price', label: 'Price (₹)', placeholder: '1999' },
                    { name: 'category', label: 'Category', placeholder: 'Web Development' },
                  ].map(({ name, label, placeholder }) => (
                    <div key={name}>
                      <label className={`mb-1 block text-sm font-medium transition-colors duration-150 ${
                        isDark
                          ? 'text-light'
                          : 'text-midnight_text'
                      }`}>
                        {label}
                      </label>
                      <Field
                        name={name}
                        placeholder={placeholder}
                        className={`w-full rounded-lg border px-3 py-2 text-sm transition-all duration-150 focus:outline-none focus:ring-2 ${
                          isDark
                            ? 'bg-semidark border-dark_border text-light placeholder-darkgray focus:border-primary focus:ring-primary/30'
                            : 'bg-white border-border text-midnight_text placeholder-gray focus:border-primary focus:ring-primary/20'
                        }`}
                      />
                      <ErrorMessage
                        name={name}
                        component="p"
                        className={`mt-1 text-xs transition-colors duration-150 ${
                          isDark
                            ? 'text-rose-500'
                            : 'text-rose-600'
                        }`}
                      />
                    </div>
                  ))}

                  {/* googleProductId */}
                  {isEdit && (
                    <div>
                      <label className={`mb-1 block text-sm font-medium transition-colors duration-150 ${
                        isDark ? 'text-light' : 'text-midnight_text'
                      }`}>
                        Google Product ID (for Play Console)
                      </label>
                      <div className="relative">
                        <Field
                          name="googleProductId"
                          readOnly
                          className={`w-full rounded-lg border px-3 py-2 text-sm transition-all duration-150 focus:outline-none ${
                            isDark
                              ? 'bg-semidark border-dark_border text-gray cursor-not-allowed'
                              : 'bg-light border-border text-gray cursor-not-allowed'
                          }`}
                        />
                        <button
                          type="button"
                          onClick={() => {
                            navigator.clipboard.writeText(initialValues.googleProductId);
                            toast.success('Copied to clipboard!');
                          }}
                          className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-primary hover:text-primary_dark"
                        >
                          Copy
                        </button>
                      </div>
                      <p className="mt-1 text-[10px] text-gray italic">
                        * Automatically generated by backend. Use this ID in Google Play Console.
                      </p>
                    </div>
                  )}

                  {/* shortdescription */}
                  <div>
                    <label className={`mb-1 block text-sm font-medium transition-colors duration-150 ${
                      isDark
                        ? 'text-light'
                        : 'text-midnight_text'
                    }`}>
                      Short Description
                    </label>
                    <Field
                      as="textarea"
                      name="shortdescription"
                      rows={3}
                      placeholder="Course overview..."
                      className={`w-full rounded-lg border px-3 py-2 text-sm transition-all duration-150 focus:outline-none focus:ring-2 ${
                        isDark
                          ? 'bg-semidark border-dark_border text-light placeholder-darkgray focus:border-primary focus:ring-primary/30'
                          : 'bg-white border-border text-midnight_text placeholder-gray focus:border-primary focus:ring-primary/20'
                      }`}
                    />
                    <ErrorMessage
                      name="shortdescription"
                      component="p"
                      className={`mt-1 text-xs transition-colors duration-150 ${
                        isDark
                          ? 'text-rose-500'
                          : 'text-rose-600'
                      }`}
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`mt-4 flex w-full items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-semibold transition-all duration-150 disabled:cursor-not-allowed disabled:opacity-50 shadow-sm hover:shadow-md btn-primary`}
                  >
                    <FiSave className="text-lg" />
                    {isSubmitting
                      ? isEdit
                        ? 'Updating...'
                        : 'Adding...'
                      : isEdit
                        ? 'Update Course'
                        : 'Add Course'}
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CourseModal;