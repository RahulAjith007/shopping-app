import {PRODUCTS} from '../../data/dummy-data';

const initialState = {
    availableProducts: PRODUCTS,
    userProducts: PRODUCTS.filter(PRODUCT => PRODUCT.ownerId === 'u1')

}
export default (state=initialState, action) => {
    switch(action.type){

        default:
        return state;
    }
    
}