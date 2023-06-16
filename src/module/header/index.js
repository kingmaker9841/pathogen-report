import React from 'react'
import { Box, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { useTheme } from '@emotion/react'

const HeaderLogo = ({ ownerState }) => {
  const theme = useTheme()

  const color =
    theme.palette.mode === 'dark'
      ? theme.palette[ownerState.color].main
      : theme.palette[ownerState.color].dark

  return (
    <Box display="flex" justifyContent="start" alignItems="center">
      <Typography variant="h5" color={color}>
        Biological Hazard
      </Typography>
    </Box>
  )
}

const HeaderAvatar = () => {
  const AvatarContainer = styled('div')(() => {
    return {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }
  })
  const Avatar = styled('div')(({ theme }) => {
    return {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: theme.palette['primary'].main,
    }
  })
  return (
    <AvatarContainer>
      <Typography px={2}>Dhuni Tech</Typography>
      <Avatar />
    </AvatarContainer>
  )
}

const Header = (props) => {
  const { color = 'primary', theme, ...other } = props
  const ownerState = { color }

  const CustomContainer = styled('div')(() => {
    return {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '10px 16px',
      backgroundColor: 'white',
    }
  })
  return (
    <CustomContainer {...other}>
      <HeaderLogo ownerState={ownerState} />
      <HeaderAvatar {...other} />
    </CustomContainer>
  )
}

export default Header
