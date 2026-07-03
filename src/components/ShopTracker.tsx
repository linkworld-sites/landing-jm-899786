"use client";

import { useEffect } from "react";
import { track } from "@/lib/funnel";

export function ShopTracker() {
  useEffect(() => {
    track("product_view");
  }, []);
  return null;
}
