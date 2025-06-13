import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from "react-redux";
import { addToCart as addToCartAction } from '../Actions/cartActions'

export default function Pizza({ pizza }) {
  const [quantity, setquantity] = useState(1)
  const [varient, setvarient] = useState('small')
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch()
  function handleAddToCart() {
    dispatch(addToCartAction(pizza, quantity, varient))
  }

  return (
    <>
      <div
        className='shadow p-3 mb-5 bg-white rounded d-flex flex-column align-items-center justify-content-between'
        style={{
          margin: '30px auto',
          width: 270,
          minHeight: 430,
          maxHeight: 470,
          boxSizing: 'border-box',
          transition: 'box-shadow 0.2s',
          position: 'relative'
        }}
      >
        <div
          onClick={handleShow}
          style={{
            cursor: "pointer",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <img
            src={pizza.image}
            alt={pizza.name}
            style={{
              height: '160px',
              width: '160px',
              objectFit: 'cover',
              borderRadius: 12,
              marginBottom: 10,
              boxShadow: "0 2px 8px rgba(0,0,0,0.07)"
            }}
          />
          <h4 style={{
            fontWeight: 700,
            fontSize: 20,
            marginBottom: 6,
            textAlign: "center"
          }}>{pizza.name}</h4>
        </div>
        <div style={{ width: "100%", marginBottom: 8 }}>
          <p style={{ margin: 0, fontWeight: 500, fontSize: 15 }}>Variants</p>
          <select className='form-control' value={varient} onChange={(e) => { setvarient(e.target.value) }}>
            {pizza.variants.map(vari => (
              <option key={vari} value={vari}>{vari}</option>
            ))}
          </select>
        </div>
        <div style={{ width: "100%", marginBottom: 8 }}>
          <p style={{ margin: 0, fontWeight: 500, fontSize: 15 }}>Quantity</p>
          <select className='form-control' value={quantity} onChange={(e) => { setquantity(Number(e.target.value)) }}>
            {[...Array(10).keys()].map((x, i) => (
              <option key={i + 1} value={i + 1}>{i + 1}</option>
            ))}
          </select>
        </div>
        <div className="d-flex justify-content-between align-items-center w-100 mt-2 mb-2">
          <span className="badge bg-success" style={{ fontSize: 13, padding: "6px 12px" }}>
            {pizza.category?.toUpperCase()}
          </span>
          <span style={{ fontWeight: 700, color: "#d50000", fontSize: 18 }}>
            {pizza.prices && pizza.prices[varient] ? pizza.prices[varient] * quantity : "N/A"} ₹
          </span>
        </div>
        <button
          className='btn'
          style={{
            background: "linear-gradient(90deg, #d50000 60%, #ff5252 100%)",
            color: "#fff",
            fontWeight: 700,
            fontSize: 16,
            borderRadius: 8,
            width: "100%",
            marginTop: 8,
            boxShadow: "0 2px 8px rgba(213,0,0,0.08)",
            border: "none",
            transition: "background 0.2s"
          }}
          onClick={handleAddToCart}
        >
          ADD TO CART
        </button>

        {/* Modal for pizza details */}
        <Modal
          show={show}
          centered
          aria-labelledby="contained-modal-title-vcenter"
          dialogClassName="custom-modal"
        >
          <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter">
              {pizza.name}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <img src={pizza.image} style={{ height: '350px', borderRadius: 12 }} alt={pizza.name} />
            </div>
            <p>
              <strong>{pizza.description}</strong>
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  )
}