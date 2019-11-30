import React, { useState, useEffect } from 'react';
import { MenuButton } from './MenuButton';
import { GlobeIcon } from './GlobeIcon';
import { SelectList } from './SelectList';
import { Prognosis } from './Prognosis';

// TODO: Probar pasar el MenuButton como una prop children
export const NavBar = (props) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isPrognosisOpen, setIsPrognosisOpen] = useState(false);
	const [cityInput, setCityInput] = useState('');
	const [prognosis, setPrognosis] = useState(null);

	useEffect(() => {
		if(props.selectedCountryId !== ''){
			setIsMenuOpen(true);
		}
	},
		[props.selectedCountryId]
	)


	
	const countriesList = () => {
      const countriesArr = Array.from(document.querySelectorAll('[data-country="true"]'));
      const mapCountries = (country) => {
        return { 
          id: country.id,
          name: country.getAttribute('data-name')
        }
      }
      const sortCountries = (a, b) => {
          let x = a.name.toLowerCase();
          let y = b.name.toLowerCase();
          if (x < y) {return -1;}
          if (x > y) {return 1;}
          return 0;
      }

      return countriesArr.map(mapCountries).sort(sortCountries);
  	}

	const _handleMenuButtonClick = () => {
		isMenuOpen ? setIsMenuOpen(false) : setIsMenuOpen(true);
		setIsPrognosisOpen(false);
	}

	const _handleInputCountryChange = (e) => {
		props.selectedCountry(e.target.value);
		e.target.blur();
	}

	const _handleInputCityChange = (e) => {
		setCityInput(e.target.value);
	}

	const _handlePrognosisClick = () => {
		setPrognosis(null);

		// API OpenWheatherMap
		const APIKey = 'a30b850d3e254d5ef605b9dc9f782bbc';
		const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
		const urlParams = `?q=${cityInput},${props.selectedCountryId}&units=metric&appid=${APIKey}`;
		fetch(baseUrl + urlParams)
			.then(response => response.json())
			.then(data => {
				data.cod !== 200
				? setPrognosis(false)
				: setPrognosis(data);
			})

		setIsPrognosisOpen(true);
	}

	return(
		<nav className="nav-bar">
			<div className="nav-section">
				<GlobeIcon size='40px' />

			    <div className="dropdown">
		  			<MenuButton
						size='45px'
						onClick={_handleMenuButtonClick}
						isOpen={isMenuOpen}
				    />
					<div className={`dropdown-content ${isMenuOpen ? 'show' : ''}`}>
						<SelectList
							className={`select-country ${isMenuOpen ? 'show' : ''}`}
							itemsList={countriesList()}
							onChange={_handleInputCountryChange}
							initialValue='<<-- Select a Country -->>'
							selected={props.selectedCountryId}
						/>
				
						<input
							className={`input-city ${props.selectedCountryId !== ''
										&& isMenuOpen === true ? 'show' : ''}`}
							type="text"
							onChange={_handleInputCityChange}
							value={cityInput}
						/>
						<button
							className={`prognosis-button ${props.selectedCountryId !== ''
										&& isMenuOpen === true ? 'show' : ''}`}
							onClick={_handlePrognosisClick}
						>
							Get Prognosis
						</button>

						<div className={`prognosis-drop ${isPrognosisOpen ? 'show' : ''}`}>
						{
							isPrognosisOpen
							?	<Prognosis prognosis={prognosis} />
							: null
						}
						</div>
					</div>
				</div>
			</div>
			<div className="nav-section">
				<span>{props.hoveredCountry}</span>
			</div>
		</nav>
	)
}
