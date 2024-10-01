import { useState, useEffect } from 'react';
import { ethers } from "ethers";
import { toast } from 'react-toastify';
import Card from './Card';

const Home = ({ marketplace, account }) => {
  useEffect(() => {
    document.title = "All Parking lots";
  }, []);

  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);

  const loadMarketplaceItems = async () => {

    console.log("Inside  of Load MarketPlace Items");
    try {
      console.log(marketplace);

      const itemCounts = await marketplace.parkingLotsCount().call();
      const itemCount = itemCounts.toString();
      console.log("Itemcount App", itemCount);
      let displayItems = [];
      // console.log("Before for");
      const fetchedBuildings = await marketplace.view_all_parking_lots().call();
      // console.log(fetchedBuildings);
      for (let i = 0; i < itemCount; i++) {
        // const item = await marketplace.items(i).call();
        const item = fetchedBuildings[i]
        console.log("item: ", item);
        
        const owner = item.owner;
        const spotsLeft = Number(item.spotsLeft)
        const price = Number(item.pricePerLot)

        if (!item.booked) {
          // console.log();
          const uri = await item.ipfsHash
          const response = await fetch(uri)
          const metadata = await response.json()
          metadata.spotsBooked = item.numberOfSpots - spotsLeft;
          metadata.spotsLeft = spotsLeft;
          metadata.parkingLotId = i
          metadata.pricePerLot = price
          metadata.owner = owner
          console.log("metadata: ", metadata);
          displayItems.push(metadata)
        }
      }
      setItems(displayItems);
      setLoading(false);

    } catch (error) {
      console.log(error)
    }

  };

  useEffect(() => {
    try {
      loadMarketplaceItems();
    } catch (error) {
      console.log("Wallet connect ", error);
    }

  }, []);

  return (
    <div>
      {loading && (
        <main className="container mx-auto mt-8">
          <h2 className="text-center text-xl font-semibold text-gray-800 dark:text-white">Loading...</h2>
        </main>
      )}
      {!loading &&
        (
          <div className="flex justify-center min-h-screen">
            {items.length > 0 ? (
              <div className="container mx-auto mt-20" >
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-5">
                  {items.map((item, idx) => (
                    <Card item={item} idx={idx} account={account}/>
                  ))}
                </div>
              </div>
            ) : (
              <main className="container mx-auto mt-8">
                <h2 className="text-center text-xl font-semibold text-gray-800 dark:text-white mt-20">No listed Parking lots...</h2>
              </main>
            )}
          </div>
        )}
    </div>
  );
};

export default Home;
