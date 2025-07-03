import fetchProducts from "./data/fetchProducts";
import Products from "./components/products/Products";

export default async function Home() {
    const products = await fetchProducts();

    return (
        <>
            <Products productsOnLoad={products} />
        </>
    );
}
