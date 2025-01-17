import React from 'react'
import {
  useLocation
} from "react-router-dom";
import {
  Container,
  Section,
  Title,
  DogBox,
  Avatar,
  TextAge,
  TextBreed,
  TextSize,
} from './styled'

const DashboardDetails = () => {
  let location = useLocation();
  const {
    name,
    breed,
    age,
    size,
  } = location.state
  return (
    <Container>
      <Title align='center'>{`Detalles de ${name}`}</Title>
      <Section>
        <Avatar src={require('../../assets/img/png/logo/dogger_logo.png')} alt="Avatar" />
        <DogBox>

          <TextBreed>{`Raza: ${breed}`}</TextBreed>
          <TextAge>{`Edad: ${age} año(s)`}</TextAge>
          <TextSize>{`Tamaño: ${size}`}</TextSize>

        </DogBox>
      </Section>
    </Container>
  )
}

export default DashboardDetails