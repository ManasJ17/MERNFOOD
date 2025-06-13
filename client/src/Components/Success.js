import React from 'react'

export default function Success({ message }) {
  return (
    <div className="alert alert-success" role="alert">
      {message || "Success!"}
    </div>
  )
}