import { ReactNode } from 'react'
import { createPortal } from 'react-dom'

export function ModalWrapper({ children }: { children: ReactNode }) {
  if (typeof document === 'undefined') {
    return null
  }

  return createPortal(
    <div className="fixed inset-0 isolate z-[1400] flex h-screen w-screen items-start justify-center overflow-y-auto bg-black/70 px-3 py-4 backdrop-blur-sm sm:px-4 sm:py-8 md:items-center">
      {children}
    </div>,
    document.body
  )
}
