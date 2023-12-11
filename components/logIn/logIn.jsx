"use client"
import Image from 'next/image'
import { useThemeContext } from "@/context/context.jsx"

import { useState, useEffect } from 'react'
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth"
import { auth } from "@/firebase/firebase";

export default function logIn() {

    const {user, setUser} = useThemeContext();
    
    const [userName, setUserName] = useState('');

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogIn = async (e) => {
        e.preventDefault()
        const auth = getAuth();
        await signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                setUser(user)
                // console.log(user);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    }
    const handleLogOut = (e) => {
        e.preventDefault()
        signOut(auth).then(() => {
            // console.log(auth.currentUser);
            setUser(null)
        }).catch((error) => {
            console.log("something wrong");
        })
        console.log(auth.currentUser);
    }

    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if (user !== null) {
                console.log('utilisateur connecté');
                // console.log(user.email);
                setUser(user)
                setUserName(user.email.split('@')[0])
            } else {
                console.log('not connect');
            }
        })
    }, [handleLogIn])

    return (
        <header className='max-h-[10vh]'>
            {auth.currentUser ?
                <div className='flex items-center'>
                    <button className='btn ml-3 btn-ghost' onClick={handleLogOut}>
                        <Image
                            src="/LogOutIcon.svg"
                            width={50}
                            height={50}
                            alt="Icon log-out"
                        />
                    </button>
                    <div>
                        Bienvenue, <strong>{userName}</strong>
                    </div>
                </div>
                :
                <>
                    <button className="btn btn-ghost" onClick={() => document.getElementById('my_modal_1').showModal()}>
                        <Image
                            src="/LogInIcon.svg"
                            width={50}
                            height={50}
                            alt="Icon log-in"
                        />
                    </button>
                    <dialog id="my_modal_1" className="modal">
                        <div className="modal-box">
                            <h3 className="font-bold text-lg">Hello!</h3>
                            <p className="py-4">Identifiez-vous pour profiter de l'historique.</p>
                            <div className="modal-action">
                                <form onSubmit={handleLogIn} method="dialog">
                                    <input onChange={(e) => setEmail(e.target.value)} name="email" id="email" type="email" placeholder="email" className="input input-ghost w-full max-w-xs" />
                                    <input onChange={(e) => setPassword(e.target.value)} name="password" id="password" type="password" placeholder="password" className="input input-ghost w-full max-w-xs" />
                                    <button type="submit" className="btn ml-[5%] btn-ghost">Connect</button>
                                </form>
                            </div>
                        </div>
                    </dialog>
                </>
            }
        </header>
    )
}
