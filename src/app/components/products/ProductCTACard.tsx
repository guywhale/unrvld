import { Product } from "@/app/types/product";
import Image from "next/image";
import Link from "next/link";

type Props = {
    product: Product;
};
export default function ProductCTACard({ product }: Props) {
    const { imageUrl, imageAlt, title, vendor, colors, price, handle } =
        product;
    const color = colors[0] ?? "N/A";

    return (
        <article className="flex flex-col bg-white group hover:outline-1 active:outline-1 focus-within:outline-1 outline-black">
            <div className="relative w-full pb-[100%]">
                <Image src={imageUrl} alt={imageAlt} fill={true} />
            </div>
            <div className="flex-1 flex flex-col p-4">
                <div className="mb-1">
                    <p className="mb-0.5 text-xs leading-4 tracking-[0.04em] font-extrabold uppercase">
                        {vendor}
                    </p>
                    <h2 className="mb-0.5 text-sm leading-5 font-normal">
                        {title}
                    </h2>
                    <p className="text-sm leading-5 font-normal text-neutral-500">
                        {color}
                    </p>
                </div>
                <div className="flex items-center justify-between mt-auto">
                    <p className="text-xs leading-4 tracking-[0.04em]">
                        £{parseFloat(price).toFixed(2)}
                    </p>
                    <Link
                        href={`/product/${handle}`}
                        className="hidden group-hover:flex group-active:flex group-focus:flex items-end h-4"
                    >
                        <span className="mr-2 text-xs leading-3 h-3 tracking-[0.04em] font-extrabold uppercase">
                            View
                        </span>
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M3.33337 8H12.6667"
                                stroke="black"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M8 3.33331L12.6667 7.99998L8 12.6666"
                                stroke="black"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </Link>
                </div>
            </div>
        </article>
    );
}
