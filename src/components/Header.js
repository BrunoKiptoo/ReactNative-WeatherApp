import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router

const Header = () => {
  const [africanCountries, setAfricanCountries] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleFilter = (country) => {
    // Navigate to the page displaying athletes from the selected country
    window.location.href = `/athletes/${country}`;
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/countries');
        const data = await response.json();
        setAfricanCountries(data);
      } catch (error) {
        console.log('Error fetching countries:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <header className="bg-purple-900">
        <div className="container mx-auto py-6 px-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center">
              <img
                src="wakanda_logo.png" // Replace with your Wakanda-inspired logo
                alt="Wakanda Logo"
                className="h-10 w-10 mr-2"
              />
              <h1 className="text-white text-lg font-semibold">Marathon Analytics</h1>
            </div>
            <ul className="flex items-center">
              <li className="ml-6">
                <a href="/map" className="text-white hover:text-purple-400">Map</a>
              </li>
              <li className="ml-6">
                <a href="/analytics" className="text-white hover:text-purple-400">Analytics</a>
              </li>
              <li className="ml-6">
                <button
                  className="text-white hover:text-purple-400"
                  onClick={toggleDropdown}
                >
                  Filter
                </button>
                {showDropdown && (
                  <ul className="absolute bg-purple-900 text-white mt-2 py-2 px-4 rounded-md shadow-md">
                    {africanCountries.map((country) => (
                      <li key={country} className="py-1">
                        <button
                          className="text-white hover:text-purple-400"
                          onClick={() => handleFilter(country)}
                        >
                          {country}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
              <li className="ml-6">
                <a href="/logout" className="text-white hover:text-purple-400">Logout</a>
              </li>
            </ul>
            <div className="ml-6">
              <button className="bg-purple-700 hover:bg-purple-800 text-white font-semibold py-2 px-4 rounded">
                Search
              </button>
            </div>
          </nav>
        </div>
      </header>
    </div>
  );
};

export default Header;
