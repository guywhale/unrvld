import fetchProducts from "./data/fetchProducts";

export default async function Home() {
    const products = await fetchProducts();
    console.log(products);

    return (
        <section className="">
            <h1>TEST</h1>
        </section>
    );
}
