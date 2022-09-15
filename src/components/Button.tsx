
import {ButtonContainer, ButtonVariant} from './Button.styles';
interface ButtonProps {
    variant?: ButtonVariant;
 };

export function Button({variant = 'primary'}: ButtonProps) {
    console.log(variant);
    return (
        <ButtonContainer variant={variant}> Enviar </ButtonContainer>
    );
}