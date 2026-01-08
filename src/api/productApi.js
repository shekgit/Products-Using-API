import axios from 'axios';

export const getProducts = async () => {
    const response = await axios.get('https://fakestoreapi.com/products')
    // console.log(response.data);
    return response.data;
}