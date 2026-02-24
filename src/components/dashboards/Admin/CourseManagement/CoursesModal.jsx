import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { motion, AnimatePresence } from 'framer-motion';
import { useCourseHandlers } from './courseshooks.js';
import { FiX, FiSave } from 'react-icons/fi';

const CourseModal = ({ onSuccess, mode = 'add', course = {} }) => {
  const { handleAddCourseSubmit, handleUpdateCourseSubmit } = useCourseHandlers();
  const isEdit = mode === 'edit';

  const initialValues = isEdit
    ? {
        id: course._id,
        name: course.name || '',
        shortdescription: course.shortdescription || '',
        instructor: course.instructor || '',
        duration: course.duration || '',
        price: course.price || '',
        category: course.category || '',
        thumbnail: course.thumbnail || '',
      }
    : {
        name: '',
        shortdescription: '',
        instructor: '',
        duration: '',
        price: '',
        category: '',
        thumbnail: '',
      };

  const onSubmitFn = isEdit ? handleUpdateCourseSubmit : handleAddCourseSubmit;

  const validationSchema = Yup.object({
    name: Yup.string().required('Course name is required'),
    shortdescription: Yup.string().required('Short description is required'),
    instructor: Yup.string().required('Instructor is required'),
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
        className="tw-fixed tw-inset-0 tw-z-[1100] tw-flex tw-items-center tw-justify-center tw-bg-slate-900/60 tw-backdrop-blur-sm tw-p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          initial={{ scale: 0.96, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.96, opacity: 0, y: 20 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="tw-w-full tw-max-w-xl tw-overflow-hidden tw-rounded-2xl tw-bg-white tw-shadow-2xl"
        >
          {/* Header */}
          <div className="tw-flex tw-items-center tw-justify-between tw-border-b tw-border-slate-200 tw-px-6 tw-py-4">
            <div>
              <h2 className="tw-text-lg tw-font-semibold tw-text-slate-900">
                {isEdit ? 'Edit Course' : 'Add New Course'}
              </h2>
              <p className="tw-mt-1 tw-text-sm tw-text-slate-500">
                {isEdit
                  ? 'Update course information'
                  : 'Create a new course for the platform'}
              </p>
            </div>
            <button
              onClick={onSuccess}
              className="tw-rounded-lg tw-p-2 tw-text-slate-500 tw-transition hover:tw-bg-slate-100 hover:tw-text-slate-700"
            >
              <FiX className="tw-h-5 tw-w-5" />
            </button>
          </div>

          {/* Form */}
          <div className="tw-max-h-[75vh] tw-overflow-y-auto tw-p-6">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={async (values, actions) => {
                console.log(values ,"from course modal")
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
                <Form className="tw-space-y-4">
                  {[
                    { name: 'name', label: 'Course Name', placeholder: 'React Mastery' },
                    {
                      name: 'thumbnail',
                      label: 'Thumbnail URL',
                      placeholder: 'https://image-url.com',
                    },
                    { name: 'instructor', label: 'Instructor', placeholder: 'John Doe' },
                    { name: 'duration', label: 'Duration', placeholder: '8 weeks' },
                    { name: 'price', label: 'Price (₹)', placeholder: '1999' },
                  ].map(({ name, label, placeholder }) => (
                    <div key={name}>
                      <label className="tw-mb-1 tw-block tw-text-sm tw-font-medium tw-text-slate-700">
                        {label}
                      </label>
                      <Field
                        name={name}
                        placeholder={placeholder}
                        className="tw-w-full tw-rounded-lg tw-border tw-border-slate-300 tw-px-3 tw-py-2 tw-text-sm tw-transition focus:tw-border-indigo-500 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-indigo-500/20"
                      />
                      <ErrorMessage
                        name={name}
                        component="p"
                        className="tw-mt-1 tw-text-xs tw-text-rose-600"
                      />
                    </div>
                  ))}

                  {/* shortdescription */}
                  <div>
                    <label className="tw-mb-1 tw-block tw-text-sm tw-font-medium tw-text-slate-700">
                      Short Description
                    </label>
                    <Field
                      as="textarea"
                      name="shortdescription"
                      rows={3}
                      placeholder="Course overview..."
                      className="tw-w-full tw-rounded-lg tw-border tw-border-slate-300 tw-px-3 tw-py-2 tw-text-sm tw-transition focus:tw-border-indigo-500 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-indigo-500/20"
                    />
                    <ErrorMessage
                      name="shortdescription"
                      component="p"
                      className="tw-mt-1 tw-text-xs tw-text-rose-600"
                    />
                  </div>

                  {/* Category */}
                  <div>
                    <label className="tw-mb-1 tw-block tw-text-sm tw-font-medium tw-text-slate-700">
                      Category
                    </label>
                    <Field
                      as="select"
                      name="category"
                      className="tw-w-full tw-rounded-lg tw-border tw-border-slate-300 tw-bg-white tw-px-3 tw-py-2 tw-text-sm focus:tw-border-indigo-500 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-indigo-500/20"
                    />
                    <ErrorMessage
                      name="category"
                      component="p"
                      className="tw-mt-1 tw-text-xs tw-text-rose-600"
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="tw-mt-4 tw-flex tw-w-full tw-items-center tw-justify-center tw-gap-2 tw-rounded-xl tw-bg-indigo-600 tw-py-3 tw-text-sm tw-font-semibold tw-text-white tw-transition hover:tw-bg-indigo-700 disabled:tw-cursor-not-allowed disabled:tw-opacity-70"
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