import React, { useState, useEffect } from 'react'
import WorldMap, { CountryContext } from 'react-svg-worldmap';


const ReactQuizContainer = () => {

    // state
    const [countries, setCountries] = useState([])
    const [selectedCountry, setSelectedCountry] = useState([])
    const fetchAllCountries = () => {
        fetch('https://restcountries.com/v2/all')
            .then(response => response.json())
            .then(data => setCountries(data))
    }
    useEffect(() => {
        fetchAllCountries()
    }, [])

    const countryItems = countries.map((country) => {
        const ios = country.alpha2Code
        const area = country.area
        return { country: ios, value: "" }
    })

    const [capitals, setCapitals] = useState([

        { capital: 'the Beaver', iso: 'CA' },
        { capital: 'the Snow Monkey', iso: 'JP' },
        { capital: 'the Gallic Rooster', iso: 'FR' },
        { capital: 'the Golden Eagle', iso: 'MX' },
        { capital: 'the Gray Wolf', iso: 'TR' },
        { capital: 'the Kiwi', iso: 'NZ' },
        { capital: 'the Brown Bear', iso: 'RU' },
        { capital: 'the Bald Eagle', iso: 'US' },
    ])
    const [selectedCapital, setSelectedCapital] = useState({ capital: 'the Kangaroo', iso: 'AU' })
    const [correctCountries, setCorrectCountries] = useState([])
    const [inCorrectCountries, setInCorrectCountries] = useState([])
    const [answer, setAnswer] = useState("")
    const [question, setQuestion] = useState(`Click the Country where the National Animal is ${selectedCapital.capital}...`)

    const setNewQuestion = () => {
        let question = `Click the Country where the National Animal is ${selectedCapital.capital}...`
        setQuestion(question)
    }
    const onClick = () => {
        // if ( count === 8 ) {
        //     console.log("Results")
        //     }
        // else
        setNewQuestion()
        setAnswer("")
    }
    const newQuestion = () => {
        let capital = capitals[Math.floor(Math.random() * capitals.length)];
        setSelectedCapital(capital)
    }

    // styling
    const stylingFunction = ({
        countryValue,
        countryCode,
        minValue,
        maxValue,
        color,
    }: CountryContext) => {
        const opacityLevel = countryValue
            ? 0.1 + (1.5 * (countryValue - minValue)) / (maxValue - minValue)
            : 0;
        return {
            fill: countryCode === countryCode ? '#3d5c3e' : color,
            //   fillOpacity: opacityLevel,
            stroke: 'white',
            strokeWidth: 2,
            strokeOpacity: 0.2,
            cursor: 'pointer',
        };
    };


    //  clicking on country to answer
    const clickAction = (country) => {
        console.log(country.countryCode)
        console.log(selectedCapital.iso)
        if (country.countryCode === selectedCapital.iso) {

            for (var i = 0; i < capitals.length; i++) {
                if (capitals[i] === selectedCapital) {
                    capitals.splice(i, 1);
                }
            }
            setCorrectCountries(country)
            newQuestion()
            // console.log("Correct")
            setAnswer(`Woohoo! ${country.countryName} is Correct`)
        } else {
            // console.log("Try Again")
            setAnswer(`Nope. Sorry not ${country.countryName}!`)
            setInCorrectCountries(country)
        }
    }

    // rendered on page
    return (
        <div className="App">
        <h1>National Animals Quiz</h1>
        <img className="main_logo" height="250" src={`${process.env.PUBLIC_URL}/animals.png`}  />

            <WorldMap
                className="Map"
                color="green"
                data={countryItems}
                onClickFunction={clickAction}
                size='responsive'
                richInteraction
                styleFunction={stylingFunction}
            />
            <h2>{question} <button onClick={onClick}>&rarr;</button></h2>
            <h2>{answer}</h2>
        </div>
    )
}

export default ReactQuizContainer;