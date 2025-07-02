import fetchProducts from "./data/fetchProducts";
import Products from "./components/Products";

export default async function Home() {
    const products = await fetchProducts();

    return (
        <>
            <Products productsOnLoad={products} />
        </>
    );
}
