"use client"
import Link from "next/link";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth"
import { collection, getDocs, getDoc, deleteDoc, doc } from 'firebase/firestore'
import { db, auth } from "@/firebase/firebase"
import { useState, useEffect, useContext } from "react";

import { useThemeContext } from "@/context/context.jsx"

export default function index() {

  const { user, setUser } = useThemeContext()
  const [ isDelete, setIsDelete ] = useState(false)
  const [data, setData] = useState([]);

  //recuperation des données sur la DB FIRESTORE
  useEffect(() => {
    console.log(user);
    const getDataList = async () => {
      try {
        const dataCollectionRef = collection(db, "news")
        const dataNews = await getDocs(dataCollectionRef)
        const newsList = dataNews.docs.map((doc) => ({
          ...doc.data(),
          //recuperation de l'objet en ajoutant l'entrée ID
          id: doc.id
        }));
        console.log(newsList);
        setData(newsList)
      } catch (err) {
        console.error(err)
      }
    }
    getDataList()
  }, [isDelete])

  const handleDelete = async (e) => {
    e.preventDefault;
    const idDelete = e.target.id
    const isConfirmed = window.confirm('Etes-vous sûr ?')
    if(isConfirmed){
      await deleteDoc(doc(db, "news", idDelete))
      // console.log('SUPPRIME');
    }else{
      return
    }
    setIsDelete(!isDelete)
  }

  return (
    <>
      {user ?
        <main className="flex flex-col stats shadow">
          {data.map((item) => {
            return (
              <div key={item.id} className="stat">
                <div className="stat-title">{item.ville}</div>
                <div className="flex justify-between">
                  <div className="stat-desc">{item.date}</div>
                  <div className="stat-desc">{item.heure}</div>
                </div>
                <div className="stat-value">Piétons :{item.pietons}</div>
                <div className="flex justify-between">
                  <div className="stat-value">Voitures :{item.voitures}</div>
                  <button id={item.id} onClick={handleDelete} className="btn btn-outline btn-error">X</button>
                </div>
              </div>
            )
          })}
        </main>
        :
        <main className="flex justify-center w-full items-center h-[80vh]">
          <div className="items-center h-40 card bg-base-100 shadow-xl">
            <h1 className="card-title">Vous devez être connecté</h1>
            <div className="card-body">Sans compte pas d'historique.</div>
          </div>
        </main>
      }
    </>
  )
}
