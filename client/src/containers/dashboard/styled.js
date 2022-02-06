import styled from 'styled-components'

export const Container = styled.div`
  align-items: center;
  background: #FFFFF9;
  display: flex;
  flex: 1;
  flex-wrap: wrap-reverse;
  justify-content: center;
  padding: 0 5%;
  flex-direction: column;
`

export const Logo = styled.img`
  flex: 1;
  padding: 0 5%;
`

export const TextContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  height: 90%;
  justify-content: space-evenly;
`

export const Title = styled.h3`
  font-size: 2rem;
  margin: 7.5px;
  ${({ align }) => `text-align: ${align};`}
`

export const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  flex: 6;
`

export const SubTitle = styled.h3`
  font-size: 2.5rem;
`

export const Paragraph = styled.p`
  font-size: 1.5rem;
`

export const ButtonsContainer = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  justify-content: flex-end;
  width: 100%;
  margin-right: 10px;
`
