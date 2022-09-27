import React from 'react'
import styled from 'styled-components'
import { ToastContainer } from 'react-toastify'

export const StyledToastContainer = styled(ToastContainer).attrs({
  className: 'toast-container',
  toastClassName: 'toast',
  bodyClassName: 'body',
})`
  /* .toast is passed to toastClassName */
  .toast {
    background-color: ${(props) => props.theme['gray-800']};
  }

  button[aria-label='close'] {
    display: none;
  }

  /* .body is passed to bodyClassName */
  .body {
    color: ${(props) => props.theme['gray-100']};
  }
`
