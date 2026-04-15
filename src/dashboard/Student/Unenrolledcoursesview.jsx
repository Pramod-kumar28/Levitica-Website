// import  { useState } from 'react';
// import { Formik, Form, Field } from 'formik';
// import { motion, AnimatePresence } from 'framer-motion';
// import { useUnenrolledCourses } from '@/hooks/useUnenrolledcourses';
// import { BookOpen, Clock, Users, ShoppingCart,Loader, Eye } from 'lucide-react';
// import { useCoursesCategory } from '@/hooks/useCourses';
// import { useAddItemMutation } from '@/Services/student/cartServices';
// import { useSelector } from 'react-redux';
// import { toast } from 'react-hot-toast';
// import { Link } from 'react-router-dom';

// const UnenrolledCoursesGrid = ({ enrolledCourseIds = [] }) => {
//   const { categories, isSuccess } = useCoursesCategory();
//   const { courses, isLoading } = useUnenrolledCourses(enrolledCourseIds);
//   const [selectedCategory, setSelectedCategory] = useState('');
//   const [addItem, { isLoading: addingToCart }] = useAddItemMutation();
//   const userId = useSelector(state => state.auth.user?.id);

//   const handleAdd = async (course) => {
//     if (!userId) {
//       toast.error('Please login to add items to cart');
//       return;
//     }
//     try {
//       await addItem({ userId, courseId: course._id }).unwrap();
//       toast.success('Added to cart!');
//     } catch (error) {
//       toast.error('Failed to add to cart');
//     }
//   };

//   const filteredCourses = selectedCategory
//     ? courses.filter(course => course.category === selectedCategory)
//     : courses;

//   const cardVariants = {
//     hidden: { y: 20, opacity: 0 },
//     visible: { y: 0, opacity: 1 },
//     hover: { y: -5, scale: 1.02 },
//     tap: { scale: 0.98 }
//   };

//   if (isLoading) {
//     return (
//       <div className="container py-4">
//         <div className="row g-4">
//           {[...Array(6)].map((_, i) => (
//             <div key={i} className="col-md-4">
//               <div className="placeholder-glow">
//                 <div className="placeholder col-12 bg-secondary" style={{ height: '200px' }}></div>
//                 <div className="placeholder col-8 mt-2"></div>
//                 <div className="placeholder col-6"></div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="container py-4">
//       {/* Category Filter */}
//       {isSuccess && (
//         <div className="mb-4">
//           <Formik initialValues={{ category: '' }} onSubmit={() => {}}>
//             <Form>
//               <div className="row g-3 align-items-center">
//                 <div className="col-auto">
//                   <Field
//                     as="select"
//                     name="category"
//                     className="form-select"
//                     onChange={(e) => setSelectedCategory(e.target.value)}
//                   >
//                     <option value="">All Categories</option>
//                     {categories?.map((cat) => (
//                       <option key={cat} value={cat}>{cat}</option>
//                     ))}
//                   </Field>
//                 </div>
//                 <div className="col-auto text-muted small">
//                   {filteredCourses.length} courses found
//                 </div>
//               </div>
//             </Form>
//           </Formik>
//         </div>
//       )}

//       {/* Courses Grid */}
//       <div className="row g-4">
//         <AnimatePresence>
//           {filteredCourses.map((course, index) => (
//             <motion.div
//               key={course._id}
//               variants={cardVariants}
//               initial="hidden"
//               animate="visible"
//               whileHover="hover"
//               whileTap="tap"
//               transition={{ delay: index * 0.05 }}
//               className="col-md-4 d-flex"
//             >
//               <div className="card shadow-sm w-100 h-100">
//                 {/* Image or Placeholder */}
//                 {course.imageUrl ? (
//                   <img
//                     src={course.imageUrl}
//                     className="card-img-top"
//                     alt={course.title}
//                     style={{ height: '200px', objectFit: 'cover' }}
//                   />
//                 ) : (
//                   <div className="d-flex align-items-center justify-content-center bg-light" style={{ height: '200px' }}>
//                     <BookOpen size={48} className="text-secondary" />
//                   </div>
//                 )}

//                 {/* Card Body */}
//                 <div className="card-body d-flex flex-column">
//                   <div className="mb-2">
//                     <span className="badge bg-primary">{course.category}</span>
//                   </div>
//                   <h5 className="card-title">{course.name}</h5>
//                   <p className="card-text text-muted small flex-grow-1">{course.description}</p>

//                   <div className="d-flex justify-content-between text-muted small mb-2">
//                     <span><BookOpen size={14} /> {course.totalLessons}</span>
//                     <span><Clock size={14} /> {course.duration}</span>
//                   </div>

//                   <div className="d-flex justify-content-between align-items-center mb-3">
//                     <div className="d-flex align-items-center">
//                       <Users size={14} className="me-1 text-primary" />
//                       <small>{course.instructor?.name}</small>
//                     </div>
//                     <strong className="text-primary">₹{course.price}</strong>
//                   </div>

//                   {/* Actions */}
//                   <div className="d-flex gap-2 mt-auto">
//                     <motion.button
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                       onClick={() => handleAdd(course)}
//                       className="btn btn-primary btn-sm flex-fill"
//                       disabled={addingToCart}
//                     >
//                       {addingToCart ? (
//                         <Loader size={14} className="me-1 spinner-border spinner-border-sm" />
//                       ) : (
//                         <>
//                           <ShoppingCart size={14} className="me-1" /> Add to Cart
//                         </>
//                       )}
//                     </motion.button>

//                     <Link
//                       to={`/courses/${course._id}`}
//                       className="btn btn-outline-secondary btn-sm flex-fill"
//                     >
//                       <Eye size={14} className="me-1" /> View Details
//                     </Link>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </AnimatePresence>
//       </div>

//       {/* Empty State */}
//       {!isLoading && filteredCourses.length === 0 && (
//         <div className="text-center py-5">
//           <BookOpen size={64} className="text-secondary mb-3" />
//           <h4>No courses found</h4>
//           <p className="text-muted">Try selecting a different category or check back later</p>
//         </div>
//       )}
     
//     </div>
//   );
// };

// export default UnenrolledCoursesGrid;