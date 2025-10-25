import { motion, AnimatePresence } from 'framer-motion';
import { useCourseHandlers } from "./courseshooks";
import { useCourses } from "../../../../hooks/useCourses";
import { MODAL_TYPES, useModal } from '../Modals/ModalContext';
import { useState } from 'react';
import { Delete, Download, Edit, Edit2, Edit2Icon, Trash, Trash2, Users } from 'lucide-react';

const CourseTable = () => {
    const { courses } = useCourses();
    const { openModal } = useModal();
    const { handleDeleteCourse } = useCourseHandlers();
    const [activeTab, setActiveTab] = useState("cards");
    const [expandedCourse, setExpandedCourse] = useState(null);
    const [viewMode, setViewMode] = useState("courses"); // "courses" or "batches"

    // Dummy batch data for demonstration
    const dummyBatches = [
        { _id: '1', batchName: 'Web Development Batch 1', students: 25, startDate: '2024-01-15', endDate: '2024-04-15' },
        { _id: '2', batchName: 'Web Development Batch 2', students: 30, startDate: '2024-02-01', endDate: '2024-05-01' },
        { _id: '3', batchName: 'Advanced React Batch', students: 20, startDate: '2024-03-01', endDate: '2024-06-01' },
    ];

    const handleViewBatches = (courseId) => {
        if (expandedCourse === courseId) {
            setExpandedCourse(null);
            setViewMode("courses");
        } else {
            setExpandedCourse(courseId);
            setViewMode("batches");
        }
    };

    return (
        <div className="dashboard-app-container p-4">
            {/* Header Section */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2 className="fw-bold text-dark mb-1">Course Management</h2>
                    <p className="text-muted">Manage and view all courses and their batches</p>
                </div>
                <motion.button
                    className="btn btn-primary d-flex align-items-center gap-2"
                    onClick={() => openModal(MODAL_TYPES.ADD_COURSE, { mode: 'add' })}
                    initial={{ scale: 1 }}
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{
                        repeat: Infinity,
                        repeatType: 'loop',
                        duration: 2,
                        ease: 'easeInOut',
                    }}
                    whileHover={{ scale: 1.05, rotate: -1 }}
                >
                    <i className="fas fa-plus"></i>
                    Add New Course
                </motion.button>
            </div>

            {/* Tab Navigation */}
            <div className="card shadow-sm mb-4">
                <div className="card-body p-0">
                    <div className="d-flex border-bottom">
                        <button
                            className={`tab-btn p-3 ${activeTab === "cards" ? "active " : ""} btn`}
                            onClick={() => setActiveTab("cards")}
                        >
                            <i className="fas fa-th-large me-2"></i>
                            Card View
                        </button>
                        <button
                            className={`tab-btn ${activeTab === "table" ? "active" : ""} btn`}
                            onClick={() => setActiveTab("table")}
                        >
                            <i className="fas fa-table me-2"></i>
                            Table View
                        </button>
                    </div>
                </div>
            </div>

            {/* Content based on active tab */}
            <AnimatePresence mode="wait">
                {activeTab === "cards" ? (
                    <motion.div
                        key="cards"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <CourseCardsView
                            courses={courses}
                            expandedCourse={expandedCourse}
                            onViewBatches={handleViewBatches}
                            onEdit={(course) => openModal(MODAL_TYPES.ADD_COURSE, { mode: "edit", course })}
                            onDelete={handleDeleteCourse}
                        />
                    </motion.div>
                ) : (
                    <motion.div
                        key="table"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <CourseTableView
                            courses={courses}
                            onEdit={(course) => openModal(MODAL_TYPES.ADD_COURSE, { mode: "edit", course })}
                            onDelete={handleDeleteCourse}
                            onViewBatches={handleViewBatches}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Batches Table Expansion */}
            <AnimatePresence>
                {expandedCourse && viewMode === "batches" && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4"
                    >
                        <BatchesTableSection
                            courseId={expandedCourse}
                            batches={dummyBatches}
                            onClose={() => {
                                setExpandedCourse(null);
                                setViewMode("courses");
                            }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Empty State */}
            {(!courses || courses.length === 0) && (
                <div className="card shadow-sm text-center py-5">
                    <div className="card-body">
                        <i className="fas fa-book fa-3x text-muted mb-3"></i>
                        <h4 className="text-dark mb-2">No courses created yet</h4>
                        <p className="text-muted mb-4">Get started by creating your first course</p>
                        <button
                            className="btn btn-primary"
                            onClick={() => openModal(MODAL_TYPES.ADD_COURSE, { mode: 'add' })}
                        >
                            Create Your First Course
                        </button>
                    </div>
                </div>
            )}

        
        </div>
    );
};

// Course Cards View Component
const CourseCardsView = ({ courses, expandedCourse, onViewBatches, onEdit, onDelete }) => (
    <div className="row g-3 ">
        {courses?.map((course) => (
            <div key={course._id} className="col-xl-4 col-lg-5 col-md-3 my-3 ">
                <motion.div
                    className="card  shadow-sm h-100 border-2 rounded-lg  "
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                    <div className="card-body d-flex flex-column p-4">
                        {/* Course Header */}
                        <div className="d-flex align-items-center mb-3">
                            <div className="user-avatar">
             
                    <span>{course?.name?.charAt(0)?.toUpperCase()}</span>
              
                </div>
                            {/* <div className="bg-gradient-primaryrounded-circle d-flex align-items-center justify-content-center me-3"
                                style={{ width: '50px', height: '50px' }}>
                                <i className="fas fa-book text-white"></i>
                            </div> */}
                            <div className="flex-grow-1">
                                <h5 className="card-title fw-bold text-dark mb-1">{course.name}</h5>
                                <div className="d-flex align-items-center gap-2">
                                    <span className="badge bg-">{course.category}</span>
                                    <span className="text-muted small">₹{course.price}</span>
                                </div>
                            </div>
                        </div>

                        {/* Course Details */}
                        <div className="mb-3">
                            <p className="text-muted small mb-2">{course.description}</p>
                            <div className="d-flex justify-content-between text-sm">
                                <span className="text-muted">
                                    <i className="fas fa-user-tie me-1"></i>
                                    {course.instructor}
                                </span>
                                <span className="text-muted">
                                    <i className="fas fa-clock me-1"></i>
                                    {course.duration}
                                </span>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="mt-auto">
                            <div className="d-flex justify-content-between w-50">
                                <Edit className='text-accent' onClick={() => onEdit(course)} />
                                        <Trash2 className='text-danger' onClick={() => onDelete(course._id)} />
                                        <Users className='text-info' onClick={() => onViewBatches(course._id)} />

                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        ))}
    </div>
);

// Course Table View Component
const CourseTableView = ({ courses, onEdit, onDelete, onViewBatches }) => (
    <div className="card shadow-sm">
        <div className="card-body p-0">
            <div className="table-responsive">
                <table className="table table-hover mb-0">
                    <thead className="table-light">
                        <tr>
                            <th scope="col" className="ps-4">Course Name</th>
                            <th scope="col">Instructor</th>
                            <th scope="col">Category</th>
                            <th scope="col">Duration</th>
                            <th scope="col">Price</th>
                            <th scope="col" className="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courses?.map((course, index) => (
                            <motion.tr
                                key={course._id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.2, delay: index * 0.1 }}
                            >
                                <td className="ps-4">
                                    <div>
                                        <div className="fw-semibold text-dark">{course.name}</div>
                                        <small className="text-muted">{course.description?.substring(0, 50)}...</small>
                                    </div>
                                </td>
                                <td className="fw-medium">{course.instructor}</td>
                                <td>
                                    <span className="badge bg-light text-dark">{course.category}</span>
                                </td>
                                <td className="text-muted">{course.duration}</td>
                                <td className="fw-bold text-primary">₹{course.price}</td>
                                <td>
                                    <div className="d-flex justify-content-between gap-2">

                                        <Edit className='text-accent' onClick={() => onEdit(course)} />
                                        <Trash2 className='text-danger' onClick={() => {
                                            if (window.confirm('Are you sure you want to delete this course? This action cannot be undone.')) {
                                                onDelete(course._id);
                                            }
                                        }} />
                                        <Users className='text-info' onClick={() => onViewBatches(course._id)} />

                                    </div>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
);

// Batches Table Section
const BatchesTableSection = ({ courseId, batches, onClose }) => {
    return (
        <div className="card shadow-lg border-0">
            <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                <div>
                    <h5 className="mb-0 fw-bold">
                        <i className="fas fa-users me-2"></i>
                        Batches for Course
                    </h5>
                    <small>Course ID: {courseId}</small>
                </div>
                <div className="d-flex ">
                    <button
                        className="btn btn-success mx-3 btn-sm d-flex align-items-center gap-1"
                        onClick={() => alert('Export batches functionality would go here')}
                    >
                        <Download/>
                        Export
                    </button>
                    <button
                        className="btn btn-light btn-sm"
                        onClick={onClose}
                    >
                        Close
                    </button>
                </div>
            </div>
            <div className="card-body p-0">
                <BatchesTable batches={batches} />
            </div>
        </div>
    );
};

// Batches Table Component
const BatchesTable = ({ batches }) => {
    if (!batches || batches.length === 0) {
        return (
            <div className="alert alert-info text-center m-4">
                <i className="fas fa-info-circle me-2"></i>
                No batches found for this course.
            </div>
        );
    }

    return (
        <div className="table-responsive">
            <table className="table table-hover mb-0">
                <thead className="table-light">
                    <tr>
                        <th scope="col" className="ps-4">#</th>
                        <th scope="col">Batch Name</th>
                        <th scope="col">Students</th>
                        <th scope="col">Start Date</th>
                        <th scope="col">End Date</th>
                        <th scope="col">Status</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {batches.map((batch, index) => (
                        <motion.tr
                            key={batch._id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.2, delay: index * 0.05 }}
                        >
                            <td className="ps-4 fw-medium">{index + 1}</td>
                            <td className="fw-semibold text-dark">{batch.batchName}</td>
                            <td>
                                <span className="badge bg-primary">{batch.students} students</span>
                            </td>
                            <td>{new Date(batch.startDate).toLocaleDateString()}</td>
                            <td>{new Date(batch.endDate).toLocaleDateString()}</td>
                            <td>
                                <span className="badge bg-success">Active</span>
                            </td>
                            <td>
                                <button className="btn btn-outline-primary btn-sm">
                                    <i className="fas fa-eye"></i> View
                                </button>
                            </td>
                        </motion.tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CourseTable;