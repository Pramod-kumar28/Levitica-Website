import { Formik, Form, Field, ErrorMessage } from "formik";
import toast from "react-hot-toast";
import * as Yup from "yup";

const ContactUsForm = () => {

  const sendEmail = async (values, actions) => {
    const env = process.env.REACT_APP_ENV;
    const baseURL =
      env === "production"
        ? process.env.REACT_APP_PROD_API_URL
        : process.env.REACT_APP_LOCAL_API_URL;

    try {
      const res = await fetch(`${baseURL}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Message sent successfully!");
        actions.resetForm();
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } catch (err) {
      toast.error("Failed to send message");
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{ name: "", email: "", mobile: "", message: "" }}
      validationSchema={Yup.object({
        name: Yup.string().required("Name is required"),
        email: Yup.string().email("Invalid email").required("Email is required"),
        mobile: Yup.string()
          .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits")
          .required("Mobile number is required"),
        message: Yup.string().required("Message is required"),
      })}
      onSubmit={sendEmail}
    >
      {({ isSubmitting }) => (
        <Form className="tw-space-y-4">

          <div>
            <Field
              name="name"
              placeholder="Your Name"
              className="tw-w-full tw-border tw-rounded-lg tw-px-4 tw-py-2"
            />
            <ErrorMessage name="name" component="p" className="tw-text-red-500 tw-text-sm" />
          </div>

          <div>
            <Field
              name="email"
              type="email"
              placeholder="Email Address"
              className="tw-w-full tw-border tw-rounded-lg tw-px-4 tw-py-2"
            />
            <ErrorMessage name="email" component="p" className="tw-text-red-500 tw-text-sm" />
          </div>

          <div>
            <Field
              name="mobile"
              placeholder="Mobile Number"
              className="tw-w-full tw-border tw-rounded-lg tw-px-4 tw-py-2"
            />
            <ErrorMessage name="mobile" component="p" className="tw-text-red-500 tw-text-sm" />
          </div>

          <div>
            <Field
              as="textarea"
              name="message"
              rows="5"
              placeholder="Your Message"
              className="tw-w-full tw-border tw-rounded-lg tw-px-4 tw-py-2"
            />
            <ErrorMessage name="message" component="p" className="tw-text-red-500 tw-text-sm" />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn secondary-solid-btn tw-w-full"
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>

        </Form>
      )}
    </Formik>
  );
};

export default ContactUsForm;
