import React from 'react'

export default function Error({ error }) {
  let errorMsg = error;
  if (error && typeof error === 'object') {
    errorMsg = error.message || JSON.stringify(error);
  }
  return (
    <div className="alert alert-danger" role="alert">
      {errorMsg}
    </div>
  )
}