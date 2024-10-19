import React from 'react';
import { Mail, Phone } from 'lucide-react';

const SignUpPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <header className="flex justify-between items-center p-4">
        <div className="text-2xl font-bold">
          C<span className="text-blue-500">u</span>vette
        </div>
        <nav>
          <a href="#contact" className="text-gray-600 hover:text-gray-900">Contact</a>
        </nav>
      </header>
      
      <main className="flex flex-col md:flex-row justify-between items-center px-4 md:px-20 py-20">
        <div className="md:w-1/2 mb-10 md:mb-0">
          <h2 className="text-3xl font-semibold mb-4">Lorem Ipsum is simply dummy text</h2>
          <p className="text-gray-600">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
            when an unknown printer took a galley
          </p>
        </div>
        
        <div className="md:w-1/2 max-w-md">
          <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
            <h2 className="text-2xl font-bold mb-2 text-center">Sign Up</h2>
            <p className="text-gray-600 text-center mb-6">Lorem Ipsum is simply dummy text</p>
            
            <div className="space-y-4">
              <div className="flex items-center bg-gray-100 p-2 rounded-md">
                <Mail className="text-gray-400 mr-2" />
                <input 
                  type="email" 
                  placeholder="Email OTP" 
                  className="bg-transparent outline-none flex-grow"
                />
                <span className="text-green-500">✓</span>
              </div>
              
              <div className="flex items-center bg-gray-100 p-2 rounded-md">
                <Phone className="text-gray-400 mr-2" />
                <input 
                  type="tel" 
                  placeholder="Mobile OTP" 
                  className="bg-transparent outline-none flex-grow"
                />
                <span className="text-green-500">✓</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SignUpPage;