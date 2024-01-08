import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import { Loader2Icon } from "lucide-react";

type Props = {
  isMounted: boolean;
  isDisabled: boolean;
  cartTotal: number;
};

export default function ShoppingCartSummary({
  isMounted,
  isDisabled,
  cartTotal,
}: Props) {
  const fee = 1;

  return (
    <section className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
      <h2 className="text-lg font-medium text-gray-900">Order summary</h2>

      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">Subtotal</p>
          <p className="text-sm font-medium text-gray-900">
            {isMounted ? (
              formatPrice(cartTotal)
            ) : (
              <Loader2Icon className="h-4 w-4 animate-spin text-muted-foreground" />
            )}
          </p>
        </div>

        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="flex items-center text-sm text-muted-foreground">
            <span>Flat Transaction Fee</span>
          </div>
          <div className="text-sm font-medium text-gray-900">
            {isMounted ? (
              formatPrice(fee)
            ) : (
              <Loader2Icon className="h-4 w-4 animate-spin text-muted-foreground" />
            )}
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="text-base font-medium text-gray-900">Order Total</div>
          <div className="text-base font-medium text-gray-900">
            {isMounted ? (
              formatPrice(cartTotal + fee)
            ) : (
              <Loader2Icon className="h-4 w-4 animate-spin text-muted-foreground" />
            )}
          </div>
        </div>
      </div>

      <div className="mt-6">
        <Button
          disabled={!isMounted || isDisabled}
          onClick={() => {}}
          className="w-full"
          size="lg"
        >
          {false ? (
            <Loader2Icon className="w-4 h-4 animate-spin mr-1.5" />
          ) : null}
          Checkout
        </Button>
      </div>
    </section>
  );
}
