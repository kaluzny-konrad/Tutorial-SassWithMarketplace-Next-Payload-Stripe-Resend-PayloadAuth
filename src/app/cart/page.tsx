"use client";

import ShoppingCartEmpty from "@/components/ShoppingCartEmpty";
import ShoppingCartItem from "@/components/ShoppingCartItem";
import ShoppingCartSummary from "@/components/ShoppingCartSummary";
import { Skeleton } from "@/components/ui/skeleton";
import { useCart } from "@/hooks/use-cart";
import { cn } from "@/lib/utils";
import { trpc } from "@/trpc/client";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";

type Props = {};

export default function CartPage({}: Props) {
  const { items } = useCart();

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const cartTotal = items.reduce(
    (total, { product }) => total + product.price,
    0
  );

  const router = useRouter();

  const { mutate: createCheckoutSession, isLoading } =
    trpc.payment.createSession.useMutation({
      onSuccess: ({ url }) => {
        if (url) router.push(url);
      },
    });

  const productIds = items.map(({ product }) => product.id);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Shopping Cart
        </h1>

        <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
          <div
            className={cn("lg:col-span-7", {
              "rounded-lg border-2 border-dashed border-zinc-200 p-12":
                isMounted && items.length === 0,
            })}
          >
            <h2 className="sr-only">Items in your shopping cart</h2>

            {isMounted && items.length === 0 ? <ShoppingCartEmpty /> : null}

            <ul
              className={cn(
                "divide-y divide-gray-200 border-b border-t border-gray-200"
              )}
            >
              {isMounted ? (
                items.map(({ product }) => (
                  <ShoppingCartItem key={product.id} product={product} />
                ))
              ) : (
                <li className="flex flex-row w-full pt-4 pb-8">
                  <div className="relative overflow-hidden bg-zinc-100 aspect-square rounded-xl w-4/12">
                    <Skeleton className="w-full h-full" />
                  </div>
                  <div className="ml-4">
                    <Skeleton className="w-2/3 h-4 mt-4 rounded-lg" />
                    <Skeleton className="w-16 h-4 mt-2 rounded-lg" />
                    <Skeleton className="w-12 h-4 mt-2 rounded-lg" />
                  </div>
                </li>
              )}
            </ul>
          </div>

          <ShoppingCartSummary
            isMounted={isMounted}
            isLoading={isLoading}
            itemsLength={items.length}
            cartTotal={cartTotal}
            handleCheckout={() => createCheckoutSession({ productIds })}
          />
        </div>
      </div>
    </div>
  );
}
