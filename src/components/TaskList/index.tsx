import React from 'react'
import { List } from '@mui/material'
import { Task } from '../../types'
import { TaskListItem } from '../TaskListItem'

interface TaskListProps {
  tasks: Array<Task>
}

export function TaskList({ tasks }: TaskListProps) {
  return (
    <List disablePadding>
      { tasks.map(t => <TaskListItem task={ t } key={ t.id } />) }
    </List>
  )
}
