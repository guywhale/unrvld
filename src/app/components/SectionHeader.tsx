"use client";

type Props = {
    tagline: string;
    title: string;
};

export default function SectionHeader({ tagline, title }: Props) {
    return (
        <header>
            <p className="mb-4 font-medium text-xs md:text-sm leading-3 md:leading-3.5 tracking-[0.14em] uppercase">
                &#47;&#47; {tagline}
            </p>
            <h2 className="font-extrabold text-2xl md:text-[40px] leading-5.5 md:leading-9 -tracking-[0.04em] uppercase">
                {title}
            </h2>
        </header>
    );
}
