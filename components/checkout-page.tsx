"use client"

import { Header } from "@/components/checkout/header"
import { HeroBanner } from "@/components/checkout/hero-banner"
import { PersonalInfoForm } from "@/components/checkout/personal-info-form"
import { ShippingAddressForm } from "@/components/checkout/shipping-address-form"
import { PaymentPlaceholder } from "@/components/checkout/payment-placeholder"
import { OrderSummary } from "@/components/checkout/order-summary"
import { TrustBadges } from "@/components/checkout/trust-badges"
import { Footer } from "@/components/checkout/footer"

export function CheckoutPage() {
  return (
    <div className="min-h-screen bg-[#f4f6f8]">
      <Header />

      <main className="mx-auto max-w-7xl px-4 py-6">
        {/* Hero Banner */}
        <HeroBanner />

        {/* Main Content Grid */}
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Left Column - Forms */}
          <div className="lg:col-span-2 space-y-6">
            <PersonalInfoForm />
            <ShippingAddressForm />
            <PaymentPlaceholder />
          </div>

          {/* Right Column - Order Summary & Trust Badges */}
          <div className="space-y-6">
            <OrderSummary />
            <TrustBadges />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
