// InternshipPaymentForm.jsx
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { usePayment } from './services/handlePayment.js';
import { FaCode, FaLaptopCode, FaCalendarAlt } from "react-icons/fa";
import { MdEmail, MdPhone, MdSchool, MdAssignment } from "react-icons/md";
import { HiAcademicCap, HiUser } from "react-icons/hi";

const InternshipPaymentForm = ({ domains }) => {
  const { handlePayment, isLoading } = usePayment();

  const domainOptions = domains.map((domain) => ({
    id: domain._id,
    name: domain.name,
  }));
  
  const departmentOptions = [
    'Computer Science',
    'Information Technology',
    'Electronics & Communication',
    'Mechanical Engineering',
    'Civil Engineering',
    'Electrical Engineering'
  ];

  const semesterOptions = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th'];

  const collegeOptions = [
    { name: 'K G Reddy College of Engineering', code: 'KGRCE' },
    { name: 'JNTU Hyderabad', code: 'JNTUH' },
    { name: 'Osmania University', code: 'OU' },
    { name: 'Chaitanya Bharathi Institute of Technology', code: 'CBIT' },
    { name: 'Vasavi College of Engineering', code: 'VCE' },
    { name: 'Muffakham Jah College of Engineering', code: 'MJCE' },
    { name: 'Other', code: 'OTHER' }
  ];

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    phone: Yup.string()
      .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
      .required('Phone number is required'),
    department: Yup.string().required('Department is required'),
    semester: Yup.string().required('Semester is required'),
    rollNumber: Yup.string().required('Roll number is required'),
    program: Yup.string().required('Please select a program'),
    domain: Yup.string().required('Please select a domain'),
    amount: Yup.number().required('Amount is required'),
    collegeName: Yup.string().required('College name is required'),
    collegeCode: Yup.string().required('College code is required')
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      department: '',
      semester: '',
      rollNumber: '',
      program: '',
      domain: '',
      amount: 0,
      collegeName: '',
      collegeCode: ''
    },
    validationSchema,
    onSubmit: async (values) => {
      
      try {
        await handlePayment(values);
      } catch (error) {

      }
    }
  });


  // Get selected domain
const selectedDomain = domains.find(
  (domain) => domain._id === formik.values.domain
);

// Build program options dynamically
const programOptions =
  selectedDomain?.durations?.map((duration) => ({
   id: String(duration.days),
    name: duration.label,
    days: duration.days,
    amount: duration.fee,
  })) || [];

  const handleCollegeInput = (e) => {
    const selectedCollegeName = e.target.value;
    formik.setFieldValue('collegeName', selectedCollegeName);
    const selectedCollege = collegeOptions.find(college => college.name === selectedCollegeName);
    if (selectedCollege) {
      formik.setFieldValue('collegeCode', selectedCollege.code);
    }
  };

  return (
    <div className="tw-bg-white tw-shadow-xl tw-rounded-xl tw-p-6 tw-w-full lg:tw-max-w-lg">
      {/* Title */}
      <div className="tw-mb-6">
        <h2 className="tw-text-xl tw-font-bold tw-text-gray-900">Payment Details</h2>
        <div className="tw-w-12 tw-h-1 tw-bg-gradient-to-r tw-from-blue-600 tw-to-purple-600 tw-mt-2 tw-rounded-full"></div>
      </div>

      {/* Form Section */}
      <form onSubmit={formik.handleSubmit} className="tw-space-y-4">
        {/* Name */}
        <div>
          <label className="tw-block tw-text-sm tw-font-medium tw-text-gray-700 tw-mb-1">
            <HiUser className="tw-inline tw-mr-1" /> Name of the student *
          </label>
          <input
            type="text"
            name="name"
            className={`tw-w-full tw-p-3 tw-border tw-rounded-lg tw-transition-all ${formik.errors.name && formik.touched.name
              ? 'tw-border-red-500 focus:tw-ring-red-500'
              : 'tw-border-gray-300 focus:tw-border-blue-500 focus:tw-ring-blue-500'
              } focus:tw-outline-none focus:tw-ring-2`}
            placeholder="Enter your name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.name && formik.touched.name && (
            <p className="tw-text-red-500 tw-text-xs tw-mt-1">{formik.errors.name}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="tw-block tw-text-sm tw-font-medium tw-text-gray-700 tw-mb-1">
            <MdEmail className="tw-inline tw-mr-1" /> Email *
          </label>
          <input
            type="email"
            name="email"
            className={`tw-w-full tw-p-3 tw-border tw-rounded-lg tw-transition-all ${formik.errors.email && formik.touched.email
              ? 'tw-border-red-500 focus:tw-ring-red-500'
              : 'tw-border-gray-300 focus:tw-border-blue-500 focus:tw-ring-blue-500'
              } focus:tw-outline-none focus:tw-ring-2`}
            placeholder="Enter your email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.email && formik.touched.email && (
            <p className="tw-text-red-500 tw-text-xs tw-mt-1">{formik.errors.email}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="tw-block tw-text-sm tw-font-medium tw-text-gray-700 tw-mb-1">
            <MdPhone className="tw-inline tw-mr-1" /> Phone *
          </label>
          <input
            type="tel"
            name="phone"
            className={`tw-w-full tw-p-3 tw-border tw-rounded-lg tw-transition-all ${formik.errors.phone && formik.touched.phone
              ? 'tw-border-red-500 focus:tw-ring-red500'
              : 'tw-border-gray-300 focus:tw-border-blue-500 focus:tw-ring-blue-500'
              } focus:tw-outline-none focus:tw-ring-2`}
            placeholder="Enter your phone number"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.phone && formik.touched.phone && (
            <p className="tw-text-red-500 tw-text-xs tw-mt-1">{formik.errors.phone}</p>
          )}
        </div>

        {/* College Name */}
        <div>
          <label className="tw-block tw-text-sm tw-font-medium tw-text-gray-700 tw-mb-1">
            <MdSchool className="tw-inline tw-mr-1" /> College Name *
          </label>
          <div className="tw-relative">
            <input
              type="text"
              name="collegeName"
              list="collegeOptions"
              className={`tw-w-full tw-p-3 tw-border tw-rounded-lg tw-transition-all ${formik.errors.collegeName && formik.touched.collegeName
                ? 'tw-border-red-500 focus:tw-ring-red-500'
                : 'tw-border-gray-300 focus:tw-border-blue-500 focus:tw-ring-blue-500'
                } focus:tw-outline-none focus:tw-ring-2`}
              placeholder="Select or type college name"
              value={formik.values.collegeName}
              onChange={handleCollegeInput}
              onBlur={formik.handleBlur}
            />
            <datalist id="collegeOptions">
              {collegeOptions.map((college) => (
                <option key={college.code} value={college.name}>
                  {college.name} ({college.code})
                </option>
              ))}
            </datalist>
          </div>
          {formik.errors.collegeName && formik.touched.collegeName && (
            <p className="tw-text-red-500 tw-text-xs tw-mt-1">{formik.errors.collegeName}</p>
          )}
        </div>

        {/* College Code */}
        <div>
          <label className="tw-block tw-text-sm tw-font-medium tw-text-gray-700 tw-mb-1">
            <FaCode className="tw-inline tw-mr-1" /> College Code *
          </label>
          <input
            type="text"
            name="collegeCode"
            className={`tw-w-full tw-p-3 tw-border tw-rounded-lg tw-transition-all ${formik.errors.collegeCode && formik.touched.collegeCode
              ? 'tw-border-red-500 focus:tw-ring-red-500'
              : 'tw-border-gray-300 focus:tw-border-blue-500 focus:tw-ring-blue-500'
              } focus:tw-outline-none focus:tw-ring-2`}
            placeholder="Enter college code"
            value={formik.values.collegeCode}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.collegeCode && formik.touched.collegeCode && (
            <p className="tw-text-red-500 tw-text-xs tw-mt-1">{formik.errors.collegeCode}</p>
          )}
        </div>

        {/* Department */}
        <div>
          <label className="tw-block tw-text-sm tw-font-medium tw-text-gray-700 tw-mb-1">
            <HiAcademicCap className="tw-inline tw-mr-1" /> Department *
          </label>
          <div className="tw-relative">
            <input
              type="text"
              name="department"
              list="departmentOptions"
              className={`tw-w-full tw-p-3 tw-border tw-rounded-lg tw-transition-all ${formik.errors.department && formik.touched.department
                ? 'tw-border-red-500 focus:tw-ring-red-500'
                : 'tw-border-gray-300 focus:tw-border-blue-500 focus:tw-ring-blue-500'
                } focus:tw-outline-none focus:tw-ring-2`}
              placeholder="Select or type department"
              value={formik.values.department}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <datalist id="departmentOptions">
              {departmentOptions.map((dept) => (
                <option key={dept} value={dept} />
              ))}
            </datalist>
          </div>
          {formik.errors.department && formik.touched.department && (
            <p className="tw-text-red-500 tw-text-xs tw-mt-1">{formik.errors.department}</p>
          )}
        </div>

        {/* Semester */}
        <div>
          <label className="tw-block tw-text-sm tw-font-medium tw-text-gray-700 tw-mb-1">
            <FaCalendarAlt className="tw-inline tw-mr-1" /> Semester *
          </label>
          <select
            name="semester"
            className={`tw-w-full tw-p-3 tw-border tw-rounded-lg tw-transition-all ${formik.errors.semester && formik.touched.semester
              ? 'tw-border-red-500 focus:tw-ring-red-500'
              : 'tw-border-gray-300 focus:tw-border-blue-500 focus:tw-ring-blue-500'
              } focus:tw-outline-none focus:tw-ring-2`}
            value={formik.values.semester}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option value="">Select Semester</option>
            {semesterOptions.map((sem) => (
              <option key={sem} value={sem}>{sem} Semester</option>
            ))}
          </select>
          {formik.errors.semester && formik.touched.semester && (
            <p className="tw-text-red-500 tw-text-xs tw-mt-1">{formik.errors.semester}</p>
          )}
        </div>

        {/* Roll Number */}
        <div>
          <label className="tw-block tw-text-sm tw-font-medium tw-text-gray-700 tw-mb-1">
            <MdAssignment className="tw-inline tw-mr-1" /> Roll Number *
          </label>
          <input
            type="text"
            name="rollNumber"
            className={`tw-w-full tw-p-3 tw-border tw-rounded-lg tw-transition-all ${formik.errors.rollNumber && formik.touched.rollNumber
              ? 'tw-border-red-500 focus:tw-ring-red-500'
              : 'tw-border-gray-300 focus:tw-border-blue-500 focus:tw-ring-blue-500'
              } focus:tw-outline-none focus:tw-ring-2`}
            placeholder="Enter roll number"
            value={formik.values.rollNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.rollNumber && formik.touched.rollNumber && (
            <p className="tw-text-red-500 tw-text-xs tw-mt-1">{formik.errors.rollNumber}</p>
          )}
        </div>

        {/* Domain Selection */}
        <div>
          <label className="tw-block tw-text-sm tw-font-medium tw-text-gray-700 tw-mb-1">
            <FaLaptopCode className="tw-inline tw-mr-1" /> Internship Domain *
          </label>
          <select
            name="domain"
            className={`tw-w-full tw-p-3 tw-border tw-rounded-lg tw-transition-all ${
              formik.errors.domain && formik.touched.domain 
                ? 'tw-border-red-500 focus:tw-ring-red-500' 
                : 'tw-border-gray-300 focus:tw-border-blue-500 focus:tw-ring-blue-500'
            } focus:tw-outline-none focus:tw-ring-2`}
            value={formik.values.domain}
            onChange={(e) => {
              formik.setFieldValue("domain", e.target.value);
              formik.setFieldValue("program", "");
              formik.setFieldValue("amount", 0);
            }}
          >
            <option value="">Select Internship Domain</option>
            {domainOptions.map((domain) => (
              <option key={domain.id} value={domain.id}>
                {domain.name}
              </option>
            ))}
          </select>

          {formik.errors.domain && formik.touched.domain && (
            <p className="tw-text-red-500 tw-text-xs tw-mt-1">{formik.errors.domain}</p>
          )}
        </div>

        {/* Program Selection */}
        <div>
          <label className="tw-block tw-text-sm tw-font-medium tw-text-gray-700 tw-mb-1">
            Choose Program Duration *
          </label>
          <select
            name="program"
            className={`tw-w-full tw-p-3 tw-border tw-rounded-lg tw-transition-all ${
              formik.errors.program && formik.touched.program 
                ? 'tw-border-red-500 focus:tw-ring-red-500' 
                : 'tw-border-gray-300 focus:tw-border-blue-500 focus:tw-ring-blue-500'
            } focus:tw-outline-none focus:tw-ring-2`}
            value={formik.values.program}
            onChange={(e) => {
              const selectedProgram = programOptions.find(
                (program) => program.id === e.target.value
              );

              formik.setFieldValue("program", e.target.value);
              formik.setFieldValue("amount", selectedProgram?.amount || 0);
            }}
            disabled={!selectedDomain}
          >
            <option value="">Select Program Duration</option>
            {programOptions.map((program) => (
              <option key={program.id} value={program.id}>
                {program.days} days - ₹{program.amount}
              </option>
            ))}
          </select>

          {formik.errors.program && formik.touched.program && (
            <p className="tw-text-red-500 tw-text-xs tw-mt-1">{formik.errors.program}</p>
          )}
        </div>

        {/* Amount Display */}
        <div className="tw-bg-gradient-to-r tw-from-blue-50 tw-to-purple-50 tw-p-4 tw-rounded-lg tw-border tw-border-blue-100">
          <div className="tw-text-sm tw-font-medium tw-text-gray-700 tw-mb-2">
            Amount to Pay
          </div>
          <div className="tw-flex tw-items-center">
            <span className="tw-text-2xl tw-font-bold tw-text-gray-900 tw-mr-1">₹</span>
            <span className="tw-text-3xl tw-font-bold tw-text-gray-900">
              {formik.values.amount}.00
            </span>
          </div>
        </div>

        {/* Form Footer */}
        <div className="tw-mt-6">
          <div className="tw-flex tw-flex-col sm:tw-flex-row tw-justify-between tw-items-center tw-space-y-4 sm:tw-space-y-0">
            <img
              alt="pay-methods"
              src="https://cdn.razorpay.com/static/assets/pay_methods_branding.png"
              width="180"
              className="tw-mb-4 sm:tw-mb-0"
            />
            <button
              type="submit"
              className={`tw-bg-gradient-to-r tw-from-blue-600 tw-to-purple-600 tw-text-white tw-font-semibold tw-py-3 tw-px-6 tw-rounded-lg tw-transition-all tw-w-full sm:tw-w-auto ${isLoading || formik.values.amount === 0
                ? 'tw-opacity-50 tw-cursor-not-allowed'
                : 'hover:tw-from-blue-700 hover:tw-to-purple-700 hover:tw-shadow-lg'
                }`}
              disabled={isLoading || formik.values.amount === 0}
            >
              {isLoading ? (
                <>
                  <span className="tw-inline-block tw-animate-spin tw-mr-2">⟳</span>
                  Processing...
                </>
              ) : (
                <>
                  Pay ₹ {formik.values.amount}.00
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default InternshipPaymentForm;