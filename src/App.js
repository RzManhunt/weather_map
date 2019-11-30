import React, { useState } from 'react';
import './App.css';
import { WorldMap } from './components/WorldMap';
import { NavBar } from './components/NavBar';

function App() {
	const defaultColor = '#f2f2f2';
	const defaultSelectColor = 'black';

	const [selectedCountryId, setSelectedCountryId] = useState('');
	const [hoveredCountry, setHoveredCountry] = useState(undefined)

	const _handleWorldMapMouseLeave = (e) => {
		if(selectedCountryId !== e.target.id){
			e.target.setAttribute('fill', defaultColor)
		}

		setHoveredCountry(null)
	}

	const _handleWorldMapMouseEnter = (e) => {
		const { id } = e.target

		if(selectedCountryId !== id){
	// Set default hover color
			e.target.setAttribute('fill', 'lightgreen')
	// You can change color based on the id
			id === 'AR' && e.target.setAttribute('fill', 'lightblue')
			id === 'BR' && e.target.setAttribute('fill', 'green')
			id === 'US' && e.target.setAttribute('fill', 'blue')
			id === 'RU' && e.target.setAttribute('fill', 'red')
		}

		setHoveredCountry(e.target.getAttribute('data-name'));
	}

	const _handleWorldMapClick = (e) => {
		if (e.target.getAttribute('fill') !== defaultSelectColor){
			e.target.setAttribute('fill', defaultSelectColor);
			setSelectedCountryId(e.target.id);
			if(selectedCountryId !== '' && e.target.id !== selectedCountryId){
				const prevCountry = document.querySelector(`#${selectedCountryId}`);
				prevCountry.setAttribute('fill', defaultColor);
			}
		} else{
			e.target.setAttribute('fill', defaultColor);
			setSelectedCountryId('');
		}		
	}

	const _handleSelectedCountry = (selectedCountry) => {
		if(selectedCountryId !== ''){
			const prevCountry = document.querySelector(`#${selectedCountryId}`);
			prevCountry.setAttribute('fill', defaultColor);
		}

		if(selectedCountry !== ''){
			const currentCountry = document.querySelector(`#${selectedCountry}`)
			currentCountry.setAttribute('fill', defaultSelectColor);
		}
		
		setSelectedCountryId(selectedCountry);
	}

  return (
    <div className="App">
    	<NavBar
		    selectedCountryId={selectedCountryId}
		    selectedCountry={_handleSelectedCountry}
		    hoveredCountry={hoveredCountry}
      	/>
    	<WorldMap
      		height='90%'
	      	width='90%'
			onMouseEnter={_handleWorldMapMouseEnter}
			onMouseLeave={_handleWorldMapMouseLeave}
			onClick={_handleWorldMapClick}
    	/>
    </div>
  );
}

export default App;