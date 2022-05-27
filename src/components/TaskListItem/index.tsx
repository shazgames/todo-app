import React from 'react'
import { ListItem, ListItemText, Button, ListItemButton, Stack, Typography, Chip, Menu, MenuItem } from '@mui/material'
import { useSnackbar } from 'notistack'
import { useAppDispatch } from '../../hooks'
import { todoSlice } from '../../store/reducers/TodoSlice'
import { Task } from '../../types'

interface TaskListItemProps {
  task: Task
}

export function TaskListItem({ task }: TaskListItemProps) {
  const { setCompleted, setFavourite, deleteTask } = todoSlice.actions
  const dispatch = useAppDispatch()

  const { enqueueSnackbar } = useSnackbar()

  const { id, title, note, completed, deadlineUnix, favourite, deleted } = task

  const setTaskCompleted = (id: number, value: boolean) => {
    dispatch(setCompleted({ id, completed: value }))

    if(value) {
      enqueueSnackbar("Задача выполнена", {
        action: <Button onClick={
          () => { dispatch(setCompleted({ id: id, completed: false })) }
        }>Отменить</Button>
      })
    }
  }

  const setTaskFavourite = (id: number, value: boolean) => {
    dispatch(setFavourite({ id, favourite: value }))

    enqueueSnackbar(value ? "Добавлено в избранное" : "Удалено из избранного")
  }

  const setTaskDeleted = (id: number, value: boolean) => {
    dispatch(deleteTask({ id, deleted: value }))

    if(value) {
      enqueueSnackbar("Задача удалена", {
        action: <Button onClick={
          () => { dispatch(deleteTask({ id, deleted: false })) }
        }>Отменить</Button>
      })
    }
  }

  const [contextMenu, setContextMenu] = React.useState<{
    mouseX: number;
    mouseY: number;
  } | null>(null);

  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    setContextMenu(
      contextMenu === null
        ? {
            mouseX: event.clientX - 2,
            mouseY: event.clientY - 4,
          }
        : // repeated contextmenu when it is already open closes it with Chrome 84 on Ubuntu
          // Other native context menus might behave different.
          // With this behavior we prevent contextmenu from the backdrop to re-locale existing context menus.
          null,
    );
  };

  const handleClose = () => {
    setContextMenu(null);
  };

  const tags = []

  if(deadlineUnix) {
    tags.push(new Date(deadlineUnix ).toLocaleDateString())
  }

  if(favourite) {
    tags.push("Избранное")
  }

  return (
    <ListItem disablePadding onContextMenu={ handleContextMenu } >
      <ListItemButton disableTouchRipple>
        <ListItemText
          primary={ title }
          primaryTypographyProps={{ fontWeight: "medium", fontSize: 20 }} 
          secondary={
            <Stack>
              { note.split("\n").map((n, i) => <Typography key={i}>{ n }</Typography>) }
              { tags.length > 0 && <Stack mt={1} direction="row" spacing={1}>{ tags.map((it, i) => <Chip key={i} label={it} />) }</Stack> }
            </Stack>
          }
          secondaryTypographyProps={{variant:"caption"}}
          />
      </ListItemButton>
      <Menu
        open={contextMenu !== null}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={
          contextMenu !== null
            ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
            : undefined
        }
      >
        <MenuItem onClick={() => {
          setTaskFavourite(id, !favourite)
          handleClose()
        }}>{ favourite ? "Убрать из избранного" : "Добавить в избранное" }</MenuItem>
        <MenuItem onClick={() => {
          setTaskCompleted(id, !completed)
          handleClose()
        }}>Пометить как { completed ? "невыполненное" : "выполненное" }</MenuItem>
        <MenuItem onClick={() => {
          setTaskDeleted(id, !deleted)
          handleClose()
        }}>{ deleted ? "Восстановить" : "Удалить" }</MenuItem>
      </Menu>
    </ListItem>
  )
}
