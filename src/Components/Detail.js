import React, { useEffect, useState } from 'react'
import ReactStars from 'react-stars'
import { useParams } from 'react-router-dom'
import { db } from './FireBase/FireBase'
import { doc, getDoc } from 'firebase/firestore'
import { TailSpin } from 'react-loader-spinner'
import Reviews from './Reviews'
const Detail = () => {
    const { id } = useParams();
    const [data, setData] = useState({
        title: "",
        image: "",
        year: "",
        description: "",
        rating: 0,
        rated: 0
    })
    const [loader, setLoader] = useState(false)
    useEffect(() => {
        async function getData() {
            setLoader(true)
            const _Doc = doc(db, "movies", id)
            const _Data = await getDoc(_Doc);
            setData(_Data.data());
            setLoader(false)
        }
        getData()
    }, [id])
    return (


        <div className='flex justify-center flex-col md:flex-row w-full mt-2 p-3 m-auto '>
            {
                loader ? <div className='flex justify-center items-center'><TailSpin color='green' size={25} /></div> :

                    <>

                        <img className='w-96 h-[450px] md:sticky top-24' src={data.image} alt="" />
                        <div className=' ml-3 text-3xl text-gray-400 font-bold '>
                            <h1 className='w-72'>{data.title}<span className='text-xl'>({data.year})</span></h1>
                            <div className=' w-80 flex justify-center items-center'><ReactStars size={25} half={true} edit={false} value={data.rating / data.rated} /></div>
                            <p className=' w-80  md:w-[250px]  lg:w-[420px] xl:w-[480px] text-lg font-normal mt-4 text-white '>{data.description} </p>
                            <Reviews id={id} prevRating={data.rating} userRated={data.rated} />
                        </div>
                    </>
            }
        </div>


    )
}

export default Detail