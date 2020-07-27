import product from '../../api/product'
import Product from '../../models/Product'

export const DELETE_PRODUCT = 'DELETE_PRODUCT'
export const CREATE_PRODUCT = 'CREATE_PRODUCT'
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT'
export const SET_PRODUCTS = 'SET_PRODUCTS'


export const fetchProducts = () => {
    return async (dispatch, getState )=> {
        const userId = getState().auth.userId
        try{
            const response = await product.get('/products.json')
            const resData = await response.data
            const loadedProducts = [];
            for(let key in resData){
                loadedProducts.push(
                    new Product (
                        key,
                        resData[key].ownerId,
                        resData[key].title,
                        resData[key].imageUrl,
                        resData[key].description,
                        resData[key].price
                    ) 
                )
            }
            dispatch({
                type: SET_PRODUCTS,
                products: loadedProducts,
                userProducts: loadedProducts.filter(loadedProduct => loadedProduct.ownerId === userId)
            })
        }
        catch (err){
            //send to custom analytics
            // throw err
        }       
    }
}


export const deleteProduct = productId => {
    return async (dispatch, getState )=> {
        const token = getState().auth.token
      await product.delete(`/products/${productId}.json?auth=${token}`)
        dispatch ({
            type: DELETE_PRODUCT,
            pid: productId
        })
    }
    
}

export const createProduct = (title, description, imageUrl, price) => {

    return async (dispatch, getState )=> {
        const token = getState().auth.token
        const userId = getState().auth.userId
        const productData = {
            title,
            description,
            imageUrl,
            price,
            ownerId: userId
        }
        
       const response = await product.post(`/products.json?auth=${token}`, productData)
        const resData = await response.data

        dispatch ({
            type: CREATE_PRODUCT,
            productData: {
                id: resData.name,
                title: title,
                description: description,
                imageUrl: imageUrl,
                price: price,
                ownerId: userId
            }})
}}


export const updateProduct = (id, title, description, imageUrl) => {

return async dispatch => {
    const productData = {
        title,
        description,
        imageUrl,
        price
    }
    
  await product.patch(`/products/${id}.json`, productData)
    
    dispatch ({
        type: UPDATE_PRODUCT,
        pid: id,
        productData: {
            title: title,
            description: description,
            imageUrl: imageUrl,
        }
    })
}

  
}