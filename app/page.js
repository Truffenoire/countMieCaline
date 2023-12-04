"use client"

import Image from 'next/image'
import { useState } from 'react'

export default function Home() {
  const [countPietons, setCountPietons] = useState(0)
  const [countVoitures, setCountVoitures] = useState(0)

  const handlePietons = (e) => {
    e.preventDefault();
    setCountPietons(countPietons + 1)
  }
  const handleVoitures = (e) => {
    e.preventDefault();
    setCountVoitures(countVoitures + 1)
  }
  const handleReset = (e) => {
    e.preventDefault();
    setCountVoitures(0)
    setCountPietons(0)
  }


  return (
   <main className='flex h-screen flex-col justify-center'>
    <div className='flex justify-around'>
      <h1 className='h-28 w-1/2 text-center stat-value'>{countPietons}</h1>
      <h1 className='h-28 w-1/2 text-center stat-value'>{countVoitures}</h1>
    </div>
    <div>
      <button onClick={handlePietons} className="w-1/2 h-48 btn btn-success">Piéton</button>
      <button onClick={handleVoitures} className="w-1/2 h-48 btn btn-warning">Véhicule</button>
    </div>
    <button onClick={handleReset} className='absolute bottom-10 left-10 btn w-1/3 btn-outline btn-error'>Reset</button>
   </main>
  )
}
