import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <div className='bg-black w-screen h-screen text-white text-xl'>
        HELLO WORLD
      </div>
    </div>
  )
}

export default App
