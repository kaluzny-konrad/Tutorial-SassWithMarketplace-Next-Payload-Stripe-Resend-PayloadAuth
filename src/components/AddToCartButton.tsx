"use client";

import React, { useEffect } from "react";
import { Button } from "./ui/button";

type Props = {};

export default function AddToCartButton({}: Props) {
  const [isSuccess, setIsSuccess] = React.useState<boolean>(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsSuccess(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, [isSuccess]);

  return <Button onClick={() => {
    setIsSuccess(true);
  }} size={"lg"} className="w-full">
    {isSuccess ? "Added to cart" : "Add to cart"}
  </Button>;
}
