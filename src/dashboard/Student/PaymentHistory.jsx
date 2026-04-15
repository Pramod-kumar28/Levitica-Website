import {  CheckCircle, XCircle } from "lucide-react";
import { useGetMyPaymentsQuery } from '@/Services/paymentServices/paymentServices';

const PaymentTab = () => {
  const { data, isLoading, isError } = useGetMyPaymentsQuery();

  const payments = data?.payments || [];

  if (isLoading) {
    return <div className="text-sm text-gray-500">Loading payments...</div>;
  }

  if (isError) {
    return <div className="text-sm text-red-500">Failed to load payments</div>;
  }

  return (
    <div className="max-w-4xl space-y-6 sm:space-y-8">

      {/* Header */}
      <div>
        <h2 className="text-lg sm:text-xl font-semibold">
          Payment History
        </h2>
        <p className="text-xs sm:text-sm text-gray-500">
          View all your course payments and transaction details.
        </p>
      </div>

      <div className="bg-white border rounded-2xl shadow-sm overflow-hidden">

        {payments.length === 0 ? (
          <div className="p-8 text-center text-gray-500 text-sm">
            No payments found.
          </div>
        ) : (
          <div className="divide-y">
            {payments.map((payment) => (
              <div
                key={payment._id}
                className="p-4 sm:p-5 hover:bg-gray-50 transition"
              >

                <div className="flex justify-between gap-6">

                  {/* LEFT */}
                  <div className="space-y-3">

                    {payment.courseIds?.map((course) => (
                      <div
                        key={course._id}
                        className="flex items-center gap-4"
                      >
                        {/* Thumbnail */}
                        <img
                          src={course.thumbnail}
                          alt={course.name}
                          className="w-16 h-12 object-cover rounded-lg"
                        />

                        <div>
                          <div className="text-sm sm:text-base font-semibold">
                            {course.name}
                          </div>

                          <div className="text-xs text-gray-500">
                            {course.category} • ₹{course.price}
                          </div>
                        </div>
                      </div>
                    ))}

                    <div className="text-xs text-gray-500">
                      {new Date(payment.createdAt).toLocaleDateString()}
                    </div>

                    <div className="text-xs text-gray-400">
                      Order ID: {payment.orderId}
                    </div>

                  </div>

                  {/* RIGHT */}
                  <div className="text-right space-y-2">

                    <div className="text-sm sm:text-base font-bold">
                      ₹{payment.amountInRupees}
                    </div>

                    <div className="text-xs text-gray-500 capitalize">
                      {payment.paymentMode}
                    </div>

                    <div className="flex items-center gap-1 justify-end text-xs">
                      {payment.status === "paid" ? (
                        <>
                          <CheckCircle size={14} className="text-green-600" />
                          <span className="text-green-600">Paid</span>
                        </>
                      ) : (
                        <>
                          <XCircle size={14} className="text-red-600" />
                          <span className="text-red-600 capitalize">
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