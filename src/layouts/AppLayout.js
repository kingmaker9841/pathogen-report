import React from 'react'
import Header from '@module/header'
import { styled } from '@mui/material/styles'

const AppContainer = styled('div')(() => {
  return {
    minWidth: '100vw',
    minHeight: '100vh',
    backgroundColor: '#F5F5F5',
  }
})

const MainComponent = styled('main')(() => {
  return {
    minWidth: '100vw',
    minHeight: '100vh',
    maxWidth: '1920px !important'
  }
})

export const AppLayout = ({ children }) => {
  return (
    <AppContainer>
      <Header />
      <MainComponent>{children}</MainComponent>
    </AppContainer>
  )
}
