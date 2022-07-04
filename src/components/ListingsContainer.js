import React, { useState, useEffect } from "react";
import ListingCard from "./ListingCard";

function ListingsContainer( {search} ) {
  const [listings, setListings] = useState([])

  useEffect(() => {
    fetch("http://localhost:6001/listings")
    .then((res) => res.json())
    .then(listings => setListings(listings))
  }, [])

  function handleDeleteListing(id) {
      const updatedListings = listings.filter(listing => listing.id !== id);
      setListings(updatedListings)
  }

  const filteredListings = listings.filter(listing => {
    return listing.description.toLowerCase().includes(search.toLowerCase())
  })

  const listingCards = filteredListings.map((listingObj) => { 
    return <ListingCard listingObj={listingObj} key={listingObj.id} handleDeleteListing={handleDeleteListing}/>;
});

  return (
    <main>
      <ul className="cards">
        {listingCards}
      </ul>
    </main>
  );
}

export default ListingsContainer;
