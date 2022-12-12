import React, { ChangeEvent, useEffect, useState } from 'react'
import { OptionType } from '../types'

type Props = {
  term: string
  options: []
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void
  onOptionSelect: (option: OptionType) => void
  onSubmit: () => void
}

const Search = ({
  term,
  options,
  onInputChange,
  onOptionSelect,
  onSubmit,
}: Props): JSX.Element => {
  return (
    <main className="flex justify-center items-center bg-gradient-to-br from-sky-400 via-rose-400 to-lime-400 h-[100vh] w-full">
      <section className="w-full md:max-w-[500px] p-4 flex flex-col text-center items-center justify-center md:px-10 lg:p-24 h-full lg:h-[500px] bg-white bg-opacity-20 backdrop-blur-ls rounded drop-shadow-lg text-zinc-700">
        <h1 className="text-4xl font-thin">
          Weather<span className="font-black"> Forecast</span>
        </h1>
        <p className="text-sm mt-2">
          Enter your location and select and option.
        </p>
        <div className="relative flex mt-10 md:mt-4">
          <input
            type="text"
            value={term}
            className="px-2 py-1 rounded-1-md border-2 border-white"
            onChange={onInputChange}
          />
          <ul className="absolute top-9 bg-white m1-1 rounded-b-md">
            {options.map((option: OptionType, index: number) => (
              <li key={option.name + `-` + index}>
                <button
                  onClick={() => onOptionSelect(option)}
                  className="text-left text-sm w-full hover:bg-zinc-700 hover:text-white px-2 py-1 cursor-pointer"
                >
                  {`${option.name}, ${option.state}`}
                </button>
              </li>
            ))}
          </ul>
          <button
            onClick={onSubmit}
            className="rounded-r-md border-2 border-zinc-100 hover:border-zinc-500 hover:text-zinc-500  text-zinc-100 px-2 py-1 cursor-pointer"
          >
            Search
          </button>
        </div>
      </section>
    </main>
  )
}

export default Search
