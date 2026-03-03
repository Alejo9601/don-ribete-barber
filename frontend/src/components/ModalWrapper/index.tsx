import { ReactNode } from 'react'

export function ModalWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="h-screen w-screen fixed top-0 right-0 z-[2] flex flex-col items-center justify-center bg-black bg-opacity-75">
      {children}
    </div>
  )
}
