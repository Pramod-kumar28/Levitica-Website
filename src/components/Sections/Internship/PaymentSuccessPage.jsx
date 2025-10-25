import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './PaymentSuccessPage.css';

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [paymentData, setPaymentData] = useState(null);
  const [countdown, setCountdown] = useState(10);
  const [isValidAccess, setIsValidAccess] = useState(true);

  useEffect(() => {
    // Check if this is a valid payment success access
    const data = location.state?.paymentData;
    const localStorageData = JSON.parse(localStorage.getItem('lastPayment') || 'null');
    
    if (data) {
      // Direct navigation with state - valid access
      setPaymentData(data);
      localStorage.setItem('lastPayment', JSON.stringify({
        ...data,
        accessTime: Date.now()
      }));
      setIsValidAccess(true);
    } else if (localStorageData && localStorageData.accessTime) {
      // Check if localStorage data is not too old (e.g., 30 minutes)
      const isDataFresh = (Date.now() - localStorageData.accessTime) < 30 * 60 * 1000; // 30 minutes
      
      if (isDataFresh) {
        setPaymentData(localStorageData);
        setIsValidAccess(true);
      } else {
        // Data is too old, clear it and redirect
        localStorage.removeItem('lastPayment');
        setIsValidAccess(false);
        setTimeout(() => navigate('/'), 2000);
      }
    } else {
      // No valid data found
      setIsValidAccess(false);
      setTimeout(() => navigate('/'), 2000);
    }
  }, [location, navigate]);

  useEffect(() => {
    if (!isValidAccess) return;

    // Countdown for automatic redirect
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearPaymentData();
          navigate('/');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate, isValidAccess]);

  const clearPaymentData = () => {
    localStorage.removeItem('lastPayment');
    setPaymentData(null);
  };

  const handleDownloadReceipt = () => {
    if (!paymentData) return;

    const receiptContent = `
      INTERNSHIP PAYMENT RECEIPT
      ==========================
      
      Payment ID: ${paymentData?.paymentId}
      Order ID: ${paymentData?.orderId}
      Date: ${new Date().toLocaleDateString()}
      Time: ${new Date().toLocaleTimeString()}
      
      STUDENT DETAILS:
      ----------------
      Name: ${paymentData?.student?.name}
      Email: ${paymentData?.student?.email}
      Roll Number: ${paymentData?.student?.rollNumber}
      College: ${paymentData?.collegeName}
      Department: ${paymentData?.department}
      Semester: ${paymentData?.semester}
      
      PROGRAM DETAILS:
      ----------------
      Domain: ${getDomainName(paymentData?.domain)}
      Program: ${getProgramName(paymentData?.program)}
      Duration: ${paymentData?.program === '5days' ? '5 Days' : '15 Days'}
      Amount: ₹${paymentData?.amount}
      
      Status: PAID ✅
      
      Thank you for your payment!
      Design Career Metrics
    `;

    const blob = new Blob([receiptContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `receipt-${paymentData?.paymentId}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

 
  const handleManualRedirect = () => {
    clearPaymentData();
    navigate('/');
  };

  const getDomainName = (domainId) => {
    const domains = {
      'java-fullstack': 'Java Full Stack Development',
      'python-ai': 'Python Full Stack + Generative AI',
      'dotnet-cloud': '.NET Full Stack + Cloud AI',
      'flutter-mobile': 'Flutter Mobile App Development',
      'software-testing': 'Software Testing & Automation',
      'data-science-ai': 'Data Science & AI'
    };
    return domains[domainId] || domainId;
  };

  const getProgramName = (programId) => {
    const programs = {
      '5days': '5 Days Program',
      '15days': '15 Days Program'
    };
    return programs[programId] || programId;
  };

  // Show unauthorized access message
  if (!isValidAccess) {
    return (
      <div className="payment-success-container">
        <div className="payment-success-card">
          <div className="payment-success-header" style={{ background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)' }}>
            <div className="payment-success-icon-container">
              <div className="payment-success-icon" style={{ color: '#ef4444' }}>⚠️</div>
            </div>
            <h1 className="payment-success-title">Access Denied</h1>
            <p className="payment-success-subtitle">
              This page is only accessible after successful payment
            </p>
          </div>
          <div className="payment-success-content" style={{ textAlign: 'center', padding: '40px' }}>
            <p style={{ color: '#6b7280', fontSize: '16px', marginBottom: '20px' }}>
              Redirecting you to the homepage...
            </p>
            <button 
              onClick={handleManualRedirect}
              className="payment-success-btn payment-success-btn-primary"
            >
              Go to Homepage Now
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!paymentData) {
    return (
      <div className="payment-success-loading">
        <div className="payment-success-loading-spinner"></div>
        <p>Loading payment details...</p>
      </div>
    );
  }

  return (
    <div className="payment-success-container">
      <div className="payment-success-card">
        {/* Header */}
        <div className="payment-success-header">
          <div className="payment-success-icon-container">
            <div className="payment-success-icon">✓</div>
          </div>
          <h1 className="payment-success-title">Payment Successful!</h1>
          <p className="payment-success-subtitle">
            Your internship program registration is confirmed
          </p>
        </div>

        {/* Content */}
        <div className="payment-success-content">
          <div className="payment-success-details-grid">
            {/* Student Details */}
            <div className="payment-success-details-section">
              <h2 className="payment-success-section-title">
                <span className="payment-success-section-icon">👤</span>
                Student Information
              </h2>
              
              <div className="payment-success-details-list">
                <PaymentSuccessDetailItem label="Full Name" value={paymentData.student?.name} />
                <PaymentSuccessDetailItem label="Email" value={paymentData.student?.email} />
                <PaymentSuccessDetailItem label="Roll Number" value={paymentData.student?.rollNumber} />
                <PaymentSuccessDetailItem label="Phone" value={paymentData.phone} />
              </div>

              <div className="payment-success-college-section">
                <h3 className="payment-success-section-subtitle">
                  <span className="payment-success-section-icon">🏫</span>
                  College Details
                </h3>
                <PaymentSuccessDetailItem label="College" value={paymentData.collegeName} />
                <PaymentSuccessDetailItem label="College Code" value={paymentData.collegeCode} />
                <PaymentSuccessDetailItem label="Department" value={paymentData.department} />
                <PaymentSuccessDetailItem label="Semester" value={paymentData.semester} />
              </div>
            </div>

            {/* Program Details */}
            <div className="payment-success-details-section">
              <h2 className="payment-success-section-title">
                <span className="payment-success-section-icon">💻</span>
                Program Details
              </h2>

              <div className="payment-success-program-card">
                <div className="payment-success-program-details">
                  <PaymentSuccessDetailItem label="Internship Domain" value={getDomainName(paymentData.domain)} highlight />
                  <PaymentSuccessDetailItem label="Program" value={getProgramName(paymentData.program)} />
                  <PaymentSuccessDetailItem label="Duration" value={paymentData.program === '5days' ? '5 Days' : '15 Days'} />
                  <div className="payment-success-amount-section">
                    <span className="payment-success-amount-label">Amount Paid</span>
                    <span className="payment-success-amount-value">₹{paymentData.amount}</span>
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div className="payment-success-payment-info-card">
                <h3 className="payment-success-section-subtitle">
                  <span className="payment-success-section-icon">📅</span>
                  Payment Information
                </h3>
                <PaymentSuccessDetailItem label="Payment ID" value={paymentData.paymentId} small />
                <PaymentSuccessDetailItem label="Order ID" value={paymentData.orderId} small />
                <PaymentSuccessDetailItem label="Date" value={new Date().toLocaleDateString()} />
                <PaymentSuccessDetailItem label="Time" value={new Date().toLocaleTimeString()} />
                <div className="payment-success-status-badge">
                  <span className="payment-success-status-text">Status: Paid</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="payment-success-action-buttons">
            <button
              onClick={handleDownloadReceipt}
              className="payment-success-btn payment-success-btn-primary"
            >
              <span className="payment-success-btn-icon">📥</span>
              Download Receipt
            </button>
            
         
            
            <button
              onClick={handleManualRedirect}
              className="payment-success-btn payment-success-btn-secondary"
            >
              Back to Home
            </button>
          </div>

          {/* Next Steps */}
          <div className="payment-success-next-steps">
            <h3 className="payment-success-next-steps-title">What's Next?</h3>
            <ul className="payment-success-next-steps-list">
              <li>You will receive a confirmation email within 24 hours</li>
              <li>Our team will contact you with program schedule details</li>
              <li>Join our WhatsApp group for updates and support</li>
              <li>Prepare your development environment as per program requirements</li>
            </ul>
          </div>

          {/* Countdown */}
          <div className="payment-success-countdown-section">
            <p>Redirecting to home page in <span className="payment-success-countdown-number">{countdown}</span> seconds...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Detail Item Component
const PaymentSuccessDetailItem = ({ label, value, highlight, small }) => {
  return (
    <div className={`payment-success-detail-item ${highlight ? 'payment-success-detail-item-highlight' : ''}`}>
      <span className="payment-success-detail-label">{label}</span>
      <span className={`payment-success-detail-value ${small ? 'payment-success-detail-value-small' : ''}`}>{value}</span>
    </div>
  );
};

export default PaymentSuccess;