import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";
import { loadRazorpay } from "../../../../utils/loadRazorpay";
import { paymentService } from "./services";



export const usePayment = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handlePayment = async (formData) => {
    console.log('Initiating payment with form data:', formData);
    setIsLoading(true);

    try {
      const sdkLoaded = await loadRazorpay();
      if (!sdkLoaded) {
        toast.error("Unable to load Razorpay or config missing");
        setIsLoading(false);
        return { success: false };
      }

      // Step 1: Create order on your backend
      const orderResponse = await paymentService.createOrder(formData);
      console.log('Order response:', orderResponse);
      if (!orderResponse.success) {
        throw new Error(orderResponse.message || 'Failed to create order');
      }

      const { order } = orderResponse;

      // Step 2: Initialize Razorpay checkout
      const options = {
        key: process.env.RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: 'Design Career Metrics',
        description: `Payment for Internship - ${formData.domain}`,
        image: '/img/dcm-logo2.jpg',
        order_id: order.id,
        handler: async function (response) {
          // Step 3: Verify payment on your backend
          await verifyPayment(response, formData, order.id);
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },
        notes: {
          internship: formData.domain,
          customer_id: formData.email,
        },
        theme: {
          color: '#4F46E5',
        },
        modal: {
          ondismiss: function() {
            console.log('Payment modal dismissed');
            setIsLoading(false);
          }
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();

    } catch (error) {
      console.error('Payment error:', error);
      toast.error(`Payment failed: ${error.message}`);
      setIsLoading(false);
    }
  };

  const verifyPayment = async (razorpayResponse, formData, orderId) => {
    try {
      const verificationData = {
        razorpay_order_id: orderId,
        razorpay_payment_id: razorpayResponse.razorpay_payment_id,
        razorpay_signature: razorpayResponse.razorpay_signature,
        formData: formData,
      };

      const verificationResponse = await paymentService.verifyPayment(verificationData);
      
      if (verificationResponse.success) {
        toast.success('Payment successful! You will receive a confirmation email shortly.');
        
        // Prepare payment data for success page
        const paymentSuccessData = {
          paymentId: razorpayResponse.razorpay_payment_id,
          orderId: orderId,
          student: {
            name: formData.name,
            email: formData.email,
            rollNumber: formData.rollNumber
          },
          phone: formData.phone,
          collegeName: formData.collegeName,
          collegeCode: formData.collegeCode,
          department: formData.department,
          semester: formData.semester,
          domain: formData.domain,
          program: formData.program,
          amount: formData.amount,
          accessTime: Date.now() // Add timestamp for security
        };

        // Clear any old payment data first
        localStorage.removeItem('lastPayment');
        
        // Navigate to success page with state
        navigate('/payment-success', {
          state: {
            paymentData: paymentSuccessData
          },
          replace: true // Replace current history entry
        });
        
      } else {
        throw new Error(verificationResponse.message || 'Payment verification failed');
      }
    } catch (error) {
      console.error('Verification error:', error);
      toast.error(`Payment verification failed: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handlePayment,
    isLoading,
    setIsLoading
  };
};