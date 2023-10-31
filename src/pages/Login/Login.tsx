import React from 'react'
import { UseGeneralContext } from '../../contexts/GeneralContext'
import axios from 'axios'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import Cookies from 'universal-cookie'
import { jwtDecode } from 'jwt-decode'
import ErrorStatus from '../../components/Status/ErrorStatus'

const Login = () => {
  const { authState, authDispatch, cookies } = UseGeneralContext()
  const { username, password } = authState

  const navigate = useNavigate()
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()

    try {
      if (username && password) {
        const response = await axios.post('http://45.59.118.55/courier/login', {
          username,
          password,
        })

        const token = response.data
        const decoded: any = await jwtDecode(token)
        await cookies.set('jwt', token, {
          expires: new Date(1699951384 * 1000),
        })
        navigate('/upload')
        authDispatch({ type: 'get-token', payload: token })
        authDispatch({ type: 'succsess', payload: `Hello,${decoded.username}` })
        setTimeout(() => {
          authDispatch({ type: 'succsess', payload: '' })
        }, 3000)
      } else {
        console.log('input email and password')
      }
    } catch (error) {
      authDispatch({ type: 'error', payload: 'password invalide' })
      setTimeout(() => {
        authDispatch({ type: 'error', payload: '' })
      }, 3000)
    }
  }
  if (!authState.token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <ErrorStatus error={authState.error} />
        <div className="bg-white p-8 rounded shadow-lg max-w-xs w-full">
          <h2 className="text-2xl font-semibold text-center">Login</h2>
          <form className="mt-4">
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium"
              >
                Email
              </label>

              <input
                onChange={(e) =>
                  authDispatch({ type: 'username', payload: e.target.value })
                }
                type="email"
                id="email"
                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Your email"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-gray-700 font-medium"
              >
                Password
              </label>
              <input
                onChange={(e) =>
                  authDispatch({ type: 'password', payload: e.target.value })
                }
                type="password"
                id="password"
                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Your password"
              />
            </div>
            <button
              onClick={handleSubmit}
              type="submit"
              className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
            >
              Log In
            </button>
          </form>
        </div>
      </div>
    )
  } else {
    return <Navigate to="/upload" />
  }
}

export default Login
