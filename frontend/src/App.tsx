import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom'
import Layout from './layouts/Layout'
import Register from './pages/Register'
import SignIn from './pages/SignIn'
import AddHotel from './pages/AddHotel'
import { useAppContext } from './contexts/AppContext'
import MyHotels from './pages/MyHotels'

const App = () => {
  const { isLoggedIn } = useAppContext();
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout><div>Hello</div></Layout>} />
        <Route path="/search" element={<>Search</>} />
        <Route path='/sign-up' element={<Layout><Register /></Layout>} />
        <Route path='/sign-in' element={<Layout><SignIn /></Layout>} />
        {
          isLoggedIn && (
            <>
              <Route path="/add-hotel" element={<Layout><AddHotel /></Layout>} />
              <Route path="/my-hotels" element={<Layout><MyHotels /></Layout>} />
            </>
          )
        }
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  )
}

export default App