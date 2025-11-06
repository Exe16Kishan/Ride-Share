"use client"

import React ,{useEffect, useState} from 'react'
import axios from "axios"
import {useQuery} from "@tanstack/react-query"
import { authClient } from '@/lib/auth-client'
import Loader from '@/components/loader'

function page() {

  const {data:session , isPending:sessionTimer}=authClient.useSession()
  const [location, setlocation] = useState({lat:0,long:0})
  const {data, isPending, error} = useQuery({
      queryKey : ["rider",location.lat],
      queryFn : async () => {
        const{data}= await axios.get(`http://localhost:3000/pos/${location.lat}/${location.long}`)
        console.log("data",location)
        return data
      },
      enabled : location.lat !== 0
      
  })
  useEffect (()=>{
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos)=>{
        setlocation({lat :pos.coords.latitude ,long : pos.coords.longitude})
      },null , {enableHighAccuracy:true,timeout:3000})
    }
    },[])

  if (sessionTimer || isPending) {
    return <Loader/>
  }

  return (
    <div>
      {/* dummy api check */}
      <h1>{session?.user.name}</h1>
      <h1>{location.lat}</h1>
      <h1>{location.long}</h1>
      <h1>{data.lat}</h1>
      <h1>{data.long}</h1>
    </div>
  )
}

export default page


