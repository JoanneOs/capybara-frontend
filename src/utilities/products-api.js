import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/products'

export const getAllProducts = async () => {
  try {
    const response = await axios.get(API_URL)
    return response.data
  } catch (error) {
    console.error('Error fetching products:', error)
    throw error
  }
}

export const getProductById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`)
    return response.data
  } catch (error) {
    console.error('Error fetching product:', error)
    throw error
  }
}

export const createProduct = async (productData) => {
  try {
    const response = await axios.post(API_URL, productData)
    return response.data
  } catch (error) {
    console.error('Error creating product:', error)
    throw error
  }
}