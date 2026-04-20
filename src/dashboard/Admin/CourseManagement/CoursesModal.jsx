import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { motion, AnimatePresence } from 'framer-motion';
import { useCourseHandlers } from './courseshooks.js';
import { useTheme } from '@/context/ThemeContext';
import { FiX, FiSave } from 'react-icons/fi';

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
      price: course.price ?? '', // ✅ FIXED
      category: course.category ?? '',
      thumbnail: course.thumbnail ?? '',
    }
    : {
      name: '',
      shortdescription: '',
      duration: '',
      price: '',
      category: '',
      thumbnail: '',
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
        className="fixed inset-0 z-[1100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          initial={{ scale: 0.96, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.96, opacity: 0, y: 20 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className={`w-full max-w-xl overflow-hidden rounded-2xl shadow-2xl transition-colors ${
            isDark
              ? 'bg-slate-800 border border-slate-700'
              : 'bg-white'
          }`}
        >
          {/* Header */}
          <div className={`flex items-center justify-between border-b px-6 py-4 transition-colors ${
            isDark
              ? 'border-slate-700'
              : 'border-slate-200'
          }`}>
            <div>
              <h2 className={`text-lg font-semibold transition-colors ${
                isDark
                  ? 'text-slate-100'
                  : 'text-slate-900'
              }`}>
                {isEdit ? 'Edit Course' : 'Add New Course'}
              </h2>
              <p className={`mt-1 text-sm transition-colors ${
                isDark
                  ? 'text-slate-400'
                  : 'text-slate-500'
              }`}>
                {isEdit
                  ? 'Update course information'
                  : 'Create a new course for the platform'}
              </p>
            </div>
            <button
              onClick={onSuccess}
              className={`rounded-lg p-2 transition ${
                isDark
                  ? 'text-slate-400 hover:bg-slate-700 hover:text-slate-200'
                  : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700'
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
                  alert(`❌ Failed to ${isEdit ? 'update' : 'add'} course.`);
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
                      <label className={`mb-1 block text-sm font-medium transition-colors ${
                        isDark
                          ? 'text-slate-300'
                          : 'text-slate-700'
                      }`}>
                        {label}
                      </label>
                      <Field
                        name={name}
                        placeholder={placeholder}
                        className={`w-full rounded-lg border px-3 py-2 text-sm transition focus:outline-none focus:ring-2 ${
                          isDark
                            ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:border-indigo-400 focus:ring-indigo-500/30'
                            : 'border-slate-300 text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:ring-indigo-500/20'
                        }`}
                      />
                      <ErrorMessage
                        name={name}
                        component="p"
                        className={`mt-1 text-xs transition-colors ${
                          isDark
                            ? 'text-rose-400'
                            : 'text-rose-600'
                        }`}
                      />
                    </div>
                  ))}

                  {/* shortdescription */}
                  <div>
                    <label className={`mb-1 block text-sm font-medium transition-colors ${
                      isDark
                        ? 'text-slate-300'
                        : 'text-slate-700'
                    }`}>
                      Short Description
                    </label>
                    <Field
                      as="textarea"
                      name="shortdescription"
                      rows={3}
                      placeholder="Course overview..."
                      className={`w-full rounded-lg border px-3 py-2 text-sm transition focus:outline-none focus:ring-2 ${
                        isDark
                          ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:border-indigo-400 focus:ring-indigo-500/30'
                          : 'border-slate-300 text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:ring-indigo-500/20'
                      }`}
                    />
                    <ErrorMessage
                      name="shortdescription"
                      component="p"
                      className={`mt-1 text-xs transition-colors ${
                        isDark
                          ? 'text-rose-400'
                          : 'text-rose-600'
                      }`}
                    />
                  </div>



                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`mt-4 flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-70 ${
                      isDark
                        ? 'bg-indigo-600 text-white hover:bg-indigo-500'
                        : 'bg-indigo-600 text-white hover:bg-indigo-700'
                    }`}
                  >
                    <FiSave />
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