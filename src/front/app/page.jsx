"use client"
import useSWR from 'swr'
export const fetcher = (...args) => fetch(...args).then(r => r.json())
async function Hello() {
  const { data, error, isLoading } = useSWR("http://host.docker.internal:8081/api/hello", fetcher)
  if (error) return <h1>Could not load</h1>
  if (isLoading) return <h1>Loading...</h1>
  return <p>
    Edit <code>src/App.js</code> and save to reload {data}.
  </p>
}

export default async function Home() {
  return (
    <div className="App">
      <header className="App-header">
        <img src="/favicon.ico" className="App-logo" alt="logo" />
        <Hello />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  )
}
