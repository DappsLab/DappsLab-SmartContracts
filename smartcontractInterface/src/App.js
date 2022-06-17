import './App.css';
import React, {useEffect, useState} from 'react'
import {connectToMetaMask, contractInterface} from "./blockchain";
import CONTRACT from './NFT.json'
import Form from './form'
import IPFS from './components/ipfs'
function App() {
  const functions = contractInterface?.functions;
  const [search,setSearch]=useState('')
  useEffect(() => {
    connectToMetaMask()
    console.log('contractInterface = ', contractInterface)

  }, [])
  // console.log('functions =  ', Object.keys(functions))
  const onchangeInput=(event)=> {

    let filter = event.target.value.toUpperCase();
    setSearch(filter)

  }
  return (
    <div className="App">
      <IPFS/>
      <input type="text" className="search-input" onChange={onchangeInput} placeholder="Search for Function.." title="Type in a name"/>
      <ul>
          {
            CONTRACT.abi.map(f => {
               return <Form {...f} search={search} />
            })
          }
      </ul>
    </div>
  );
}

export default App;
