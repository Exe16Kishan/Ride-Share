import React ,{useEffect, useState} from 'react'

function page() {
  const [location, setlocation] = useState({lat:0,long:0})
  useEffect (()=>{
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos)=>{
        setlocation({lat :pos.coords.latitude ,long : pos.coords.longitude})
      },null , {enableHighAccuracy:true,timeout:3000})
    }
  },[])

  const handleRide = ()=>{
    // send coords to api
  }
  return (
    <div>
      {/* dummy api check */}
      <button>Click to request ride</button>
    </div>
  )
}

export default page