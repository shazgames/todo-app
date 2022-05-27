import React from 'react'
import { NoTasksBlock, TaskList } from '../components'
import { useAppDispatch, useAppSelector } from '../hooks'
import ThrowAway from "../assets/ThrowAway.svg"
import { Box, Button, Typography } from '@mui/material'
import { todoSlice } from '../store/reducers/TodoSlice'

export default function Deleted() {
  const { todos } = useAppSelector(s => s.todoReducer)
  const { clearBin } = todoSlice.actions
  const dispatch = useAppDispatch()

  const clearTasksBin = () => {
    dispatch(clearBin())
  }

  const emptyTaskList = () => {
    return (
      <NoTasksBlock
        iconSrc={ ThrowAway }
        text={ "Удаленные задачи появятся здесь" }
      />
    )
  }

  const deletedTasks = todos.filter(({ deleted }) => deleted)

  return (
    deletedTasks.length === 0 ?
      emptyTaskList()
      :
      <>
        <Box display={"flex"} alignItems={"center"} gap={2}>
          <Typography variant="h4" fontWeight="bold" mb={2}>Корзина</Typography>
          <Button variant="text" onClick={clearTasksBin}>Очистить корзину</Button>
        </Box>
        <TaskList tasks={ deletedTasks } />
      </>
  )
}
