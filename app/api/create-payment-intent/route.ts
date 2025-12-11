import Stripe from "stripe"
import { NextResponse } from "next/server"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-04-30.basil",
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { amount, paymentMethodType, billingDetails, customer_name, customer_email, address, products } = body

    const amountInCents = Math.round(amount * 100)

    const metadata: Record<string, string> = {}
    if (customer_name) metadata.customer_name = customer_name
    if (customer_email) metadata.customer_email = customer_email
    if (address) {
      metadata.address_street = address.street || ""
      metadata.address_city = address.city || ""
      metadata.address_state = address.state || ""
      metadata.address_cep = address.cep || ""
    }
    if (products) {
      metadata.products = JSON.stringify(products)
    }
    metadata.payment_method = paymentMethodType

    if (paymentMethodType === "pix") {
      // Create PaymentMethod on the server
      const paymentMethod = await stripe.paymentMethods.create({
        type: "pix",
        billing_details: {
          name: billingDetails.name,
          email: billingDetails.email,
          tax_id: billingDetails.tax_id || undefined,
        },
      })

      const paymentIntent = await stripe.paymentIntents.create({
        amount: amountInCents,
        currency: "brl",
        payment_method_types: ["pix"],
        payment_method: paymentMethod.id,
        confirm: true,
        metadata,
        payment_method_options: {
          pix: {
            expires_after_seconds: 1800, // 30 minutes
            // @ts-expect-error - amount_includes_iof is a valid parameter but not in types yet
            amount_includes_iof: "always",
          },
        },
      })

      // Extract PIX data from next_action
      const pixData = paymentIntent.next_action?.pix_display_qr_code

      if (!pixData) {
        return NextResponse.json({ error: "Failed to generate PIX QR code" }, { status: 500 })
      }

      return NextResponse.json({
        success: true,
        paymentIntentId: paymentIntent.id,
        pixData: {
          code: pixData.data,
          qrCodeUrl: pixData.image_url_png,
          expiresAt: pixData.expires_at,
          hostedUrl: pixData.hosted_instructions_url,
        },
      })
    } else {
      // For card payments - confirm on client side
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amountInCents,
        currency: "brl",
        payment_method_types: ["card"],
        metadata,
      })

      return NextResponse.json({
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
      })
    }
  } catch (error) {
    console.error("Error creating payment intent:", error)
    const errorMessage = error instanceof Error ? error.message : "Failed to create payment intent"
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}
