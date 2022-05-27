import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from "@mui/material"
import React, { useState } from "react"
import { useAppDispatch, useAppSelector } from "../../hooks"
import { dialogSlice } from "../../store/reducers/DialogSlice"
import { todoSlice } from "../../store/reducers/TodoSlice"

export function NewTaskDialog() {
  const { newTaskDialogOpened } = useAppSelector(s => s.dialogReducer)
  const { addTask } = todoSlice.actions
  const { setOpened } = dialogSlice.actions
  const dispatch = useAppDispatch()

  const [title, setTitle] = useState("")
  const [note, setNote] = useState("")
  const [deadline, setDeadline] = useState<Date | undefined>()

  const setNewTaskDialogOpened = (value: boolean) => {
    dispatch(setOpened(value))
  }

  const clearInputs = () => {
    setTitle("")
    setNote("")
    setDeadline(undefined)
  }

  const closeDialog = () => {
    clearInputs()
    setNewTaskDialogOpened(false)
  }

  const submitTask = () => {
    if(title.length === 0) {
      return
    }
    
    dispatch(addTask({
      title,
      note,
      deadlineUnix: deadline ? deadline.getTime() : undefined
    }))

    closeDialog()
  }

  return (
    <Dialog open={ newTaskDialogOpened } onClose={ () => setNewTaskDialogOpened(false) }>
      <DialogTitle>Новая задача</DialogTitle>
      <DialogContent>
        <Stack component="form" spacing={3}>
          <TextField
            autoFocus
            required
            margin="dense"
            label="Заголовок сообщения"
            type="text"
            fullWidth
            variant="standard"
            onChange={ e => setTitle(e.target.value) }
            value={ title }
            error={ title.length === 0 }
          />
          <TextField
            margin="dense"
            label="Примечание (необязательно)"
            type="text"
            multiline
            fullWidth
            variant="standard"
            onChange={ e => setNote(e.target.value) }
            value={ note }
          />
          <TextField
            label="Дата (необязательно)"
            type="date"
            variant="standard"
            sx={{ width: 220 }}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={ e => setDeadline(new Date(e.target.value)) }
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={ closeDialog }>Отмена</Button>
        <Button onClick={ submitTask }>Создать</Button>
      </DialogActions>
    </Dialog>
  )
}
