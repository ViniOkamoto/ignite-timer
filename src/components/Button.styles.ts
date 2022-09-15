import styled, {css} from 'styled-components';


export type ButtonVariant = "primary" | "secondary" | "danger" | "success";

interface ButtonProps {
    variant: ButtonVariant;
 };
const buttonVariants = {
    primary: 'purple',
    secondary: 'orange',
    danger: 'red',
    success: 'green',
}
export const ButtonContainer = styled.button<ButtonProps>`
    width: 100px;
    height: 50px;
    border: 0;
    border-radius: 8px;
    margin: 8px;

    background-color: ${props => props.theme.primary};
    color: ${props => props.theme.white};
    /* ${props => css`
    background-color: ${buttonVariants[props.variant]}
    `} */
`;