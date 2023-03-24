<img src="https://user-images.githubusercontent.com/81385265/226909539-aa4886dd-f12c-4aa0-a9a5-2f5cd5162a96.png" />

# Simplificando React Context API
A Context API é uma funcionalidade do React que permite compartilhar dados entre componentes, sem precisar passar manualmente as propriedades através da hierarquia de componentes. A Context API permite que um componente “provê” um valor para um ou mais componentes “consumidores” em uma árvore de componentes.

<img src="https://user-images.githubusercontent.com/81385265/226910397-d7158d27-f9c1-4cff-8766-20d46f9917ec.png" width="500" />

## Segundo a documentação do [React](https://pt-br.reactjs.org/docs/context.html#gatsby-focus-wrapper):
Contexto (context) disponibiliza uma forma de passar dados entre a árvore de componentes sem precisar passar props manualmente em cada nível. Em uma aplicação típica do React, os dados são passados de cima para baixo (de pai para filho) via props, mas esse uso pode ser complicado para certos tipos de props (como preferências locais ou tema de UI), que são utilizadas por muitos componentes dentro da aplicação. Contexto (context) fornece a forma de compartilhar dados como esses, entre todos componentes da mesma árvore de componentes, sem precisar passar explicitamente props entre cada nível.

### Neste artigo, vamos ver como usar a Context API do React com Typescript.
Tecnologias:
- [Node.js](https://nodejs.org/en/download)
- [IDE Visual Studio Code](https://code.visualstudio.com/download)
- [Axios](https://axios-http.com/ptbr/docs/intro)
- [Json Server](https://www.npmjs.com/package/json-server)
- [Styled Components](https://styled-components.com/)

### Startar o projeto React usando Vite + TypeScript:
- abra seu terminal e vá à sua pasta de preferência.
- digite o comando  ```yarn create vite my-app --template react-ts```  e pressione a tecla enter do seu teclado.
- abra seu projeto no Visual Studio Code.
- após instalar os módulos do Node com o comando  yarn. 
 
você verá algo assim:

<img src="https://user-images.githubusercontent.com/81385265/226915423-40085640-7e1b-4f2a-94a1-af15e692318f.png" />

Na pasta ```src``` crie as subpasta ```pages/Home/index.tsx```, ```pages/Users/index.tsx``` e ```contexts/UsersContexts.tsx```.

# Criando a Context API
No arquivo  ```UsersContext.tsx```  dentro da pasta ```contexts```  adicione o seguinte código:

Esse código será necessário instalar o [Axios](https://axios-http.com/ptbr/docs/intro).
- importação do Axios.

```js
import axios from 'axios';
```

- importação do createContext, do useEffect e do useState. 

```js
import { createContext, useEffect, useState } from 'react';
```

- tipagens das informações que devo ter do usuário e do children que o tipo vem do próprio React.

```js
interface IUser {
  id: string;
  name: string;
  email: string;
}

interface IUsersContextType {
  users: IUser[];
}

interface IUsersProviderProps {
  children: React.ReactNode;
}
```

- aqui que acontece a criação do nosso contexto. O createContext é uma função do React que cria um objeto de contexto para compartilhar dados entre componentes, independentemente da profundidade da árvore de componentes.

```js
export const UsersContext = createContext({} as IUsersContextType);
```

- nossa função ```UsersProvider``` que vai fornecer as informações que precisamos compartilhar - nesse caso estamos fornecendo uma requisição HTTP GET dos dados de todos usuários cadastrados. Isso acontece ao colocaremos em volta do componente pai que abrange os componentes filhos. Quando queremos prover o contexto na aplicação toda, colocamos o nosso provedor em volta do  App.tsx  e é o que faremos já já. 

```js
export function UsersProvider({ children }: IUsersProviderProps) {
  const [users, setUsers] = useState<IUser[]>([])

  async function loadUsers() {
    await axios.get("http://localhost:3333/users")
      .then(response => setUsers(response.data))
      .catch(error => console.log(error))
  }

  useEffect(() => {
    loadUsers()
  }, [])
  ```
  
  - retorno que renderiza um componente chamado UsersContext.Provider que define o valor do contexto UsersContext como um objeto com a propriedade users definida como o estado atual de users, que foi definido pelo useState no componente UsersProvider. Dessa forma, outros componentes que consomem o UsersContext terão acesso ao valor do estado users por meio do objeto de contexto value. Além disso, o children é passado como filho do componente UsersContext.Provider, permitindo que os componentes filhos acessem o contexto UsersContext.

```js
 return (
    <UsersContext.Provider value={{ users }}>
      {children}
    </UsersContext.Provider>
  )
}
```

### Usaremos nosso provedor no ```App.tsx```   para  prover nosso contexto em toda aplicação. Lembrando que você pode usar onde lhe convier.

```js
import { MyRoutes } from './pages/MyRoutes';
import { UsersProvider } from './contexts/UsersContext';


function App() {

  return (
    <UsersProvider>
      <MyRoutes />
    </UsersProvider>
  )
}

export default App;
```

Após prover o contexto no ```App.tsx``` está tudo pronto, basta importá-lo nos componentes e os dados serão providos. 

Começando com a Home:
- importe o ```useContext``` do React e o contexto que criamos na pasta ```UsersContext```.

```js
import { useContext } from 'react';
import { UsersContext } from '../../contexts/UsersContext';
```

- desestruture o ```users``` dentro da função "Home" e passe como um argumanto para hook ```useContext```.

```js
const { users } = useContext(UsersContext)
```

Assim, podemos percorrer os dados com o "map" e ter acesso as informações dos usuários.

```js
{users.map(user => {
        return (
          <Content key={user.id}>
            <h2>{user.name}</h2>
            <h3>{user.email}</h3>
          </Content>
        )
      })}
```

Seguindo esses passos que fizemos na página "Home" podemos reproduzi-los em qualquer outra página ou componente da nossa aplicação.

### Os dados renderizados:

- Home
<img src="https://user-images.githubusercontent.com/81385265/226933836-8b6bc291-47f6-431c-a851-ee8316685ea2.png" />

- Users
<img src="https://user-images.githubusercontent.com/81385265/226933386-81bd4702-8ff0-4881-882d-8a3ad7cd413a.png" />


# Conclusão
Usar a Context API do React com Typescript pode parecer complicado à primeira vista, mas é uma técnica poderosa para compartilhar dados entre componentes de forma eficiente e sem erros. Neste artigo, vimos como criar um contexto com Typescript, fornecer um valor para ele e consumir esse valor em um componente. Com esses conceitos básicos, você pode começar a construir aplicações mais complexas e escaláveis com o React e o Typescript.


Repositório no GitHub: [@DaksonC](https://github.com/DaksonC/artigo-simplificando-react-context-api/tree/main/my-app) 



