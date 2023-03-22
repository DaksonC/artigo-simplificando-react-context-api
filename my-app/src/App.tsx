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
