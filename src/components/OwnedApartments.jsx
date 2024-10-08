import React, { useEffect, useState } from 'react'
import contractData from '../contract.json'
import DisplayCard from './DisplayCard';

function OwnedApartments() {

  const [loading, setLoading] = useState(true)
  const [buildings, setBuildings] = useState([])

  window.onbeforeunload = function() {
    // Your custom function to run when the page is reloaded
    console.log("Page is being reloaded!");
    window.location.href = "/";
    // Add any other actions you want to perform here
  };
  useEffect(() => {
    document.title = "My bookings"
  }, []);

  const getMyApartments = async() => {
    const tron = window.tronLink;
    const tronweb = tron.tronWeb;
    let marketplace = await tronweb.contract(contractData.abi, contractData.address);
    console.log("loading my apartments");
    let myApartments = await marketplace.view_my_bookings().call()
    let displayItems = []
    for (let i = 0; i < myApartments.length; i++) {
      const apartment = myApartments[i]
      let theBuilding = await marketplace.parkingLots(apartment.parkingLotId).call()
      console.log(apartment);
      // let theBuilding = await marketplace.buildings(building.buildingId)
      // console.log("the building: ", theBuilding);
      // console.log(theBuilding.apartmentsCount - theBuilding.apartmentsOwned);
      // console.log("building: ", Number(building.apartmentsCount));
      // console.log("building: ", Number(building.apartmentOwners));
      const res = await fetch(theBuilding.ipfsHash)
      const metadata = await res.json()
      console.log(metadata);
      
      metadata.numberOfSpots = Number(apartment.numberOfSpots)
      console.log("metadata listed: ", metadata)
      displayItems.push(metadata)
    }
    setLoading(false)
    setBuildings(displayItems)
    console.log(buildings);
    
    // setBuildings(displayItems)
  }

  useEffect(() => {
    getMyApartments();
  },[])

  if (loading) return (
    <main style={{ padding: "1rem 0" }} className='min-h-screen'>
      <h2 className='text-white font-bold pt-24 text-2xl text-center mt-20'>Loading...</h2>
    </main>
  )

  return (
    <div className='flex flex-wrap gradient-bg-welcome gap-10 justify-center pt-24 pb-5 px-16 min-h-screen'>
      <div className="h-auto">
        {
          (buildings.length > 0 ?
            buildings.map((item) => (
              <DisplayCard item={item}/>
            ))
            : (
              <main style={{ padding: "1rem 0", marginTop:"20px" }}>
                <h2 className='text-white'>No spots booked</h2>
              </main>
            ))}
      </div>
    </div>
  )
}

export default OwnedApartments
