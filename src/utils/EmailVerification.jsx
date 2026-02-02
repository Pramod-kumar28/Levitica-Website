import { useSearchParams, useNavigate } from 'react-router-dom';
import { useVerifyEmailQuery } from '../Services/authService.js';
import { useEffect, useState } from 'react';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';

export default function EmailVerification() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const ivfm = params.get('ivfm');
  const id = params.get('id');
  const [countdown, setCountdown] = useState(3);

  const { data, error, isLoading, isSuccess } = useVerifyEmailQuery(
    { ivfm, id },
    { skip: !ivfm || !id }
  );

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
      success: 'tw-text-green-600 tw-border-green-300',
      danger: 'tw-text-red-600 tw-border-red-300',
      info: 'tw-text-blue-600 tw-border-blue-300',
    };

    return (
      <div className="tw-min-h-screen tw-flex tw-items-center tw-justify-center tw-bg-gray-100 tw-px-4">
        <div
          className={`tw-bg-white tw-border tw-rounded-xl tw-shadow-lg tw-max-w-md tw-w-full tw-p-6 tw-text-center ${variants[variant]}`}
        >
          <div className="tw-flex tw-justify-center tw-mb-4">
            {icon}
          </div>
          <h2 className="tw-text-xl tw-font-semibold tw-mb-2">
            {title}
          </h2>
          <p className="tw-text-gray-600">
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
      <div className="tw-min-h-screen tw-flex tw-items-center tw-justify-center tw-bg-gray-100">
        <div className="tw-bg-white tw-rounded-xl tw-shadow-md tw-p-6 tw-text-center tw-max-w-sm tw-w-full">
          <Loader2 className="tw-animate-spin tw-mx-auto tw-mb-4 tw-text-blue-600" size={40} />
          <h2 className="tw-text-lg tw-font-semibold">
            Verifying your email…
          </h2>
          <p className="tw-text-gray-500 tw-mt-1">
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
