import React, { useEffect, useState } from 'react';
import { Home, ChevronDown } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

// Modal component to display job details
const JobDetailModal = ({ job, onClose }) => {
    const handleDeleteJob = async (jobId) => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`https://assignment-jobportal-backend.onrender.com/api/jobs/${jobId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // Include the JWT token
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            alert('Job deleted successfully!');
            onClose(); // Close the modal after deletion
        } catch (error) {
            console.error('Error deleting job:', error);
            alert('Error deleting job. Please try again.');
        }
    };

    const handleSendAlerts = async (jobId) => {
        const token = localStorage.getItem('token');
        const alertData = {
            title: job.title,
            description: job.description,
            experienceLevel: job.experienceLevel,
            candidates: job.candidates.map(candidate => ({
                email: candidate.email,
                name: candidate.name || "Unnamed", // Default name if not provided
            })),
            endDate: new Date(job.endDate).toLocaleDateString("en-CA"), // Format to YYYY-MM-DD
        };

        try {
            const response = await fetch(`https://assignment-jobportal-backend.onrender.com/api/jobs/${jobId}/send-alerts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // Include the JWT token
                },
                body: JSON.stringify(alertData),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            alert('Alerts sent successfully!');
        } catch (error) {
            console.error('Error sending alerts:', error);
            alert('Error sending alerts. Please try again.');
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 w-11/12 max-w-md">
                <h2 className="text-2xl font-semibold">{job.title}</h2>
                <p className="mt-4 text-gray-700">{job.description}</p>
                <p className="mt-2 text-gray-600"><strong>Experience Level:</strong> {job.experienceLevel}</p>
                <p className="mt-2 text-gray-600"><strong>End Date:</strong> {new Date(job.endDate).toLocaleDateString()}</p>
                
                <h3 className="mt-4 text-lg font-semibold">Candidates:</h3>
                {job.candidates.length > 0 ? (
                    <ul className="mt-2">
                        {job.candidates.map(candidate => (
                            <li key={candidate._id} className="text-gray-700">
                                {candidate.name || "Unnamed"} - {candidate.email}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500">No candidates applied yet.</p>
                )}
                
                <div className="mt-4 flex space-x-4">
                    <button
                        onClick={() => handleDeleteJob(job._id)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                    >
                        Delete Job
                    </button>
                    <button
                        onClick={() => handleSendAlerts(job._id)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                    >
                        Send Alerts
                    </button>
                </div>
                
                <button onClick={onClose} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                    Close 
                </button>
            </div>
        </div>
    );
};

const Homepage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [jobs, setJobs] = useState([]); // State to store job listings
    const [selectedJob, setSelectedJob] = useState(null); // State to store the selected job for modal
    const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility

    useEffect(() => {
        // Set company name from location state
        if (location.state && location.state.Company) {
            setName(location.state.Company);
        }
    }, [location]);

    useEffect(() => {
        // Fetch jobs from the API
        const fetchJobs = async () => {
            const token = localStorage.getItem('token'); // Retrieve the token from local storage
            try {
                const response = await fetch('https://assignment-jobportal-backend.onrender.com/api/jobs/', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`, // Include the JWT token
                    },
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setJobs(data); // Assuming data is an array of job objects
            } catch (error) {
                console.error('Error fetching jobs:', error);
            }
        };

        fetchJobs();
    }, []);

    const handleCreateInterview = () => {
        navigate('/CreateJobs');
    };

    // Function to handle job card click
    const handleJobClick = async (jobId) => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`https://assignment-jobportal-backend.onrender.com/api/jobs/${jobId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // Include the JWT token
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const jobDetails = await response.json();
            setSelectedJob(jobDetails);
            setIsModalOpen(true); // Open the modal with job details
        } catch (error) {
            console.error('Error fetching job details:', error);
        }
    };

    const handleLogout = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch('https://assignment-jobportal-backend.onrender.com/api/auth/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // Include the JWT token
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            localStorage.removeItem('token'); // Clear the token from local storage
            setName(''); // Clear the company name state
            setJobs([]); // Clear the jobs state
            setSelectedJob(null); // Clear the selected job state
            setIsModalOpen(false); // Close the modal if it was open
            navigate('/login'); // Redirect to login page
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <div className="flex flex-col h-screen bg-gray-100">
            <header className="flex justify-between items-center p-4 bg-white shadow-sm">
                <div className="text-2xl font-bold text-blue-600">Cuvette</div>
                <div className="flex items-center space-x-4">
                    <button className="text-gray-600 hover:text-gray-800">Contact</button>
                    <div className="relative">
                        <button className="flex items-center space-x-2 bg-gray-200 rounded-full py-2 px-4">
                            <div className="w-6 h-6 bg-gray-400 rounded-full"></div>
                            <span className="text-gray-600">{name}</span>
                            <ChevronDown className="w-4 h-4 text-gray-600" />
                        </button>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-200"
                    >
                        Logout
                    </button>
                </div>
            </header>
            <main className="flex flex-1">
                <aside className="w-16 bg-white shadow-sm">
                    <div className="flex justify-center py-4">
                        <Home className="w-6 h-6 text-gray-600" />
                    </div>
                </aside>
                <div className="flex-1 p-8">
                    <button
                        onClick={handleCreateInterview}
                        className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-200"
                    >
                        Create Interview
                    </button>
                    
                    {/* Job Listings */}
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {jobs.map((job) => (
                            <div key={job._id} className="bg-white p-4 rounded-md shadow-md hover:shadow-lg transition duration-200 cursor-pointer" onClick={() => handleJobClick(job._id)}>
                                <h3 className="text-lg font-semibold">{job.title}</h3>
                                <p className="text-gray-600">{job.description}</p>
                                <p className="mt-2 text-gray-500">Experience Level: {job.experienceLevel}</p>
                                <p className="mt-2 text-gray-500">End Date: {new Date(job.endDate).toLocaleDateString()}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
            {isModalOpen && selectedJob && (
                <JobDetailModal job={selectedJob} onClose={() => setIsModalOpen(false)} />
            )}
        </div>
    );
};

export default Homepage;
