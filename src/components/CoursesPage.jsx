// import { useSelector } from "react-redux";
// import {
//   useGetRazorpayConfigQuery,
//   useCreateOrderMutation,
//   useVerifyPaymentMutation
// } from "../Services/paymentServices/paymentServices";
// import { loadRazorpay } from "../utils/loadRazorpay";



// const CourseCard = ({ course }) => {
//   const { name, description, duration, instructor, price, _id: courseId } = course;

//   const { data: razorpayConfig, isLoading, isError } = useGetRazorpayConfigQuery();
//   const [createOrder] = useCreateOrderMutation();
//   const [verifyPayment] = useVerifyPaymentMutation();
//   const {user}=useSelector(state=>state.auth)
//   console.log(user)
// const courseIds=[courseId]
// const onBuy = async () => {
//   try {
//     const sdkLoaded = await loadRazorpay();
//     if (!sdkLoaded || !razorpayConfig) {
//       alert("Unable to load Razorpay or config missing");
//       return;
//     }

//     const userId = user.id;
//     const orderResponse = await createOrder({ courseIds, userId }).unwrap();
//     console.log("Order response from backend:", orderResponse);

//     const order = orderResponse.order; // adjust if shape is different
//     if (!order?.id) {
//       console.error("No order ID received from backend");
//       return;
//     }

//     const options = {
//       key: razorpayConfig.keyId,
//       amount: order.amount,
//       currency: "INR",
//       name,
//       description,
//       order_id: order.id,
//       handler: async function (response) {
//         console.log("Payment successful:", response);
//         await verifyPayment({
//           razorpayPaymentId: response.razorpay_payment_id,
//           razorpayOrderId: response.razorpay_order_id,
//           razorpaySignature: response.razorpay_signature,
//           userId
//         });
//       },
//       prefill: {
//         name: user.name,
//         email: user.email
//       },
//       theme: { color: "#c7e736ff" }
//     };

//     console.log("Razorpay options:", options);

//     const rzp = new window.Razorpay(options);
//     rzp.open();
//   } catch (error) {
//     console.error("Payment initiation failed:", error);
//   }
// };
//   return (
//     <div className="card shadow-sm mb-3 border-0 bg-blue-500">
//       <div className="card-body">
//         <h5 className="card-title text-primary fw-bold">{name}</h5>
//         <p className="card-text">{description}</p>
//         <ul className="list-unstyled mb-3">
//           <li><strong>Instructor:</strong> {instructor}</li>
//           <li><strong>Duration:</strong> {duration}</li>
//           <li><strong>Price:</strong> ₹{price}</li>
//         </ul>
//         <div className="d-grid">
//           <button className="btn btn-success btn-lg" onClick={()=>{onBuy(courseId)}} disabled={isLoading || isError}>
//             🛒 Buy Now
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CourseCard;