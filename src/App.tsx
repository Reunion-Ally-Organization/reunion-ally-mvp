import { AuthProvider } from './contexts/AuthContext'
import HomePage from './features/homepage/homepage'

function App() {
  return (
    <AuthProvider>
      <HomePage />
    </AuthProvider>
  )
}

export default App
