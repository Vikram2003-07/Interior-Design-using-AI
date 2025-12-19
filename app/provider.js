"use client"
import { useUser } from '@clerk/nextjs'
import React, { useEffect,useState, createContext } from 'react'
import axios from 'axios'

export const UserDetailContext=createContext(null);

function Provider ({children}){

  const {user}=useUser();
  const [userDetail,setUserDetail]=useState([]);

  useEffect(()=>{
    user&&VerifyUser()
  },[user])
  /**
   * VerifyUser - Verifies if the user is signed in
   */
    const VerifyUser=async()=>{
      const dataResult=await axios.post('/api/verify-user',{user:user});
      setUserDetail(dataResult.data.result);
      //console.log(dataResult.data);
    }

  return (
    <UserDetailContext.Provider value={{userDetail,setUserDetail}}>
    <div>
      {children}
    </div>
    </UserDetailContext.Provider>
  )
}

export default Provider
