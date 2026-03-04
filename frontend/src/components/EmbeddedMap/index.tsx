import { WithMarginWrapper } from '../WithMarginWrapper'

export function EmbeddedMap() {
  return (
    <WithMarginWrapper customClasses="flex flex-col gap-8 pb-16 sm:gap-10 lg:flex-row lg:gap-12 lg:pb-20">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2479.4310768916516!2d-72.21199782352558!3d-51.57866237182961!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xbdb01c6d3faa2f8f%3A0x2cc5b76ab74c6897!2sAv.%20Circunvalacion%2025%20de%20Mayo%20458%2C%2028%20de%20Noviembre%2C%20Santa%20Cruz!5e0!3m2!1ses-419!2sar!4v1715868408860!5m2!1ses-419!2sar"
        className="h-80 w-full rounded-[1.5rem] lg:h-[450px] lg:w-[600px]"
        style={{ border: '0' }}
        allowFullScreen={false}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
      <div className="flex flex-col justify-center gap-4 text-white">
        <p className="text-lg leading-8 sm:text-xl">
          Estamos ubicados en Av. Circunvalacion 25 de Mayo 458
        </p>
        <span className="text-sm uppercase tracking-[0.24em] text-cyan-600">
          VEINTIOCHO DE NOVIEMBRE
        </span>
        <span className="text-sm text-stone-300 sm:text-base">
          Santa Cruz - Argentina
        </span>
      </div>
    </WithMarginWrapper>
  )
}
