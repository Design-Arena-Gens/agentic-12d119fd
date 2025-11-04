'use client'

import { useEffect, useState } from 'react'

interface CountryData {
  country: string
  flag: string
  population: number
  gdp: number
  growth: number
}

export default function Home() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const stats = [
    { label: 'Total Population', value: '447.7M', change: '+0.1%', positive: true },
    { label: 'GDP (Trillion €)', value: '€14.5T', change: '+2.4%', positive: true },
    { label: 'Unemployment Rate', value: '6.1%', change: '-0.3%', positive: true },
    { label: 'Inflation Rate', value: '2.4%', change: '+0.2%', positive: false },
  ]

  const countries: CountryData[] = [
    { country: 'Germany', flag: '🇩🇪', population: 83.2, gdp: 3.85, growth: 1.4 },
    { country: 'France', flag: '🇫🇷', population: 67.8, gdp: 2.78, growth: 2.1 },
    { country: 'Italy', flag: '🇮🇹', population: 59.0, gdp: 2.01, growth: 0.9 },
    { country: 'Spain', flag: '🇪🇸', population: 47.6, gdp: 1.43, growth: 2.5 },
    { country: 'Netherlands', flag: '🇳🇱', population: 17.6, gdp: 0.99, growth: 1.7 },
    { country: 'Poland', flag: '🇵🇱', population: 38.0, gdp: 0.69, growth: 3.8 },
    { country: 'Sweden', flag: '🇸🇪', population: 10.5, gdp: 0.59, growth: 0.8 },
    { country: 'Belgium', flag: '🇧🇪', population: 11.6, gdp: 0.53, growth: 1.5 },
  ]

  const maxGdp = Math.max(...countries.map(c => c.gdp))

  return (
    <div className="container">
      <div className="header">
        <h1>European Union Dashboard</h1>
        <p>Key economic indicators and member state data</p>
      </div>

      <div className="grid">
        {stats.map((stat, i) => (
          <div key={i} className="card">
            <div className="card-label">{stat.label}</div>
            <div className="card-value">{stat.value}</div>
            <div className={`card-change ${stat.positive ? 'positive' : 'negative'}`}>
              {stat.change} vs last year
            </div>
          </div>
        ))}
      </div>

      <div className="table-container">
        <div className="table-header">
          <h2>Member States by GDP</h2>
        </div>
        <table>
          <thead>
            <tr>
              <th>Country</th>
              <th>Population (M)</th>
              <th>GDP (Trillion €)</th>
              <th>Growth Rate</th>
            </tr>
          </thead>
          <tbody>
            {countries.map((country, i) => (
              <tr key={i}>
                <td>
                  <span className="flag">{country.flag}</span>
                  {country.country}
                </td>
                <td>{country.population.toFixed(1)}M</td>
                <td>
                  <div className="bar-container">
                    <div className="bar">
                      <div
                        className="bar-fill"
                        style={{
                          width: mounted ? `${(country.gdp / maxGdp) * 100}%` : '0%'
                        }}
                      />
                    </div>
                    <div className="bar-value">€{country.gdp.toFixed(2)}T</div>
                  </div>
                </td>
                <td>
                  <span className={country.growth > 2 ? 'card-change positive' : 'card-change'}>
                    +{country.growth}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
