






import React, { useState, useEffect } from 'react';

function  Analytics() {
  const [athleteList, setAthleteList] = useState([]);
  const [selectedAthlete, setSelectedAthlete] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddFormVisible, setIsAddFormVisible] = useState(false);
  const [isEditFormVisible, setIsEditFormVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [athleteToDelete, setAthleteToDelete] = useState(null);
  const deleteAthlete = (athlete) => {
    setAthleteToDelete(athlete);
    setIsDeleteModalVisible(true);
  };
  

  const [newAthlete, setNewAthlete] = useState({
    name: '',
    country: '',
    personalBest: '',
    image: '',
    height: '',
    weight: '',
    event: '',
    age: '',
    coach: '',
    nationalRecords: '',
    internationalMedals: '',
  });

  const [editedAthlete, setEditedAthlete] = useState({
    name: '',
    country: '',
    personalBest: '',
    image: '',
    height: '',
    weight: '',
    event: '',
    age: '',
    coach: '',
    nationalRecords: '',
    internationalMedals: '',
  });


  const confirmDeleteAthlete = async () => {
    try {
      const response = await fetch(`http://localhost:3000/athletes/${athleteToDelete.id}`, {
        method: 'DELETE'
      });
  
      if (response.ok) {
        console.log('Athlete deleted'); // Log success message
        fetchAthleteList(); // Refresh the athlete list
      } else {
        throw new Error('Failed to delete athlete');
      }
    } catch (error) {
      console.error(error);
    }
  
    setIsDeleteModalVisible(false); // Close the confirmation modal
    setAthleteToDelete(null); // Clear the athlete to be deleted
  };
  
  
  

  useEffect(() => {
    fetchAthleteList();
  }, []);

  const fetchAthleteList = async () => {
    try {
      const response = await fetch('http://localhost:3000/athletes');
      const data = await response.json();
      setAthleteList(data);
    } catch (error) {
      console.error('Error fetching athlete list:', error);
    }
  };

  const handleEditAthlete = async () => {
    try {
      const response = await fetch(`http://localhost:3000/athletes/${selectedAthlete.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedAthlete),
      });
  
      if (response.ok) {
        const updatedAthlete = await response.json();
        console.log(updatedAthlete); // Log the updated athlete data
        setSelectedAthlete(updatedAthlete); // Update the selected athlete with the updated data
        toggleEditFormVisibility(); // Close the edit form
        fetchAthleteList(); // Refresh the athlete list
      } else {
        throw new Error('Failed to edit athlete');
      }
    } catch (error) {
      console.error(error);
    }
  };
  

  const handleAthleteClick = (athlete) => {
    setSelectedAthlete(athlete);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const toggleAddFormVisibility = () => {
    setIsAddFormVisible(!isAddFormVisible);
    // setNewAthlete(prevAthlete);
  };

  const toggleEditFormVisibility = () => {
    setIsEditFormVisible(!isEditFormVisible);
    setEditedAthlete(selectedAthlete); // Initialize the editedAthlete state with the selected athlete's data
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedAthlete((prevAthlete) => ({
      ...prevAthlete,
      [name]: value
    }));
  };

  const handleAddInputChange = (event) => {
    const { name, value } = event.target;
    setNewAthlete((prevAthlete) => ({
      ...prevAthlete,
      [name]: value
    }));
  };

  const handleAddAthlete = async () => {
    try {
      const response = await fetch('http://localhost:3000/athletes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newAthlete)
      });

      if (response.ok) {
        // Athlete added successfully
        console.log('Athlete added:', newAthlete);

        // Reset the form
        setNewAthlete({
            name: '',
            country: '',
            personalBest: '',
            image: '',
            height: '',
            weight: '',
            event: '',
            age: '',
            coach: '',
            nationalRecords: '',
            internationalMedals: '',
        });

        // Close the form
        toggleAddFormVisibility();

        // Refresh the athlete list
        fetchAthleteList();
      } else {
        console.error('Failed to add athlete:', response.status);
      }
    } catch (error) {
      console.error('Error adding athlete:', error);
    }
  };

  const filteredAthleteList = athleteList.filter((athlete) =>
    athlete.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
// 
  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      {/* Athlete List Container */}
      <div className="w-1/3 pr-4 fixed left-4 top-1/2 transform -translate-y-1/2">
        <h1 className="text-3xl font-semibold text-white mb-4">Athlete List</h1>
        <div className="flex items-center mb-4">
          <input
            type="text"
            placeholder="Search by name"
            className="p-2 rounded-l-lg w-full bg-gray-800 text-white focus:outline-none"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button className="bg-purple-900 rounded-r-lg px-4 py-2 text-white font-semibold hover:bg-purple-800 focus:outline-none">
            Search
          </button>
        </div>
        <div className="max-h-96 overflow-y-auto" >
          {filteredAthleteList.length > 0 ? (
            filteredAthleteList.map((athlete) => (
              <div
                key={athlete.id}
                className="bg-gray-800 rounded-lg p-4 cursor-pointer hover:bg-purple-800 mb-4"
                onClick={() => handleAthleteClick(athlete)}
              >
                <h2 className="text-lg font-semibold text-white">{athlete.name}</h2>
                <p className="text-sm text-gray-300"> {athlete.country}</p>
              </div>
            ))
          ) : (
            <p className="text-white">No athletes found.</p>
          )}
        </div>

        {/* Add Athlete Button */}
        <button
          className="bg-purple-900 rounded-lg px-4 py-2 text-white font-semibold hover:bg-purple-800 focus:outline-none mt-4"
          onClick={toggleAddFormVisibility}
        >
          Add Athlete
        </button>
      </div>


<div className="flex flex-col items-center pl-4 fixed right-4 top-1/2 transform -translate-y-1/2">
  {selectedAthlete ? (
    <div className="bg-gray-800 rounded-lg p-4 flex">
      <div className="flex items-center">
        <img
          src={selectedAthlete.image}
          alt={selectedAthlete.name}
          className="w-1/2 object-cover rounded-l-lg mr-4"
        />
        <div>
          <h1 className="text-3xl font-semibold text-purple-400 mb-4">{selectedAthlete.name}</h1>
          <div className="mb-4">
            <span className="text-gray-400 mr-2">Country:</span>
            <span className="text-white">{selectedAthlete.country}</span>
          </div>
          <div className="mb-4">
            <span className="text-gray-400 mr-2">Personal Best:</span>
            <span className="text-white">{selectedAthlete.personalBest}</span>
          </div>
          <div className="mb-4">
            <span className="text-gray-400 mr-2">Height:</span>
            <span className="text-white">{selectedAthlete.height}</span>
          </div>
          <div className="mb-4">
            <span className="text-gray-400 mr-2">Weight:</span>
            <span className="text-white">{selectedAthlete.weight}</span>
          </div>
          <div className="mb-4">
            <span className="text-gray-400 mr-2">Event:</span>
            <span className="text-white">{selectedAthlete.event}</span>
          </div>
          <div className="mb-4">
            <span className="text-gray-400 mr-2">Age:</span>
            <span className="text-white">{selectedAthlete.age}</span>
          </div>
          <div className="mb-4">
            <span className="text-gray-400 mr-2">Coach:</span>
            <span className="text-white">{selectedAthlete.coach}</span>
          </div>
          <div className="mb-4">
            <span className="text-gray-400 mr-2">National Records:</span>
            <span className="text-white">{selectedAthlete.nationalRecords}</span>
          </div>
          <div className="mb-4">
            <span className="text-gray-400 mr-2">International Records:</span>
            <span className="text-white">{selectedAthlete.internationalMedals}</span>
          </div>
          <button
            className="bg-purple-900 rounded-lg px-4 py-2 text-white font-semibold hover:bg-purple-800 focus:outline-none mt-4"
            onClick={toggleEditFormVisibility}
          >
            Edit
          </button>
          <button
  className="bg-red-900 rounded-lg px-4 py-2 text-white font-semibold hover:bg-red-800 focus:outline-none mt-4 ml-4"
  onClick={() => deleteAthlete(selectedAthlete)}
>
  Delete
</button>

        </div>
      </div>
    </div>
  ) : (
    <p className="text-white">Select a athlete to view details.</p>
  )}
  {isDeleteModalVisible && (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50">
      <div className="bg-gray-800 rounded-lg p-4 w-96">
        <p className="text-white">
          Are you sure you want to delete {athleteToDelete?.name} from the school database? This action is irreversible and will permanently delete the athlete.
        </p>
        <div className="flex justify-end mt-4">
          <button
            className="bg-red-900 rounded-lg px-4 py-2 text-white font-semibold hover:bg-red-800 focus:outline-none"
            onClick={confirmDeleteAthlete}
          >
            Delete
          </button>
          <button
            className="bg-gray-700 rounded-lg px-4 py-2 text-white font-semibold hover:bg-gray-600 focus:outline-none ml-4"
            onClick={() => setIsDeleteModalVisible(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )}
</div>


      {/* Add Athlete Form  */}
      {isAddFormVisible && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50">
          <div className="bg-gray-800 rounded-lg p-4 w-96">
            <h2 className="text-xl font-semibold text-white mb-4">Add Athlete</h2>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex flex-col">
                <label className="text-sm text-gray-300 mb-2" htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={newAthlete.name}
                  onChange={handleAddInputChange}
                  className="p-2 rounded-lg bg-gray-700 text-white focus:outline-none"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm text-gray-300 mb-2" htmlFor="image">Image:</label>
                <input
                  type="text"
                  id="image"
                  name="image"
                  value={newAthlete.image}
                  onChange={handleAddInputChange}
                  className="p-2 rounded-lg bg-gray-700 text-white focus:outline-none"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm text-gray-300 mb-2" htmlFor="country">Country:</label>
                <input
                  type="country"
                  id="country"
                  name="country"
                  value={newAthlete.country}
                  onChange={handleAddInputChange}
                  className="p-2 rounded-lg bg-gray-700 text-white focus:outline-none"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm text-gray-300 mb-2" htmlFor="personalBest">Personal Best:</label>
                <input
                  type="text"
                  id="personalBest"
                  name="personalBest"
                  value={newAthlete.personalBest}
                  onChange={ handleAddInputChange}
                  className="p-2 rounded-lg bg-gray-700 text-white focus:outline-none"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm text-gray-300 mb-2" htmlFor="height">Height:</label>
                <input
                  type="text"
                  id="height"
                  name="height"
                  value={newAthlete.height}
                  onChange={ handleAddInputChange}
                  className="p-2 rounded-lg bg-gray-700 text-white focus:outline-none"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm text-gray-300 mb-2" htmlFor="weight">Weight:</label>
                <input
                  type="text"
                  id="weight"
                  name="weight"
                  value={newAthlete.weight}
                  onChange={ handleAddInputChange}
                  className="p-2 rounded-lg bg-gray-700 text-white focus:outline-none"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm text-gray-300 mb-2" htmlFor="event">Event:</label>
                <input
                  type="text"
                  id="event"
                  name="event"
                  value={newAthlete.event}
                  onChange={ handleAddInputChange}
                  className="p-2 rounded-lg bg-gray-700 text-white focus:outline-none"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm text-gray-300 mb-2" htmlFor="age">Age:</label>
                <input
                  type="text"
                  id="age"
                  name="age"
                  value={newAthlete.age}
                  onChange={ handleAddInputChange}
                  className="p-2 rounded-lg bg-gray-700 text-white focus:outline-none"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm text-gray-300 mb-2" htmlFor="coach">Coach:</label>
                <input
                  type="text"
                  id="coach"
                  name="coach"
                  value={newAthlete.coach}
                  onChange={ handleAddInputChange}
                  className="p-2 rounded-lg bg-gray-700 text-white focus:outline-none"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm text-gray-300 mb-2" htmlFor="nationalrecords">National Records:</label>
                <input
                  type="text"
                  id="nationalRecords"
                  name="nationalRecords"
                  value={newAthlete.nationalRecords}
                  onChange={ handleAddInputChange}
                  className="p-2 rounded-lg bg-gray-700 text-white focus:outline-none"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm text-gray-300 mb-2" htmlFor="internationalmedals">International Medals:</label>
                <input
                  type="text"
                  id="internationalMedals"
                  name="internationalmedals"
                  value={newAthlete.internationalMedals}
                  onChange={ handleAddInputChange}
                  className="p-2 rounded-lg bg-gray-700 text-white focus:outline-none"
                />
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <button
                className="bg-purple-900 rounded-lg px-4 py-2 text-white font-semibold hover:bg-purple-800 focus:outline-none mr-2"
                onClick={handleAddAthlete}
              >
                Add
              </button>
              <button
                className="bg-gray-700 rounded-lg px-4 py-2 text-white font-semibold hover:bg-gray-600 focus:outline-none"
                onClick={toggleAddFormVisibility}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Athlete Form */}
      {isEditFormVisible && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50">
          <div className="bg-gray-800 rounded-lg p-4 w-96">
            <h2 className="text-xl font-semibold text-white mb-4">Edit Athlete</h2>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex flex-col">
                <label className="text-sm text-gray-300 mb-2" htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={editedAthlete.name}
                  onChange={handleInputChange}
                  className="p-2 rounded-lg bg-gray-700 text-white focus:outline-none"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm text-gray-300 mb-2" htmlFor="image">Image:</label>
                <input
                  type="text"
                  id="image"
                  name="image"
                  value={editedAthlete.image}
                  onChange={handleInputChange}
                  className="p-2 rounded-lg bg-gray-700 text-white focus:outline-none"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm text-gray-300 mb-2" htmlFor="country">Country:</label>
                <input
                  type="country"
                  id="country"
                  name="country"
                  value={editedAthlete.country}
                  onChange={handleInputChange}
                  className="p-2 rounded-lg bg-gray-700 text-white focus:outline-none"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm text-gray-300 mb-2" htmlFor="personalBest">Personal Best:</label>
                <input
                  type="text"
                  id="personalBest"
                  name="personalBest"
                  value={editedAthlete.personalBest}
                  onChange={handleInputChange}
                  className="p-2 rounded-lg bg-gray-700 text-white focus:outline-none"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm text-gray-300 mb-2" htmlFor="height">Height:</label>
                <input
                  type="text"
                  id="height"
                  name="height"
                  value={editedAthlete.height}
                  onChange={handleInputChange}
                  className="p-2 rounded-lg bg-gray-700 text-white focus:outline-none"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm text-gray-300 mb-2" htmlFor="weight">Weight:</label>
                <input
                  type="text"
                  id="weight"
                  name="weight"
                  value={editedAthlete.weight}
                  onChange={handleInputChange}
                  className="p-2 rounded-lg bg-gray-700 text-white focus:outline-none"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm text-gray-300 mb-2" htmlFor="event">Event:</label>
                <input
                  type="text"
                  id="event"
                  name="event"
                  value={editedAthlete.event}
                  onChange={handleInputChange}
                  className="p-2 rounded-lg bg-gray-700 text-white focus:outline-none"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm text-gray-300 mb-2" htmlFor="age">Age:</label>
                <input
                  type="text"
                  id="age"
                  name="age"
                  value={editedAthlete.age}
                  onChange={handleInputChange}
                  className="p-2 rounded-lg bg-gray-700 text-white focus:outline-none"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm text-gray-300 mb-2" htmlFor="coach">Coach:</label>
                <input
                  type="text"
                  id="coach"
                  name="coach"
                  value={editedAthlete.coach}
                  onChange={handleInputChange}
                  className="p-2 rounded-lg bg-gray-700 text-white focus:outline-none"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm text-gray-300 mb-2" htmlFor="nationalrecords">National Records:</label>
                <input
                  type="text"
                  id="nationalRecords"
                  name="nationalRecords"
                  value={editedAthlete.nationalRecords}
                  onChange={ handleAddInputChange}
                  className="p-2 rounded-lg bg-gray-700 text-white focus:outline-none"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm text-gray-300 mb-2" htmlFor="internationalmedals">International Medals:</label>
                <input
                  type="text"
                  id="internationalMedals"
                  name="internationalmedals"
                  value={editedAthlete.internationalMedals}
                  onChange={ handleAddInputChange}
                  className="p-2 rounded-lg bg-gray-700 text-white focus:outline-none"
                />
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <button
                className="bg-purple-900 rounded-lg px-4 py-2 text-white font-semibold hover:bg-purple-800 focus:outline-none mr-2"
                onClick={handleEditAthlete}
              >
                Save
              </button>
              <button
                className="bg-gray-700 rounded-lg px-4 py-2 text-white font-semibold hover:bg-gray-600 focus:outline-none"
                onClick={toggleEditFormVisibility}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default  Analytics;



