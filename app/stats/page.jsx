"use client"
import Link from "next/link"
import { useThemeContext } from "@/context/context.jsx"
import { useState, useEffect } from "react";


function index() {

    const { data, setData } = useThemeContext([]);
    const [moyenne, setMoyenne] = useState([])
    useEffect(() => {
        const normalizeCityName = (city) => {
            // Supprimer les accents
            const normalizedString = city.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

            // Remplacer les espaces par des tirets
            const withoutSpaces = normalizedString.replace(/\s+/g, "-");

            // Mettre en minuscules
            const lowercase = withoutSpaces.toLowerCase();

            return lowercase;
        };
        const calculateAverageByCity = (data) => {
            const cityData = data.reduce((accumulator, current) => {
                const { ville, voitures, pietons } = current;

                const normalizedCity = normalizeCityName(ville)
                console.log(normalizedCity);
                // Créer un tableau pour la ville si elle n'existe pas encore pour eviter un undefined
                accumulator[normalizedCity] = accumulator[normalizedCity] || { totalVoitures: 0, totalPietons: 0, count: 0 };

                // Ajouter les chiffres à la somme totale
                accumulator[normalizedCity].totalVoitures += voitures;
                accumulator[normalizedCity].totalPietons += pietons;

                // Incrémenter le compteur
                accumulator[normalizedCity].count += 1;

                //accumalator = nombre de fois ou on trouve la ville
                return accumulator;
            }, {});

            // Calculer la moyenne pour chaque ville
            const averages = Object.keys(cityData).map((ville, index) => {
                const { totalVoitures, totalPietons, count } = cityData[ville];
                return { index, ville, averageVoitures: totalVoitures / count, averagePietons: totalPietons / count, count };
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
                    <div key={item.index} className="stat">
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
