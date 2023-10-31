import React from 'react'

export default function ErrorStatus({ error }: { error: string }) {
  return (
    <>
      {error && (
        <p className="  bg-red-400  flex items-center justify-center text-center shadow-md  fixed left-1/2 top-20 transform -translate-x-1/2 -translate-y-1/2 transform   text-white w-[250px] h-[100px] rounded-[9px] text-[1.2rem] animate-slide-in">
          {error}
        </p>
      )}
    </>
  )
}
