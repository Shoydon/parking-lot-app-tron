import { useEffect, useState } from 'react'
import { ethers } from "ethers"
import { Row, Form, Button } from 'react-bootstrap'
import axios from 'axios'
import { toast } from 'react-toastify'


const Create = ({ marketplace }) => {

  const [nftimage, setNFTImage] = useState();
  const [processing, setProcessing] = useState(false);
  const [forminfo, setFormInfo] = useState({
    title: "",
    address: "",
    spots: 0,
    price: 0
  });
  const tron = window.tronLink;
  const tronWeb = tron.tronWeb;

  useEffect(() => {
    document.title = "List Parking lot"
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormInfo((prevState) => ({ ...prevState, [name]: value }));
  };

  const changeHandler = (event, fileType) => {
    if (event.target.files && event.target.files[0]) {
      if (fileType === 'image') {
        setNFTImage(event.target.files[0]);
      }
    }
  };

  const handleEvent = async (e) => {
    e.preventDefault();
    if(forminfo.price <= 0) {
      toast.error('Price must be greater than 0', {
        position: "top-center"
      });
      return
    }
    if (forminfo.spots < 1){
      toast.error('Spots count must be greater than 0', {
        position: "top-center"
      });
      return
    }
    console.log(nftimage)
    console.log(forminfo);

    setProcessing(true);

    const formData = new FormData();
    const jsonformData = new FormData();
    formData.append('file', nftimage);

    const metadata = JSON.stringify({
      name: forminfo.title,
      address: forminfo.address
    });
    jsonformData.append('pinataMetadata', metadata);

    const options = JSON.stringify({
      cidVersion: 0,
    })
    jsonformData.append('pinataOptions', options);

    try {

      const resFile = await axios({
        method: "post",
        url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
        data: formData,
        headers: {
          pinata_api_key: `1a7cac69d0dac2bceaeb`,
          pinata_secret_api_key: `d70366959ea7a7fd5396abed2b11003168369c278987b9d6cb09d195d71cebc2`,
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(resFile.data);

      const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;

      const info = {
        name: forminfo.title,
        address: forminfo.address,
        image: ImgHash,
        spots: forminfo.spots,
        price: forminfo.price
      }

      async function pinJSONToPinata(info) {
        const url = 'https://api.pinata.cloud/pinning/pinJSONToIPFS';
        const headers = {
          'Content-Type': 'application/json',
          'pinata_api_key': `1a7cac69d0dac2bceaeb`,
          'pinata_secret_api_key': `d70366959ea7a7fd5396abed2b11003168369c278987b9d6cb09d195d71cebc2`
        };

        try {
          const res = await axios.post(url, info, { headers });
          const meta = `https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`
          console.log(meta);
          mintThenList(meta, info.price);
        } catch (error) {
          console.error(error);
        }
        
      }
      
      pinJSONToPinata(info)
      setProcessing(false)

    } catch (error) {
      console.log(error);
      setProcessing(false)
    }



  };

  const mintThenList = async (uri, price) => {
    try {
      toast.info("Confirm to list parking lot", { position: "top-center" });

      // Convert TRX to Sun (smallest TRX unit)

      console.log("price", price);
      console.log("price.tostring", price.toString());
      const listingPrice = tronWeb.toSun(price.toString());
      // Call the 'mint' function of the contract
      const tx1 = await marketplace.list_parking_lot(forminfo.spots, listingPrice, uri).send({
        shouldPollResponse: true,
      });

      // toast.info("Wait till transaction Confirms....", { position: "top-center" });

      // Wait for transaction confirmation
      // await tx1.wait();

      toast.success("Parking lot added to marketplace successfully", { position: "top-center" });
    } catch (error) {
      console.error(error);
      toast.error("Failed to list parking lot", { position: "top-center" });
    }
  };



  return (
    (
      <div className="min-h-screen flex justify-center items-center">
        <main className="container mx-auto px-4">
          <div className="content text-white shadow-lg rounded-lg border-2 p-4 px-5 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600" style={{marginTop: "120px"}}>
            <div className="space-y-8">
              <Row className="g-4">
                <Form.Group>
                  <Form.Label className="text-lg">Upload Image</Form.Label>
                  <Form.Control
                    type="file"
                    required
                    name="image"
                    accept="image/*" // Only accept image files
                    onChange={(event) => changeHandler(event, 'image')}
                  />
                </Form.Group>
                <Form.Control
                  onChange={handleChange}
                  name="title"
                  id="title"
                  // size="lg"
                  required
                  type="text"
                  placeholder="Name"
                  // className="text-lg"
                />
                <Form.Control
                  onChange={handleChange}
                  name="address"
                  id="address"
                  size="lg"
                  required
                  as="textarea"
                  placeholder="Address of Parking Lot"
                  className="text-lg"
                />
                <Form.Control
                  onChange={handleChange}
                  name="spots"
                  id="spots"
                  size="lg"
                  required
                  type="number"
                  placeholder="Number of spots"
                  className="text-lg"
                />
                <Form.Control
                  onChange={handleChange}
                  name="price"
                  id="price"
                  size="lg"
                  required
                  type="number"
                  placeholder="Price in TRX per spot"
                  className="text-lg"
                />
                <div className="flex justify-center">
                  <Button onClick={handleEvent} variant="primary" size="lg" disabled={processing}>
                    List Parking lot!
                  </Button>
                </div>
              </Row>
            </div>
          </div>
        </main>
      </div>

    )
  );
}

export default Create