import "./App.css"
import { ChangeEvent, useEffect, useMemo, useState } from "react"
import Papa from "papaparse"

import { Frame } from "./components/Frame"
import { FileInput } from "./components/FileInput"
import { TResult } from "./types"
import { ComparedResult } from "./components/ComparedResult"
import { Records } from "./components/Records"

function App() {
  // State to store parsed data
  const [form, setForm] = useState<{ file1: File | null; file2: File | null }>({
    file1: null,
    file2: null,
  })
  const [records, setRecords] = useState<{
    file1: TResult | null
    file2: TResult | null
  }>({
    file1: null,
    file2: null,
  })
  const [unmatchedRecords, setUnmatchedRecords] = useState<{
    file1: Record<string, string>[] | null
    file2: Record<string, string>[] | null
  }>({
    file1: null,
    file2: null,
  })
  const [showingComparedResults, setShowingComparedResults] = useState(false)
  const [showingUnmatchedReport, setShowingUnmatchedReport] = useState(false)
  const isCompareDisabled = useMemo(() => {
    return !(records["file1"]?.data.length && records["file2"]?.data.length)
  }, [records])

  const compare = () => {
    setShowingComparedResults(true)

    const firstFile = records["file1"]
    const secondFile = records["file2"]
    const secondRecords = secondFile
      ? [...secondFile.data.flatMap((element) => JSON.stringify(element))]
      : []
    const firstRecords = firstFile
      ? [...firstFile.data.flatMap((element) => JSON.stringify(element))]
      : []
    const tempUnmatchedFirstRecords = firstRecords.filter((record) => {
      const index = secondRecords.indexOf(record)
      if (index > -1) {
        secondRecords.splice(index, 1)
        return false
      }
      return true
    })

    setUnmatchedRecords({
      file1: tempUnmatchedFirstRecords.flatMap((element) =>
        JSON.parse(element)
      ),
      file2: secondRecords.flatMap((element) => JSON.parse(element)),
    })
  }

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, files },
    } = event

    if (!files) {
      return
    }

    setForm({ ...form, [name]: files[0] })

    Papa.parse(files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results: any) {
        setRecords({ ...records, [name]: results })
      },
    })
  }

  return (
    <div className='lg:max-w-screen-xl mx-auto pt-20 pb-5 px-5 space-y-12'>
      <Frame label='Specify files to compare' className='pt-5 px-4 pb-2'>
        <div className='grid grid-cols-9'>
          <div className='col-span-7 space-y-8'>
            <FileInput index={1} onChange={onChange} file={form["file1"]} />
            <FileInput index={2} onChange={onChange} file={form["file2"]} />
          </div>
          <div className='col-span-2 grid items-end'>
            <button
              className='border outline-0 px-4 py-1 cursor-pointer shadow-md hover:shadow-lg disabled:opacity-50 disabled:shadow-md rounded-md'
              disabled={isCompareDisabled}
              onClick={compare}
            >
              Compare
            </button>
          </div>
        </div>
      </Frame>
      {showingComparedResults && (
        <Frame label='Comparison results'>
          <div className='grid grid-cols-2'>
            <ComparedResult
              filename={form.file1?.name}
              total={records.file1?.data.length}
              unmatched={unmatchedRecords.file1?.length}
            />
            <ComparedResult
              filename={form.file2?.name}
              total={records.file2?.data.length}
              unmatched={unmatchedRecords.file2?.length}
            />
          </div>
          <div className='mt-5 text-center'>
            <button
              className='border  outline-0 px-4 py-1 cursor-pointer shadow-md hover:shadow-lg disabled:opacity-50 disabled:shadow-md rounded-md'
              onClick={() => setShowingUnmatchedReport(true)}
            >
              Unmatched Report
            </button>
          </div>
        </Frame>
      )}
      {showingUnmatchedReport && (
        <Frame label='Unmatched Report' className=''>
          <div className='grid grid-cols-2 pb-3'>
            <div>{form.file1?.name}</div>
            <div>{form.file2?.name}</div>
          </div>
          <div className='grid-cols-2 grid max-h-[500px] overflow-y-scroll'>
            <Records records={unmatchedRecords.file1} />
            <Records records={unmatchedRecords.file2} />
          </div>
        </Frame>
      )}
    </div>
  )
}

export default App
