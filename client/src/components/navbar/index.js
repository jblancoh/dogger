import React from 'react'
import { connect, useDispatch } from 'react-redux'
import { Link } from "react-router-dom";
import { LogoutUser } from "../../actions/account"
import { Button } from '../'
import {
  ButtonsContainer,
  Container,
  Logo,
  Title,
  TitleContainer,
  Label,
} from './styled'

const Navbar = (props) => {
  const dispatch = useDispatch()
  const { isLogged, user } = props
  const handleLogout = () => {
    dispatch(LogoutUser())
  }
  return (
    <Container>
      <TitleContainer>
        <Logo src={require('../../assets/img/png/logo/dogger_icon.png')} alt='Logo' />
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Title>
            Dogger
          </Title>
        </Link>
      </TitleContainer>
      {!isLogged ?
        (
          <ButtonsContainer>
            <Link to="/sign-up">
              <Button>
                Registrarse
              </Button>
            </Link>
            <Link to="/log-in">
              <Button secondary>
                Iniciar sesión
              </Button>
            </Link>
          </ButtonsContainer>
        )
        : <ButtonsContainer>
          <Label>
            {`Hola ${user ? user.first_name : ''}`}
          </Label>
          <Link to="/dashboard">
            <Button>
              Dashboard
            </Button>
          </Link>
          <Button onPress={handleLogout}>
            Cerrar sesión
          </Button>
        </ButtonsContainer>

      }
    </Container>
  )
}

const mapStateToProps = ({ account, user }) => ({
  isLogged: account.isLogged,
  user: user.data,
})

export default connect(mapStateToProps)(Navbar)