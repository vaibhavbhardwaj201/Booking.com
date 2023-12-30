import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom'
import Layout from './layouts/Layout'
import Register from './pages/Register'
import SignIn from './pages/SignIn'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout><div>Hello</div></Layout>} />
        <Route path="/search" element={<>Search</>} />
        <Route path='/sign-up' element={<Layout><Register /></Layout>} />
        <Route path='/sign-in' element={<Layout><SignIn /></Layout>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  )
}

export default App