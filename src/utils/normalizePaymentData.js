export const normalizeCoursePayments = (payments = []) =>
  payments.map((p) => ({
    id: p._id,
    orderId: p.orderId,
    paymentId: p.paymentId,
    name: p.user?.name,
    email: p.user?.email,
    title: p.courses?.map((c) => c.name).join(", "),
    amount: p.amount,
    status: p.status,
    type: "Course",
    createdAt: p.createdAt,
  }));

export const normalizeInternshipPayments = (payments = []) =>
  payments.map((p) => ({
    id: p._id,
    orderId: p.razorpayOrderId,
    paymentId: p.razorpayPaymentId,
    name: p.name,
    email: p.email,
    title: p.domain, // internship domain
    amount: p.amount,
    status: p.status,
    type: "Internship",
    createdAt: p.createdAt,
  }));
