import React, { useContext, useState } from 'react'
import { TailSpin } from 'react-loader-spinner'
import { addDoc } from 'firebase/firestore'
import { moviesRef } from './FireBase/FireBase';
import swal from 'sweetalert';
import { appState } from '../App';
import { useNavigate } from 'react-router-dom';
const AddMovie = () => {
    const useAppstate = useContext(appState);
    const navigate = useNavigate();
    const [form, setForm] = useState({
        title: "",
        year: "",
        description: "",
        image: "",
        rated: 0,
        rating: 0
    });

    const [loading, setLoading] = useState(false);
    const addMovie = async () => {
        setLoading(true);
        try {
            if (useAppstate.login) {
                await addDoc(moviesRef, form);
                swal({
                    title: "Successfully Added",
                    icon: "success",
                    timer: 3000,
                    buttons: false
                })

            }
            else {
                navigate('/login');
            }
        }
        catch (error) {
            await addDoc(moviesRef, form);
            swal({
                title: error,
                icon: "error",
                timer: 3000,
                buttons: false
            })
        }
        setForm({
            title: "",
            year: "",
            description: "",
            image: ""
        })
        setLoading(false);

    }
    return (
        <div>
            <section className="text-white body-font relative">
                <div className="container px-5 py-6 mx-auto">
                    <div className="flex flex-col text-center w-full mb-12">
                        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-white">Add Movie</h1>
                    </div>
                    <div className="lg:w-1/2 md:w-2/3 mx-auto">
                        <div className="flex flex-wrap -m-2">
                            <div className="p-2 w-1/2">
                                <div className="relative">
                                    <label htmlFor="name" className="leading-7 text-sm text-white">Title</label>
                                    <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} type="text" id="name" name="name" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-gray-50 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                </div>
                            </div>
                            <div className="p-2 w-1/2">
                                <div className="relative">
                                    <label htmlFor="email" className="leading-7 text-sm text-white">Year</label>
                                    <input value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} type="email" id="email" name="email" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-gray-50 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                </div>
                            </div>
                            <div className="p-2 w-full">
                                <div className="relative">
                                    <label htmlFor="message" className="leading-7 text-sm text-white">Image Link</label>
                                    <input value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} id="message" name="message" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-gray-50 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                </div>
                            </div>
                            <div className="p-2 w-full">
                                <div className="relative">
                                    <label htmlFor="message" className="leading-7 text-sm text-white">Description</label>
                                    <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} id="message" name="message" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-gray-50 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
                                </div>
                            </div>
                            <div className="p-2 w-full">
                                <button onClick={addMovie} className="flex mx-auto text-white bg-green-600 border-0 py-2 px-8 focus:outline-none hover:bg-green-700 rounded text-lg focus:bg-green-900">{loading ? <TailSpin height={25} color="white" /> : 'Submit'}</button>
                            </div>

                        </div>
                    </div>
                </div>
            </section >

        </div >
    )
}

export default AddMovie