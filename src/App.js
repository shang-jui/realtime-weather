// import logo from './logo.svg'
// import './App.css'
import React, { useEffect } from 'react'
import styled from '@emotion/styled'
import dayjs from 'dayjs'
import { ThemeProvider } from '@emotion/react'
import { ReactComponent as DayCloudyIcon } from './images/day-cloudy.svg'
import { ReactComponent as AirFlowIcon } from './images/airFlow.svg'
import { ReactComponent as RainIcon } from './images/rain.svg'
import { ReactComponent as RefreshIcon } from './images/refresh.svg'
import { ReactComponent as LoadingIcon } from './images/loading.svg'
import { useState } from 'react'

const Container = styled.div`
  background-color: ${({ theme }) => theme.backgroundColor};
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const WeatherCard = styled.div`
  position: relative;
  min-width: 360px;
  box-shadow: ${({ theme }) => theme.boxShadow};
  background-color: ${({ theme }) => theme.foregroundColor};
  box-sizing: border-box;
  padding: 30px 15px;
`

const Location = styled.div`
  font-size: 28px;
  color: ${({ theme }) => theme.titleColor};
  margin-bottom: 20px;
`

const Description = styled.div`
  font-size: 16px;
  color: ${({ theme }) => theme.textColor};
  margin-bottom: 30px;
`

const CurrentWeather = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`

const Temperature = styled.div`
  color: ${({ theme }) => theme.temperatureColor};
  font-size: 96px;
  font-weight: 300;
  display: flex;
`

const Celsius = styled.div`
  font-weight: normal;
  font-size: 42px;
`

const AirFlow = styled.div`
  display: flex;
  align-items: center;
  font-size: 16x;
  font-weight: 300;
  color: ${({ theme }) => theme.textColor};
  margin-bottom: 20px;

  svg {
    width: 25px;
    height: auto;
    margin-right: 30px;
  }
`

const Rain = styled.div`
  display: flex;
  align-items: center;
  font-size: 16x;
  font-weight: 300;
  color: ${({ theme }) => theme.textColor};

  svg {
    width: 25px;
    height: auto;
    margin-right: 30px;
  }
`

const DayCloudy = styled(DayCloudyIcon)`
  flex-basis: 30%;
`

const Refresh = styled.div`
  position: absolute;
  right: 15px;
  bottom: 15px;
  font-size: 12px;
  display: inline-flex;
  align-items: flex-end;
  color: ${({ theme }) => theme.textColor};

  svg {
    margin-left: 10px;
    width: 15px;
    height: 15px;
    cursor: pointer;
  }
`
const Loading = styled(LoadingIcon)`
  animation: rotate infinite 1.5s linear;
  @keyframes rotate {
    from {
      transform: rotate(360deg);
    }
    to {
      transform: rotate(0deg);
    }
  }
`
const theme = {
  light: {
    backgroundColor: '#ededed',
    foregroundColor: '#f9f9f9',
    boxShadow: '0 1px 3px 0 #999999',
    titleColor: '#212121',
    temperatureColor: '#757575',
    textColor: '#828282',
  },
  dark: {
    backgroundColor: '#1F2022',
    foregroundColor: '#121416',
    boxShadow: '0 1px 4px 0 rgba(12, 12, 13, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.15)',
    titleColor: '#f9f9fa',
    temperatureColor: '#dddddd',
    textColor: '#cccccc',
  },
}

// const Key = 'CWB-1C959BCE-83F6-42BE-8F90-6B859107A29F'
// const Location_name = '臺北'
// const Location_name_forcast = '臺北市'
// const handleClick = () => {
//   return fetch(
//     `https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0003-001?Authorization=${Key}&locationName=${Location_name}`
//   )
//     .then((response) => response.json())
//     .then((data) => {
//       const locationData = data.records.location[0]

//       const weatherElements = locationData.weatherElement.reduce((neededElements, item) => {
//         if (['WDSD', 'TEMP'].includes(item.elementName)) {
//           neededElements[item.elementName] = item.elementValue
//         }
//         return neededElements
//       }, {})

//       return {
//         observationTime: locationData.time.obsTime,
//         locationName: locationData.locationName,
//         temperature: weatherElements.TEMP,
//         windSpeed: weatherElements.WDSD,
//       }
//     })
// }
// const fetchWeatherForecast = () => {
//   return fetch(
//     `https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=${Key}&locationName=${Location_name_forcast}`
//   )
//     .then((response) => response.json())
//     .then((data) => {
//       const locationData = data.records.location[0]
//       const weatherElements = locationData.weatherElement.reduce((neededElements, item) => {
//         if (['Wx', 'PoP', 'CI'].includes(item.elementName)) {
//           neededElements[item.elementName] = item.time[0].parameter
//         }
//         return neededElements
//       }, {})

//       return {
//         description: weatherElements.Wx.parameterName,
//         weatherCode: weatherElements.Wx.parameterValue,
//         rainPossibility: weatherElements.PoP.parameterName,
//         comfortability: weatherElements.CI.parameterName,
//       }
//     })
// }
function App() {
  const [currentTheme, setCurrentTheme] = useState('light')
  const [currentWeather, setCurrentWeather] = useState({
    locationName: '臺北市',
    windSpeed: 1.1,
    temperature: 22.9,
    rainPossibility: 48.3,
    time: '2020-12-12 22:10:00',
    comfortability: '舒適至悶熱',
    weatherCode: '0',
    isLoading: true,
  })
  const Key = 'CWB-1C959BCE-83F6-42BE-8F90-6B859107A29F'
  const Location_name = '臺北'
  const Location_name_forcast = '臺北市'
  const handleClick = () => {
    return fetch(
      `https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0003-001?Authorization=${Key}&locationName=${Location_name}`
    )
      .then((response) => response.json())
      .then((data) => {
        const locationData = data.records.location[0]

        const weatherElements = locationData.weatherElement.reduce((neededElements, item) => {
          if (['WDSD', 'TEMP'].includes(item.elementName)) {
            neededElements[item.elementName] = item.elementValue
          }
          return neededElements
        }, {})

        return {
          observationTime: locationData.time.obsTime,
          locationName: locationData.locationName,
          temperature: weatherElements.TEMP,
          windSpeed: weatherElements.WDSD,
        }
      })
  }
  const fetchWeatherForecast = () => {
    return fetch(
      `https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=${Key}&locationName=${Location_name_forcast}`
    )
      .then((response) => response.json())
      .then((data) => {
        const locationData = data.records.location[0]
        const weatherElements = locationData.weatherElement.reduce((neededElements, item) => {
          if (['Wx', 'PoP', 'CI'].includes(item.elementName)) {
            neededElements[item.elementName] = item.time[0].parameter
          }
          return neededElements
        }, {})

        return {
          description: weatherElements.Wx.parameterName,
          weatherCode: weatherElements.Wx.parameterValue,
          rainPossibility: weatherElements.PoP.parameterName,
          comfortability: weatherElements.CI.parameterName,
        }
      })
  }
  const fetchData = async () => {
    setCurrentWeather((prevState) => ({
      ...prevState,
      isLoading: true,
    }))

    const [currentWeather, weatherForecast] = await Promise.all([handleClick(), fetchWeatherForecast()])

    setCurrentWeather({
      ...currentWeather,
      ...weatherForecast,
      isLoading: false,
    })
  }
  useEffect(() => {
    fetchData()
  }, [])

  return (
    <ThemeProvider theme={theme[currentTheme]}>
      <Container>
        <WeatherCard>
          <Location theme="light">{currentWeather.locationName}</Location>
          <Description>{currentWeather.description}</Description>
          <CurrentWeather>
            <Temperature>
              {Math.round(currentWeather.temperature)}
              <Celsius>C</Celsius>
            </Temperature>
            <DayCloudy />
          </CurrentWeather>
          <AirFlow>
            <AirFlowIcon />
            {currentWeather.windSpeed}m/h
          </AirFlow>
          <Rain>
            <RainIcon />
            {currentWeather.rainPossibility}%
          </Rain>
          <Refresh
            onClick={() => {
              fetchData()
            }}
            isLoading={currentWeather.isLoading}
          >
            最後觀測時間:{' '}
            {new Intl.DateTimeFormat('zh-Tw', {
              hour: 'numeric',
              minute: 'numeric',
            }).format(dayjs(currentWeather.time))}
            {currentWeather.isLoading ? <Loading /> : <RefreshIcon />}
          </Refresh>
        </WeatherCard>
      </Container>
    </ThemeProvider>
  )
}

export default App
