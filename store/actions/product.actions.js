import product from '../../api/product'
import Product from '../../models/Product'

export const DELETE_PRODUCT = 'DELETE_PRODUCT'
export const CREATE_PRODUCT = 'CREATE_PRODUCT'
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT'
export const SET_PRODUCTS = 'SET_PRODUCTS'


export const fetchProducts = () => {
    return async dispatch => {
        try{
            const response = await product.get('/products.json')
            const resData = await response.data
            const loadedProducts = [];
            for(let key in resData){
                loadedProducts.push(
                    new Product (
                        key,
                        'u1',
                        resData[key].title,
                        resData[key].imageUrl,
                        resData[key].description,
                        resData[key].price
                    ) 
                )
                console.log(key);
            }
        console.log(loadedProducts);
            dispatch({
                type: 'SET_PRODUCTS',
                products: loadedProducts
            })
        }
        catch (err){
            //send to custom analytics
            throw err
        }       
    }
}


export const deleteProduct = productId => {
    return {
        type: DELETE_PRODUCT,
        pid: productId
    }
}

export const createProduct = (title, description, imageUrl, price) => {
    return async dispatch => {
        const productData = {
            title,
            description,
            imageUrl,
            price
        }
        
       const response = await product.post('/products.json', productData)
        const resData = await response.data
        console.log(resData);

        dispatch ({
            type: CREATE_PRODUCT,
            productData: {
                id: resData.name,
                title: title,
                description: description,
                imageUrl: imageUrl,
                price: price
            }})
}}


export const updateProduct = (id, title, description, imageUrl) => {
    return {
        type: UPDATE_PRODUCT,
        pid: id,
        productData: {
            title: title,
            description: description,
            imageUrl: imageUrl,
        }

    }
}