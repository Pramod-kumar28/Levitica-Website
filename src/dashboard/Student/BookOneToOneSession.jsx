// import React, { useState, useEffect } from 'react';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import { useSelector } from 'react-redux';
// import { useGetStudentEnrolledCoursesQuery } from '@/Services/student/enrollFormServices';


// const BookOneOnOne = () => {
//   const { user } = useSelector(state => state.auth);
//   const [sessionType, setSessionType] = useState('consulting');
  
//   // Get enrolled courses for the user
//   const { 
//     data: enrolledCoursesData, 
//     isLoading: enrolledLoading,
//     error: enrolledError 
//   } = useGetStudentEnrolledCoursesQuery(user?.id, {
//     skip: !user?.id
//   });

//   const enrolledCourses = enrolledCoursesData?.data || [];

//   const formik = useFormik({
//     initialValues: {
//       name: user?.name || '',
//       email: user?.email || '',
//       sessionType: 'consulting',
//       course: '',
//       preferredDate: '',
//       preferredTime: '',
//       message: ''
//     },
//     validationSchema: Yup.object({
//       name: Yup.string().required('Name is required'),
//       email: Yup.string().email('Invalid email address').required('Email is required'),
//       sessionType: Yup.string().required('Session type is required'),
//     course: Yup.string().when('sessionType', {
//   is: 'doubts',
//   then: () => Yup.string().required('Course selection is required for doubts session'),
//   otherwise: () => Yup.string()
// })
// ,
//       preferredDate: Yup.date().required('Date is required').min(new Date(), 'Date must be in the future'),
//       preferredTime: Yup.string().required('Time is required'),
//       message: Yup.string().max(500, 'Message must be 500 characters or less')
//     }),
//     onSubmit: (values, { setSubmitting, resetForm }) => {
//       console.log(values)
//       // Simulate API call
//       setTimeout(() => {
//         alert('Session booking request submitted successfully! We will confirm your session shortly.');
//         // resetForm();
//         setSubmitting(false);
//       }, 1000);
//     },
//   });

//   // Update formik values when user data loads
//   useEffect(() => {
//     if (user) {
//       formik.setValues({
//         ...formik.values,
//         name: user.name || '',
//         email: user.email || ''
//       });
//     }
//   }, [user]);

//   // Update session type and reset course when type changes
//   useEffect(() => {
//     formik.setFieldValue('sessionType', sessionType);
//     if (sessionType === 'consulting') {
//       formik.setFieldValue('course', '');
//     }
//   }, [sessionType]);

//   const timeSlots = [
//     '9:00 AM - 10:00 AM',
//     '10:30 AM - 11:30 AM',
//     '2:00 PM - 3:00 PM',
//     '3:30 PM - 4:30 PM',
//     '5:00 PM - 6:00 PM'
//   ];

//   if (enrolledLoading) {
//     return (
//       <div className="book-session-container">
//         <div className="loading-container">
//           <div className="spinner"></div>
//           <p>Loading your information...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="book-session-container">
//       <div className="book-session-header">
//         <h1>Book 1-on-1 Session</h1>
//         <p>Get personalized attention from our expert instructors</p>
//       </div>

//       <div className="booking-form-container">
//         <form onSubmit={formik.handleSubmit} className="booking-form">
//           {/* Session Type Selection */}
//           <div className="session-type-group">
//             <label>Session Type</label>
//             <div className="session-type-options">
//               <div 
//                 className={`session-type-option ${sessionType === 'consulting' ? 'selected' : ''}`}
//                 onClick={() => setSessionType('consulting')}
//               >
//                 <h4>General Consulting</h4>
//                 <p>Career guidance, course selection, general queries</p>
//               </div>
//               <div 
//                 className={`session-type-option ${sessionType === 'doubts' ? 'selected' : ''}`}
//                 onClick={() => setSessionType('doubts')}
//               >
//                 <h4>Course Doubts</h4>
//                 <p>Specific questions about your enrolled courses</p>
//               </div>
//             </div>
//             {formik.touched.sessionType && formik.errors.sessionType ? (
//               <div className="error-message">{formik.errors.sessionType}</div>
//             ) : null}
//           </div>

//           <div className="form-row">
//             <div className="form-group">
//               <label htmlFor="name">Full Name</label>
//               <input
//                 id="name"
//                 name="name"
//                 type="text"
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 value={formik.values.name}
//                 className={formik.touched.name && formik.errors.name ? 'error' : ''}
//               />
//               {formik.touched.name && formik.errors.name ? (
//                 <div className="error-message">{formik.errors.name}</div>
//               ) : null}
//             </div>

//             <div className="form-group">
//               <label htmlFor="email">Email Address</label>
//               <input
//                 id="email"
//                 name="email"
//                 type="email"
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 value={formik.values.email}
//                 className={formik.touched.email && formik.errors.email ? 'error' : ''}
//               />
//               {formik.touched.email && formik.errors.email ? (
//                 <div className="error-message">{formik.errors.email}</div>
//               ) : null}
//             </div>
//           </div>

//           {/* Course Selection - Only show for doubts session type */}
//           {sessionType === 'doubts' && (
//             <div className="form-group">
//               <label htmlFor="course">Select Course</label>
//               <select
//                 id="course"
//                 name="course"
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 value={formik.values.course}
//                 className={formik.touched.course && formik.errors.course ? 'error' : ''}
//               >
//                 <option value="">Select your enrolled course</option>
//                 {enrolledCourses.map(enrollment => (
//                   <option key={enrollment.course?._id} value={enrollment.course?._id}>
//                     {enrollment.course?.name}
//                   </option>
//                 ))}
//               </select>
//               {formik.touched.course && formik.errors.course ? (
//                 <div className="error-message">{formik.errors.course}</div>
//               ) : null}
//               {enrolledCourses.length === 0 && (
//                 <div className="error-message" style={{color: 'var(--warning-color)'}}>
//                   You need to be enrolled in a course to book doubts sessions
//                 </div>
//               )}
//             </div>
//           )}

//           <div className="form-row">
//             <div className="form-group">
//               <label htmlFor="preferredDate">Preferred Date</label>
//               <input
//                 id="preferredDate"
//                 name="preferredDate"
//                 type="date"
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 value={formik.values.preferredDate}
//                 min={new Date().toISOString().split('T')[0]}
//                 className={formik.touched.preferredDate && formik.errors.preferredDate ? 'error' : ''}
//               />
//               {formik.touched.preferredDate && formik.errors.preferredDate ? (
//                 <div className="error-message">{formik.errors.preferredDate}</div>
//               ) : null}
//             </div>

//             <div className="form-group">
//               <label htmlFor="preferredTime">Preferred Time</label>
//               <select
//                 id="preferredTime"
//                 name="preferredTime"
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 value={formik.values.preferredTime}
//                 className={formik.touched.preferredTime && formik.errors.preferredTime ? 'error' : ''}
//               >
//                 <option value="">Select a time slot</option>
//                 {timeSlots.map((time, index) => (
//                   <option key={index} value={time}>
//                     {time}
//                   </option>
//                 ))}
//               </select>
//               {formik.touched.preferredTime && formik.errors.preferredTime ? (
//                 <div className="error-message">{formik.errors.preferredTime}</div>
//               ) : null}
//             </div>
//           </div>

//           <div className="form-group">
//             <label htmlFor="message">
//               {sessionType === 'doubts' ? 'Specific Questions/Doubts' : 'Additional Notes (Optional)'}
//             </label>
//             <textarea
//               id="message"
//               name="message"
//               rows="4"
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               value={formik.values.message}
//               className={formik.touched.message && formik.errors.message ? 'error' : ''}
//               placeholder={
//                 sessionType === 'doubts' 
//                   ? "Describe the specific topics or questions you'd like to discuss..."
//                   : "Any specific topics you'd like to focus on during the session..."
//               }
//             />
//             {formik.touched.message && formik.errors.message ? (
//               <div className="error-message">{formik.errors.message}</div>
//             ) : null}
//             <div className="char-count">{formik.values.message.length}/500</div>
//           </div>

//           <button 
//             type="submit" 
//             className="submit-btn"
//             disabled={formik.isSubmitting || (sessionType === 'doubts' && enrolledCourses.length === 0)}
//           >
//             {formik.isSubmitting ? 'Submitting...' : 'Request Session'}
//           </button>
//         </form>

//         <div className="booking-info">
//           <h3>How 1-on-1 Sessions Work</h3>
//           <ul>
//             <li>60-minute personalized sessions with expert instructors</li>
//             <li>Get help with specific challenges or concepts</li>
//             <li>Receive tailored guidance for your learning path</li>
//             <li>Available Monday - Friday, 9 AM - 6 PM</li>
//             <li>You'll receive confirmation within 24 hours</li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BookOneOnOne;