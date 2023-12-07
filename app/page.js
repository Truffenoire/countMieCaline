"use client"

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
export default function Home() {

  const [countPietons, setCountPietons] = useState(0)
  const [countVoitures, setCountVoitures] = useState(0)

  useEffect(() => {
    if (localStorage.getItem('pietons') === 0 || null) {
      localStorage.setItem('pietons', JSON.stringify(0))
    }
    if (localStorage.getItem('voitures') === 0 || null) {
      localStorage.setItem('voitures', JSON.stringify(0))
    }
    const pietonInStorage = JSON.parse(localStorage.getItem('pietons'))
    const voitureInStorage = JSON.parse(localStorage.getItem('voitures'))
    setCountPietons(pietonInStorage)
    setCountVoitures(voitureInStorage)

  }, [])

  const handlePietons = (e) => {
    e.preventDefault();
    setCountPietons(countPietons + 1)
    localStorage.setItem('pietons', JSON.stringify(countPietons + 1))
  }
  const handleVoitures = (e) => {
    e.preventDefault();
    setCountVoitures(countVoitures + 1)
    localStorage.setItem('voitures', JSON.stringify(countVoitures + 1))
  }
  const handleReset = (e) => {
    e.preventDefault();
    localStorage.setItem('pietons', JSON.stringify(0))
    localStorage.setItem('voitures', JSON.stringify(0))
    setCountVoitures(0)
    setCountPietons(0)
  }


  return (
    <main className='flex h-screen justify-center max-h-[90vh]'>
      <div className='flex w-[80%] max-h-[80vh] flex-col justify-between max-w-screen-sm'>
        <div className='flex justify-between'>
          <input type="text" placeholder="votre ville" className="input input-bordered input-info w-1/2 max-w-xs" />
          <Link href="/history" className='btn btn-outline btn-ghost w-1/3 self-end'>Historique</Link>
        </div>
        <div className='flex justify-around'>
          <button className='h-20 w-1/2 text-center stat-value leading-7'>{countPietons}</button>
          <button className='h-20 w-1/2 text-center stat-value leading-7'>{countVoitures}</button>
        </div>
        <div className='flex justify-center'>
          <button onClick={handlePietons} className="w-[45%] m-1 h-48 btn btn-info btn-outline">Piéton</button>
          <button onClick={handleVoitures} className="w-[45%] m-1 h-48 btn btn-info">Véhicule</button>
        </div>
        <div className='flex justify-around'>
          <button onClick={handleReset} className='btn w-1/3 btn-outline btn-error'>Reset</button>
          <button onClick={handleReset} className='btn w-1/3 btn-outline btn-success'>Save</button>
        </div>
      </div>
    </main>
  )
}
