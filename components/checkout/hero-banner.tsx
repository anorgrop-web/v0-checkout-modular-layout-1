import Image from "next/image"

export function HeroBanner() {
  return (
    <div className="overflow-hidden rounded-lg">
      <Image
        src="/images/image.png"
        alt="Por que atualizar sua tábua de corte? - Comparação entre tábuas"
        width={1200}
        height={400}
        className="w-full h-auto object-cover"
        priority
      />
    </div>
  )
}
