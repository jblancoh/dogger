import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Modal from 'react-modal';
import { SetPet, GetPet } from '../../actions/pets'
import { GetWalkers, SetWalkerReserve, GetWalker } from '../../actions/walkers'
import { Table, Button, FormPets } from '../../components'
import { Formik } from 'formik'
import { toast } from 'react-toastify';
import {
  Container,
  Title,
  TableContainer,
  ButtonsContainer,
  SubTitle,
  Section,
  SectionModal,
  SectionList,
} from './styled'
import _ from 'lodash'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '40rem',
  },
};

const days = {
  'monday': 'L',
  'tuesday': 'M',
  'wednesday': 'X',
  'thursday': 'J',
  'friday': 'V',
  'saturday': 'S',
  'sunday': 'D',
}

const Dashboard = () => {
  const userData = useSelector(state => state.user)
  const [showForm, setShowForm] = useState(false)
  const [dataDogs, setDataDogs] = useState([])
  const [dataWalkers, setDataWalkers] = useState([])
  const [dogsToWalk, setDogsToWalk] = useState([])
  const [visibleModal, SetVisibleModal] = useState(false)
  const [selectedWalker, SetSelectedWalker] = useState('')
  const [selectedSchedules, SetSelectedSchedules] = useState([])
  const title = userData.data && userData.data.is_walker ? "Lista de mascotas asignadas" : "Dashboard"
  const columns = React.useMemo(
    () => [
      // {
      //   Header: userData.data && userData.data.is_walker ? 'Dueño' : 'Paseador',
      //   columns: [
      //     {
      //       Header: 'Foto',
      //       accessor: 'photo',
      //     },
      //     {
      //       Header: 'Nombre',
      //       accessor: 'first_name',
      //     },
      //     {
      //       Header: 'Apellido',
      //       accessor: 'last_name',
      //     },
      //     {
      //       Header: 'Telefono',
      //       accessor: 'phone_number',
      //     },
      //   ],
      // },
      {
        Header: userData.data && userData.data.is_walker ? 'Info Mascota' : 'Mi mascota',
        columns: [
          {
            Header: 'Nombre',
            accessor: 'name',
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
            accessor: 'breed',
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
  const data = React.useMemo(() => dataDogs, [dataDogs])

  const columnsWalkers = React.useMemo(
    () => [
      {
        Header: 'Paseador',
        columns: [
          {
            Header: 'Nombre',
            accessor: 'walker.first_name',
          },
          {
            Header: 'Apellido',
            accessor: 'walker.last_name',
          },
          {
            Header: 'Telefono',
            accessor: 'walker.phone_number',
          },
          {
            Header: 'Estado',
            accessor: 'status',
          },
          {
            Header: 'Acciones',
            accessor: 'actions',
          }
        ],
      },
    ],
    []
  )
  const dataTableWalkers = React.useMemo(() => dataWalkers, [dataWalkers])

  const columnsDogsToWalk = React.useMemo(() => [
    {
      Header: 'Mascota',
      columns: [
        {
          Header: 'Nombre',
          accessor: 'name',
        },
        {
          Header: 'Raza',
          accessor: 'breed',
        },
        {
          Header: 'Tamaño',
          accessor: 'size',
        },
        {
          Header: 'Horario asignado',
          accesor: 'schedule',
          Cell: (props) => {
            const { schedule } = props.row.original
            return schedule.map((item, index) => (
              <div key={`${item.day}_${index}`} style={{ border: '2px solid #D1551A', margin: 5, background: '#F6A970' }}>
                <p>{`Día: ${days[item.day]}`}</p>
                <p>{`Hora: ${item.hour}`}</p>
              </div>
            ))
          },
        },
        {
          Header: 'Telefono',
          accessor: 'client.phone',
        },
      ],
    },
  ],
    [])

  useEffect(() => {
    if (userData.data.is_walker) {
      GetMyData()
    } else {
      GetPetsByOwner()
      GetWalkersAvailable()
    }
  }, [])

  const setNewPet = async (params) => {
    params['owner_id'] = userData.data.id
    params['access_token'] = userData.access_token
    const dataDogsResponse = await SetPet(params)
    if (!_.isEmpty(dataDogsResponse)) {
      setShowForm(false)
      setDataDogs([...dataDogs, dataDogsResponse])

    }
  }

  const GetPetsByOwner = async () => {
    const dataDogsResponse = await GetPet(userData)
    if (!_.isEmpty(dataDogsResponse)) {
      setDataDogs(dataDogsResponse)
    }
  }

  const GetWalkersAvailable = async () => {
    const params = {}
    params['access_token'] = userData.access_token
    const dataWalkersResponse = await GetWalkers(params)
    if (!_.isEmpty(dataWalkersResponse)) {
      const walkers = dataWalkersResponse.map(item => {
        item['actions'] = <Button onPress={() => setDataForModal(item)}>
          Reservar
        </Button>
        return item
      })
      setDataWalkers(walkers)
    }
  }
  const GetMyData = async () => {
    const params = {}
    params['access_token'] = userData.access_token
    params['id'] = userData.data.id
    const dataWalkersResponse = await GetWalker(params)
    if (!_.isEmpty(dataWalkersResponse)) {
      setDogsToWalk(dataWalkersResponse.dogs)
    }
  }

  const setDataForModal = (data) => {
    if (_.isEmpty(data.schedules)) {
      return toast.error('Este paseador no cuenta con horarios disponibles')
    }
    SetVisibleModal(!visibleModal)
    SetSelectedWalker(data.id)
    SetSelectedSchedules(data.schedules)
  }

  const WalkerReserve = async ({ pet, schedules }) => {
    const params = {}
    params['access_token'] = userData.access_token
    params['walker_id'] = selectedWalker
    params['schedule_id'] = Number(schedules)
    params['dog_id'] = Number(pet)
    // WalkerReserve
    const dataWalkersResponse = await SetWalkerReserve(params)
    if (!_.isEmpty(dataWalkersResponse)) {
      return SetVisibleModal(false)
    }
  }

  return (
    <Container>
      <Title align='center'>{title}</Title>
      {userData.data.is_walker ?
        <>
          <SubTitle>My Dogs</SubTitle>
          <Section>
            <TableContainer>
              <Table columns={columnsDogsToWalk} data={dogsToWalk} />
            </TableContainer>
          </Section>
        </>
        :
        <>
          <SubTitle>My Dogs</SubTitle>
          <Section>
            {!showForm &&
              <ButtonsContainer>
                <>
                  <Button onPress={() => setShowForm(!showForm)}>
                    Agregar
                  </Button>
                </>
              </ButtonsContainer>
            }
            <TableContainer>
              {showForm ?
                <FormPets
                  submitForm={setNewPet}
                  setShowForm={setShowForm} />
                :
                <Table columns={columns} data={data} />
              }
            </TableContainer>
          </Section>
          <SubTitle>Walkers</SubTitle>
          <Section>
            <TableContainer>
              <Table columns={columnsWalkers} data={dataTableWalkers} />
            </TableContainer>
          </Section>
        </>
      }
      <Modal
        isOpen={visibleModal}
        onRequestClose={() => SetVisibleModal(false)}
        style={customStyles}
        contentLabel="Mascotas"
      >
        <Section>
          <SubTitle>Selecciona una mascota y un día a reservar</SubTitle>
        </Section>
        <SectionModal>
          <Formik
            initialValues={{
              pet: "",
              schedules: "",
            }}
            onSubmit={(props, actions) => {
              WalkerReserve(props)
            }}
          >
            {({
              values,
              handleChange,
              handleSubmit,
            }) => (
              <>
                <SectionList>
                  <Section>
                    <select
                      name="pet"
                      value={values.pet}
                      onChange={handleChange}
                    >
                      <option value="">-------</option>
                      {dataDogs.map((item) => {
                        return (
                          <option value={item.id}>{item.name}</option>
                        )
                      })}
                    </select>
                  </Section>
                  <Section>
                    <select
                      name="schedules"
                      value={values.schedules}
                      onChange={handleChange}
                    >
                      <option value="">-------</option>
                      {selectedSchedules.map((item) => {
                        return (
                          <option value={item.id}>{`${item.day_of_week} ${item.hour} ${item.size ? item.size.size : ''}`}</option>
                        )
                      })}
                    </select>
                  </Section>
                </SectionList>
                <Section>
                  <Button
                    onPress={handleSubmit}
                    wide
                  >
                    Reservar
                  </Button>
                </Section>
              </>)}
          </Formik>
        </SectionModal>
      </Modal>
    </Container>
  )
}

export default Dashboard