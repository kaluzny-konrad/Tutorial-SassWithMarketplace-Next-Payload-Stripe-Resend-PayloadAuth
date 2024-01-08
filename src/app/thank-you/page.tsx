import PaymentStatus from "@/components/PaymentStatus";
import { getPayloadClient } from "@/get-payload";
import { getServerSideUser } from "@/lib/payload-utils";
import { Product } from "@/payload-types";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";

type Props = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

export default async function ThankYouPage({ searchParams }: Props) {
  const orderId = searchParams.orderId;
  const nextCookies = cookies();
  const { user } = await getServerSideUser(nextCookies);

  const payload = await getPayloadClient();

  const { docs: orders } = await payload.find({
    collection: "orders",
    depth: 2,
    where: {
      id: {
        equals: orderId,
      },
    },
  });

  const [order] = orders;

  if (!order) {
    return notFound();
  }

  const orderUserId =
    typeof order.user === "string" ? order.user : order.user.id;

  if (orderUserId !== user?.id) {
    return redirect(`/sign-in?origin=/thank-you?orderId=${order.id}`);
  }

  const products = order.products as Product[];

  const orderTotal = products.reduce(
    (total, product) => total + product.price,
    0
  );

  return (
    <div>
      <div>{orderId}</div>
      <PaymentStatus
        orderEmail={user.email}
        orderId={order.id}
        isPaid={order._isPaid}
      />
    </div>
  );
}
