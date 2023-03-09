interface IProps {
  filename: string | undefined
  total: number | undefined
  unmatched: number | undefined
}

export const ComparedResult: React.FC<IProps> = ({
  filename,
  total,
  unmatched,
}) => {
  return (
    <div className='border p-5'>
      <div className='text-lg font-bold'>{filename}</div>
      <div className='grid grid-cols-4'>
        <div className='col-span-3'>Total Records:</div>
        <div>{total}</div>
      </div>
      <div className='grid grid-cols-4'>
        <div className='col-span-3'>Matching Records:</div>
        <div>{(total ?? 0) - (unmatched ?? 0)}</div>
      </div>
      <div className='grid grid-cols-4'>
        <div className='col-span-3'>Unmatched Records:</div>
        <div>{unmatched}</div>
      </div>
    </div>
  )
}
