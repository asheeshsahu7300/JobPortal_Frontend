import React, { useState } from 'react';
import { Home, ChevronDown } from 'lucide-react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function JobPostingForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    experienceLevel: '',
    candidates: [{ email: '', name: '' }],
    endDate: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCandidateChange = (index, e) => {
    const { name, value } = e.target;
    const newCandidates = [...formData.candidates];
    newCandidates[index][name] = value;
    setFormData((prevData) => ({
      ...prevData,
      candidates: newCandidates,
    }));
  };

  const handleAddCandidate = () => {
    setFormData((prevData) => ({
      ...prevData,
      candidates: [...prevData.candidates, { email: '', name: '' }],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('https://assignment-jobportal-backend.onrender.com/api/jobs/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          experienceLevel: formData.experienceLevel,
          candidates: formData.candidates,
          endDate: formData.endDate,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log('Job posted successfully:', result);
      toast.success('Job posted successfully!');
      navigate('/Jobs');

      setFormData({
        title: '',
        description: '',
        experienceLevel: '',
        candidates: [{ email: '', name: '' }],
        endDate: '',
      });

    } catch (error) {
      console.error('Error posting job:', error);
      toast.error('Error posting job. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="flex items-center justify-between border-b bg-white px-4 py-2">
        <div className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-blue-600">C</span>
          <span className="text-2xl font-bold">uvette</span>
        </div>
        <div className="flex items-center space-x-4">
          <a href="#" className="text-gray-600 hover:text-gray-900">
            Contact
          </a>
          <div className="relative">
            <button className="flex items-center space-x-2 bg-gray-200 rounded-full py-2 px-4">
              <div className="w-6 h-6 bg-gray-400 rounded-full"></div>
              <span className="text-gray-600">User</span>
              <ChevronDown className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>
      </header>
      <div className="flex">
        <aside className="w-16 border-r bg-white p-4">
          <button className="rounded-full bg-gray-100 p-2 text-gray-600 hover:bg-gray-200">
            <Home className="w-6 h-6 text-gray-600" />
          </button>
        </aside>
        <div className='ml-20 w-1/2'>
          <main className="flex-1 p-6">
            <form className="mx-auto max-w-2xl space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="job-title" className="block text-sm font-medium text-gray-700">
                  Job Title
                </label>
                <input
                  type="text"
                  id="job-title"
                  name="title"
                  placeholder="Enter Job Title"
                  value={formData.title}
                  onChange={handleChange}
                  className="mt-1 py-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label htmlFor="job-description" className="block text-sm font-medium text-gray-700">
                  Job Description
                </label>
                <textarea
                  id="job-description"
                  name="description"
                  placeholder="Enter Job Description"
                  value={formData.description}
                  onChange={handleChange}
                  className="mt-1 block w-full h-32 py-2 rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label htmlFor="experience-level" className="block text-sm font-medium text-gray-700">
                  Experience Level
                </label>
                <select
                  id="experience-level"
                  name="experienceLevel"
                  value={formData.experienceLevel}
                  onChange={handleChange}
                  className="mt-1 block py-2 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                >
                  <option value="">Select Experience Level</option>
                  <option value="entry">Entry Level</option>
                  <option value="mid">Mid Level</option>
                  <option value="senior">Senior Level</option>
                </select>
              </div>
              <div>
                <label htmlFor="candidates" className="block text-sm font-medium text-gray-700">
                  Candidates
                </label>
                {formData.candidates.map((candidate, index) => (
                  <div key={index} className="flex space-x-2">
                    <input
                      type="text"
                      name="name"
                      placeholder="Candidate Name"
                      value={candidate.name}
                      onChange={(e) => handleCandidateChange(index, e)}
                      className="flex-1 py-2 rounded-md border-gray-300 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Candidate Email"
                      value={candidate.email}
                      onChange={(e) => handleCandidateChange(index, e)}
                      className="flex-1 py-2 rounded-md border-gray-300 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={handleAddCandidate}
                  className="mt-2 rounded-md border border-transparent bg-blue-600 py-1 px-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Add Candidate
                </button>
              </div>
              <div>
                <label htmlFor="end-date" className="block text-sm py-2 font-medium text-gray-700">
                  End Date
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    type="text"
                    id="end-date"
                    name="endDate"
                    placeholder="Select a Date"
                    value={formData.endDate}
                    onChange={handleChange}
                    className="block w-full py-2 rounded-md border-gray-300 pl-3 pr-10 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    <span className="text-gray-500 sm:text-sm">📅</span>
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="w-full rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Send
              </button>
            </form>
          </main>
        </div>
      </div>
    </div>
  );
}
