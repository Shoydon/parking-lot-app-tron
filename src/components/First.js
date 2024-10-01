import React from 'react';
import Ar from '../assests/Ar.svg';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
// import { TonConnectButton } from '@tonconnect/ui-react';

function First({ loading }) {

    return (
        <div className="text-white flex flex-col md:flex-row justify-around items-center pt-15 min-h-screen bg-gray-900">
            <div className="mb-16 max-w-xl mx-3">
                <h1 className="font-semibold text-5xl mb-8">
                    Book your spot<br />
                    <span className="font-thin text-sky-400">ParkEase</span>
                </h1>
                <div className="text-xl font-thin">
                    <span className='text-sky-400 font-bold'>Welcome to Ignitus Networks</span> – your go-to solution for finding and reserving parking spots effortlessly. Whether you’re in a rush or planning ahead, we make parking simple and stress-free, so you can focus on what really matters.
                </div>
            </div>
            <div>
                <img src={Ar} alt="AR Illustration" className="h-[490px]" />
            </div>
        </div>
    );
};

export default First;