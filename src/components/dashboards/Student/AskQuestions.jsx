import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  FiUser,
  FiMail,
  FiStar,
  FiMessageSquare,
  FiSend,
  FiTag,
} from 'react-icons/fi';

const FeedbackForm = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      rating: '',
      category: 'general',
      message: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      rating: Yup.string().required('Please select a rating'),
      category: Yup.string().required('Category is required'),
      message: Yup.string()
        .required('Feedback is required')
        .min(10, 'Please provide more detailed feedback'),
    }),
    onSubmit: (values, { setSubmitting, resetForm }) => {
      setTimeout(() => {
        alert('Thank you for your feedback! 🙌');
        resetForm();
        setSubmitting(false);
      }, 1000);
    },
  });

  const categories = [
    { id: 'general', name: 'General Feedback' },
    { id: 'course', name: 'Course Content' },
    { id: 'instructor', name: 'Instructor' },
    { id: 'platform', name: 'Platform Experience' },
    { id: 'suggestion', name: 'Suggestion' },
  ];

  const ratings = [
    { value: '5', label: 'Excellent' },
    { value: '4', label: 'Very Good' },
    { value: '3', label: 'Good' },
    { value: '2', label: 'Fair' },
    { value: '1', label: 'Poor' },
  ];

  const inputBase =
    'tw-w-full tw-border tw-rounded-lg tw-px-3 tw-py-2 tw-text-sm focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-blue-500';

  const errorClass = 'tw-border-red-500';

  return (
    <div className="tw-max-w-3xl tw-mx-auto tw-px-4 tw-py-10">
      {/* Header */}
      <div className="tw-text-center tw-mb-8">
        <h1 className="tw-text-2xl tw-font-bold">
          Share Your Feedback
        </h1>
        <p className="tw-text-gray-500 tw-text-sm tw-mt-1">
          Help us improve your learning experience
        </p>
      </div>

      {/* Card */}
      <div className="tw-bg-white tw-border tw-rounded-xl tw-shadow-sm tw-p-6 sm:tw-p-8">
        <form onSubmit={formik.handleSubmit} className="tw-space-y-6">
          {/* Row 1 */}
          <div className="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 tw-gap-4">
            {/* Name */}
            <div>
              <label className="tw-text-sm tw-font-medium tw-flex tw-items-center tw-gap-2">
                <FiUser /> Your Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                className={`${inputBase} ${
                  formik.touched.name && formik.errors.name
                    ? errorClass
                    : ''
                }`}
              />
              {formik.touched.name && formik.errors.name && (
                <p className="tw-text-xs tw-text-red-500 tw-mt-1">
                  {formik.errors.name}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="tw-text-sm tw-font-medium tw-flex tw-items-center tw-gap-2">
                <FiMail /> Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                className={`${inputBase} ${
                  formik.touched.email && formik.errors.email
                    ? errorClass
                    : ''
                }`}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="tw-text-xs tw-text-red-500 tw-mt-1">
                  {formik.errors.email}
                </p>
              )}
            </div>
          </div>

          {/* Row 2 */}
          <div className="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 tw-gap-4">
            {/* Category */}
            <div>
              <label className="tw-text-sm tw-font-medium tw-flex tw-items-center tw-gap-2">
                <FiTag /> Feedback Category
              </label>
              <select
                id="category"
                name="category"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.category}
                className={`${inputBase} ${
                  formik.touched.category && formik.errors.category
                    ? errorClass
                    : ''
                }`}
              >
                <option value="">Select category</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              {formik.touched.category && formik.errors.category && (
                <p className="tw-text-xs tw-text-red-500 tw-mt-1">
                  {formik.errors.category}
                </p>
              )}
            </div>

            {/* Rating */}
            <div>
              <label className="tw-text-sm tw-font-medium tw-flex tw-items-center tw-gap-2">
                <FiStar /> Overall Rating
              </label>
              <select
                id="rating"
                name="rating"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.rating}
                className={`${inputBase} ${
                  formik.touched.rating && formik.errors.rating
                    ? errorClass
                    : ''
                }`}
              >
                <option value="">Select rating</option>
                {ratings.map(rating => (
                  <option key={rating.value} value={rating.value}>
                    {rating.value} – {rating.label}
                  </option>
                ))}
              </select>
              {formik.touched.rating && formik.errors.rating && (
                <p className="tw-text-xs tw-text-red-500 tw-mt-1">
                  {formik.errors.rating}
                </p>
              )}
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="tw-text-sm tw-font-medium tw-flex tw-items-center tw-gap-2">
              <FiMessageSquare /> Your Feedback
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              placeholder="What did you like? What can we improve?"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.message}
              className={`${inputBase} tw-resize-none ${
                formik.touched.message && formik.errors.message
                  ? errorClass
                  : ''
              }`}
            />
            <div className="tw-flex tw-justify-between tw-mt-1">
              {formik.touched.message && formik.errors.message ? (
                <p className="tw-text-xs tw-text-red-500">
                  {formik.errors.message}
                </p>
              ) : (
                <span />
              )}
              <span className="tw-text-xs tw-text-gray-400">
                {formik.values.message.length}/500
              </span>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="
              tw-w-full
              tw-flex
              tw-items-center
              tw-justify-center
              tw-gap-2
              tw-bg-blue-600
              hover:tw-bg-blue-700
              tw-text-white
              tw-font-medium
              tw-py-3
              tw-rounded-lg
              disabled:tw-opacity-60
            "
          >
            <FiSend />
            {formik.isSubmitting ? 'Submitting...' : 'Submit Feedback'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default FeedbackForm;
