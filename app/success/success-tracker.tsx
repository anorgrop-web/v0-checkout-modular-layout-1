"use client"

import { HybridTracker } from "@/components/hybrid-tracker"

interface SuccessTrackerProps {
  value: number
  paymentMethod: string
}

export function SuccessTracker({ value, paymentMethod }: SuccessTrackerProps) {
  return (
    <HybridTracker
      event="Purchase"
      data={{
        value,
        currency: "BRL",
        content_type: "product",
        payment_method: paymentMethod,
      }}
    />
  )
}
