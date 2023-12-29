import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom'
import Layout from './layouts/Layout'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout><div>Hello</div></Layout>} />
        <Route path="/search" element={<>Search</>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  )
}

export default App