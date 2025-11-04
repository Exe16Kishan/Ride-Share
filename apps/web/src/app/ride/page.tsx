"use client"

import React ,{useEffect, useState} from 'react'
import axios from "axios"

function page() {
  const [location, setlocation] = useState({lat:0,long:0})
  const [data, setdata] = useState({lat:0,long:0})
  useEffect (()=>{
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos)=>{
        setlocation({lat :pos.coords.latitude ,long : pos.coords.longitude})
      },null , {enableHighAccuracy:true,timeout:3000})
    }
  },[])

  const handleRide = async()=>{
    // send coords to api
    const {data} = await axios.post(`http://localhost:3000/pos/${location.lat}/${location.long}`)
    setdata({lat:data.lat,long:data.long})
  }
  return (
    <div>
      {/* dummy api check */}
      <button onClick={handleRide}>Click to request ride</button>
      <h1>{data.lat}</h1>
      <h1>{data.long}</h1>
    </div>
  )
}

export default page