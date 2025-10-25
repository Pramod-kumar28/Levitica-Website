import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { motion, AnimatePresence } from 'framer-motion';
import { useCoursesCategory } from '../../../../hooks/useCourses.js';
import { useCourseHandlers } from './courseshooks.js';
import { X } from 'lucide-react';

const CourseModal = ({ onSuccess, mode = 'add', course = {} }) => {
 
  const {
    handleAddCourseSubmit,
    handleUpdateCourseSubmit,
  } = useCourseHandlers();

  const isEdit = mode === 'edit';

  const initialValues = isEdit
    ? {
        _id: course._id,
        name: course.name || '',
        description: course.description || '',
        instructor: course.instructor || '',
        duration: course.duration || '',
        price: course.price || '',
        category: course.category || '',
        thumbnail: course.thumbnail || '',
      }
    : {
        name: '',
        description: '',
        instructor: '',
        duration: '',
        price: '',
        category: '',
        thumbnail: '',
      };

  const onSubmitFn = isEdit ? handleUpdateCourseSubmit : handleAddCourseSubmit;

  const validationSchema = Yup.object({
    name: Yup.string().required('Course name is required'),
    description: Yup.string().required('Description is required'),
    instructor: Yup.string().required('Instructor is required'),
    duration: Yup.string().required('Duration is required'),
    price: Yup.number()
      .typeError('Price must be a number')
      .positive('Price must be positive')
      .required('Price is required'),
    category: Yup.string().required('Category is required'),
    thumbnail: Yup.string().url('Must be a valid URL').required('Image URL is required'),
  });

 
  return (
    <AnimatePresence>
      <motion.div
        className="dashboard-app-container"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          right: 0, 
          bottom: 0, 
          backgroundColor: 'rgba(0,0,0,0.5)',
          zIndex: 1100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem'
        }}
      >
        <div className="card shadow-xl rounded-xl w-100" style={{ maxWidth: '500px', maxHeight: '90vh', overflow: 'hidden' }}>
          <div className="card-header d-flex justify-content-between align-items-center p-4 border-bottom">
            <h3 className="mb-0 fw-bold fs-2xl text-dark">
              {isEdit ? '✏️ Edit Course' : '📝 Add New Course'}
            </h3>
           <X onClick={onSuccess} className='text-dark'/>
          </div>

          <div className="card-body p-0" style={{ overflowY: 'auto' }}>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={async (values, actions) => {
               
                  try {
                    await onSubmitFn(values);
                    if (!isEdit) actions.resetForm();
                    onSuccess();
                  }
                   catch (error) {
                    console.error(`${isEdit ? 'Update' : 'Add'} failed:`, error);
                    alert(`❌ Failed to ${isEdit ? 'update' : 'add'} course.`);
                  }
                }}
              >
                {({ isSubmitting }) => (
                  <Form className="p-4">
                    {/* Course Name */}
                    <div className="form-group mb-3">
                      <label htmlFor="name" className="form-label fw-medium text-dark mb-2">
                        Course Name
                      </label>
                      <Field 
                        name="name" 
                        className="form-control rounded-lg p-3 border"
                        placeholder="Enter course name"
                      />
                      <ErrorMessage name="name" component="div" className="text-error fs-sm mt-1" />
                    </div>

                    {/* Description */}
                    <div className="form-group mb-3">
                      <label htmlFor="description" className="form-label fw-medium text-dark mb-2">
                        Description
                      </label>
                      <Field 
                        as="textarea" 
                        name="description" 
                        rows={3} 
                        className="form-control rounded-lg p-3 border"
                        placeholder="Enter course description"
                      />
                      <ErrorMessage name="description" component="div" className="text-error fs-sm mt-1" />
                    </div>

                    {/* Image URL */}
                    <div className="form-group mb-3">
                      <label htmlFor="thumbnail" className="form-label fw-medium text-dark mb-2">
                        Image URL
                      </label>
                      <Field 
                        name="thumbnail" 
                        className="form-control rounded-lg p-3 border"
                        placeholder="Enter image URL"
                      />
                      <ErrorMessage name="thumbnail" component="div" className="text-error fs-sm mt-1" />
                    </div>

                    {/* Category*/}
                    {(
                      <div className="form-group mb-3">
                        <label htmlFor="category" className="form-label fw-medium text-dark mb-2">
                          Category
                        </label>
                        <Field 
                         
                          name="category" 
                          className="form-select rounded-lg p-3 border"
                        >
                          
                        </Field>
                        <ErrorMessage name="category" component="div" className="text-error fs-sm mt-1" />
                      </div>
                    )}

                    {/* Instructor */}
                    <div className="form-group mb-3">
                      <label htmlFor="instructor" className="form-label fw-medium text-dark mb-2">
                        Instructor
                      </label>
                      <Field 
                        name="instructor" 
                        className="form-control rounded-lg p-3 border"
                        placeholder="Enter instructor name"
                      />
                      <ErrorMessage name="instructor" component="div" className="text-error fs-sm mt-1" />
                    </div>

                    {/* Duration */}
                    <div className="form-group mb-3">
                      <label htmlFor="duration" className="form-label fw-medium text-dark mb-2">
                        Duration
                      </label>
                      <Field 
                        name="duration" 
                        className="form-control rounded-lg p-3 border"
                        placeholder="e.g., 8 weeks, 30 hours"
                      />
                      <ErrorMessage name="duration" component="div" className="text-error fs-sm mt-1" />
                    </div>

                    {/* Price */}
                    <div className="form-group mb-3">
                      <label htmlFor="price" className="form-label fw-medium text-dark mb-2">
                        Price (₹)
                      </label>
                      <Field 
                        name="price" 
                        className="form-control rounded-lg p-3 border"
                        placeholder="Enter course price"
                      />
                      <ErrorMessage name="price" component="div" className="text-error fs-sm mt-1" />
                    </div>

                    {/* Submit Button */}
                    <div className="form-group mt-4">
                      <button 
                        type="submit" 
                        className="btn btn-primary w-100 p-3 rounded-lg fw-semibold"
                        disabled={isSubmitting}
                        style={{ minHeight: '50px' }}
                      >
                        {isSubmitting ? (
                          <span className="d-flex align-items-center justify-content-center">
                            <span className="spinner-border spinner-border-sm me-2" />
                            {isEdit ? 'Updating...' : 'Adding...'}
                          </span>
                        ) : (
                          <span className="d-flex align-items-center justify-content-center">
                            {isEdit ? '💾 Update Course' : '🚀 Add Course'}
                          </span>
                        )}
                      </button>
                    </div>

                    {/* Form Tips */}
                    <div className="bg-light rounded-lg p-3 mt-3">
                      <div className="text-muted fs-sm">
                        <strong>💡 Tips:</strong> Fill all required fields to create a complete course listing.
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CourseModal;