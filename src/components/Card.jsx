import React, { useState } from 'react'
import '../App.css';
import { toast } from 'react-toastify';
import contractData from '../contract.json'

function Card({ item, idx, account }) {

  const [apartmentCount, setApartmentCount] = useState(0); // Initial apartment count

  const handleApartmentChange = (event) => {
    const newCount = parseInt(event.target.value);  
    if (newCount >= 0 && newCount <= item.spotsLeft) { // Ensure positive value
      setApartmentCount(newCount);
    }
  };

  const buyMarketItem = async () => {
    if(apartmentCount < 1) {
      toast.error("Please enter a valid apartment count to buy", {
        position: "top-center"
      });
      return
    }
    toast.info(`Booking ${apartmentCount} spots`, {
      position: "top-center"
    })
    try {
      console.log(item);
      
      const tron = window.tronLink;
      const tronweb = tron.tronWeb;
      console.log(apartmentCount, "type: ", typeof(apartmentCount));
      console.log( item.pricePerLot, "type: ", typeof(item.apartmentPrice));
      
      // toast.info("Confirm transaction", { position: "top-center" });
      const amount = Number(item.pricePerLot * apartmentCount);
      console.log(amount);
      let marketplace = await tronweb.contract(contractData.abi, contractData.address);
      const tx = await marketplace.book_spot(item.parkingLotId, apartmentCount).send({
        callValue: amount,
        // shouldPollResponse: true,
      })
      console.log(tx);
      toast.success(`You have booked ${apartmentCount} spots!`, {
        position: 'top-center'
      })
      
    } catch (error) {
      console.log(error);
      toast.error("Some error occured while buying", {
        position: "top-center"
      })
    }
    // toast.info("Can buy")

  }

  return (
    <div key={idx} className="bg-gray-100 rounded-lg shadow-md dark:bg-gray-800">
      <img
        className="rounded-t-lg object-cover w-full h-56"
        src={item.image}
        alt="flower"
      />
      {console.log(item)}
      
      <div className="p-4">
        <h5 className="text-xl font-semibold text-blue-600 dark:text-blue-400">{item.name}</h5>
        <p className='text-sm text-gray-500'>{item.address}</p>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          <strong className='text-green-400'>{item.price} TRX </strong> per spot <br />
        </p>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          <span className='mt-3'>Spots available: <strong className='text-yellow-600'>{item.spotsLeft}</strong></span>
        </p>
        <div className="mt-3">
          <label htmlFor={`spots-${idx}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Spots to book
          </label>
          <input
            id={`spots-${idx}`}
            type="number"
            placeholder="Enter number of spots"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100 dark:focus:ring-blue-400 sm:text-sm"
            value={apartmentCount}
            onChange={handleApartmentChange}
          />
        </div>
        {console.log("acc: ", account, " owner: ", item.owner)}
        {account !== item.owner && <button className="mt-4 w-full px-4 py-2 text-sm font-medium leading-5 text-white transition-transform transform duration-300 bg-gradient-to-r from-blue-500 to-purple-600 border border-transparent rounded-lg shadow-lg hover:scale-105 hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-blue-300" onClick={buyMarketItem}>
          Book
          <svg
            className="rtl:rotate-180 w-4 h-4 inline-block ml-2 -mt-px"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 14 10"
            fill="none"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </button>}
      </div>
    </div>
  )
}

export default Card