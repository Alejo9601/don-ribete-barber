import Home from './pages/Home'
import Login from './pages/Login'
import { Route, Switch } from 'wouter'
import NotFound from './pages/NotFound'
import AdminPanel from './pages/AdminPanel'
import { UserContextProvider } from './context/UserContext'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Gallery } from './pages/Gallery'

function App() {
  return (
    <UserContextProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Switch>
          <Route path="/">
            <Home></Home>
          </Route>
          <Route path="/home">
            <Home></Home>
          </Route>
          <Route path="/gallery">
            <Gallery />
          </Route>

          <Route path="/admin-panel">
            <Login></Login>
          </Route>
          <Route path="/admin-panel/login">
            <Login></Login>
          </Route>
          <Route path="/admin-panel/home">
            <AdminPanel></AdminPanel>
          </Route>

          <Route>
            <NotFound></NotFound>
          </Route>
        </Switch>
      </LocalizationProvider>
    </UserContextProvider>
  )
}

export default App
