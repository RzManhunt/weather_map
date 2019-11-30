import React from 'react';


export const Prognosis = ({ prognosis }) => {
	if (prognosis === null) {
	  return(
	  	<div className="prognosis-container">
	  	  <div className="loader"></div>
	  	</div>
	  )
	}

	return(
	  prognosis ?
	  <div className="prognosis-container">
	    <div className="prognosis-header">{prognosis.name}</div>
	    <div className="prognosis-body">
	      <div className="prognosis-left">
	    	<div className="weather-icon">
	    	  <img
	    	    src={`http://openweathermap.org/img/w/${prognosis.weather[0].icon}.png`}
	    	    alt="weather icon" />
	    	</div>
	    	<div>{prognosis.main.temp}°C</div>
	      </div>
	      <div className="prognosis-right">
	        <div><b>Wind Direction: </b>{prognosis.wind.deg}°</div>
	        <div><b>Wind Speed: </b>{prognosis.wind.speed}Km/h</div>
	        <div><b>Humidity: </b>{prognosis.main.humidity}%</div>
	      </div>
	    </div>
	  </div>
	  :
	  <div className="prognosis-container">
	    <div>Not Found</div>
	    <br/><br/>
	    <div>Please check the city's name</div>
	  </div>
	)
}