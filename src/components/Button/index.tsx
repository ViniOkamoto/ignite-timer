import React, { ButtonHTMLAttributes } from 'react'
import { ButtonContainer, ButtonVariant } from './styles'
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  text: string
  icon?: React.RefAttributes<SVGSVGElement>
}

export function Button({
  variant = 'primary',
  text = 'Text',
  icon,
  ...props
}: ButtonProps) {
  return (
    <ButtonContainer variant={variant} {...props}>
      <>
        {icon} {text}
      </>
    </ButtonContainer>
  )
}
