import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    :focus {
        outline: 0;
        box-shadow: none;
        
    }

    ::-webkit-scrollbar {
        height: 8px; 
        width: 8px; 
    }

    /* Track */
    ::-webkit-scrollbar-track {
        background: transparent;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: ${(props) => props.theme['gray-500']};
        border-radius: 8px;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
        background: ${(props) => props.theme['green-300']};
    }
    
    @media (max-width: 768px) {
    html {
        font-size: 80%;
    }
    }

    body {
        background: ${(props) => props.theme['gray-900']};
        color:  ${(props) => props.theme['gray-300']};
        -webkit-font-smoothing: antialiased;
    }

    body, input, textarea, button{

        font-family: 'Roboto', sans-serif;
        font-weight: 400;
        font-size: 1rem;
    }
`
