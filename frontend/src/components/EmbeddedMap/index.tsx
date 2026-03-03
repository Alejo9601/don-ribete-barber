import { WithMarginWrapper } from '../WithMarginWrapper'

export function EmbeddedMap() {
  return (
    <WithMarginWrapper customClasses="flex flex-col lg:flex-row gap-12 pb-20">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2479.4310768916516!2d-72.21199782352558!3d-51.57866237182961!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xbdb01c6d3faa2f8f%3A0x2cc5b76ab74c6897!2sAv.%20Circunvalacion%2025%20de%20Mayo%20458%2C%2028%20de%20Noviembre%2C%20Santa%20Cruz!5e0!3m2!1ses-419!2sar!4v1715868408860!5m2!1ses-419!2sar"
        className="w-full lg:w-[600px] h-96 lg:h-[450px]"
        style={{ border: '0' }}
        allowFullScreen={false}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
      <div className="flex flex-col gap-5 justify-center text-white">
        <p className="text-xl">
          Estamos ubicados en Av. Circunvalación 25 de Mayo 458
        </p>
        <span className="text-cyan-600">VEINTIOCHO DE NOVIEMBRE</span>
        <span>Santa Cruz - Argentina</span>
      </div>
    </WithMarginWrapper>
  )
}
