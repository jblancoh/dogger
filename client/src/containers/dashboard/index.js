import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Table, Button, FormPets } from '../../components'
import {
  Container,
  Logo,
  TextContainer,
  Title,
  TableContainer,
  ButtonsContainer,
  SubTitle,
  Paragraph
} from './styled'

const Dashboard = () => {
  const user = useSelector(state => state.user.data)
  const [showForm, setShowForm] = useState(false)
  const title = user.is_walker ? "Lista de mascotas asignadas" : "Mis mascotas"
  const columns = React.useMemo(
    () => [
      {
        Header: user.is_walker ? 'Dueño' : 'Paseador',
        columns: [
          {
            Header: 'Foto',
            accessor: 'photo',
          },
          {
            Header: 'Nombre',
            accessor: 'first_name',
          },
          {
            Header: 'Apellido',
            accessor: 'last_name',
          },
          {
            Header: 'Telefono',
            accessor: 'phone_number',
          },
        ],
      },
      {
        Header: user.is_walker ? 'Info Mascota' : 'Mi mascota',
        columns: [
          {
            Header: 'Avatar',
            accessor: 'avatar',
          },
          {
            Header: 'Edad',
            accessor: 'age',
          },
          {
            Header: 'Tamaño',
            accessor: 'size',
          },
          {
            Header: 'Raza',
            accessor: 'pet',
          },
          {
            Header: 'Fecha',
            accessor: 'schedule',
          },
        ],
      }
    ],
    []
  )
  const data = React.useMemo(() => [], [])

  return (
    <Container>
      <Title align='center'>{title}</Title>
      {!showForm &&
        <ButtonsContainer>
          <>
            <Button onPress={() => setShowForm(!showForm)}>
              Agregar
            </Button>
            <Button secondary>
              Editar
            </Button>
          </>
        </ButtonsContainer>
      }
      <TableContainer>
        {showForm ?
          <FormPets setShowForm={setShowForm} />
          :
          <Table columns={columns} data={data} />
        }
      </TableContainer>
    </Container>
  )
}

export default Dashboard