import { jwtDecode } from 'jwt-decode'
import { createContext, useContext, useEffect, useReducer } from 'react'
import Cookies from 'universal-cookie'

type authState = {
  username: string

  password: string
  token: string
  userData: any
  succsess: string
  error: string
}

type authAction = {
  payload?: any
  type: string
}

type Cell = {
  authState: authState
  authDispatch: React.Dispatch<authAction>
  cookies: any
}

const GeneralContext = createContext<Cell | null>(null)

export const GeneralContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const cookies = new Cookies()

  const initialauthState: authState = {
    username: '',
    password: '',
    token: '',
    userData: {},
    succsess: '',
    error: '',
  }

  const authRedcer = (state: authState, action: authAction) => {
    switch (action.type) {
      case 'username':
        return { ...state, username: state.username = action.payload }
      case 'password':
        return { ...state, password: state.password = action.payload }
      case 'get-token':
        return { ...state, token: state.token = action.payload }
      case 'user-data':
        return { ...state, userData: state.userData = action.payload }
      case 'succsess':
        return { ...state, succsess: state.succsess = action.payload }
      case 'error':
        return { ...state, error: state.error = action.payload }

      default:
        return state
    }
  }

  const [authState, authDispatch] = useReducer(authRedcer, initialauthState)

  useEffect(() => {
    const getDecodedInfo = async () => {
      const token = cookies.get('jwt')

      if (token) {
        const decoded: any = await jwtDecode(token)
        authDispatch({ type: 'user-data', payload: decoded })
      }
    }

    getDecodedInfo()
  }, [])

  return (
    <GeneralContext.Provider value={{ authState, authDispatch, cookies }}>
      {children}
    </GeneralContext.Provider>
  )
}

export const UseGeneralContext = () => {
  const context = useContext(GeneralContext)
  if (!context) {
    throw new Error('Context Not Wrapped Reload Page')
  }

  return context
}
