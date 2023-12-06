"use client"

import Image from 'next/image'
import Link from 'next/link'
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
   <main className='flex h-screen justify-center'>
    <div className='flex w-[80%] h-[85vh] flex-col justify-between max-w-screen-sm'>
    <Link href="/history" className='btn btn-outline btn-ghost w-1/3 self-end'>Historique</Link>
    <div className='flex justify-around'>
      <button className='h-20 w-1/2 text-center stat-value leading-7'>{countPietons}</button>
      <button className='h-20 w-1/2 text-center stat-value leading-7'>{countVoitures}</button>
    </div>
    <div className='flex justify-center'>
      <button onClick={handlePietons} className="w-[45%] m-1 h-48 btn btn-info btn-outline">Piéton</button>
      <button onClick={handleVoitures} className="w-[45%] m-1 h-48 btn btn-info">Véhicule</button>
    </div>
    <button onClick={handleReset} className='btn w-1/3 btn-outline btn-error'>Reset</button>
    </div>
   </main>
  )
}
