import React from 'react'

type Inputpros = {
    placeholder: string,
    type: string,
    value?: string | number,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Input = ({ placeholder, type, value, onChange }: Inputpros) => {
  return (
    <input 
    className='w-full border border-zinc-700 bg-zinc-900 text-white rounded-lg px-4 py-3 text-left hover:border-zinc-500'
      placeholder={placeholder} 
      type={type} 
      value={value} 
      onChange={onChange} 
    />
  )
}

export default Input