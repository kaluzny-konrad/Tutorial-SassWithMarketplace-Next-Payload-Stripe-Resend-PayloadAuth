"use client";

import { TQueryValidator } from "@/lib/validators/query-validator";
import { Product } from "@/payload-types";
import { trpc } from "@/trpc/client";
import Link from "next/link";
import React from "react";
import ProductListing from "./ProductListing";

type Props = {
  title: string;
  subtitle?: string;
  href?: string;
  query: TQueryValidator;
};

const FALLBACK_LIMIT = 4;

export default function ProductReel({ title, subtitle, href, query }: Props) {
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
    <section className="py-12">
      <div className="mb-4 md:flex md:items-center md:justify-between">
        <div className="max-w-2xl px-4 lg:max-w-4xl lg:px-0">
          {title && (
            <h2 className="text-2xl font-bold text-gray-900 sm:text-3x">
              {title}
            </h2>
          )}

          {subtitle && (
            <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
          )}
        </div>

        {href && (
          <Link
            href={href}
            className="hidden text-sm font-medium text-blue-600 hover:text-blue-500 md:block"
          >
            Shop the collection <span aria-hidden={true}>&rarr;</span>
          </Link>
        )}
      </div>
      
      <div className="relative">
        <div className="flex items-center w-full mt-6">
          <div className="grid w-full grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-10 lg:gap-x-8">
            {products.map((product, index) => (
              <ProductListing product={product} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
