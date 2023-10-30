import { createContext, useContext, useReducer } from 'react'

type authState = {
  username: string

  password: string
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
  const initialauthState: authState = {
    username: '',
    password: '',
  }

  const authRedcer = (state: authState, action: authAction) => {
    switch (action.type) {
      case 'username':
        return { ...state, username: state.username = action.payload }
      case 'password':
        return { ...state, password: state.password = action.payload }
      default:
        return state
    }
  }
  const [authState, authDispatch] = useReducer(authRedcer, initialauthState)

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
