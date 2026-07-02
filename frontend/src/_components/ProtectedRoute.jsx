
import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { Navigate } from 'react-router-dom'


function ProtectedRoute({ children }) {
const { isAuthenticated, isLoading } = useAuth0()
if(isLoading) {
    return <h1>Loading...</h1>

}
if(isAuthenticated) {
    return children

}else  return <Navigate to="/" />

}

export default ProtectedRoute
