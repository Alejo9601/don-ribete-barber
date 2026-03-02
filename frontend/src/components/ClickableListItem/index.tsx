import { ReactNode } from 'react'

const ClickableListItem = ({ children }: { children: ReactNode }) => {
  return <li className="h-full cursor-pointer">{children}</li>
}

export default ClickableListItem
