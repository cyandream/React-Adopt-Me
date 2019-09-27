import React, { useState, useEffect } from 'react';
import pet, { ANIMALS } from '@frontendmasters/pet';
import useDropdown from './useDropdown';

const SearchParams = () => {
  const [location, setLocation] = useState('Seattle, WA');
  const [breeds, setBreeds] = useState([]);
  const [animal, AnimalDropdown] = useDropdown('Animal', 'dog', ANIMALS);
  const [breed, BreedDropdown, setBreed] = useDropdown('Breed', '', breeds);

  const clickHandler = e => {
    e.preventDefault;
    setLocation(e.target.value);
  };

  // Scheduling when this function happens
  // 1st Render, then soon after this function runs
  // Why? - so the API call does not slow down the first page render
  useEffect(() => {
    // pet.breeds('dog').then(console.log, console.error);

    // OnSelect  update the breeds dropdown
    setBreeds([]);

    // Clear out dropdown, before repopulating
    setBreed('');

    // Call API to populate, based on animal, return promise
    pet.breeds(animal).then(({ breeds: apiBreeds }) => {
      // transform list of objects into a list of strings ==map

      // no destructuring
      //const breedStrings = breeds.map((obj.name ) => obj.name);

      // distructrure object into name
      const breedStrings = apiBreeds.map(({ name }) => name);
      setBreeds(breedStrings);
    }, console.error);

    // Run only when things change,  list of depenency
  }, [animal, setBreeds, setBreed]);

  return (
    <div className="search-params">
      <h1>{location}</h1>
      <form>
        <label htmlFor="location">
          Location
          <input
            id="location"
            value={location}
            placeholder="Location"
            onChange={clickHandler}
          />
        </label>
        <AnimalDropdown />
        <BreedDropdown />

        <button>Submit</button>
      </form>
    </div>
  );
};
export default SearchParams;
