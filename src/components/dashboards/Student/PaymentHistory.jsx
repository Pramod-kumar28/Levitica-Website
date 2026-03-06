import { CreditCard, CheckCircle, XCircle } from "lucide-react";
import { useGetMyPaymentsQuery } from "../../../Services/paymentServices/paymentServices";

const PaymentTab = () => {
  const { data, isLoading, isError } = useGetMyPaymentsQuery();

  const payments = data?.payments || [];

  if (isLoading) {
    return <div className="tw-text-sm tw-text-gray-500">Loading payments...</div>;
  }

  if (isError) {
    return <div className="tw-text-sm tw-text-red-500">Failed to load payments</div>;
  }

  return (
    <div className="tw-max-w-4xl tw-space-y-6 sm:tw-space-y-8">

      {/* Header */}
      <div>
        <h2 className="tw-text-lg sm:tw-text-xl tw-font-semibold">
          Payment History
        </h2>
        <p className="tw-text-xs sm:tw-text-sm tw-text-gray-500">
          View all your course payments and transaction details.
        </p>
      </div>

      <div className="tw-bg-white tw-border tw-rounded-2xl tw-shadow-sm tw-overflow-hidden">

        {payments.length === 0 ? (
          <div className="tw-p-8 tw-text-center tw-text-gray-500 tw-text-sm">
            No payments found.
          </div>
        ) : (
          <div className="tw-divide-y">
            {payments.map((payment) => (
              <div
                key={payment._id}
                className="tw-p-4 sm:tw-p-5 hover:tw-bg-gray-50 tw-transition"
              >

                <div className="tw-flex tw-justify-between tw-gap-6">

                  {/* LEFT */}
                  <div className="tw-space-y-3">

                    {payment.courseIds?.map((course) => (
                      <div
                        key={course._id}
                        className="tw-flex tw-items-center tw-gap-4"
                      >
                        {/* Thumbnail */}
                        <img
                          src={course.thumbnail}
                          alt={course.name}
                          className="tw-w-16 tw-h-12 tw-object-cover tw-rounded-lg"
                        />

                        <div>
                          <div className="tw-text-sm sm:tw-text-base tw-font-semibold">
                            {course.name}
                          </div>

                          <div className="tw-text-xs tw-text-gray-500">
                            {course.category} • ₹{course.price}
                          </div>
                        </div>
                      </div>
                    ))}

                    <div className="tw-text-xs tw-text-gray-500">
                      {new Date(payment.createdAt).toLocaleDateString()}
                    </div>

                    <div className="tw-text-xs tw-text-gray-400">
                      Order ID: {payment.orderId}
                    </div>

                  </div>

                  {/* RIGHT */}
                  <div className="tw-text-right tw-space-y-2">

                    <div className="tw-text-sm sm:tw-text-base tw-font-bold">
                      ₹{payment.amountInRupees}
                    </div>

                    <div className="tw-text-xs tw-text-gray-500 tw-capitalize">
                      {payment.paymentMode}
                    </div>

                    <div className="tw-flex tw-items-center tw-gap-1 tw-justify-end tw-text-xs">
                      {payment.status === "paid" ? (
                        <>
                          <CheckCircle size={14} className="tw-text-green-600" />
                          <span className="tw-text-green-600">Paid</span>
                        </>
                      ) : (
                        <>
                          <XCircle size={14} className="tw-text-red-600" />
                          <span className="tw-text-red-600 tw-capitalize">
                            {payment.status}
                          </span>
                        </>
                      )}
                    </div>

                  </div>

                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentTab;