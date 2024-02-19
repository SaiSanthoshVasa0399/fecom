import { client } from '../sanity/client';
export async function productItemLoader({params}) {
    try {
        debugger
        const query = `*[_type == "product" && slug.current == '${params["productId"]}'][0]`;
        const productItem = await client.fetch(query);
        const productsQuery = '*[_type == "product"]';
        const products = await client.fetch(productsQuery);
        return { productItem, products , error: null };
      } catch (error) {
        return {productItem: null, error: error};
      }

    
  }

