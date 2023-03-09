import { ChangeEvent, useRef, useState } from "react"

interface IProps {
  index: number
  file: File | null
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

export const FileInput: React.FC<IProps> = ({ index, file, onChange }) => {
  const ref = useRef<HTMLInputElement | null>(null)

  const handleClick = () => {
    if (ref.current) {
      ref.current.click()
    }
  }

  return (
    <div className='flex items-center'>
      <div className='mr-12'>Select file {index}</div>
      <div>
        <input
          type='file'
          name={`file${index}`}
          hidden={true}
          ref={ref}
          onChange={onChange}
          accept='.csv'
        />
        <input
          className='mr-3 p-1 rounded-sm border border-slate-300 outline-0 active:border-slate-700 focus:border-slate-500 hover:border-slate-400 px-2'
          value={file?.name ?? ""}
          title={file?.name}
          readOnly
        />
        <button
          className='border outline-0 px-12 py-1 shadow-md hover:shadow-lg rounded-md'
          onClick={handleClick}
        >
          Browse...
        </button>
      </div>
    </div>
  )
}
