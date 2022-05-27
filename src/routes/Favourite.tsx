import React from 'react'
import { NoTasksBlock, TaskList } from '../components'
import { useAppSelector } from '../hooks'
import SaveToBookmarks from "../assets/SaveToBookmarks.svg"
import { Typography } from '@mui/material'

export default function Favourite() {
  const { todos } = useAppSelector(s => s.todoReducer)

  const favouriteTasks = todos.filter(({ favourite, deleted }) => favourite && !deleted)

  const emptyTaskList = () => {
    return (
      <NoTasksBlock
        iconSrc={ SaveToBookmarks }
        text={ "Избранные задачи появятся здесь" }
      />
    )
  }

  return (
    favouriteTasks.length === 0 ? emptyTaskList() : <><Typography variant="h4" fontWeight="bold" mb={2}>Избранные задачи</Typography><TaskList tasks={ favouriteTasks } /></>
  )
}
