import {ADD_TO_CART, REMOVE_FROM_CART} from '../actions/cart.actions'
import {CartItem} from '../../models/cart-item';

const initialState = {
    items: {},
    totalAmount: 0 
}



export default (state = initialState, action) => {
    switch(action.type){
        case ADD_TO_CART:
            const addedProduct = action.product
             const productPrice = addedProduct.price;
                 const productTitle = addedProduct.title

            let updatedOrNewCartItem;

            if(state.items[addedProduct.id]){
                updatedOrNewCartItem = new CartItem(
                    state.items[addedProduct.id].quantity + 1,
                    productPrice,
                    productTitle,
                    state.items[addedProduct.id].sum + productPrice
                )

            }else{
               updatedOrNewCartItem = new CartItem(1, productPrice, productTitle, productPrice);
            }
                return {
                    ...state,
                   items: { ...state.items, [addedProduct.id]: updatedOrNewCartItem},
                   totalAmount: state.totalAmount + productPrice
                }  
                
            case REMOVE_FROM_CART:
                const selectedCartItem = state.items[action.pid];
                const currentQty = selectedCartItem.quantity ;
                let updatedCartItem

                if(currentQty > 1){
                  updatedCartItem = new CartItem(
                        selectedCartItem.quantity - 1,
                        selectedCartItem.productTitle,
                        selectedCartItem.productPrice,
                        selectedCartItem.sum - selectedCartItem.productPrice
                    )
                    updatedCartItem = {...state.items, [action.pid]: updatedCartItem}
                }else{
                    updatedCartItem = {...state.items}
                   delete updatedCartItem[action.pid]
                }

                return{
                    ...state,
                    items: updatedCartItem,
                    totalAmount: state.totalAmount - selectedCartItem.productPrice
                }
    }
    return state
}