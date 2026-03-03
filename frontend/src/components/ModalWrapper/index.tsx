import { ReactNode } from 'react'
import { createPortal } from 'react-dom'

export function ModalWrapper({ children }: { children: ReactNode }) {
  if (typeof document === 'undefined') {
    return null
  }

  return createPortal(
    <div className="fixed inset-0 isolate z-[1400] flex h-screen w-screen items-center justify-center bg-black/70 px-4 py-8 backdrop-blur-sm">
      {children}
    </div>,
    document.body
  )
}
