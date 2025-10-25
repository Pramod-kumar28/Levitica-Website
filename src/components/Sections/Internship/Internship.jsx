import DetailsContent from "./DetailsContent";
import { useState } from 'react';
import "./InternshipPaymentForm.css"
import InternshipPaymentForm from "./InternshipsPaymentForm";
import { X } from "lucide-react";

const Internships = () => {
    const [showPaymentForm, setShowPaymentForm] = useState(false);

    return (
        <div className="internship min-h-screen overflow-x-hidden">
          <div
  className="min-h-screen bg-cover bg-center bg-no-repeat relative"
  style={{
    backgroundImage: "linear-gradient(to right, #f75bd0ff, #162e66)" 
  }}
>
                {/* Desktop Layout */}
                <div className="lg-flex min-h-screen">
                    {/* Left Content - Details */}
                    <div className="lg-w-3/4">
                        <div className="bg-white">
                            <DetailsContent
                                showPaymentForm={showPaymentForm}
                                setShowPaymentForm={setShowPaymentForm}
                            />
                        </div>
                    </div>

                    {/* Right Content - Payment Form - Hidden on Mobile */}
                    <div className="lg-w-1/4 p-8 lg-hidden-mobile">
                        <div className="form-position-ab">
                            <InternshipPaymentForm />
                        </div>
                    </div>
                </div>

                {/* Mobile Payment Form Overlay */}
                {showPaymentForm && (
                    <div className="mobile-payment-overlay">
                        <div className="mobile-payment-form open">
                            <div className="mobile-payment-container">
                                <div className="mobile-payment-header">
                                    <h3 className="mobile-payment-title">Payment Details</h3>
                                    <button
                                        onClick={() => setShowPaymentForm(false)}
                                        className="mobile-payment-close"
                                    >
                                        <X size={24} />
                                    </button>
                                </div>
                                <div className="mobile-payment-content">
                                    <InternshipPaymentForm />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Internships;