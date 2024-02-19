export async function productItemLoader() {
    try {
        alert("productitem")
        const query = '*[_type == "product"]';
        const productItem = await client.fetch(query);
        return { productItem };
      } catch (error) {
        return {productItem: null, error};
      }

    
  }

