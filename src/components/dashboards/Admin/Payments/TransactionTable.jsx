import { motion } from "framer-motion";
import { useGetTransactionQuery } from "../../../../Services/paymentServices/transactionServices";
import {
  FiUser,
  FiCreditCard,
  FiCheckCircle,
  FiXCircle,
  FiAlertTriangle,
  FiClock,
} from "react-icons/fi";

const statusStyles = {
  created: {
    label: "CREATED",
    class: "tw-bg-gray-100 tw-text-gray-700",
    icon: <FiClock />,
  },
  paid: {
    label: "PAID",
    class: "tw-bg-green-100 tw-text-green-700",
    icon: <FiCheckCircle />,
  },
  failed: {
    label: "FAILED",
    class: "tw-bg-red-100 tw-text-red-700",
    icon: <FiXCircle />,
  },
  signature_invalid: {
    label: "INVALID",
    class: "tw-bg-yellow-100 tw-text-yellow-700",
    icon: <FiAlertTriangle />,
  },
};

const formatDateIST = (dateStr) =>
  new Date(dateStr).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

const AdminPaymentsTable = () => {
  const { data: payments, isLoading } = useGetTransactionQuery();

  if (isLoading) {
    return (
      <div className="tw-flex tw-justify-center tw-items-center tw-py-10 tw-text-gray-500">
        Loading payments…
      </div>
    );
  }

  if (!payments?.transactions?.length) {
    return (
      <div className="tw-text-center tw-py-10 tw-text-gray-500">
        No payments found.
      </div>
    );
  }

  return (
    <div className="tw-bg-white tw-border tw-rounded-xl tw-shadow-sm tw-overflow-x-auto">
      <table className="tw-w-full tw-text-sm">
        <thead className="tw-bg-gray-50 tw-border-b tw-sticky tw-top-0 tw-z-10">
          <tr className="tw-text-left tw-text-gray-600">
            <th className="tw-p-4">Order ID</th>
            <th className="tw-p-4">Payment ID</th>
            <th className="tw-p-4">User</th>
            <th className="tw-p-4">Courses</th>
            <th className="tw-p-4">Amount</th>
            <th className="tw-p-4">Mode</th>
            <th className="tw-p-4">App</th>
            <th className="tw-p-4">Status</th>
            <th className="tw-p-4">Date (IST)</th>
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
              courses = [],
            } = payment;

            const statusMeta = statusStyles[status] || statusStyles.created;

            return (
              <motion.tr
                key={_id || idx}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.04 }}
                className="hover:tw-bg-gray-50 tw-border-b last:tw-border-b-0"
              >
                <td className="tw-p-4 tw-font-medium tw-text-blue-600">
                  {orderId}
                </td>

                <td className="tw-p-4 tw-text-gray-700">
                  {paymentId || "—"}
                </td>

                <td className="tw-p-4">
                  <div className="tw-flex tw-items-center tw-gap-2">
                    <FiUser className="tw-text-gray-400" />
                    <div>
                      <p className="tw-font-medium">
                        {user.name || "Unknown"}
                      </p>
                      <p className="tw-text-xs tw-text-gray-500">
                        {user.email || "—"}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="tw-p-4">
                  {courses.length ? (
                    <div className="tw-space-y-1">
                      {courses.map((course, i) => (
                        <div key={course._id || i}>
                          <span className="tw-font-medium">
                            {course.name}
                          </span>
                          <span className="tw-ml-1 tw-text-xs tw-text-gray-500">
                            ₹{course.price?.toLocaleString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <span className="tw-text-gray-400">No courses</span>
                  )}
                </td>

                <td className="tw-p-4 tw-font-semibold">
                  ₹{amount?.toLocaleString()}
                </td>

                <td className="tw-p-4 tw-uppercase">
                  <div className="tw-flex tw-items-center tw-gap-1">
                    <FiCreditCard />
                    {paymentMode || "—"}
                  </div>
                </td>

                <td className="tw-p-4">
                  {appUsed || "—"}
                </td>

                <td className="tw-p-4">
                  <span
                    className={`tw-inline-flex tw-items-center tw-gap-1 tw-px-3 tw-py-1 tw-rounded-full tw-text-xs tw-font-semibold ${statusMeta.class}`}
                  >
                    {statusMeta.icon}
                    {statusMeta.label}
                  </span>
                </td>

                <td className="tw-p-4 tw-text-gray-600">
                  {formatDateIST(createdAt)}
                </td>
              </motion.tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPaymentsTable;
