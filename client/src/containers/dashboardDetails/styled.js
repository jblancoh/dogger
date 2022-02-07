import styled from 'styled-components'

export const Container = styled.div`
  align-items: center;
  background: #FFFFF9;
  display: flex;
  flex: 1;
  flex-wrap: wrap-reverse;
  justify-content: flex-start;
  padding: 5% 5%;
  flex-direction: column;
`

export const Title = styled.h3`
  font-size: 2rem;
  margin: 7.5px;
  ${({ align }) => `text-align: ${align};`}
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

export const DogBox = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #F6A970;
  overflow: hidden;
  width: 100%;
  height: 0;
  transition: .5s ease;
`

export const Section = styled.div`
  position: relative;
  width: 50%;
  &:hover ${DogBox} {
    height: 100%;
  }
`

export const Avatar = styled.img`
  display: block;
  width: 150px;
  height: 150px;
`

export const TextAge = styled.h3`
  font-size: 1rem;
  white-space: nowrap; 
  color: white;
  position: absolute;
  overflow: hidden;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

export const TextSize = styled.h3`
  font-size: 1rem;
  white-space: nowrap; 
  color: white;
  position: absolute;
  overflow: hidden;
  top: 35%;
  left: 50%;
  transform: translate(-50%, -50%);
`

export const TextBreed = styled.h3`
  font-size: 1rem;
  white-space: nowrap; 
  color: white;
  position: absolute;
  overflow: hidden;
  top: 20%;
  left: 50%;
  transform: translate(-50%, -50%);
`