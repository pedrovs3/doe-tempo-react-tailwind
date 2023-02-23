import { useState } from 'react'
import reactLogo from './assets/react.svg'
import {Header} from './components/Header';
import {Form} from "./components/Form";
import Voluntarios from './assets/img/voluntarios.svg'

function App() {
  return (
      <div className={'flex flex-2 flex-row bg-image w-screen h-screen p-4'}>
        <Header />
        <div className={'w-full flex flex-col h-full gap-5 items-center'}>
          <h1 className={'text-5xl font-bold text-white text-center'}>Voluntário</h1>
          <Form/>
        </div>
      </div>
  )
}

export default App
