import { Product } from "@/app/types/product";
import Image from "next/image";
import Link from "next/link";

type Props = {
    product: Product;
    isAboveFold: boolean;
};

export default function ProductCTACard({ product, isAboveFold }: Props) {
    const { imageUrl, imageAlt, title, vendor, color, price, handle } = product;

    return (
        <article
            tabIndex={0}
            onTouchStart={(e) => {
                e.currentTarget.focus();
            }}
            className="flex flex-col group hover:outline-1 focus:outline-1 focus-within:outline-1 outline-black"
        >
            <div className="relative w-full mb-[1px] pb-[100%]">
                <Image
                    src={imageUrl}
                    alt={imageAlt}
                    fill={true}
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33.33vw, 50vw"
                    priority={isAboveFold}
                />
            </div>
            <div className="flex-1 flex flex-col p-4 bg-white">
                <div className="mb-1">
                    <p className="mb-0.5 text-xs md:text-sm leading-4 md:leading-5 tracking-[0.04em] font-extrabold uppercase">
                        {vendor}
                    </p>
                    <h2 className="mb-0.5 text-sm md:text-base leading-5 md:leading-5.5 font-normal">
                        {title}
                    </h2>
                    <p className="text-sm md:text-base leading-5 md:leading-5.5 font-normal text-neutral-500">
                        {color?.[0] ?? "N/A"}
                    </p>
                </div>
                <div className="flex items-center justify-between mt-auto">
                    <p className="text-xs md:text-sm leading-4 md:leading-5 tracking-[0.04em]">
                        £{parseFloat(price).toFixed(2)}
                    </p>
                    <Link
                        href={`/product/${handle}`}
                        className="hidden group-hover:flex group-focus-within:flex items-end h-4"
                    >
                        <span className="mr-2 text-xs md:text-sm leading-3 md:leading-3.5 h-3 md:h-3.5 tracking-[0.04em] font-extrabold uppercase">
                            View
                        </span>
                        <svg
                            className="animate-side-to-side block"
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
