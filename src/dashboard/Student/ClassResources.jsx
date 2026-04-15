// import React, { useState } from 'react';

// const ClassResources = () => {
//   const [selectedCourse, setSelectedCourse] = useState('');

//   // Sample resources data
//   const coursesWithResources = [
//     {
//       id: '1',
//       name: 'Advanced JavaScript Live Course',
//       resources: [
//         { id: '1', name: 'JavaScript Cheat Sheet', type: 'pdf', size: '2.4 MB', url: '#' },
//         { id: '2', name: 'Week 1 Slides', type: 'pdf', size: '5.1 MB', url: '#' },
//         { id: '3', name: 'Practice Exercises', type: 'zip', size: '1.2 MB', url: '#' },
//         { id: '4', name: 'Reference Materials', type: 'pdf', size: '3.7 MB', url: '#' }
//       ]
//     },
//     {
//       id: '2', 
//       name: 'Machine Learning Fundamentals',
//       resources: [
//         { id: '1', name: 'ML Algorithms Guide', type: 'pdf', size: '4.2 MB', url: '#' },
//         { id: '2', name: 'Dataset for Practice', type: 'csv', size: '2.8 MB', url: '#' }
//       ]
//     }
//   ];

//   const coursesWithoutResources = [
//     { id: '3', name: 'UI/UX Design Masterclass' },
//     { id: '4', name: 'React Native Mobile Development' }
//   ];

//   const selectedCourseData = coursesWithResources.find(course => course.id === selectedCourse);

//   return (
//     <div className="component-container">
//       <div className="component-header">
//         <h1>Class Resources</h1>
//         <p>Download materials and assignments for your courses</p>
//       </div>

//       <div className="resources-content">
//         <div className="course-selection">
//           <label htmlFor="courseSelect">Select Course:</label>
//           <select 
//             id="courseSelect"
//             value={selectedCourse} 
//             onChange={(e) => setSelectedCourse(e.target.value)}
//           >
//             <option value="">Choose a course</option>
//             <optgroup label="Courses with Resources">
//               {coursesWithResources.map(course => (
//                 <option key={course.id} value={course.id}>
//                   {course.name}
//                 </option>
//               ))}
//             </optgroup>
//             <optgroup label="Courses without Resources">
//               {coursesWithoutResources.map(course => (
//                 <option key={course.id} value={course.id}>
//                   {course.name}
//                 </option>
//               ))}
//             </optgroup>
//           </select>
//         </div>

//         {selectedCourse ? (
//           selectedCourseData ? (
//             <div className="resources-list">
//               <h3>Available Resources for {selectedCourseData.name}</h3>
//               <div className="resources-grid">
//                 {selectedCourseData.resources.map(resource => (
//                   <div key={resource.id} className="resource-item">
//                     <div className="resource-icon">
//                       {resource.type === 'pdf' ? '📄' : 
//                        resource.type === 'zip' ? '📦' : '📊'}
//                     </div>
//                     <div className="resource-info">
//                       <h4>{resource.name}</h4>
//                       <p>{resource.type.toUpperCase()} • {resource.size}</p>
//                     </div>
//                     <a href={resource.url} className="download-btn" download>
//                       Download
//                     </a>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ) : (
//             <div className="no-resources">
//               <div className="empty-icon">📭</div>
//               <h3>No Resources Available Yet</h3>
//               <p>Resources for this course will be uploaded after completion of live sessions.</p>
//               <p>Check back soon!</p>
//             </div>
//           )
//         ) : (
//           <div className="select-prompt">
//             <div className="prompt-icon">📚</div>
//             <h3>Select a course to view resources</h3>
//             <p>Choose from your enrolled courses to access available materials</p>
//           </div>
//         )}
//       </div>
// <style jsx>{`    .resources-content {
//           background: white;
//           padding: 2rem;
//           border-radius: 12px;
//           box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
//         }
        
//         .course-selection {
//           margin-bottom: 2rem;
//         }
        
//         .course-selection label {
//           display: block;
//           margin-bottom: 0.5rem;
//           font-weight: 500;
//           color: #333;
//         }
        
//         .course-selection select {
//           width: 100%;
//           padding: 0.75rem;
//           border: 1px solid #ddd;
//           border-radius: 6px;
//           font-size: 1rem;
//         }
        
//         .resources-list h3 {
//           margin: 0 0 1.5rem;
//           color: #1a1a1a;
//         }
        
//         .resources-grid {
//           display: flex;
//           flex-direction: column;
//           gap: 1rem;
//         }
        
//         .resource-item {
//           display: flex;
//           align-items: center;
//           padding: 1rem;
//           border: 1px solid #eee;
//           border-radius: 8px;
//           transition: all 0.2s ease;
//         }
        
//         .resource-item:hover {
//           border-color: #6E8AFA;
//           box-shadow: 0 2px 8px rgba(110, 138, 250, 0.1);
//         }
        
//         .resource-icon {
//           font-size: 1.5rem;
//           margin-right: 1rem;
//         }
        
//         .resource-info {
//           flex: 1;
//         }
        
//         .resource-info h4 {
//           margin: 0 0 0.25rem;
//           font-size: 1rem;
//           color: #1a1a1a;
//         }
        
//         .resource-info p {
//           margin: 0;
//           color: #666;
//           font-size: 0.9rem;
//         }
        
//         .download-btn {
//           background: #6E8AFA;
//           color: white;
//           padding: 0.5rem 1rem;
//           border-radius: 6px;
//           text-decoration: none;
//           font-weight: 500;
//           transition: all 0.2s ease;
//         }
        
//         .download-btn:hover {
//           background: #5a7ae0;
//         }
        
//         .no-resources, .select-prompt {
//           text-align: center;
//           padding: 3rem 1rem;
//           color: #666;
//         }
        
//         .empty-icon, .prompt-icon {
//           font-size: 3rem;
//           margin-bottom: 1rem;
//         }
        
//         .no-resources h3, .select-prompt h3 {
//           margin: 0 0 0.5rem;
//           color: #333;
//         }
        
//         .no-resources p, .select-prompt p {
//           margin: 0.25rem 0;
//         }
        
//         @media (max-width: 768px) {
//           .resource-item {
//             flex-direction: column;
//             text-align: center;
//             gap: 1rem;
//           }
          
//           .resource-icon {
//             margin-right: 0;
//           }
//         }`}</style>
    
//     </div>
//   );
// };

// export default ClassResources;