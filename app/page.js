"use client"

import Image from 'next/image'
import Link from 'next/link'
import { doc, setDoc, getDoc, collection, addDoc } from "firebase/firestore"
import { useEffect, useState, useRef } from 'react'
import { db } from "../firebase/firebase"
import { Toaster, toast } from "sonner";

import { useThemeContext } from "@/context/context.jsx"


export default function Home() {

  const { user, setUser } = useThemeContext()
  const [countPietons, setCountPietons] = useState(0)
  const [countVoitures, setCountVoitures] = useState(0)
  const refInput = useRef()

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
    toast.success('Comptage effacé.')
  }
  const handleSave = async (e) => {
    e.preventDefault()
    if (user) {
      // const normalizeVille = (ville) => {
      //   return ville.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
      // };
      const inputVilleValue = refInput.current.value;
      // const normalizedVille = normalizeVille(inputVilleValue)
      if (inputVilleValue == '') {
        return toast.error('Vous devez renseigner la ville')
      } else {
        const currentTime = new Date();
        const options = { weekday: 'long', month: 'long', day: 'numeric' };
        const formattedHour = currentTime.toLocaleTimeString();
        const formattedTime = currentTime.toLocaleDateString('fr-FR', options);

        const data = {
          ville: inputVilleValue,
          date: formattedTime,
          heure: formattedHour,
          pietons: countPietons,
          voitures: countVoitures
        }
        const dataSend = await addDoc(collection(db, "news"), data)

        toast.success('Comptage validé !')
        // console.log(dataSend);
      }
    }
    else {
      toast('vous devez être log')
    }
  }



  return (
    <main className='flex h-screen justify-center max-h-[85vh]'>
      <Toaster position="bottom-center" />
      <div className='flex w-[80%] max-h-[80vh] flex-col justify-between max-w-screen-sm'>
        <div className='flex justify-between'>
          <input ref={refInput} type="text" placeholder="votre ville" className="input input-bordered input-info w-1/2 max-w-xs" />
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
          <button onClick={handleSave} className='btn w-1/3 btn-outline btn-success'>Save</button>
        </div>
      </div>
    </main>
  )
}
