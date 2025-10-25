import { motion } from "framer-motion";
import { useGetTransactionQuery } from "../../../../Services/paymentServices/transactionServices";

const statusColors = {
  created: "secondary",
  paid: "success",
  failed: "danger",
  signature_invalid: "warning"
};

const formatDateIST = (dateStr) =>
  new Date(dateStr).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });

const AdminPaymentsTable = () => {

  const { data: payments, isLoading } = useGetTransactionQuery();
  console.log(payments,"payments")

  if (isLoading) {
    return <div className="text-center py-4">Loading payments...</div>;
  }
  if(payments?.transactions.length === 0){
    return <div className="text-center py-4">No payments found.</div>;
  }

  return (
    <div className="table-responsive">
      <table className="table table-hover align-middle">
        <thead className="table-light">
          <tr>
            <th>Order ID</th>
            <th>Payment ID</th>
            <th>User</th>
            <th>Courses</th>
            <th>Amount Paid</th>
            <th>Mode</th>
            <th>App Used</th>
            <th>Status</th>
            <th>Date (IST)</th>
          </tr>
        </thead>
        <tbody>
          {payments.transactions.map((payment, idx) => {
            const {
              _id,
              orderId,
              paymentId,
              amount,
              status,
              createdAt,
              paymentMode,
              appUsed,
              user = {},
              courses = []
            } = payment;

            const badgeColor = statusColors[status] || "dark";

            return (
              <motion.tr
                key={_id || idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05, duration: 0.3 }}
                whileHover={{ scale: 1.01, backgroundColor: "#f9f9f9" }}
              >
                <td className="fw-bold text-primary">{orderId}</td>
                <td>{paymentId || "—"}</td>
                <td>
                  <div>{user.name || "Unknown"}</div>
                  <small className="text-muted">{user.email || "—"}</small>
                </td>
                <td>
                  {courses.length > 0 ? (
                    courses.map((course, i) => (
                      <div key={course._id || i}>
                        <span className="fw-semibold">{course.name}</span>
                        <small className="text-muted ms-1">
                          ₹{course.price?.toLocaleString() || "—"}
                        </small>
                      </div>
                    ))
                  ) : (
                    <span className="text-muted">No courses</span>
                  )}
                </td>
                <td>₹{amount?.toLocaleString() || "—"}</td>
                <td>{paymentMode?.toUpperCase() || "—"}</td>
                <td>{appUsed || "—"}</td>
                <td>
                  <span className={`badge bg-${badgeColor}`}>
                    {status.replace("_", " ").toUpperCase()}
                  </span>
                </td>
                <td>{formatDateIST(createdAt)}</td>
              </motion.tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPaymentsTable;