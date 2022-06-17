import React, {useState} from 'react';
import {connectToMetaMask, contractInterface} from "./blockchain";
import {hexToNumber, toWie, toEth} from "./utils";

export default ({name, search,type,stateMutability, inputs}) => {
  const [state, setState] = useState({});
  const [result, setResult] = useState('');
  const [hide, setHide] = useState(true);

  const handleFunctionCall = async () => {
    let resp = null;
    console.log('getParams - ', )
    if(state.value) {
      resp = await contractInterface[name](...getParams(), {value: toWie(state.value)})
    }
    else {
      resp = await contractInterface[name](...getParams())
    }
    console.log('resp - ', resp)
    if(resp._hex) {
      const num = hexToNumber(resp._hex);
      setResult(`ETH = ${toEth(num)} , WEI = ${num}`);
    }
    else {
      setResult(resp)
    }
  }

  const getParams = () => {
    let params = [];
    inputs.map(i => {
      params.push(state[i.name])
    })
    return params;
  }

  console.log(stateMutability, name)
  return (
    <div className={'card-container'} style={name?.toUpperCase().indexOf(search) > -1?{}:{display:"none"}}>
      <b onClick={()=>{setHide(!hide)}}>{name}</b>
      {!hide&&<>
        {
          inputs.map(input => <label> {input.name}
            <input
              onChange={(e) => {setState({...state, [input.name]: e.target.value});}}
              value={state[input.name]}
            />
          </label>)
        }
        {
          stateMutability === "payable" &&
          <label> Paybale amount
            <input
              onChange={(e) => {setState({...state, ['value']: e.target.value});}}
              placeholder="Eth"
              value={state['value']}
            />
          </label>
        }
        <button onClick={handleFunctionCall}>Call Function</button>
        {
          stateMutability==="view"&&result!==''&&<div>{result}</div>
        }
        {
          stateMutability!=="view"&&result!==''&&<a href={`https://rinkeby.etherscan.io/tx/${result.hash}`} target={'_blank'}>Successful</a>
        }
      </>}
    </div>
  )
}
