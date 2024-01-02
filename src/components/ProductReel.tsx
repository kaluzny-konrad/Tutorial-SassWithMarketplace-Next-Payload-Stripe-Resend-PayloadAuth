"use client";

import { TQueryValidator } from "@/lib/validators/query-validator";
import { Product } from "@/payload-types";
import { trpc } from "@/trpc/client";
import Link from "next/link";
import React from "react";
import ProductListing from "./ProductListing";

type Props = {
  title: string;
  subTitle?: string;
  href?: string;
  query: TQueryValidator;
};

const FALLBACK_LIMIT = 4;

export default function ProductReel({ title, subTitle, href, query }: Props) {
  const { data: queryResults, isLoading } =
    trpc.getInfiniteProducts.useInfiniteQuery(
      {
        limit: query.limit ?? FALLBACK_LIMIT,
        query,
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextPage,
      }
    );

  const flattenedQueryResults = queryResults?.pages.flatMap(
    (page) => page.items
  );

  let products: (Product | null)[] = [];
  if (flattenedQueryResults && flattenedQueryResults.length > 0) {
    products = flattenedQueryResults;
  } else if (isLoading) {
    products = new Array<null>(query.limit ?? FALLBACK_LIMIT).fill(null);
  }

  return (
    <div>
      {title && <h2 className="">{title}</h2>}

      {subTitle && <p className="">{subTitle}</p>}

      {href && (
        <Link href={href} className="">
          Shop the collection <span aria-hidden={true}>&rarr;</span>
        </Link>
      )}

      <div>
        <div>
          <div>
            {products.map((product, index) => (
              <ProductListing product={product} index={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
