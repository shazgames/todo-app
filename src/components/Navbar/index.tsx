import React from 'react'
import {
  Inbox as InboxIcon,
  StarOutline as StarIcon,
  CalendarMonth as CalendarIcon,
  Check as CompletedIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material'
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, SvgIconProps } from '@mui/material'
import { NavLink } from 'react-router-dom'

const navWidth = 280
const col2 = "rgb(99, 115, 129)"
const orangeColor = "#6A63F6"

interface NavBarButtonProps {
  title: string
  to: string
  icon: React.ReactElement<SvgIconProps>
}

const NavBarButton = ({title, to, icon}: NavBarButtonProps) => {
  return (
    <ListItem sx={{ padding: "2px 16px" }}>
      <NavLink to={ to } style={ ({isActive}) => ({ width: "100%", textDecoration: "none", color: isActive ? orangeColor : col2, backgroundColor: isActive ? "rgba(0, 171, 85, 0.08)" : "inherit", borderRadius: "8px", fontWeight: isActive ? 500 : 200 }) }>
        <ListItemButton sx={{ padding: "8px 12px 8px 16px" }}>
          <ListItemIcon sx={{ fontSize: 20, minWidth: 42, color: "inherit" }}>
            {{ ...icon}}
          </ListItemIcon>
          <ListItemText primary={ title } primaryTypographyProps={{ fontSize: 18, fontWeight: "inherit" }} />
        </ListItemButton>
      </NavLink >
    </ListItem>
  )
}

export function NavBar() {
  return (
    <Box sx={{ height: "100%", minWidth: navWidth, width: "100%", borderRight: "1px dashed rgba(145, 158, 171, 0.24)" }}>
      <nav>
        <List>
          <NavBarButton title={ "Все задачи" } to={ "/" } icon={ <InboxIcon /> } />
          <NavBarButton title={ "Сегодня" } to={ "/today" } icon={ <StarIcon /> } />
          <NavBarButton title={ "Избранные" } to={ "/favourite" } icon={ <CalendarIcon /> } />
          <NavBarButton title={ "Выполненные" } to={ "/completed" } icon={ <CompletedIcon /> } />
          <NavBarButton title={ "Корзина" } to={ "/bin" } icon={ <DeleteIcon /> } />
        </List>
      </nav>
    </Box>
  )
}