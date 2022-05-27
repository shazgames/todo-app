import React from 'react'
import { Box, Icon, Typography } from '@mui/material'

interface NoTasksBlockProps {
  iconSrc: string
  text: string
  actionButton?: JSX.Element
}

export function NoTasksBlock({ iconSrc, text, actionButton }: NoTasksBlockProps) {
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Box sx={{width: "50%", display: "flex", flexDirection: "column", gap: 2, alignItems: "center"}}>
        <Icon sx={{width: "100%", height: "auto"}}>
          <img src={ iconSrc } width={"100%"} height={"100%"} />
        </Icon>
        <Box sx={{ display: "flex", gap: 2, alignItems: "center", flexDirection: "column" }}>
          <Typography variant="h5" fontWeight={"medium"}>{ text }</Typography>
          { actionButton }
        </Box>
      </Box>
    </div>
  )
}
