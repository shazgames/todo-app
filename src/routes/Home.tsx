import React from "react"
import {
  Add as AddIcon,
} from "@mui/icons-material"
import { Button, Fab, Typography } from "@mui/material"
import { useAppDispatch, useAppSelector } from "../hooks"
import NoTasksIcon from "../assets/NoTasks.svg"
import { NoTasksBlock, TaskList } from "../components"
import { dialogSlice } from "../store/reducers/DialogSlice"

export default function Home() {
  const { todos } = useAppSelector(s => s.todoReducer)
  const dispatch = useAppDispatch()

  const uncompletedTasks = todos
    .filter(t => !t.completed && !t.deleted)
    .sort((a, b) => {
      if (a.deadlineUnix == null) {
        return 1
      }
    
      if (b.deadlineUnix == null) {
        return -1
      }
    
      return a.deadlineUnix < b.deadlineUnix ? -1 : 1
    })

  
  const { setOpened } = dialogSlice.actions
  const setNewTaskDialogOpened = (value: boolean) => {
    dispatch(setOpened(value))
  }

  const openNewTaskDialog = () => setNewTaskDialogOpened(true)

  const emptyTaskList = () => {
    return (
      <NoTasksBlock
        iconSrc={ NoTasksIcon }
        text={ "Список ваших задач пуст" }
        actionButton={ <Button variant="contained" onClick={ openNewTaskDialog }>Создать задачу</Button> }
      />
    )
  }

  return (
    <>
      {uncompletedTasks.length == 0 ? emptyTaskList() : <>
        <Typography variant="h4" fontWeight="bold" mb={2}>Невыполненные задачи</Typography>
        <TaskList tasks={ uncompletedTasks } />
        <Fab color="primary" sx={{ position: "absolute", right: 16, bottom: 16 }} onClick={ openNewTaskDialog }>
          <AddIcon />
        </Fab>
      </>}
    </>
  )
}
