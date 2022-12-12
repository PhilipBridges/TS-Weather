import { useState, useEffect, ChangeEvent } from 'react'
import { ForecastType, OptionType } from '../types'

const useForecast = () => {
  const [term, setTerm] = useState<string>('')
  const [options, setOptions] = useState<[]>([])
  const [city, setCity] = useState<OptionType | null>(null)
  const [forecast, setForecast] = useState<ForecastType | null>(null)

  const getSearchOptions = async (value: string) => {
    const res = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${value.trim()}&limit=5&appid=${
        process.env.REACT_APP_API_KEY
      }`
    )
    const data = await res.json()
    setOptions(data)
  }

  const getForecast = async (city: OptionType) => {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${city.lat}&lon=${city.lon}&units=imperial&lang=en&appid=${process.env.REACT_APP_API_KEY}`
    )

    const data = await res.json()
    const forecastData = {
      ...data.city,
      list: data.list.slice(0, 16),
    }
    setForecast(forecastData)
  }

  const onSubmit = () => {
    if (!city) return

    getForecast(city)
  }

  const onOptionSelect = async (option: OptionType) => {
    setCity(option)
  }

  useEffect(() => {
    if (city) {
      setTerm(city.name)
      setOptions([])
    }
  }, [city])

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    setTerm(value)
    if (value === '') return

    getSearchOptions(value)
  }

  return {
    term,
    options,
    forecast,
    onInputChange,
    onOptionSelect,
    onSubmit,
  }
}

export default useForecast
