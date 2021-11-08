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
  const [currency, setCurrency] = useState('USD')
  const { data, isLoading, error, refetch } = useQuery<Currencies>(
    'bc-data',
    getBCData
  )
  // console.log('refeching data')
  // console.log(data)

  const handleCurrencyChange = (e: any) => {
    setCurrency(e.currentTarget.value)
  }

  useEffect(() => {
    const interval = setInterval(refetch, INTERVAL_TIME)
    return () => clearInterval(interval)
  }, [refetch])

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>We have an error Captain...</div>

  return (
    <Wrapper>
      <>
        <h2>Bitcoin Prices</h2>
        <select value={currency} onChange={handleCurrencyChange}>
          {data &&
            Object.keys(data).map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
        </select>
        <div>
          <h2>
            {data && data[currency].symbol}&nbsp;
            {data && data[currency].last}
          </h2>
        </div>
      </>
    </Wrapper>
  )
}

export default App
