"use client"

import { Truck } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function ShippingAddressForm() {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-start gap-3 mb-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
          <Truck className="h-5 w-5 text-gray-600" />
        </div>
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wide text-gray-900">Endereço de Entrega</h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Para calcular o frete é necessário preencher todos os campos acima.
          </p>
        </div>
      </div>

      {/* CEP Field */}
      <div>
        <Label htmlFor="cep" className="text-sm font-medium text-gray-700">
          CEP
        </Label>
        <Input
          id="cep"
          type="text"
          placeholder="00000-000"
          className="mt-1.5 h-12 rounded-lg border-gray-200 bg-gray-50 text-sm placeholder:text-gray-400"
        />
        <p className="mt-2 text-sm text-gray-500">Preencha suas informações de entrega para continuar.</p>
      </div>
    </div>
  )
}
