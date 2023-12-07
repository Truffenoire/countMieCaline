"use client"
import Link from "next/link";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth"
import { collection, getDocs, getDoc } from 'firebase/firestore'
import { db, auth } from "@/firebase/firebase"
import { useState, useEffect } from "react";

export default function index() {

  const [data, setData] = useState([]);

  //recuperation des données sur la DB FIRESTORE
  useEffect(() => {
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
  }, [])
  //item.id / .url / .article

  return (
    <main className="flex flex-col stats shadow">
      {data.map((item) => {
        return (
          <div key={item.id} className="stat btn-outline btn-info">
            <div className="stat-title">{item.ville}</div>
            <div className="stat-desc">Piétons :{item.piétons}</div>
            <div className="stat-desc">Voitures :{item.voitures}</div>
          </div>
        )
      })}
    </main>
  )
}
