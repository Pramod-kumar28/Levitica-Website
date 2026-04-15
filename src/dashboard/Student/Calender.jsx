// import { useState, useEffect } from 'react';
// import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';
// import Countdown from 'react-countdown';

// import { motion } from 'framer-motion';
// import data from '@/data/calendardata.json';

// const Calendar = () => {
//   const [user, setUser] = useState({});
//   const [classes, setClasses] = useState([]);
//   const [upcomingClasses, setUpcomingClasses] = useState([]);

//   // Utility: Generate today's sessions based on recurring schedule
//   const getTodaySessions = (classList) => {
//     const now = new Date();
//     const today = now.toLocaleString('en-US', { weekday: 'long' });

//     return classList
//       .filter(cls => cls.schedule?.days.includes(today))
//       .map(cls => {
//         const [hour, minute] = cls.schedule.time.split(':');
//         const startTime = new Date(now);
//         startTime.setHours(parseInt(hour), parseInt(minute), 0, 0);
//         return { ...cls, startTime };
//       })
//       // .filter(cls => cls.startTime > now);
//   };

//   // Utility: Generate recurring events for calendar
//   const generateRecurringEvents = (classList, daysAhead = 30) => {
//     const events = [];
//     const now = new Date();

//     for (let i = 0; i < daysAhead; i++) {
//       const date = new Date(now);
//       date.setDate(now.getDate() + i);
//       const weekday = date.toLocaleString('en-US', { weekday: 'long' });

//       classList.forEach(cls => {
//         if (cls.schedule?.days.includes(weekday)) {
//           const [hour, minute] = cls.schedule.time.split(':');
//           const eventDate = new Date(date);
//           eventDate.setHours(parseInt(hour), parseInt(minute), 0, 0);
//           events.push({
//             title: cls.title,
//             date: eventDate.toISOString(),
//           });
//         }
//       });
//     }

//     return events;
//   };

//   useEffect(() => {
//     setUser(data.user);
//     setClasses(data.classes);
//     setUpcomingClasses(getTodaySessions(data.classes));
//   }, []);

//   return (
//     <div className="content-page bg-light">
//       <Container className="mt-4">
//         {/* Welcome Message */}
//         <Row className="mb-4">
//           <Col>
//             <h4>Welcome back, {user?.name} 👋</h4>
//             {upcomingClasses.length > 0 && (
//               <Alert variant="info">
//                 🎓 Your next class: <strong>{upcomingClasses[0].title}</strong> at{' '}
//                 {upcomingClasses[0].startTime.toLocaleTimeString()}
//               </Alert>
//             )}
//           </Col>
//         </Row>

//         {/* Live Class Cards */}
//         <Row className="mb-4">
//           <Col md={8}>
//             {upcomingClasses.map(cls => (
//               <motion.div
//                 key={cls.id}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.3 }}
//               >
//                 <Card className="mb-4">
//                   <Card.Body>
//                     <Card.Title>{cls.title}</Card.Title>
//                     <Card.Text>
//                       Instructor: {cls.instructor} <br />
//                       Starts at: {cls.startTime.toLocaleString()}
//                     </Card.Text>
//                     <div>
//                       <strong>Countdown: </strong>
//                       <Countdown date={cls.startTime} />
//                     </div>
//                     <Button
//                       className="mt-3"
//                       href={cls.zoomLink}
//                       target="_blank"
//                       disabled={new Date() < cls.startTime}
//                     >
//                       Join Live Class
//                     </Button>
//                   </Card.Body>
//                 </Card>
//               </motion.div>
//             ))}
//           </Col>

//           {/* Notifications */}
//           <Col md={4}>
//             <Card>
//               <Card.Header>🔔 Notifications</Card.Header>
//               <Card.Body>
//                 {upcomingClasses.slice(0, 2).map(cls => (
//                   <Alert key={cls.id} variant="success">
//                     Don't forget: <strong>{cls.title}</strong> today at{' '}
//                     {cls.startTime.toLocaleTimeString()}
//                   </Alert>
//                 ))}
//               </Card.Body>
//             </Card>
//           </Col>
//         </Row>

//         {/* Class Schedule Calendar */}
       

//         {/* Past Classes */}
        
//       </Container>
//     </div>
//   );
// };

// export default Calendar;