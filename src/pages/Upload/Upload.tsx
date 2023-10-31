import axios from 'axios'
import React, { useReducer, useRef, useState } from 'react'
import Webcam from 'react-webcam'
import { UseGeneralContext } from '../../contexts/GeneralContext'
import { Navigate } from 'react-router-dom'
import SuccsessStatus from '../../components/Status/SuccsessStatus'
function CameraComponent() {
  const { authState } = UseGeneralContext()
  const initialState = {
    firstName: '',
    lastName: '',
    address: '',
    age: '',
    photoBlob: null,
  }

  const reducer = (state: any, action: any) => {
    switch (action.type) {
      case 'SET_FIRST_NAME':
        return { ...state, firstName: action.payload }
      case 'SET_LAST_NAME':
        return { ...state, lastName: action.payload }
      case 'SET_ADDRESS':
        return { ...state, address: action.payload }
      case 'SET_AGE':
        return { ...state, age: action.payload }
      case 'SET_PHOTO':
        return { ...state, photoBlob: action.payload }
      default:
        return state
    }
  }
  const [state, dispatch] = useReducer(reducer, initialState)

  const webcamRef = useRef<Webcam | null>(null)

  const capture = () => {
    if (webcamRef.current) {
      const dataUri = webcamRef.current.getScreenshot({
        width: 1920,
        height: 1080,
      })

      dataURItoBlob(dataUri, (blob) => {
        dispatch({ type: 'SET_PHOTO', payload: blob })
      })
    }
  }
  const dataURItoBlob = (dataURI: any, callback: (blob: Blob) => void) => {
    const byteString = atob(dataURI.split(',')[1])
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
    const ab = new ArrayBuffer(byteString.length)
    const ia = new Uint8Array(ab)
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i)
    }
    const blob = new Blob([ab], { type: mimeString })
    callback(blob)
  }
  const removePhotoBlob = () => {
    dispatch({ type: 'SET_PHOTO', payload: null })
  }

  const handleSubmit = () => {
    const url = 'fake_url'
    const formData = new FormData()

    const { firstName, lastName, address, age, photoBlob } = state

    console.log(formData)
    axios
      .post(url, { firstName, lastName, address, age, photoBlob })
      .then((response) => {
        console.log('POST request success:', response)
      })
      .catch((error) => {
        console.error('POST request error:', error)
      })
  }
  if (authState.token) {
    return (
      <div className="container mx-auto p-4">
        <SuccsessStatus succsess={authState.succsess} />
        {authState.succsess}
        <h1 className="text-2xl font-bold mb-4">Capture Your Information</h1>
        <h1 className="text-2xl font-bold mb-4">Take a face photo</h1>
        <div className="mb-4">
          {!state.photoBlob && (
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
            />
          )}
          {state.photoBlob ? (
            <button
              className="bg-blue-500 text-white p-2 rounded"
              onClick={removePhotoBlob}
            >
              Re take photo
            </button>
          ) : (
            <button
              onClick={capture}
              className="bg-blue-500 text-white p-2 rounded"
            >
              Capture
            </button>
          )}
          {state.photoBlob && (
            <img
              src={URL.createObjectURL(state.photoBlob)}
              alt="Captured"
              className="mt-4"
            />
          )}
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="First Name"
            className="border rounded p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Last Name"
            className="border rounded p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Address"
            className="border rounded p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <input
            type="number"
            placeholder="Age"
            className="border rounded p-2 w-full"
          />
        </div>
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Submit
        </button>
      </div>
    )
  } else {
    return <Navigate to="/" />
  }
}

export default CameraComponent
