"use client"

import { User } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function PersonalInfoForm() {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-start gap-3 mb-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
          <User className="h-5 w-5 text-gray-600" />
        </div>
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wide text-gray-900">Informações Pessoais</h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Utilizaremos seu e-mail para: Identificar seu perfil, histórico de compra, notificação de pedidos e carrinho
            de compras.
          </p>
        </div>
      </div>

      {/* Form Fields */}
      <div className="space-y-4">
        <div>
          <Label htmlFor="email" className="text-sm font-medium text-gray-700">
            E-mail
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="Ex.: seu.e-mail@gmail.com"
            className="mt-1.5 h-12 rounded-lg border-gray-200 bg-gray-50 text-sm placeholder:text-gray-400"
          />
        </div>

        <div>
          <Label htmlFor="nome" className="text-sm font-medium text-gray-700">
            Nome Completo
          </Label>
          <Input
            id="nome"
            type="text"
            placeholder="Informe seu nome completo"
            className="mt-1.5 h-12 rounded-lg border-gray-200 bg-gray-50 text-sm placeholder:text-gray-400"
          />
        </div>

        <div>
          <Label htmlFor="cpf" className="text-sm font-medium text-gray-700">
            CPF
          </Label>
          <Input
            id="cpf"
            type="text"
            placeholder="000.000.000-00"
            className="mt-1.5 h-12 rounded-lg border-gray-200 bg-gray-50 text-sm placeholder:text-gray-400"
          />
        </div>

        <div>
          <Label htmlFor="celular" className="text-sm font-medium text-gray-700">
            Celular
          </Label>
          <Input
            id="celular"
            type="tel"
            placeholder="(00) 00000-0000"
            className="mt-1.5 h-12 rounded-lg border-gray-200 bg-gray-50 text-sm placeholder:text-gray-400"
          />
        </div>
      </div>
    </div>
  )
}
