import { Formik, Form, Field, ErrorMessage } from 'formik';
import toast from 'react-hot-toast';
import * as Yup from 'yup';




const ContactUsForm = () => {
  
const sendEmail = async (values, actions) => {
  const env = process.env.REACT_APP_ENV;
  const baseURL =
    env === 'production'
      ? process.env.REACT_APP_PROD_API_URL
      : process.env.REACT_APP_LOCAL_API_URL;

  const endpoint = `${baseURL}/contact`
  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values)
    });

    const data = await res.json();
    console.log('SUCCESS...', data);

    if (data.success) {
      toast.success('Message sent successfully!');

      actions.resetForm();
    } else {
      console.error('Server error:', data.message);
    }
  } catch (error) {
    console.error('FAILED...', error);
  } finally {
    actions.setSubmitting(false);
  }
};






  return (
  <Formik
  initialValues={{ name: '', email: '', message: '', mobile: '' }}
  validationSchema={Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    mobile: Yup.string()
      .matches(/^[0-9]{10}$/, 'Mobile number must be 10 digits')
      .required('Mobile number is required'),
    message: Yup.string().required('Message is required'),
  })}
  onSubmit={sendEmail}
>
  {({ isSubmitting }) => (
    <Form className="contact-us-form">
      <div className="form-group">
        <Field name="name" type="text" className="form-control" placeholder="Enter name" />
        <ErrorMessage name="name" component="div" className="text-danger small" />
      </div>

      <div className="form-group">
        <Field name="email" type="email" className="form-control" placeholder="Enter email" />
        <ErrorMessage name="email" component="div" className="text-danger small" />
      </div>

      {/* ✅ New Mobile Number Field */}
      <div className="form-group">
        <Field name="mobile" type="tel" className="form-control" placeholder="Enter mobile number" />
        <ErrorMessage name="mobile" component="div" className="text-danger small" />
      </div>

      <div className="form-group">
        <Field
          name="message"
          as="textarea"
          className="form-control"
          rows="6"
          placeholder="Your message"
        />
        <ErrorMessage name="message" component="div" className="text-danger small" />
      </div>

      <button type="submit" className="btn secondary-solid-btn" disabled={isSubmitting}>
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>
    </Form>
  )}
</Formik>
  );
};

export default ContactUsForm;