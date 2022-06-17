import React, { useState } from 'react'
import { useRef } from 'react'
import { create } from 'ipfs-http-client'

const ipfsGateway = 'http://127.0.0.1:8080/ipfs/'
const ipfs = create('http://localhost:5001')
console.log('ipfs', ipfs)

export default function IPFSForm() {
  const inputRef = useRef(null)
  const [state, setState] = useState({})

  const handleClick = () => {
    // 👇️ open file input box on click of other element
    inputRef.current.click()
  }
  const getArticle = async () => {
    let cid = ipfsGateway + state.value
    setState({ cid })
  }

  const handleFileChange = async (event) => {
    const fileObj = event.target.files && event.target.files[0]
    if (!fileObj) {
      return
    }

    // await ipfs.files.write(`/example/hello.txt`, "hello", {
    //   create: true,
    // })
    await ipfs.files.write('/example/' + fileObj.name, fileObj, {
      create: true,
    })
    // 👇️ reset file input
    event.target.value = null

    // await ipfs.files.write(`/example/hello.txt`, "hello", {
    //   create: true,
    // })
    await ipfs.files.write('/example/' + fileObj.name, fileObj, {
      create: true,
    })
    // 👇️ reset file input
    event.target.value = null

    // 👇️ is now empty
    console.log(event.target.files)

    // 👇️ can still access file object here
    console.log(fileObj)
    console.log(fileObj.name)
  }

  async function uploadToIpfs() {
    //article content to ipfs as .txt file
    // let article = state.article;
    // const { cid } = await ipfs.add(article)
    // await ipfs.files.mkdir('/destination-directory')
    // let folderStatus = await ipfs.files.stat('/example')
    // await ipfs.files.write('/example/article.txt',article,{ create: true })
    // console.log('CID', cid);
    // console.log('folderStatus', folderStatus);
    let ls = await ipfs.files.ls('/example')
    let read = await ipfs.files.read('/article')
    // await ipfs.files.cp('/example/article.txt', '/destination-directory/article.txt', {parents: true})
    console.log('all articles', ls)
    console.log('read', read)
  }

  function getFromIpfs(CID) {
    //CID string
  }

  return (
    <>
      <div className="flex flex-col bg-gray-100 rounded-md p-10 shadow-lg ">
        <div className="my-3">
          <input
            onChange={(e) => {
              setState({ ...state, ['value']: e.target.value })
              console.log(state['value'])
            }}
            placeholder="CID"
            value={state['value']}
            className="h-12 w-96 rounded-md focus:outline-none p-3"
          />
          <button
            onClick={getArticle}
            className="h-12 w-36 ml-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Get Article
          </button>
          <iframe src={state['cid']} className="w-full h-96 mt-5"></iframe>
        </div>

        <div className="flex flex-col items-end my-3">
          <textarea
            onChange={(e) => {
              setState({ ...state, ['article']: e.target.value })
            }}
            placeholder="Write content here!"
            value={state['article']}
            className="w-full rounded-md h-40 focus:outline-none p-3"
          ></textarea>
          <button
            onClick={uploadToIpfs}
            className="mt-5 h-12 w-36 ml-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            upload
          </button>
        </div>
        <div className="flex my-3 justify-end">
          <input
            style={{ display: 'none' }}
            ref={inputRef}
            type="file"
            onChange={handleFileChange}
          />

          <button
            onClick={handleClick}
            className="h-12 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Open File to Upload to IPFS
          </button>
        </div>
      </div>
    </>
  )
}
