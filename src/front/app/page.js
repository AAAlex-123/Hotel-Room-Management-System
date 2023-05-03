import Image from 'next/image'

async function getHello(){
  const result =await fetch("http://localhost:3000/api/hello")
  return await result.text()
}

export default async function Home() {
  return (
    <div className="App">
      <header className="App-header">
        <img src="/favicon.ico" className="App-logo" alt="logo"/>
        <p>
          Edit <code>src/App.js</code> and save to reload {await getHello()}.
        </p>
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
