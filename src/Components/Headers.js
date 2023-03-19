import React from 'react'
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { appState } from '../App';
import { useContext } from 'react';


const Headers = () => {

    const useappState = useContext(appState);
    return (

        <div className='sticky md:sticky top-0 md:top1 font-bold text-3xl flex cursor-pointer justify-between items-center bg-black text-white border-b-2 border-gray-500 p-3'>
            <Link to={'/'}><h1 className='ml-4'>Movie <span className='text-red-500'> Verse </span></h1></Link>
            {
                useappState.login ?
                    <Link to={"/addMovie"}> <Button><span className='text-lg mr-4 text-white'><AddIcon color='success' />Add New</span></Button></Link>
                    :
                    <Link to={"/login"}> <button className="bg-green-700 hover:bg-green-800 text-white font-bold mr-4 w-20 h-9 text-xl rounded-lg">
                        Login
                    </button></Link >

            }
        </div >
    )
}

export default Headers