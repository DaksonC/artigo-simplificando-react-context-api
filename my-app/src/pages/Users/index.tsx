import { useContext } from "react";

import { Container, Content, NavLink } from "./styles";
import { UsersContext } from "../../contexts/UsersContext";

export function Users() {
  const { users } = useContext(UsersContext)

  return (
    <Container>
      <h1>Users 👨🏻‍🦰</h1>
      <NavLink to="/">
        <button>Voltar à Home</button>
      </NavLink>
      {users.map(user => {
        return (
          <Content key={user.id}>
            <h2>{user.name}</h2>
            <h3>{user.email}</h3>
          </Content>
        )
      })}
    </Container>
  )
}