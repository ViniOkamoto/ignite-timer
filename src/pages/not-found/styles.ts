import styled from 'styled-components'

export const NotFoundContainer = styled.div`
  padding: 0 2rem;
  .wrapper {
    max-width: 74rem;
    height: calc(100vh - 10rem);
    margin: 5rem auto;
    padding: 10rem;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    align-items: center;
    background: ${(props) => props.theme['gray-800']};
    h1 {
      font-size: 10rem;
      color: ${(props) => props.theme['gray-600']};
    }
    h2 {
      font-size: 2rem;
      color: ${(props) => props.theme['gray-400']};
    }
    span {
      margin: 1rem 0 2rem 0;
      font-size: 1rem;
      color: ${(props) => props.theme['gray-400']};
    }
  }
`
