import { FormControl, Select, MenuItem, Button, Card, CardContent } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import InfoBox from './Components/InfoBox'
import Map from './Components/Map'
import './App.css'
import './Components/Precautions.css'
import Table from './Components/Table'
import { sortData, prettyPrintStat } from './Components/helper'
import LineGraph from './Components/LineGraph'
import "leaflet/dist/leaflet.css";



const App = ({Change}) => {
    const [countries, setCountries] = useState([])
    const [country, setCountry] = useState("worldwide")
    const [countryInfo, setCountryInfo] = useState({})
    const [yesterdayData, setYesterdayData] = useState({})
    const [tableData, setTableData] = useState([])
    const [mapCenter, setMapCenter] = useState({ lat: 20.5937, lng: 78.9629 })
    const [mapZoom, setMapZoom] = useState(3);
    const [mapCountries, setMapCountries] = useState([])
    const [casesType, setCasesType] = useState("cases")

    useEffect(() => {
        fetch("https://disease.sh/v3/covid-19/all")
            .then(res => res.json())
            .then(data => {
                setCountryInfo(data)
            })
        fetch("https://disease.sh/v3/covid-19/all?twoDaysAgo=true")
            .then(res => res.json())
            .then(data => {
                setYesterdayData(data)
            })
    }, [])

    useEffect(() => {
        const getCountriesData = async () => {
            fetch("https://disease.sh/v3/covid-19/countries")
                .then((response) => response.json())
                .then((data) => {
                    const countries = data.map((country) => ({
                        name: country.country,
                        value: country.countryInfo.iso2,
                    }));
                    const sortedData = sortData(data)
                    setTableData(sortedData);
                    setMapCountries(data)
                    setCountries(countries);
                });
        };
        getCountriesData();
    }, [])

    const onCountryChange = async (event) => {
        const countryCode = event.target.value;
        setCountry(countryCode);
        const url = countryCode === 'worldwide' ? "https://disease.sh/v3/covid-19/all" : `https://disease.sh/v3/covid-19/countries/${countryCode}`
        const url2 = countryCode === 'worldwide' ? "https://disease.sh/v3/covid-19/all?twoDaysAgo=true" : `https://disease.sh/v3/covid-19/countries/${countryCode}?twoDaysAgo=true&strict=true`
        await fetch(url)
            .then(response => response.json())
            .then(data => {
                setCountryInfo(data)
                // console.log(data)
                if (countryCode === "worldwide") {
                    setMapCenter({ lat: 20.5937, lng: 78.9629 })
                } else {
                    setMapCenter([data.countryInfo.lat, data.countryInfo.long])
                }

                setMapZoom(4)
            })
        await fetch(url2)
            .then(response => response.json())
            .then(yes => {
                setYesterdayData(yes)
            })
    }

    const todayActive = countryInfo.active - yesterdayData.active
    const todayRecovered = countryInfo.recovered - yesterdayData.recovered
    const todayDeaths = countryInfo.deaths - yesterdayData.deaths
    const todayConfirmed = countryInfo.cases - yesterdayData.cases

    return (
        <div className = '__app'>
            <div className="app">
                <div className="container1">
                    <div className='app__header' >
                        <div className="header__left__container">
                            <FormControl className="app__dropdown">
                                <Select
                                    variant="outlined"
                                    value={country}
                                    onChange={onCountryChange}
                                    className="dropdown__select"
                                >
                                    <MenuItem value="worldwide">Worldwide</MenuItem>
                                    {countries.map(country => (
                                        <MenuItem value={country.value}>{country.name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <Button className="header_precautions" onClick = {Change}>Precautions</Button>
                        </div>
                        <h1 className="heading">COVID-19 TRACKER</h1>
                    </div>
                    {/* {console.log("map")} */}
                    <div className="app__stats">
                        <InfoBox isRed activestats={casesType === "active"} onClick={(e) => setCasesType("active")} className="info__box" title={"Active Cases"} cases={prettyPrintStat(todayActive)} total={prettyPrintStat(countryInfo.active)} />
                        <InfoBox isGreen activestats={casesType === "recovered"} onClick={(e) => setCasesType("recovered")} className="info__box" title={"Reacovered"} cases={prettyPrintStat(todayRecovered)} total={prettyPrintStat(countryInfo.recovered)} />
                        <InfoBox isGrey activestats={casesType === "deaths"} onClick={(e) => setCasesType("deaths")} className="info__box" title={"Deaths"} cases={prettyPrintStat(todayDeaths)} total={prettyPrintStat(countryInfo.deaths)} />
                        <InfoBox isPink activestats={casesType === "cases"} onClick={(e) => setCasesType("cases")} className="info__box" title={"Confirmed cases"} cases={prettyPrintStat(todayConfirmed)} total={prettyPrintStat(countryInfo.cases)} />
                    </div>
                    <Map
                        center={mapCenter}
                        zoom={mapZoom}
                        countries={mapCountries}
                        casesType={casesType}
                    />
                </div>


                <Card className="container2">
                    <CardContent>
                        <h3>Live Cases by country</h3>
                        <Table countries={tableData} />
                        <h3 className="graph__title">Worldwide new {casesType}</h3>
                        <LineGraph className="app__graph" country={country} casesType={casesType} countryChange={onCountryChange} />
                    </CardContent>
                </Card>

            </div>
        </div>
    )
}

export default App
