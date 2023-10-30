import { createContext, useContext, useEffect, useReducer } from 'react'
import Cookies from 'universal-cookie'

type authState = {
  username: string

  password: string
  token: string
}

type authAction = {
  payload?: any
  type: string
}

type Cell = {
  authState: authState
  authDispatch: React.Dispatch<authAction>
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
  }

  const authRedcer = (state: authState, action: authAction) => {
    switch (action.type) {
      case 'username':
        return { ...state, username: state.username = action.payload }
      case 'password':
        return { ...state, password: state.password = action.payload }
      case 'get-token':
        return { ...state, token: state.token = action.payload }
      default:
        return state
    }
  }

  const [authState, authDispatch] = useReducer(authRedcer, initialauthState)

  useEffect(() => {
    const token = cookies.get('jwt')
    console.log(token)
    if (token) {
      authDispatch({ type: 'get-token', payload: token })
    }
  }, [])

  useEffect(() => {
    console.log(authState.token)
  }, [console.log(authState.token)])
  return (
    <GeneralContext.Provider value={{ authState, authDispatch }}>
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
