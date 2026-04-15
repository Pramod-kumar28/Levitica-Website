import { useSearchParams, useNavigate } from 'react-router-dom';
import { useVerifyEmailQuery } from '@/Services/authService.js';
import { useEffect, useState } from 'react';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';

export default function EmailVerification() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const ivfm = params.get('ivfm');
  const id = params.get('id');
  const [countdown, setCountdown] = useState(3);
  console.log('EmailVerification rendered with:', { ivfm, id });

  const { data, error, isLoading, isSuccess } = useVerifyEmailQuery(
    { ivfm, id },
    { skip: !ivfm || !id }
  );
console.log('useVerifyEmailQuery state:', { data, error, isLoading, isSuccess });
  useEffect(() => {
    if (isSuccess) {
      const timer = setInterval(() => {
        setCountdown(prev => {
          if (prev === 1) {
            clearInterval(timer);
            navigate('/sign-up', {
              state: {
                name: data?.user?.name,
                email: data?.user?.email,
              },
            });
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isSuccess, data, navigate]);

  const Card = ({ icon, title, message, variant }) => {
    const variants = {
      success: 'text-green-600 border-green-300',
      danger: 'text-red-600 border-red-300',
      info: 'text-blue-600 border-blue-300',
    };

    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div
          className={`bg-white border rounded-xl shadow-lg max-w-md w-full p-6 text-center ${variants[variant]}`}
        >
          <div className="flex justify-center mb-4">
            {icon}
          </div>
          <h2 className="text-xl font-semibold mb-2">
            {title}
          </h2>
          <p className="text-gray-600">
            {message}
          </p>
        </div>
      </div>
    );
  };

  /* ------------------ Edge cases ------------------ */

  if (!ivfm || !id) {
    return (
      <Card
        variant="danger"
        icon={<XCircle size={56} />}
        title="Verification Failed"
        message="Missing verification details."
      />
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white rounded-xl shadow-md p-6 text-center max-w-sm w-full">
          <Loader2 className="animate-spin mx-auto mb-4 text-blue-600" size={40} />
          <h2 className="text-lg font-semibold">
            Verifying your email…
          </h2>
          <p className="text-gray-500 mt-1">
            Please wait while we confirm your account.
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Card
        variant="danger"
        icon={<XCircle size={56} />}
        title="Verification Failed"
        message={error?.data?.message || 'The link is invalid or expired.'}
      />
    );
  }

  if (isSuccess) {
    return (
      <Card
        variant="success"
        icon={<CheckCircle size={56} />}
        title="Email Verified!"
        message={`Your email has been verified successfully. Redirecting in ${countdown}s…`}
      />
    );
  }

  return null;
}
