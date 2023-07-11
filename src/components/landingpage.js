import React from 'react';
import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <div>
      <div className="bg-gradient-to-br from-black to-indigo-900 text-white py-20">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-semibold mb-6">
            Welcome to Marathon Analytics
          </h2>
          <p className="text-xl mb-10">
            Unleash the power of data and revolutionize sports investment
          </p>
          <button className="bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-8 rounded-lg">
            Get Started
          </button>
        </div>
      </div>
      <div className="container mx-auto py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Link to="/analytics" className="hover:bg-teal-700">
            <div className="bg-teal-800 text-white p-6 rounded-lg transition duration-300 transform hover:scale-105">
              <h3 className="text-2xl font-semibold mb-4">World Records</h3>
              <p className="mb-4">
                Explore the incredible world records set by African marathoners.
              </p>
              <span className="text-teal-400 hover:text-teal-300">
                Learn More
              </span>
            </div>
          </Link>
          <Link to="/analytics" className="hover:bg-teal-700">
            <div className="bg-teal-800 text-white p-6 rounded-lg transition duration-300 transform hover:scale-105">
              <h3 className="text-2xl font-semibold mb-4">Running History</h3>
              <p className="mb-4">
                Dive into the rich running history of African marathoners.
              </p>
              <span className="text-teal-400 hover:text-teal-300">
                Learn More
              </span>
            </div>
          </Link>
          <Link to="/map" className="hover:bg-teal-700">
            <div className="bg-teal-800 text-white p-6 rounded-lg transition duration-300 transform hover:scale-105">
              <h3 className="text-2xl font-semibold mb-4">Athlete Profiles</h3>
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
  );
}

export default LandingPage;
