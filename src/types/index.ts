export interface Task {
  id: number
  title: string
  note: string
  completed: boolean
  deadlineUnix?: number
  favourite: boolean
  deleted: boolean
}
