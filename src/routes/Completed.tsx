import React from 'react'
import { NoTasksBlock, TaskList } from '../components'
import { useAppSelector } from '../hooks'
import CompletedStepsIcon from "../assets/CompletedSteps.svg"

export default function Completed() {
  const { todos } = useAppSelector(s => s.todoReducer)

  const emptyTaskList = () => {
    return (
      <NoTasksBlock
        iconSrc={ CompletedStepsIcon }
        text={ "Выполненные задачи появятся здесь" }
      />
    )
  }

  const completedTasks = todos.filter(({ completed, deleted }) => completed && !deleted)

  return (
    completedTasks.length === 0 ? emptyTaskList() : <TaskList tasks={ completedTasks } />
  )
}
