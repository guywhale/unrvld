"use client";

import { Dispatch, SetStateAction } from "react";

type Props = {
    collection: string;
    selectedCollection: string;
    setSelectedCollection: Dispatch<SetStateAction<string>>;
};

export default function ProductFilterRadio({
    collection,
    selectedCollection,
    setSelectedCollection,
}: Props) {
    return (
        <label
            key={collection}
            className="flex-shrink-0 px-7.5 pt-[17px] pb-4.5 border-2 border-neutral-200 has-checked:border-black rounded-4xl font-extrabold uppercase text-[13px] tracking-[0.04em] leading-[13px] cursor-pointer"
        >
            {collection}
            <input
                className="hidden"
                type="radio"
                name="collection"
                value={collection}
                checked={collection === selectedCollection}
                onChange={() => setSelectedCollection(collection)}
            />
        </label>
    );
}
