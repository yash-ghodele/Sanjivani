
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import FarmerLayout from './layouts/FarmerLayout'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import Scan from './pages/Scan'
import Auth from './pages/Auth'

const queryClient = new QueryClient()

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<FarmerLayout />}>
                        <Route index element={<Landing />} />
                        <Route path="auth" element={<Auth />} />
                        <Route path="dashboard" element={<Dashboard />} />
                        <Route path="scan" element={<Scan />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    )
}
