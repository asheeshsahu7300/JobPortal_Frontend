import React, { useState } from 'react';
import { User, Phone, Building2, Mail, Lock } from 'lucide-react'; // Import Lock icon for password
import Logo from "../../assets/images/image 650 1.png";
import axios from 'axios';
import { useNavigate, } from 'react-router-dom';
import { toast } from 'react-toastify';

const SignUpPage = () => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); // State for password
  const navigate = useNavigate();

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://assignment-jobportal-backend.onrender.com/api/auth/register', {
        name,
        email,
        password,
        phoneNumber,
      });

      // Show success toast
      toast.success(response.data.message || 'Registration successful!');

      // Redirect to SignIn page
      navigate('/SignIn',{ state: { email } });
    } catch (error) {
      // Handle error, show toast notification
      const errorMessage = error.response?.data?.message || 'Registration failed. Please try again.';
      toast.error(errorMessage);
    }
  };

  return (
    <div className="bg-white flex flex-col h-screen overflow-hidden">
      {/* Header */}
      <header className="px-4 pt-4 flex justify-between items-center">
        <div className="text-2xl font-bold">
          <img src={Logo} alt="Logo" className="h-8" />
        </div>
        <nav>
          <a href="#contact" className="text-gray-600 hover:text-gray-900 mr-4 lg:mr-14">Contact</a>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center py-4 px-4 lg:px-16">
        <div className="max-w-4xl w-full flex flex-col-reverse lg:flex-row gap-8 lg:gap-20">
          {/* Left content (visible on large screens only) */}
          <div className="flex-1 hidden lg:block self-center">
            <h2 className="text-2xl font-semibold mb-4">Lorem Ipsum</h2>
            <p className="text-gray-600">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
              when an unknown printer took a galley.
            </p>
          </div>

          {/* Right content (Sign Up form) */}
          <div className="flex-1 flex items-center justify-center">
            <div className="bg-white py-4 px-6 lg:p-8 rounded-lg shadow-lg border border-gray-200 w-full  -mt-3">
              <h1 className="text-2xl font-bold mb-2 text-center -mt-2">Sign Up</h1>
              <p className="text-gray-500 text-center mb-6">Lorem Ipsum is simply dummy text</p>

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Company Name"
                    className="pl-10 w-full p-2 border rounded-md"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="tel"
                    placeholder="Phone no."
                    className="pl-10 w-full p-2 border rounded-md"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                  />
                </div>
                
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    placeholder="Company Email"
                    className="pl-10 w-full p-2 border rounded-md"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" /> {/* Lock icon for password */}
                  <input
                    type="password"
                    placeholder="Password"
                    className="pl-10 w-full p-2 border rounded-md"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <p className="text-xs text-gray-500 text-center">
                  By clicking on proceed you will accept our <br />
                  <a href="#terms" className="text-blue-500 hover:underline">Terms & Conditions</a>
                </p>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
                >
                  Proceed
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SignUpPage;
