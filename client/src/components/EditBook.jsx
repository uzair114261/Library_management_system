import React from 'react'
import { useParams } from 'react-router-dom'

const EditBook = () => {
    const { id} = useParams()
    console.log(id)
  return (
    <div>EditBook</div>
  )
}

export default EditBook