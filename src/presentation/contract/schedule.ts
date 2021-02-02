export interface Schedule {
  handle: (params?:any) => Promise<void>
}
