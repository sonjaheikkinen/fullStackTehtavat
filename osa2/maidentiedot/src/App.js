import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {

    const [countries, setCountries] = useState([])
    const [filterValue, setFilterValue] = useState('')

    useEffect(() => {
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                setCountries(response.data)
            })
    }, [])


    const handleFilterValueChange = (event) => {
        setFilterValue(event.target.value)
    }

    const shownCountries = countries.filter(country =>
        country.name.toLowerCase().includes(filterValue.toLowerCase())
    )

    return (
        <div>
            find countries <input value={filterValue}
                onChange={handleFilterValueChange} />
            <RenderCountries shownCountries={shownCountries} setFilterValue={setFilterValue} />
        </div>
    )
}

const RenderCountries = ({ shownCountries, setFilterValue }) => {
    if (shownCountries.length > 10) {
        return (
            <p>Too many matches, specify another filter</p>
        )
    } else if (shownCountries.length === 1) {
        return (
            <CountryInformation country={shownCountries[0]} />
        )
    } else {
        return (
            shownCountries.map(country =>
            <li key={country.numericCode}>
            {country.name} <button onClick={() => {setFilterValue(country.name)}}>show</button>
            </li>)
        )
    }
}

const CountryInformation = ({ country }) => {
    return (
        <div>
            <h1>{country.name}</h1>
            <p>capital {country.capital}</p>
            <p>population {country.population}</p>
            <h2>languages</h2>
            <ul>
                {country.languages.map(language => <li>{language.name}</li>)}
            </ul>
            <img src={country.flag} width="200" />
        </div>
    )
}

export default App