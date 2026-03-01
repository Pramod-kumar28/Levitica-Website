import { useEffect, useState } from "react";
import DetailsContent from "./DetailsContent";
import InternshipPaymentForm from "./InternshipsPaymentForm";
import { X } from "lucide-react";
import { useGetAllInternshipsDomainsQuery } from "../../../Services/paymentServices/internshipsServices";


const Internships = () => {
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const { data, isLoading, isError } = 
  useGetAllInternshipsDomainsQuery({ isActive: true });

const domains = data?.data || [];



  /* 🔒 Prevent body scroll when mobile modal is open */
  useEffect(() => {
    if (showPaymentForm) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [showPaymentForm]);

  /* ⌨️ Close on ESC */
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") setShowPaymentForm(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div className="tw-min-h-screen tw-overflow-x-hidden">
      <div
        className="tw-min-h-screen tw-relative "

      >
        {/* ================= Desktop Layout ================= */}
        <div className="tw-flex tw-min-h-screen">
          {/* Left: Details */}
          <div className="tw-w-full lg:tw-max-w-5xl tw-bg-white md:tw-mx-auto lg:tw-mx-1">
            <DetailsContent
              domains={domains}
              isLoading={isLoading}
              isError={isError}
              showPaymentForm={showPaymentForm}
              setShowPaymentForm={setShowPaymentForm}
            />

          </div>

          {/* Right: Payment Form (Desktop only) */}
          <aside className="tw-hidden lg:tw-flex lg:tw-w-2/5  lg:tw-bg-gradient-to-r tw-from-[#162e66] tw-to-[#162e66] lg:tw-p-8 lg:tw-relative">
            <div className="tw-absolute tw-top-32 tw-right-28  tw-w-full">
              <div className="tw-max-w-lg tw-mx-auto">
                <InternshipPaymentForm
                  domains={domains}
                  isLoading={isLoading}
                />

              </div>
            </div>
          </aside>
        </div>

        {/* ================= Mobile Payment Drawer ================= */}
        {showPaymentForm && (
          <div
            className="tw-fixed tw-inset-0 tw-z-50 lg:tw-hidden"
            aria-modal="true"
            role="dialog"
          >
            {/* Backdrop */}
            <div
              className="tw-absolute tw-inset-0 tw-bg-black/50"
              onClick={() => setShowPaymentForm(false)}
            />

            {/* Bottom Sheet */}
            <div className="tw-absolute tw-bottom-0 tw-left-0 tw-right-0 tw-bg-white tw-rounded-t-3xl tw-max-h-[90vh] tw-flex tw-flex-col tw-animate-slide-up">
              {/* Header */}
              <div className="tw-flex tw-items-center tw-justify-between tw-p-5 tw-border-b">
                
                <button
                  onClick={() => setShowPaymentForm(false)}
                  className="tw-p-2 tw-rounded-full hover:tw-bg-gray-100 tw-transition"
                  aria-label="Close payment form"
                >
                  <X size={22} />
                </button>
              </div>

              {/* Content */}
              <div className="tw-flex-1 tw-overflow-y-auto tw-p-4">
                <div className="tw-max-w-lg tw-mx-auto">
                  <InternshipPaymentForm
                    domains={domains}
                    isLoading={isLoading}
                  />

                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Internships;
