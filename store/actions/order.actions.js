export const ADD_ORDER = "ADD_ORDER";
export const SET_ORDER = 'SET_ORDER'
import product from '../../api/product'
import { Order } from '../../models/order';


export const fetchOrder = () => {
  return async dispatch => {
    const userId = getState().auth.userId
    try{
      const response = await product.get(`/orders/${userId}.json`)
      const resData = response.data
      const loadedOrders = [];
      for(let key in resData){
          loadedOrders.push(
              new Order (
                key, 
                resData[key].cartItems,
                resData[key].totalAmount,
                new Date(resData[key].date)
              )
          )
      }
      dispatch({
          type: 'SET_ORDER',
          orders: loadedOrders
      })
    }catch(err){
      throw err
    }}
}





export const addOrder = (cartItems, totalAmount) => {
  const date = new Date()
  return async (dispatch, getState )=> {
    const token = getState().auth.token
    const userId = getState().auth.userId
    const productData = {
       cartItems,
       totalAmount,
       date: new Date().toISOString()
    }
    
   const response = await product.post(`/orders/${userId}.json?auth=${token}`, productData)
    const resData = await response.data

    dispatch ({
      type: ADD_ORDER,
      orderData:{
          id: resData.name,
          items: cartItems,
          amount: totalAmount,
          date
        }})
}}