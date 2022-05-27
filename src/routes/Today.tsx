import React from 'react'
import { NoTasksBlock, TaskList } from '../components'
import { useAppSelector } from '../hooks'
import ADayOffIcon from "../assets/ADayOff.svg"
import { Typography } from '@mui/material'

export default function Today() {
  const { todos } = useAppSelector(s => s.todoReducer)

  const todayTasks = todos.filter(({ completed, deleted, deadlineUnix }) => {
    return !completed && !deleted && deadlineUnix && new Date(deadlineUnix).toDateString() === new Date().toDateString()
  })

  const emptyTaskList = () => {
    return (
      <NoTasksBlock
        iconSrc={ ADayOffIcon }
        text={ "На сегодня задач нет :)" }
      />
    )
  }

  return (
    todayTasks.length === 0 ? emptyTaskList() : <><Typography variant="h4" fontWeight="bold" mb={2}>Задачи на сегодня</Typography><TaskList tasks={ todayTasks } /></>
  )
}
