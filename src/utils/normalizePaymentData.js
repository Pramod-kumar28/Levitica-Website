export const normalizeCoursePayments = (transactions = []) => {
  return transactions.map((t) => ({
    orderId: t.orderId,
    paymentId: t.paymentId,

    name: t.user?.name,
    email: t.user?.email,

    title: t.courses?.map((c) => c.name).join(", "),
    type: "Course",

    amount: t.amount,
    status: t.status,

    paymentMode: t.paymentMode || "unknown",
    appUsed: t.appUsed || "-",

    createdAt: t.createdAt,
  }));
};
export const normalizeInternshipPayments = (payments = []) => {
  return payments.map((p) => ({
    orderId: p.orderId,
    paymentId: p.paymentId,

    name: p.name,
    email: p.email,

    title: p.title,
    type: "Internship",

    amount: p.amount,
    status: p.status,

    paymentMode: p.paymentMode || "unknown",
    appUsed: p.appUsed || "-",

    createdAt: p.createdAt,
  }));
};
