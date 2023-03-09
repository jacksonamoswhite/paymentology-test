export type TResult = {
  meta: {
    aborted: boolean
    truncated: boolean
    fields: string[]
  }
  data: Record<string, string>[]
}
