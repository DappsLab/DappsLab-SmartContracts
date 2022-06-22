import React, {useState} from 'react'
import {connectToMetaMask, contractInterface} from './blockchain'
import {hexToNumber, toWie, toEth} from './utils'

export default ({name, search, type, stateMutability, inputs}) => {
    const [state, setState] = useState({})
    const [result, setResult] = useState('')
    const [hide, setHide] = useState(true)

    const handleFunctionCall = async () => {
        let resp = null
        console.log('getParams - ')
        if (state.value) {
            resp = await contractInterface[name](...getParams(), {
                value: toWie(state.value),
            })
        } else {
            resp = await contractInterface[name](...getParams())
        }
        console.log('resp - ', resp)
        if (resp._hex) {
            const num = hexToNumber(resp._hex)
            setResult(`ETH = ${toEth(num)} , WEI = ${num}`)
        } else {
            setResult(resp)
        }
    }

    const getParams = () => {
        let params = []
        inputs.map((i) => {
            params.push(state[i.name])
        })
        return params
    }
    console.log('hide:', hide)
    return (
        <div
            className={[stateMutability === 'view' ? "text-green-500 hover:text-green-700" : stateMutability === 'payable' ? "text-red-500 hover:text-red-700" : "text-yellow-500 hover:text-yellow-700", "flex flex-col flex-1 rounded-md py-2 px-6 shadow-lg"]}
            style={
                name?.toUpperCase().indexOf(search) > -1 ? {} : {display: 'none'}
            }
        >
            <b
                onClick={() => {
                    setHide(!hide)
                }}
            >
                <p className={"cursor-pointer"}>{name}</p>
            </b>
            {!hide && (
                <div className={"flex flex-row flex-1 justify-between flex-wrap"}>
                    <div className="flex flex-col w-96 p-10 border-2 bg-gray-100 rounded-md">
                        {inputs.map((input) => (
                            <label className={"text-black"}>
                                {' '}
                                {input.name}
                                <div className="flex justify-start">
                                    <input
                                        placeholder={input.type}
                                        className="h-12 w-full rounded-md focus:outline-none p-3 mb-3"
                                        onChange={(e) => {
                                            setState({...state, [input.name]: e.target.value})
                                        }}
                                        value={state[input.name]}
                                    />
                                </div>
                            </label>
                        ))}
                        {stateMutability === 'payable' && (
                            <div className={"flex flex-row"}>
                                <label>
                                    {' '}
                                    Paybale amount
                                    <input
                                        onChange={(e) => {
                                            setState({...state, ['value']: e.target.value})
                                        }}
                                        placeholder="Eth"
                                        value={state['value']}
                                    />
                                </label>
                            </div>
                        )}
                        <div className="flex justify-start">
                            <button
                                className={[stateMutability === 'view' ? "bg-green-500 hover:bg-green-700" : stateMutability === 'payable' ? "bg-red-500 hover:bg-red-700" : "bg-yellow-500 hover:bg-yellow-700", "h -12 w-full mt-5 text-white font-bold py-2 px-4 rounded"]}
                                onClick={handleFunctionCall}
                            >
                                Call Function
                            </button>
                        </div>
                    </div>
                    {result && <div className={"rounded-md bg-gray-100 min-w-[50%] p-10 shadow-lg"}>
                        <p>Result:</p>
                        {stateMutability === 'view' && result !== '' && Array.isArray(result) && <div className={"text-black"}>{

                            result.map((item) => {
                                return <p className={"break-words bg-gray-200 mb-1 border-2 rounded-md"}>{item}</p>
                            })

                        }</div>}
                        {stateMutability === 'view' && result !== '' && !Array.isArray(result) && <div className={"text-black"}>{result}</div>}
                        {stateMutability !== 'view' && result !== '' && (
                            <a
                                href={`https://rinkeby.etherscan.io/tx/${result.hash}`}
                                target={'_blank'}
                            >
                                Successful
                            </a>
                        )}
                    </div>}
                </div>
            )}
        </div>
    )
}
