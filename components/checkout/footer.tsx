import Image from "next/image"

const paymentMethods = [
  { name: "Mastercard", color: "#EB001B" },
  { name: "Visa", color: "#1A1F71" },
  { name: "Amex", color: "#006FCF" },
  { name: "Diners", color: "#0079BE" },
  { name: "Discover", color: "#FF6000" },
  { name: "Elo", color: "#FFCB05" },
  { name: "Aura", color: "#ED1C24" },
  { name: "Hipercard", color: "#B3131B" },
  { name: "Pix", color: "#32BCAD" },
  { name: "Boleto", color: "#000000" },
]

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 mt-8">
      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Payment Methods */}
        <div className="text-center mb-6">
          <p className="text-sm text-gray-500 mb-4">Formas de pagamento</p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {paymentMethods.map((method, index) => (
              <div
                key={index}
                className="h-8 w-12 rounded border border-gray-200 bg-white flex items-center justify-center"
              >
                <Image
                  src={`/.jpg?height=24&width=36&query=${method.name} payment logo`}
                  alt={method.name}
                  width={36}
                  height={24}
                  className="h-5 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Company Info */}
        <div className="text-center space-y-2">
          <p className="text-sm font-medium text-gray-900">Katuchef</p>
          <p className="text-xs text-gray-500">info@katucheftitanio.com</p>
        </div>

        {/* Legal Links */}
        <div className="flex items-center justify-center gap-4 mt-4 text-xs text-gray-500">
          <a href="#" className="hover:text-gray-700 transition-colors">
            Termos de Uso
          </a>
          <span className="text-gray-300">|</span>
          <a href="#" className="hover:text-gray-700 transition-colors">
            Trocas e Devoluções
          </a>
          <span className="text-gray-300">|</span>
          <a href="#" className="hover:text-gray-700 transition-colors">
            Política de Privacidade
          </a>
        </div>
      </div>
    </footer>
  )
}
