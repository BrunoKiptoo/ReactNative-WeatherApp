import React from 'react';
import { Link } from 'react-router-dom';
import { FaClock, FaHistory, FaUser } from 'react-icons/fa';
import logo from '../Assets/image-removebg-preview (7).png'; // Replace './Assets/image1/logo.png' with the actual file path of your logo

function LandingPage() {
  return (
    <div>
      <div className="bg-gradient-to-br from-indigo-800 to-purple-900 text-white py-20">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center mb-6">
            <img src={logo} alt="Marathon Analytics Logo" className="h-12 w-12" />
            <h2 className="text-4xl font-semibold animate-fade-in-down">
              Welcome to Marathon Analytics
            </h2>
          </div>
          <p className="text-xl mb-10 animate-fade-in-up">
            Unleash the power of data and revolutionize sports investment
          </p>
          <button className="bg-teal-700 hover:bg-teal-800 text-white font-semibold py-3 px-8 rounded-lg animate-fade-in">
            Get Started
          </button>
        </div>
      </div>
      <div className="bg-gray-900">
        <div className="container mx-auto py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Link to="/analytics" className="hover:bg-indigo-800">
              <div className="bg-indigo-900 text-white p-6 rounded-lg transition duration-300 transform hover:scale-105 animate-fade-in">
                <h3 className="text-2xl font-semibold mb-4">
                  <FaClock className="inline-block mr-2 text-teal-400" />
                  World Records
                </h3>
                <p className="mb-4">
                  Explore the incredible world records set by African marathoners.
                </p>
                <span className="text-teal-400 hover:text-teal-300">
                  Learn More
                </span>
              </div>
            </Link>
            <Link to="/analytics" className="hover:bg-indigo-800">
              <div className="bg-indigo-900 text-white p-6 rounded-lg transition duration-300 transform hover:scale-105 animate-fade-in">
                <h3 className="text-2xl font-semibold mb-4">
                  <FaHistory className="inline-block mr-2 text-teal-400" />
                  Running History
                </h3>
                <p className="mb-4">
                  Dive into the rich running history of African marathoners.
                </p>
                <span className="text-teal-400 hover:text-teal-300">
                  Learn More
                </span>
              </div>
            </Link>
            <Link to="/map" className="hover:bg-indigo-800">
              <div className="bg-indigo-900 text-white p-6 rounded-lg transition duration-300 transform hover:scale-105 animate-fade-in">
                <h3 className="text-2xl font-semibold mb-4">
                  <FaUser className="inline-block mr-2 text-teal-400" />
                  Athlete Profiles
                </h3>
                <p className="mb-4">
                  Discover talented African athletes and their achievements.
                </p>
                <span className="text-teal-400 hover:text-teal-300">
                  Learn More
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
