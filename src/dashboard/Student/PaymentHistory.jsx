import {  CheckCircle, XCircle } from "lucide-react";
import { useGetMyPaymentsQuery } from '@/Services/paymentServices/paymentServices';
import { useTheme } from '@/context/ThemeContext';

const PaymentTab = () => {
  const { data, isLoading, isError } = useGetMyPaymentsQuery();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const payments = data?.payments || [];

  if (isLoading) {
    return <div className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>Loading payments...</div>;
  }

  if (isError) {
    return <div className={`text-sm ${isDark ? 'text-red-400' : 'text-red-500'}`}>Failed to load payments</div>;
  }

  return (
    <div className="max-w-4xl space-y-6 sm:space-y-8">

      {/* Header */}
      <div>
        <h2 className={`text-lg sm:text-xl font-semibold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
          Payment History
        </h2>
        <p className={`text-xs sm:text-sm ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
          View all your course payments and transaction details.
        </p>
      </div>

      <div className={`${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'} border rounded-2xl shadow-sm overflow-hidden`}>

        {payments.length === 0 ? (
          <div className={`p-8 text-center text-sm ${isDark ? 'text-slate-400 bg-slate-700/30' : 'text-gray-500 bg-gray-50'}`}>
            No payments found.
          </div>
        ) : (
          <div className={isDark ? 'divide-slate-700' : 'divide-gray-200'} >
            {payments.map((payment) => (
              <div
                key={payment._id}
                className={`p-4 sm:p-5 transition ${isDark ? 'hover:bg-slate-700/50 border-b border-slate-700 last:border-b-0' : 'hover:bg-gray-50 border-b border-gray-100'}`}
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
                          <div className={`text-sm sm:text-base font-semibold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                            {course.name}
                          </div>

                          <div className={`text-xs ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
                            {course.category} • ₹{course.price}
                          </div>
                        </div>
                      </div>
                    ))}

                    <div className={`text-xs ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
                      {new Date(payment.createdAt).toLocaleDateString()}
                    </div>

                    <div className={`text-xs ${isDark ? 'text-slate-500' : 'text-gray-400'}`}>
                      Order ID: {payment.orderId}
                    </div>

                  </div>

                  {/* RIGHT */}
                  <div className="text-right space-y-2">

                    <div className={`text-sm sm:text-base font-bold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                      ₹{payment.amountInRupees}
                    </div>

                    <div className={`text-xs ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
                      {payment.paymentMode}
                    </div>

                    <div className="flex items-center gap-1 justify-end text-xs">
                      {payment.status === "paid" ? (
                        <>
                          <CheckCircle size={14} className="text-green-600" />
                          <span className={isDark ? 'text-green-400' : 'text-green-600'}>Paid</span>
                        </>
                      ) : (
                        <>
                          <XCircle size={14} className={isDark ? 'text-red-400' : 'text-red-600'} />
                          <span className={`capitalize ${isDark ? 'text-red-400' : 'text-red-600'}`}>
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