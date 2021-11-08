import { useState, useEffect } from 'react'
import { useQuery } from 'react-query'

//Styles
import { Wrapper } from './styles/App.styles'

type BitcoinData = {
  '15m': number
  buy: number
  last: number
  sell: number
  symbol: string
}

type Currencies = {
  [key: string]: BitcoinData
}

const getBCData = async (): Promise<Currencies> =>
  await (await fetch('https://blockchain.info/ticker')).json()

const INTERVAL_TIME = 30000 // 30 seconds

const App = () => {
  const { data, isLoading, error, refetch } = useQuery<Currencies>(
    'bc-data',
    getBCData
  )
  return <div className="App">Tosaigh</div>
}

export default App
