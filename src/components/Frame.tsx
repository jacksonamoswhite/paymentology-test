import { ReactNode } from "react"

interface IProps {
  label: string
  className?: string
  children?: ReactNode
}

export const Frame: React.FC<IProps> = ({ label, children, className }) => {
  return (
    <div className='border relative p-5'>
      <div className='absolute -top-4 left-4 bg-white text-lg px-2'>
        {label}
      </div>
      <div className={className}>{children}</div>
    </div>
  )
}
