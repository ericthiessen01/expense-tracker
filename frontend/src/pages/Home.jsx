import React from 'react'
import Expense from '../components/Expense'
import {ContextProvider} from '../hooks/Context'

function Home() {
  return (
    <div className='bg-slate-50'>
      <ContextProvider>
        <Expense />
      </ContextProvider>
    </div>
  )
}

export default Home