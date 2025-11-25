"use client"

import { useState, useMemo } from "react"
import { CreditCard, Lock } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"

interface PaymentFormProps {
  visible: boolean
  totalAmount: number
}

type PaymentMethod = "pix" | "credit_card"

interface CardInfo {
  nome: string
  numero: string
  mes: string
  ano: string
  cvv: string
  parcelas: string
}

// Card brand detection based on BIN (Bank Identification Number)
function detectCardBrand(cardNumber: string): string | null {
  const digits = cardNumber.replace(/\D/g, "")

  if (!digits) return null

  // Visa: starts with 4
  if (/^4/.test(digits)) return "visa"

  // Mastercard: starts with 51-55 or 2221-2720
  if (/^5[1-5]/.test(digits) || /^2[2-7]/.test(digits)) return "mastercard"

  // Elo: various BINs
  if (/^(636368|438935|504175|451416|636297|506699)/.test(digits)) return "elo"

  // Amex: starts with 34 or 37
  if (/^3[47]/.test(digits)) return "amex"

  // Discover: starts with 6011 or 65
  if (/^6011|^65/.test(digits)) return "discover"

  // Hipercard: starts with 606282
  if (/^606282/.test(digits)) return "hipercard"

  // Aura: starts with 50
  if (/^50/.test(digits)) return "aura"

  // Hiper: starts with 637
  if (/^637/.test(digits)) return "hiper"

  return null
}

function maskCardNumber(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 16)
  const groups = digits.match(/.{1,4}/g)
  return groups ? groups.join(" ") : ""
}

function maskCVV(value: string): string {
  return value.replace(/\D/g, "").slice(0, 4)
}

const cardBrandLogos: Record<string, string> = {
  visa: "https://mk6n6kinhajxg1fp.public.blob.vercel-storage.com/Comum%20/card-visa.svg",
  mastercard: "https://mk6n6kinhajxg1fp.public.blob.vercel-storage.com/Comum%20/card-mastercard.svg",
  amex: "https://mk6n6kinhajxg1fp.public.blob.vercel-storage.com/Comum%20/amex.Csr7hRoy.svg",
  discover: "https://mk6n6kinhajxg1fp.public.blob.vercel-storage.com/Comum%20/card-discover.svg",
}

const acceptedBrands = [
  { id: "visa", name: "Visa" },
  { id: "mastercard", name: "Mastercard" },
  { id: "amex", name: "Amex" },
  { id: "discover", name: "Discover" },
]

export function PaymentForm({ visible, totalAmount }: PaymentFormProps) {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("pix")
  const [cardInfo, setCardInfo] = useState<CardInfo>({
    nome: "",
    numero: "",
    mes: "",
    ano: "",
    cvv: "",
    parcelas: "1",
  })
  const [cardNumberError, setCardNumberError] = useState<string | null>(null)

  const detectedBrand = useMemo(() => detectCardBrand(cardInfo.numero), [cardInfo.numero])

  const handleCardNumberChange = (value: string) => {
    const masked = maskCardNumber(value)
    setCardInfo((prev) => ({ ...prev, numero: masked }))

    const digits = value.replace(/\D/g, "")
    if (digits.length > 0 && digits.length < 15) {
      setCardNumberError("O mínimo de caracteres para esse campo é 15")
    } else {
      setCardNumberError(null)
    }
  }

  const handleCVVChange = (value: string) => {
    const masked = maskCVV(value)
    setCardInfo((prev) => ({ ...prev, cvv: masked }))
  }

  const handleFieldChange = (field: keyof CardInfo, value: string) => {
    setCardInfo((prev) => ({ ...prev, [field]: value }))
  }

  // Generate installment options
  const installmentOptions = useMemo(() => {
    const options = []
    for (let i = 1; i <= 12; i++) {
      const installmentValue = totalAmount / i
      options.push({
        value: String(i),
        label: `${i} x R$ ${installmentValue.toFixed(2).replace(".", ",")}`,
      })
    }
    return options
  }, [totalAmount])

  const selectedInstallment = installmentOptions.find((o) => o.value === cardInfo.parcelas)

  const months = Array.from({ length: 12 }, (_, i) => ({
    value: String(i + 1).padStart(2, "0"),
    label: String(i + 1).padStart(2, "0"),
  }))

  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 15 }, (_, i) => ({
    value: String(currentYear + i),
    label: String(currentYear + i),
  }))

  if (!visible) {
    return (
      <div className="bg-white rounded-lg p-6 shadow-sm opacity-50 pointer-events-none">
        <div className="flex items-start gap-3 mb-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
            <CreditCard className="h-5 w-5 text-gray-600" />
          </div>
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wide text-gray-900">Formas de Pagamento</h2>
            <p className="text-xs text-gray-500 mt-0.5">Preencha as informações acima para continuar.</p>
          </div>
        </div>
        <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center bg-gray-100">
          <Lock className="h-10 w-10 text-gray-300 mx-auto mb-3" />
          <p className="text-sm text-gray-400">Complete as etapas anteriores para desbloquear</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-start gap-3 mb-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
          <CreditCard className="h-5 w-5 text-gray-600" />
        </div>
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wide text-gray-900">Formas de Pagamento</h2>
          <p className="text-xs text-gray-500 mt-0.5">Para finalizar seu pedido escolha uma forma de pagamento</p>
        </div>
      </div>

      {/* Payment Options */}
      <div className="space-y-4">
        {/* PIX Option */}
        <div
          className={cn(
            "border rounded-lg p-4 cursor-pointer transition-all",
            paymentMethod === "pix" ? "border-green-500 bg-white" : "border-gray-200 bg-gray-50",
          )}
          onClick={() => setPaymentMethod("pix")}
        >
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                paymentMethod === "pix" ? "border-green-500" : "border-gray-300",
              )}
            >
              {paymentMethod === "pix" && <div className="w-3 h-3 rounded-full bg-green-500" />}
            </div>
            <span className="font-semibold text-gray-900">PIX</span>
          </div>

          {paymentMethod === "pix" && (
            <div className="mt-4 pl-8">
              <p className="text-sm font-semibold text-gray-700">Atente-se aos detalhes:</p>
              <p className="text-sm text-gray-600 mt-1">
                Pagamentos via pix são confirmados imediatamente. Você não precisa ter uma chave pix para efetuar o
                pagamento, basta ter o app do seu banco em seu celular.
              </p>

              <button className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-lg transition-colors">
                PAGAR <span className="text-green-200">R$ {totalAmount.toFixed(2).replace(".", ",")}</span>
              </button>
            </div>
          )}
        </div>

        {/* Credit Card Option */}
        <div
          className={cn(
            "border rounded-lg p-4 cursor-pointer transition-all",
            paymentMethod === "credit_card" ? "border-green-500 bg-white" : "border-gray-200 bg-gray-50",
          )}
          onClick={() => setPaymentMethod("credit_card")}
        >
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                paymentMethod === "credit_card" ? "border-green-500" : "border-gray-300",
              )}
            >
              {paymentMethod === "credit_card" && <div className="w-3 h-3 rounded-full bg-green-500" />}
            </div>
            <span className="font-semibold text-gray-900">CARTÃO DE CRÉDITO</span>
          </div>

          {paymentMethod === "credit_card" && (
            <div className="mt-4 pl-0 md:pl-8">
              {/* Accepted Card Brands */}
              <div className="flex flex-wrap gap-2 mb-6">
                {acceptedBrands.map((brand) => (
                  <div
                    key={brand.id}
                    className="h-8 w-12 bg-gray-100 rounded flex items-center justify-center overflow-hidden"
                  >
                    {cardBrandLogos[brand.id] ? (
                      <Image
                        src={cardBrandLogos[brand.id] || "/placeholder.svg"}
                        alt={brand.name}
                        width={40}
                        height={24}
                        className="object-contain"
                        unoptimized
                      />
                    ) : (
                      <span className="text-[8px] text-gray-500">{brand.name}</span>
                    )}
                  </div>
                ))}
              </div>

              {/* Cardholder Name */}
              <div className="mb-4">
                <label className="block text-sm text-gray-600 mb-1">Nome igual consta em seu cartão</label>
                <input
                  type="text"
                  value={cardInfo.nome}
                  onChange={(e) => handleFieldChange("nome", e.target.value.toUpperCase())}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder=""
                />
              </div>

              {/* Card Number */}
              <div className="mb-4">
                <label className="block text-sm text-gray-600 mb-1">Número do Cartão</label>
                <div className="relative">
                  <input
                    type="text"
                    value={cardInfo.numero}
                    onChange={(e) => handleCardNumberChange(e.target.value)}
                    className={cn(
                      "w-full border rounded-lg px-4 py-3 text-gray-900 pr-14 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent",
                      cardNumberError ? "border-red-400 bg-red-50" : "border-gray-300",
                    )}
                    placeholder="0000 0000 0000 0000"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-6 flex items-center justify-center">
                    {detectedBrand && cardBrandLogos[detectedBrand] ? (
                      <Image
                        src={cardBrandLogos[detectedBrand] || "/placeholder.svg"}
                        alt={detectedBrand}
                        width={32}
                        height={20}
                        className="object-contain"
                        unoptimized
                      />
                    ) : (
                      <CreditCard className="h-6 w-6 text-gray-400" />
                    )}
                  </div>
                </div>
                {cardNumberError && <p className="text-sm text-red-500 mt-1">{cardNumberError}</p>}
              </div>

              {/* Expiry and CVV */}
              <div className="mb-4">
                <div className="grid grid-cols-3 gap-3">
                  <div className="col-span-2">
                    <label className="block text-sm text-gray-600 mb-1">Validade (Mês/Ano):</label>
                    <div className="grid grid-cols-2 gap-3">
                      <select
                        value={cardInfo.mes}
                        onChange={(e) => handleFieldChange("mes", e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-3 text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none cursor-pointer"
                      >
                        <option value="">Mês</option>
                        {months.map((m) => (
                          <option key={m.value} value={m.value}>
                            {m.label}
                          </option>
                        ))}
                      </select>
                      <select
                        value={cardInfo.ano}
                        onChange={(e) => handleFieldChange("ano", e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-3 text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none cursor-pointer"
                      >
                        <option value="">Ano</option>
                        {years.map((y) => (
                          <option key={y.value} value={y.value}>
                            {y.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">CVV:</label>
                    <input
                      type="text"
                      value={cardInfo.cvv}
                      onChange={(e) => handleCVVChange(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder=""
                      maxLength={4}
                    />
                  </div>
                </div>
              </div>

              {/* Installments */}
              <div className="mb-4">
                <label className="block text-sm text-gray-600 mb-1">Parcelas</label>
                <select
                  value={cardInfo.parcelas}
                  onChange={(e) => handleFieldChange("parcelas", e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none cursor-pointer"
                >
                  {installmentOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Pay Button */}
              <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-lg transition-colors">
                PAGAR <span className="text-green-200">{selectedInstallment?.label}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
