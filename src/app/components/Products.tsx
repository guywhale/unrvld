"use client";
import { Product } from "../types/product";

type Props = {
    productsOnLoad: Product[];
};
export default function Products({ productsOnLoad }: Props) {
    console.log(productsOnLoad);
    return (
        <section id="products">
            <div className="flex">
                <div>
                    <p className="mb-4 font-medium text-xs leading-3 tracking-[0.14em] uppercase">
                        &#47;&#47; Spring Summer 24
                    </p>
                </div>
            </div>
        </section>
    );
}
