interface IProps {
  records: Record<string, string>[] | null
}

export const Records: React.FC<IProps> = ({ records }) => {
  return (
    <div>
      <div className='grid grid-cols-8 border'>
        <div className='col-span-2 border'>Date</div>
        <div className='col-span-4 border'>Reference</div>
        <div className='col-span-2 border'>Amount</div>
      </div>
      {records?.map((record, index) => {
        return (
          <div key={`record-${index}`} className='grid grid-cols-8'>
            <div className='col-span-2 break-words border p-1'>
              {record.TransactionDate}
            </div>
            <div className='col-span-4 break-words border p-1'>
              {record.WalletReference}
            </div>
            <div className='col-span-2 break-words border p-1'>
              {record.TransactionAmount}
            </div>
          </div>
        )
      })}
    </div>
  )
}
