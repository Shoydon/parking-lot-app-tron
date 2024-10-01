import React from 'react';
import { Link } from "react-router-dom";

function Nav({ account, checkTronLink,loading }) {

  return (
    <>
    <div class="fixed z-10 backdrop-blur-sm">
        <section class="relative mx-auto">

          <nav class="flex justify-between text-white w-screen px-24">
            <div class="px-5 xl:px-12 py-6 flex w-full items-center">
              <Link class="text-3xl font-bold font-heading no-underline text-white" to="/">
                Ignitus Networks
              </Link>

              <ul class="hidden md:flex px-4 mx-auto font-semibold font-heading space-x-12">
                <Link className='no-underline text-gray-200' as={Link} to="/">
                  <li>Home</li>   </Link>
                <Link className='no-underline text-gray-200' as={Link} to="/all-parking-lots">
                  <li>All Parking lots</li>   </Link>
                <Link className='no-underline text-gray-200' as={Link} to="/create">
                  <li>List Parking lot</li>   </Link>
                <Link className='no-underline text-gray-200' as={Link} to="/my-bookings">
                  <li>My bookings</li></Link>
              </ul>

              <div class="hidden xl:flex space-x-5 items-center">
                {loading ? (
                  <button type='button' class="inline-flex items-center justify-center border-[0.5px] p-2 w-22  h-9 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-hamburger" aria-expanded="false" onClick={checkTronLink}>Connect wallet</button>
                ):(
                  <button type='button' class="inline-flex items-center justify-center border-[0.5px] p-2 w-22  h-9 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-hamburger" aria-expanded="false" onClick={checkTronLink}>Connected</button>
                )}
              </div>
            </div>
          </nav>
        </section>
      </div>

    </>



  )
}

export default Nav
    //   <nav className="border-gray-200 bg-gray-700 dark:bg-gray-700 dark:border-gray-700 transition ease-in-out hover:bg-gray-950">
    //   <div className="container mx-auto px-4">
    //     <div className="flex items-center justify-between p-4">
    //       <div className="flex cursor-pointer items-center space-x-3 rtl:space-x-reverse">
    //         <Link to='/' className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white no-underline">Ignitus Networks</Link>
    //       </div>

    //       <div className="flex justify-around w-full max-w-md">
    //         <Link to="/home" className="no-underline text-gray-200 ">All buildings</Link>
    //         <Link to="/listed-buildings" className="no-underline text-gray-200 ">My Listed buildings</Link>
    //         <Link to="/owned" className="no-underline text-gray-200 ">My Owner apartments</Link>
    //         <Link to="/create" className="no-underline text-gray-200 ">Create</Link>
    //         {loading ? (<button onClick={checkTronLink} type="button" class="border-[0.5px] p-1 w-22  h-9 text-white bg-gradient-to-r from-purple-700 to-pink-800 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Connect Wallet</button>) : (<button onClick={checkTronLink} type="button" class="border-[0.5px] p-1 w-22  h-9 text-white bg-gradient-to-r from-purple-700 to-pink-800 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Connected</button>)}

    //         {/* <Link to="/my-listed-nfts" className="no-underline text-gray-200 text-lg font-semibold transition-colors duration-300 hover:text-white">My Listed Items</Link>
    //     <Link to="/my-purchases" className="no-underline text-gray-200 text-lg font-semibold transition-colors duration-300 hover:text-white">My Purchases</Link> */}
    //       </div>
    //     </div>
    //   </div>
    // </nav>