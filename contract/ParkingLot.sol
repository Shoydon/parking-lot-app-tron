// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract ParkingLotContract {
    struct ParkingLot {
        string ipfsHash;
        address owner;
        uint id;
        uint numberOfSpots;
        uint spotsLeft;
        bool booked;  
        uint pricePerLot;
    }
    struct Booking {
        string ipfsHash;
        uint parkingLotId;
        uint numberOfSpots;
    }

    mapping (address => Booking[]) public usersBookings;
    ParkingLot[] public parkingLots;
    uint public parkingLotsCount;

    constructor() {
        parkingLotsCount = 0;
    }

    function list_parking_lot(uint _numberOfSpots, uint _pricePerLot, string memory _ipfsHash) public {
        ParkingLot memory parkingLot = ParkingLot(_ipfsHash, msg.sender, parkingLotsCount, _numberOfSpots, _numberOfSpots, false, _pricePerLot);
        parkingLots.push(parkingLot);
        parkingLotsCount++;
    }


    function book_spot(uint _parkingLotId, uint _numberOfSpotsToBook) public payable {
        require(0 <= _parkingLotId && parkingLotsCount > _parkingLotId, "Parking Lot does not exist");
        require(_numberOfSpotsToBook > 0, "Invalid number of spots to book");
        require(parkingLots[_parkingLotId].spotsLeft >= _numberOfSpotsToBook, "Insuffient empty spots");
        require(msg.value >= parkingLots[_parkingLotId].pricePerLot * _numberOfSpotsToBook, "Insuffient fees provided");


        bool success = payable(parkingLots[_parkingLotId].owner).send(msg.value);
        require(success);
        ParkingLot memory parkingLot = parkingLots[_parkingLotId];
        usersBookings[msg.sender].push(Booking(parkingLot.ipfsHash, _parkingLotId, 2));
        parkingLots[_parkingLotId].spotsLeft -= _numberOfSpotsToBook;
        if (parkingLots[_parkingLotId].spotsLeft == 0) {
            parkingLots[_parkingLotId].booked = true;
        }
    }

    function view_my_bookings() public view returns (Booking[] memory){
        return usersBookings[msg.sender];
    }

    function view_all_parking_lots() public view returns (ParkingLot[] memory) {
        return parkingLots;
    }
    
    function view_count() public view returns (uint) {
        return parkingLotsCount;
    }
}