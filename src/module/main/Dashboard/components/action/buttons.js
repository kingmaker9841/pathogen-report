import React from 'react'
import { Button, Box, Typography } from '@mui/material'
import { useTheme } from '@emotion/react'

const Cancel = ({ theme }) => {
  return (
    <Button sx={{ padding: '12px 40px', background: theme.palette.primary.light }}>
      <Typography variant='body1'>Cancel</Typography>
    </Button>
  )
}

const Save = ({ theme }) => {
  return (
    <Button sx={{
      padding: '12px 40px',
      background: theme.palette.primary.main,
      color: '#fff',
      '&:hover': {
        background: theme.palette.primary.dark
      }
    }} >
      <Typography variant='body1'>Save</Typography>
    </Button>
  )
}

const ActionBtns = () => {
  const theme = useTheme()
  return (
    <Box
      width={'100%'}
      height={'100%'}
      display={'flex'}
      justifyContent={'flex-end'}
      alignItems={'center'}
      px={10}
    >
      <Save theme={theme} />
      <Cancel theme={theme} />
    </Box>
  )
}

export default ActionBtns