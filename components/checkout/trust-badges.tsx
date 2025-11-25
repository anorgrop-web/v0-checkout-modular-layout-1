"use client"

import { useState } from "react"
import { Shield, FileText, MapPin, Star } from "lucide-react"

const badges = [
  {
    icon: Shield,
    title: "Dados seguros",
    description:
      "Seus dados estão 100% seguros, não compartilhamos e usamos somente para identificação de envio e notas fiscais.",
  },
  {
    icon: FileText,
    title: "Notas fiscais",
    description: "Emitimos sua nota fiscal e enviamos para o seu e-mail.",
  },
  {
    icon: MapPin,
    title: "Código de rastreamento",
    description: "Receba seu código de rastreamento no seu celular através do WhatsApp e pelo e-mail.",
  },
]

export function TrustBadges() {
  const [activeIndex, setActiveIndex] = useState(0)

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % badges.length)
  }

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + badges.length) % badges.length)
  }

  return (
    <>
      {/* Desktop View - All badges visible */}
      <div className="hidden lg:block space-y-4">
        {badges.map((badge, index) => (
          <div key={index} className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-amber-50 flex-shrink-0">
                <badge.icon className="h-6 w-6 text-amber-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-1 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <h3 className="text-sm font-semibold text-gray-900">{badge.title}</h3>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">{badge.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile View - Carousel */}
      <div className="lg:hidden bg-white rounded-lg p-4 shadow-sm">
        <div className="relative">
          <div className="flex items-start gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-amber-50 flex-shrink-0">
              {(() => {
                const Icon = badges[activeIndex].icon
                return <Icon className="h-6 w-6 text-amber-600" />
              })()}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-1 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <h3 className="text-sm font-semibold text-gray-900">{badges[activeIndex].title}</h3>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">{badges[activeIndex].description}</p>
            </div>
          </div>
        </div>

        {/* Carousel Dots */}
        <div className="flex items-center justify-center gap-2 mt-4">
          {badges.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`h-2 w-2 rounded-full transition-colors ${
                index === activeIndex ? "bg-gray-400" : "bg-gray-200"
              }`}
            />
          ))}
        </div>
      </div>
    </>
  )
}
