import React, { useContext, useEffect, useState } from 'react'
import ReactStars from 'react-stars'
import { reviewsRef, db } from './FireBase/FireBase';
import { addDoc, updateDoc, doc, query, where, getDocs } from 'firebase/firestore';
import { TailSpin, ThreeDots } from 'react-loader-spinner';
import swal from 'sweetalert';
import { appState } from '../App';
import { useNavigate } from 'react-router-dom';
const Reviews = ({ id, prevRating, userRated }) => {
    const [rating, setRating] = useState();
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState("");
    const [reviewsLoading, setReviewsLoading] = useState(false);
    const [data, setData] = useState([])
    const [addedReview, setAddedReview] = useState(0);
    const useAppstate = useContext(appState);
    const navigate = useNavigate();
    const sendReview = async () => {
        setLoading(true)
        try {
            if (useAppstate.login) {
                await addDoc(reviewsRef, {
                    moviesid: id,
                    name: "prince mourya",
                    rating: rating,
                    thought: form,
                    timestamp: new Date().getTime()
                })
                const ref = doc(db, "movies", id);
                await updateDoc(ref, {
                    rating: prevRating + rating,
                    rated: userRated + 1
                })
                setForm("");
                setRating()
                setAddedReview(addedReview + 1);
                swal({
                    title: "Review Sent",
                    icon: "success",
                    timer: 3000,
                    buttons: false
                })
            }
            else {
                navigate('/login');
                alert("Login Is Must be Required For Review")
            }
        } catch (error) {
            swal({
                title: error,
                icon: "error",
                timer: 3000,
                buttons: false
            })
        }
        setLoading(false)

    }
    useEffect(() => {
        const getData = async () => {
            setReviewsLoading(true);
            setData([]);
            let quer = query(reviewsRef, where('moviesid', '==', id))
            const querySnapshot = await getDocs(quer)
            querySnapshot.forEach((doc) => {
                setData((prev) => [...prev, doc.data()])
            })
            setReviewsLoading(false);
        }
        getData();
    }, [addedReview, id])
    return (
        <div className='mt-4 w-full font-normal text-white text-xl'>
            <div className='mt-3 py-2 border-t-2 border-gray-500'><ReactStars onChange={(rate) => setRating(rate)} size={30} half={true} color1="white" edit={true} value={rating} /></div>
            <input value={form} onChange={(e) => setForm(e.target.value)} className='bg-[#171717] w-full mt-3 p-2 outline-none' type="text" placeholder='Share your thoughts' />
            <button onClick={sendReview} className='bg-green-500 hover:bg-green-700 w-full p-2 mt-2 rounded-xl font-bold'>{loading ? <div className='flex justify-center items-center'><TailSpin height={28} color="white" /></div> : 'Share'}</button>
            {
                reviewsLoading ? <div className='flex justify-center mt-6'><ThreeDots height={15} color="white" /></div>
                    :
                    <div>
                        {
                            data.map((e, i) => {
                                return (

                                    <div className='bg-[#171717] w-full mt-6 p-3 border-b-2' key={i}>
                                        <div className='flex items-center'>
                                            <p className='text-xl text-blue-500'>{e.name}</p>
                                            <p className='ml-4 text-xs text-gray-400'>{new Date(e.timestamp).toLocaleString()}</p>
                                        </div>
                                        <div><ReactStars onChange={(rate) => setRating(rate.rating)} size={20} half={true} edit={false} value={e.rating} /></div>
                                        <p className='text-lg text-gray-200'>{e.thought}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
            }
        </div>
    )
}

export default Reviews