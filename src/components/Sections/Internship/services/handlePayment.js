import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { loadRazorpay } from '../../../../utils/loadRazorpay';

import {
  useCreateInternshipOrderMutation,
  useVerifyInternshipPaymentMutation,
} from '../../../../Services/paymentServices/internshipsServices';

export const usePayment = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [createOrder] = useCreateInternshipOrderMutation();
  const [verifyPayment] = useVerifyInternshipPaymentMutation();

  const handlePayment = async (formData) => {
    setIsLoading(true);

    try {
      const sdkLoaded = await loadRazorpay();
      if (!sdkLoaded) {
        toast.error('Unable to load Razorpay');
        setIsLoading(false);
        return;
      }

      // 1️⃣ Create order (RTK Query)
      const orderResponse = await createOrder(formData).unwrap();

      if (!orderResponse.success) {
        throw new Error(orderResponse.message || 'Order creation failed');
      }

      const { order } = orderResponse;

      // 2️⃣ Razorpay options
      const options = {
        key: process.env.RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: 'Design Career Metrics',
        description: `Payment for Internship - ${formData.domain}`,
        image: '/img/dcm-logo2.jpg',
        order_id: order.id,

        handler: async (response) => {
          await handleVerifyPayment(response, formData, order.id);
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
          ondismiss: () => setIsLoading(false),
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();

    } catch (error) {
      toast.error(error.message || 'Payment failed');
      setIsLoading(false);
    }
  };

  const handleVerifyPayment = async (razorpayResponse, formData, orderId) => {
    try {
      const verificationPayload = {
        razorpay_order_id: orderId,
        razorpay_payment_id: razorpayResponse.razorpay_payment_id,
        razorpay_signature: razorpayResponse.razorpay_signature,
        formData,
      };

      const verificationResponse = await verifyPayment(
        verificationPayload
      ).unwrap();

      if (!verificationResponse.success) {
        throw new Error(verificationResponse.message);
      }

      toast.success('Payment successful!');

      navigate('/payment-success', {
        replace: true,
        state: {
          paymentData: {
            paymentId: razorpayResponse.razorpay_payment_id,
            orderId,
            student: {
              name: formData.name,
              email: formData.email,
              rollNumber: formData.rollNumber,
            },
            phone: formData.phone,
            collegeName: formData.collegeName,
            collegeCode: formData.collegeCode,
            department: formData.department,
            semester: formData.semester,
            domain: formData.domain,
            program: formData.program,
            amount: formData.amount,
            accessTime: Date.now(),
          },
        },
      });

    } catch (error) {
      toast.error(error.message || 'Payment verification failed');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handlePayment,
    isLoading,
  };
};
