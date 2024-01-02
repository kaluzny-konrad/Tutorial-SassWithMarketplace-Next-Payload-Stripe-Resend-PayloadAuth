"use client";

import { Product } from "@/payload-types";
import { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";
import Link from "next/link";
import { PRODUCT_CATEGORIES } from "@/config";
import { formatPrice } from "@/lib/utils";
import ImageSlider from "./ImageSlider";

type Props = {
  product: Product | null;
  index: number;
};

export default function ProductListing({ product, index }: Props) {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100 * index);
    return () => clearTimeout(timer);
  }, [index]);

  if (!product || !isVisible) return <ProductPlaceholder />;

  const label = PRODUCT_CATEGORIES.find(
    ({ value }) => value === product.category
  )?.label;

  if (isVisible && product) {
    return (
      <Link href={`/product/${product.id}`}>
        <div>
          <ImageSlider urls={[]} />

          <h3>{product.name}</h3>
          <p>{label}</p>
          <p>{formatPrice(product.price)}</p>
        </div>
      </Link>
    );
  }

  return <div>ProductListing</div>;
}

const ProductPlaceholder = () => {
  return (
    <div>
      <div>
        <Skeleton />
      </div>
      <Skeleton />
      <Skeleton />
      <Skeleton />
    </div>
  );
};
