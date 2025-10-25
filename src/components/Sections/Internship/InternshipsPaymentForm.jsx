import { useFormik } from 'formik';
import * as Yup from 'yup';

import {usePayment} from './services/handlePayment.js';

const InternshipPaymentForm = () => {
  
   const { handlePayment, isLoading } = usePayment();

  // Domain options
  const domainOptions = [
    { 
      id: 'java-fullstack', 
      name: 'Java Full Stack Development'
    },
    { 
      id: 'python-ai', 
      name: 'Python Full Stack + Generative AI'
    },
    { 
      id: 'dotnet-cloud', 
      name: '.NET Full Stack + Cloud AI'
    },
    { 
      id: 'flutter-mobile', 
      name: 'Flutter Mobile App Development'
    },
    { 
      id: 'software-testing', 
      name: 'Software Testing & Automation'
    },
    { 
      id: 'data-science-ai', 
      name: 'Data Science & AI'
    }
  ];

  const programOptions = [
    { id: '5days', name: '5 Days Program', days: 5, amount: 500 },
    { id: '15days', name: '15 Days Program', days: 15, amount: 1000 }
  ];

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
    
      console.log('Form submitted:', values);
      try {
        await handlePayment(values); // Pass setIsLoading to handlePayment
      } catch (error) {
        console.error('Payment handling error:', error);
      }
    }
  });

  const handleProgramChange = (e) => {
    const selectedProgram = programOptions.find(program => program.id === e.target.value);
    formik.setFieldValue('program', e.target.value);
    formik.setFieldValue('amount', selectedProgram ? selectedProgram.amount : 0);
  };

  const handleCollegeInput = (e) => {
    const selectedCollegeName = e.target.value;
    formik.setFieldValue('collegeName', selectedCollegeName);
    const selectedCollege = collegeOptions.find(college => college.name === selectedCollegeName);
    if (selectedCollege) {
      formik.setFieldValue('collegeCode', selectedCollege.code);
    }
  };

  return (
    <div>
      <div className="lg-w-3/4 p-4">
        <div className="bg-white shadow-lg p-6">
          {/* Title */}
          <div className="title mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Payment Details</h2>
            <div className="title-underline w-12 h-1 bg-blue-600 mt-2"></div>
          </div>

          {/* Form Section */}
          <div>
            <form onSubmit={formik.handleSubmit} className="UI-form space-y-4">
              {/* Name */}
              <div className="Field">
                <label className="Field-label">
                  Name of the student *
                </label>
                <div className="Field-content">
                  <input
                    type="text"
                    name="name"
                    className={`Field-el ${formik.errors.name && formik.touched.name ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Enter your name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.name && formik.touched.name && (
                    <div className="Field-error">{formik.errors.name}</div>
                  )}
                </div>
              </div>

              {/* Email */}
              <div className="Field">
                <label className="Field-label">
                  Email *
                </label>
                <div className="Field-content">
                  <input
                    type="email"
                    name="email"
                    className={`Field-el ${formik.errors.email && formik.touched.email ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Enter your email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.email && formik.touched.email && (
                    <div className="Field-error">{formik.errors.email}</div>
                  )}
                </div>
              </div>

              {/* Phone */}
              <div className="Field">
                <label className="Field-label">
                  Phone *
                </label>
                <div className="Field-content">
                  <input
                    type="tel"
                    name="phone"
                    className={`Field-el ${formik.errors.phone && formik.touched.phone ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Enter your phone number"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.phone && formik.touched.phone && (
                    <div className="Field-error">{formik.errors.phone}</div>
                  )}
                </div>
              </div>

              {/* College Name */}
              <div className="Field">
                <label className="Field-label">
                  College Name *
                </label>
                <div className="Field-content">
                  <div className="relative">
                    <input
                      type="text"
                      name="collegeName"
                      list="collegeOptions"
                      className={`Field-el ${formik.errors.collegeName && formik.touched.collegeName ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="Select from dropdown or type your college name"
                      value={formik.values.collegeName}
                      onChange={handleCollegeInput}
                      onBlur={(e) => {
                        formik.handleBlur(e);
                        const selectedCollege = collegeOptions.find(college => college.name === e.target.value);
                        if (selectedCollege && formik.values.collegeCode === '') {
                          formik.setFieldValue('collegeCode', selectedCollege.code);
                        }
                      }}
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
                    <div className="Field-error">{formik.errors.collegeName}</div>
                  )}
                </div>
              </div>

              {/* College Code */}
              <div className="Field">
                <label className="Field-label">
                  College Code *
                </label>
                <div className="Field-content">
                  <input
                    type="text"
                    name="collegeCode"
                    className={`Field-el ${formik.errors.collegeCode && formik.touched.collegeCode ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Enter college code"
                    value={formik.values.collegeCode}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.collegeCode && formik.touched.collegeCode && (
                    <div className="Field-error">{formik.errors.collegeCode}</div>
                  )}
                </div>
              </div>

              {/* Department */}
              <div className="Field">
                <label className="Field-label">
                  Department *
                </label>
                <div className="Field-content">
                  <div className="relative">
                    <input
                      type="text"
                      name="department"
                      list="departmentOptions"
                      className={`Field-el ${formik.errors.department && formik.touched.department ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="Select or type your department"
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
                    <div className="Field-error">{formik.errors.department}</div>
                  )}
                </div>
              </div>

              {/* Semester */}
              <div className="Field">
                <label className="Field-label">
                  Semester *
                </label>
                <div className="Field-content">
                  <select
                    name="semester"
                    className={`Field-el ${formik.errors.semester && formik.touched.semester ? 'border-red-500' : 'border-gray-300'}`}
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
                    <div className="Field-error">{formik.errors.semester}</div>
                  )}
                </div>
              </div>

              {/* Roll Number */}
              <div className="Field">
                <label className="Field-label">
                  Roll Number *
                </label>
                <div className="Field-content">
                  <input
                    type="text"
                    name="rollNumber"
                    className={`Field-el ${formik.errors.rollNumber && formik.touched.rollNumber ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Enter roll number"
                    value={formik.values.rollNumber}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.rollNumber && formik.touched.rollNumber && (
                    <div className="Field-error">{formik.errors.rollNumber}</div>
                  )}
                </div>
              </div>

              {/* Domain Selection */}
              <div className="Field">
                <label className="Field-label">
                  💻 Internship Domain *
                </label>
                <div className="Field-content">
                  <select
                    name="domain"
                    className={`Field-el ${formik.errors.domain && formik.touched.domain ? 'border-red-500' : 'border-gray-300'}`}
                    value={formik.values.domain}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    <option value="">Select Internship Domain</option>
                    {domainOptions.map((domain) => (
                      <option key={domain.id} value={domain.id}>
                        {domain.name}
                      </option>
                    ))}
                  </select>
                  {formik.errors.domain && formik.touched.domain && (
                    <div className="Field-error">{formik.errors.domain}</div>
                  )}
                </div>
              </div>

              {/* Program Selection */}
              <div className="Field">
                <label className="Field-label">
                  Choose Program Duration *
                </label>
                <div className="Field-content">
                  <select
                    name="program"
                    className={`Field-el ${formik.errors.program && formik.touched.program ? 'border-red-500' : 'border-gray-300'}`}
                    value={formik.values.program}
                    onChange={handleProgramChange}
                    onBlur={formik.handleBlur}
                  >
                    <option value="">Select a program</option>
                    {programOptions.map((program) => (
                      <option key={program.id} value={program.id}>
                        {program.name} - {program.days} days - ₹{program.amount}
                      </option>
                    ))}
                  </select>
                  {formik.errors.program && formik.touched.program && (
                    <div className="Field-error">{formik.errors.program}</div>
                  )}
                </div>
              </div>

              {/* Amount Display */}
              <div className="Field Field--amount bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="Field-label text-sm font-medium text-gray-700 mb-2">
                  Amount
                </div>
                <div className="Field-content">
                  <div className="Field-wrapper flex items-center">
                    <span className="Field-addon Field-addon--before mr-2">
                      <span className="currency-symbol font-bold text-gray-900">₹</span>
                    </span>
                    <div className="">
                      <label className="font-bold text-2xl text-gray-900">
                        {formik.values.amount}.00
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Footer */}
              <div id="form-footer" className="mt-6">
                <div className="form-footer-payment flex flex-col sm-flex-row justify-between items-center space-y-4 sm-space-y-0">
                  <img
                    id="fin-logo"
                    alt="pay-methods"
                    src="https://cdn.razorpay.com/static/assets/pay_methods_branding.png"
                    width="180"
                    className="mb-4 sm-mb-0"
                  />
                  <button
                    type="submit"
                    className={`btn btn--gradient`}
                    disabled={isLoading || formik.values.amount === 0}
                    tabIndex="0"
                  >
                    {isLoading ? (
                      <>
                        <span className="loading-spinner mr-2"></span>
                        Processing...
                      </>
                    ) : (
                      <>
                        Pay <span className="ml-2">₹ {formik.values.amount}.00</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InternshipPaymentForm;