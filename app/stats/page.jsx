"use client"
import Link from "next/link"
import { useThemeContext } from "@/context/context.jsx"
import { useState, useEffect } from "react";


function index() {

    const { data, setData } = useThemeContext([]);
    const [moyenne, setMoyenne] = useState([])

    useEffect(() => {

        const calculateAverageByCity = (data) => {
            const cityData = data.reduce((accumulator, current) => {
                const { ville, voitures, pietons } = current;

                // Créer un tableau pour la ville si elle n'existe pas encore pour eviter un undefined
                accumulator[ville] = accumulator[ville] || { totalVoitures: 0, totalPietons: 0, count: 0 };

                // Ajouter les chiffres à la somme totale
                accumulator[ville].totalVoitures += voitures;
                accumulator[ville].totalPietons += pietons;

                // Incrémenter le compteur
                accumulator[ville].count += 1;

                //accumalator = nombre de fois ou on trouve la ville
                return accumulator;
            }, {});

            // Calculer la moyenne pour chaque ville
            const averages = Object.keys(cityData).map((ville) => {
                const { totalVoitures, totalPietons, count } = cityData[ville];
                return { ville, averageVoitures: totalVoitures / count, averagePietons: totalPietons / count, count };
            });
            return averages;
        };

        const averages = calculateAverageByCity(data);
        setMoyenne(averages)

    }, [])


    return (
        <div >
            {moyenne.map((item) => {
                return (
                    <div key={item.id} className="stat">
                        <div className="stat-title">{item.ville}</div>
                        <div className="stat-desc">Piétons moyenne: {item.averagePietons}</div>
                        <div className="stat-desc">Voitures moyenne: {item.averageVoitures}</div>
                        <div className="stat-desc">nombre de comptage: {item.count}</div>
                    </div>
                )
            })}
        </div>
    )
}

export default index
