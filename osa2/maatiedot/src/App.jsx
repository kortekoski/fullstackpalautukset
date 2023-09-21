import { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({ country, weather }) => {
  const imageUrl = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`

  return (
    <div>
      <h2>Weather in {country.capital}</h2>
      <p>
        temperature {Math.floor(weather.main.temp - 273.15)} Celsius{<br/>}
        <img src={imageUrl}/>{<br/>}
        wind {weather.wind.speed} m/s
      </p>
    </div>
  )
}

const Countries = ({ countries, search, setSearch, weather, setWurl, apiKey }) => {
  const filteredCountries = countries.filter(c => c.name.common.toUpperCase().includes(search.toUpperCase()))

  if(filteredCountries.length === 0){
    return (
      <div>
        <p>
          No matches found
        </p>
      </div>
    )
  }

  if (filteredCountries.length > 10){
    return (
      <div>
        <p>
          Too many matches, specify another filter
        </p>
      </div>
    )
  }
 
  if (filteredCountries.length === 1){
    const country = filteredCountries[0]
    setWurl(`https://api.openweathermap.org/data/2.5/weather?lat=${country.latlng[0]}&lon=${country.latlng[1]}&appid=${apiKey}`)
    

    return (
      <div>
        <h1>{country.name.common}</h1>
        <p>
          capital {country.capital}{<br/>}
          area {country.area}
        </p>
        <h3>languages:</h3>
        <ul>
          {Object.values(country.languages).map(l => <li key={l}>{l}</li>)}
        </ul>
        <img 
          src={country.flags.png} 
          alt={'flag of ' + country.name.common}
          height={150}
        />
        <Weather country={country} weather={weather} apiKey={apiKey}/>
      </div>
    )
  } 
  
  return (
    <div>
      {filteredCountries
        .map(c => <p key={c.fifa}>{c.name.common} <button onClick={() => setSearch(c.name.common)}>show</button></p>)
      }
    </div>
  )
}

const App = () => {
  const apiKey = import.meta.env.VITE_SOME_KEY

  const [countries, setCountries] = useState([])
  const [weather, setWeather] = useState([])
  const [search, setSearch] = useState('')

  const [wurl, setWurl] = useState(`https://api.openweathermap.org/data/2.5/weather?lat=0&lon=0&appid=${apiKey}`)

  const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'

  useEffect (() => {
    axios
      .get(baseUrl)
      .then((response => {
        setCountries(response.data)
      }))
  }, [])

  useEffect (() => {
    axios
      .get(wurl)
      .then((response => {
        setWeather(response.data)
      }))
  }, [wurl])

  const handleChange = (event) => {
    setSearch(event.target.value)
  }

  return (
    <div>
      find countries 
        <form onChange={handleChange}>
          <input />
        </form>
      <Countries countries={countries} search={search} setSearch={setSearch} weather={weather} setWurl={setWurl} apiKey={apiKey}/>
    </div>
  )
}

export default App