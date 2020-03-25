import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'

function Cart() {
  const [mycart, setMycart] = useState([])
  const [mycartDisplay, setMycartDisplay] = useState([])
  const [dataLoading, setDataLoading] = useState(false)

  async function getCartFromLocalStorage() {
    setDataLoading(true)
    const newCart = localStorage.getItem('cart') || []
    if (newCart.length !== 0) {
      setMycart(JSON.parse(newCart))
    } else {
      setMycart(newCart)
    }
  }

  useEffect(() => {
    getCartFromLocalStorage()
  }, [])


  useEffect(() => {

    setTimeout(() => {
      setDataLoading(false)
    }, 500)

    let newMycartDisplay = []

    for (let i = 0; i < mycart.length; i++) {
      const index = newMycartDisplay.findIndex(
        value => value.id === mycart[i].id
      )
      if (index !== -1) { //index -1 data not find
        newMycartDisplay[index].amount += mycart[i].amount
      } else {
        const newItem = { ...mycart[i] }
        newMycartDisplay = [...newMycartDisplay, newItem]
      }
    }
    console.log(newMycartDisplay);
    setMycartDisplay(newMycartDisplay)
  }, [mycart])

  const sum = items => {
    let total = 0
    for (let i = 0; i < items.length; i++) {
      total += items[i].amount * items[i].price
    }
    return total
  }

  const loading = (
    <>
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </>
  )

  const display = (
    <>
      <ul className="list-group">
        {mycartDisplay.map((value, index) => {
          return (
            <li className="list-group-item" key={value.id}>
              產品：{value.name}/數量：{value.amount}/單價：{value.price}/
              {'   '}
              小計：{value.amount * value.price}
            </li>
          )
        })}
      </ul>
      <h3>總價：{sum(mycartDisplay)}</h3>
    </>
  )

  return (
    <>
      <div className="container">{dataLoading ? loading : display}</div>
    </>
  )
}

export default withRouter(Cart)
