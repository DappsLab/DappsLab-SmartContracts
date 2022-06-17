import React, {useState} from 'react'
import {useRef} from 'react'
import {create} from 'ipfs-http-client'

const ipfsGateway = 'http://127.0.0.1:8080/ipfs/';
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
        let cid = ipfsGateway+state.value;
        setState({cid})


    }

    const handleFileChange = async (event) => {
        const fileObj = event.target.files && event.target.files[0]
        if (!fileObj) {
            return
        }

        console.log('fileObj is', fileObj)
        console.log('file name is', fileObj.name)

        // await ipfs.files.write(`/example/hello.txt`, "hello", {
        //   create: true,
        // })
        await ipfs.files.write('/example/' + fileObj.name, fileObj, {create: true})
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

    function editArticle(CID) {
    }

    return (
        <>
            <input type="text"
                   onChange={(e) => {
                       setState({...state, ['value']: e.target.value})
                       console.log(state['value'])
                   }}
                   placeholder="CID"
                   value={state['value']}
            />
            <button onClick={getArticle}>Get Article</button>
            <iframe src={state['cid']} width="500" height="500"></iframe>
            <div>
        <textarea
            onChange={(e) => {
                setState({...state, ['article']: e.target.article})
            }}
            placeholder="CID"
            value={state['article']}
        ></textarea>
                <button onClick={uploadToIpfs}>upload</button>
            </div>
            <div>
                <input
                    style={{display: 'none'}}
                    ref={inputRef}
                    type="file"
                    onChange={handleFileChange}
                />

                <button onClick={handleClick}>Open file upload box</button>
            </div>
        </>
    )
}

