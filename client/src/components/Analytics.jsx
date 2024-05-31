import React, { useEffect } from 'react'

const Analytics = () => {
  const fetchAnalyticsData = async () => {
    try{
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}analytics`)
      const data = await response.json()
      console.log(data);
    }catch(error){
      console.log(error)
    }
  }

  useEffect(()=>{
    fetchAnalyticsData();
  },[])
  return (
    <div className='p-5'>Analytics</div>
  )
}

export default Analytics