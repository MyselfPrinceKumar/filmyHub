import React, { useEffect, useState } from 'react'
import ReactStars from 'react-stars'
import { ThreeDots } from 'react-loader-spinner'
import { moviesRef } from './FireBase/FireBase';
import { getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';
const Card = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getData = async () => {
            setLoading(true)
            const _Data = await getDocs(moviesRef);
            _Data.forEach((doc) => {
                setData((prev) => [...prev, { ...(doc.data()), id: doc.id }])
            })
            setLoading(false)
        }
        getData();

    }, []);

    return (
        <div className=' text-white flex flex-wrap justify-between mt-2 p-3 '>
            {loading ? <div className='w-[1300px ] m-auto mt-44'><ThreeDots /> </div> :
                data.map((e, i) => {
                    return (
                        <Link to={`/detail/${e.id}`}>
                            <div key={i} className=' card shadow-lg h-auto mt-6 cursor-pointer hover:-translate-y-4 p-2 space-y-2 transition duration-500 '>
                                <img className='h-60 w-36 m-auto md:h-72 md:w-52' src={e.image} alt="" />
                                <h1 className='text-gray-400 bg-red '>Name : <span className='text-white'>{e.title}</span></h1>
                                <h1 className='text-gray-400 bg-red flex items-center'>Rating : <span className='text-white'><ReactStars size={20} half={true} edit={false} value={e.rating / e.rated} /></span></h1>
                                <h1 className='text-gray-400 bg-red'>Year : <span className='text-white'>{e.year}</span></h1>
                            </div>
                        </Link>
                    )
                })
            }
        </div>
    )
}
export default Card
