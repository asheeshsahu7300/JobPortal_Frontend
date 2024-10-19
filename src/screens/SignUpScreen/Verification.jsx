import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // import useNavigate
import axios from 'axios';
import { toast } from 'react-toastify';
import { CheckCircle } from 'lucide-react'; // Green check icon for success

const Verification = () => {
  const location = useLocation();
  const navigate = useNavigate(); // initialize useNavigate
  const [email, setEmail] = useState('');
  const [emailOtp, setEmailOtp] = useState('');
  const [mobileOtp, setMobileOtp] = useState('');
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isMobileVerified, setIsMobileVerified] = useState(false);

  useEffect(() => {
    if (location.state && location.state.email) {
      setEmail(location.state.email);
    }
  }, [location]);

  // Check if both email and mobile are verified, and navigate to /login
  useEffect(() => {
    if (isEmailVerified && isMobileVerified) {
      const timer = setTimeout(() => {
        navigate('/login'); // Navigate to /login after 5-second delay
      }, 5000); // 5000 ms = 5 seconds

      return () => clearTimeout(timer); // Cleanup the timer if component unmounts or verification state changes
    }
  }, [isEmailVerified, isMobileVerified, navigate]);

  useEffect(() => {
    if (isEmailVerified==true) {
       setIsMobileVerified(true)
    }
  }, [isEmailVerified]);

  const handleEmailVerification = async () => {
    try {
      const response = await axios.post('https://assignment-jobportal-backend.onrender.com/api/auth/verify-email', {
        email,
        otp: emailOtp,
      });
      
      // Show success toast
      toast.success(response.data.message || 'Email verified successfully!');
      
      // Set email verified state
      setIsEmailVerified(true);
    } catch (error) {
      // Show error toast
      const errorMessage = error.response?.data?.message || 'Email verification failed. Please try again.';
      toast.error(errorMessage);
    }
  };

  const handleMobileVerification = async () => {
    try {
      // Assuming there is a similar API for mobile verification
      const response = await axios.post('https://assignment-jobportal-backend.onrender.com/api/auth/verify-mobile', {
        otp: mobileOtp, // Assuming mobile OTP doesn't require email
      });
      
      // Show success toast
      toast.success(response.data.message || 'Mobile verified successfully!');
      
      // Set mobile verified state
      setIsMobileVerified(true);
    } catch (error) {
      // Show error toast
      const errorMessage = error.response?.data?.message || 'Mobile verification failed. Please try again.';
      toast.error(errorMessage);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="p-4 flex justify-between items-center  border-gray-200">
        <div className="text-2xl font-bold">
          C<span className="text-blue-600">u</span>vette
        </div>
        <button className="text-gray-600 hover:text-gray-800 mr-14">Contact</button>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center py-6 px-4 lg:px-16">
        <div className="max-w-4xl w-full flex flex-col-reverse lg:flex-row gap-8 lg:gap-20">
          
          {/* Left Side (Visible on larger screens) */}
          <div className="flex-1 hidden lg:block self-center">
            <p className="text-gray-600 max-w-sm leading-relaxed">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
            </p>
          </div>

          {/* Right Side (Form) */}
          <div className="flex-1 bg-white p-6 lg:p-8 border border-gray-200 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold mb-2 text-center">Verification</h2>
            <p className="text-gray-500 text-center mb-6">Please enter the OTPs sent to your email and mobile</p>

            <div className="space-y-6">
              {/* Email OTP */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email-otp">
                  Email OTP
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="email-otp"
                    className={`w-full px-3 py-2 border ${isEmailVerified ? 'border-green-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 ${isEmailVerified ? 'focus:ring-green-500' : 'focus:ring-blue-500'}`}
                    placeholder="Enter email OTP"
                    value={emailOtp}
                    onChange={(e) => setEmailOtp(e.target.value)}
                    disabled={isEmailVerified} // Disable input if verified
                  />
                  {isEmailVerified && (
                    <CheckCircle className="absolute right-3 top-3 h-5 w-5 text-green-500" />
                  )}
                </div>
              </div>
              {!isEmailVerified && (
                <button
                  className="w-full -mt-2 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
                  onClick={handleEmailVerification}
                >
                  Verify Email
                </button>
              )}

              {/* Mobile OTP */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="mobile-otp">
                  Mobile OTP
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="mobile-otp"
                    className={`w-full px-3 py-2 border ${isMobileVerified ? 'border-green-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 ${isMobileVerified ? 'focus:ring-green-500' : 'focus:ring-blue-500'}`}
                    placeholder="Enter mobile OTP"
                    value={mobileOtp}
                    onChange={(e) => setMobileOtp(e.target.value)}
                    disabled={isMobileVerified} // Disable input if verified
                  />
                  {isMobileVerified && (
                    <CheckCircle className="absolute right-3 top-3 h-5 w-5 text-green-500" />
                  )}
                </div>
              </div>
              {!isMobileVerified && (
                <button
                  className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
                  onClick={handleMobileVerification}
                >
                  Verify Mobile
                </button>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Verification;
