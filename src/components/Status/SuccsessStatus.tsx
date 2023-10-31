import React from 'react'

export default function SuccsessStatus({ succsess }: { succsess: string }) {
  return (
    <>
      {succsess && (
        <p className="  flex items-center justify-center p-5 bg-green-400 shadow-md  fixed left-1/2 top-20 transform -translate-x-1/2 -translate-y-1/2 transform  text-center text-white font-bold w-[250px] h-[100px] rounded-[9px] text-[1rem] animate-slide-in">
          {succsess}
        </p>
      )}
    </>
  )
}
