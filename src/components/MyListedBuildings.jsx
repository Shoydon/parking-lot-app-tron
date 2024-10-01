import React, { useEffect, useState } from 'react'
import contractData from '../contract.json'
import ListedCard from './ListedCard'


function MyBuildings() {

  // console.log(marketplace);
  const [loading, setLoading] = useState(true)
  const [buildings, setBuildings] = useState([])

  window.onbeforeunload = function() {
    // Your custom function to run when the page is reloaded
    console.log("Page is being reloaded!");
    window.location.href = "/";
    // Add any other actions you want to perform here
  };
  useEffect(() => {
    document.title = "My buildings"
  }, []);

  const getMyBuildings = async () => {
    console.log("loading my buildings");
    const tron = window.tronLink;
    const tronweb = tron.tronWeb;
    let marketplace = await tronweb.contract(contractData.abi, contractData.address);
    let myBuildings = await marketplace.myListedBuildings().call();
    // console.log(myBuildings[0]);
    // console.log(myBuildings[1]);
    // console.log(myBuildings[2]);
    let displayItems = []
    for (let i = 0; i < myBuildings.length; i++) {
      const building = myBuildings[i]
      let theBuilding = await marketplace.buildings(building.buildingId).call()
      // console.log("the building: ", theBuilding);
      // console.log(theBuilding.apartmentsCount - theBuilding.apartmentsOwned);
      // console.log("building: ", Number(building.apartmentsCount));
      // console.log("building: ", Number(building.apartmentOwners));
      const res = await fetch(building.ipfsHash)
      const metadata = await res.json()
      let apartmentsAvailable = Number(theBuilding.apartmentsCount) - Number(theBuilding.apartmentsOwned)
      metadata.apartmentsAvailable = apartmentsAvailable
      console.log("metadata listed: ", metadata)
      displayItems.push(metadata)
    }
    setLoading(false)
    setBuildings(displayItems)
    setBuildings(displayItems)
  }

  useEffect(() => {
    getMyBuildings();
  }, [])

  // useEffect(() => {
  //   console.log("type: ", typeof (buildings));
  //   console.log(buildings);
  // }, [buildings])


  if (loading) return (
    <main style={{ padding: "1rem 0" }} className='min-h-screen'>
      <h2 className='text-white font-bold pt-24 text-2xl text-center'>Loading...</h2>
    </main>
  )

  return (
    <div className='flex flex-wrap gradient-bg-welcome gap-10 justify-center pt-24 pb-5 px-16 min-h-screen'>
      <div className="h-auto">
      {
        (buildings.length > 0 ?
          buildings.map((item) => (
            <ListedCard item={item}/>
          ))
          : (
            <main style={{ padding: "1rem 0", marginTop: "20px" }}>
              <h2 className='text-white'>No listed Buildings</h2>
            </main>
          ))}
      </div>
    </div>
  )
}

export default MyBuildings
