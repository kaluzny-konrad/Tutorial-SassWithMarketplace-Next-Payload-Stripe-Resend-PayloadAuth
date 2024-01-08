"use client";

import { trpc } from "@/trpc/client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type Props = {
  orderEmail: string;
  orderId: string;
  isPaid: boolean;
};

export default function PaymentStatus({ orderEmail, orderId, isPaid }: Props) {
  const { data } = trpc.payment.pollOrderStatus.useQuery(
    { orderId },
    {
      enabled: isPaid === false,
      refetchInterval: (data) => (data?.isPaid ? false : 1000),
    }
  );

  const router = useRouter();

  useEffect(() => {
    if (data?.isPaid) {
      router.refresh();
    }
  }, [data?.isPaid, router]);

  return <div>
    <h1>Payment status</h1>
    <p>Order ID: {orderId}</p>
    <p>Order email: {orderEmail}</p>
    <p>Is paid: {isPaid ? "yes" : "no"}</p>
    {data?.isPaid && <p>Order is paid!</p>}
  </div>;
}
