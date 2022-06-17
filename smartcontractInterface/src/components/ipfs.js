import React, {useState} from 'react';
import {create} from 'ipfs-http-client'

const ipfs = create('http://localhost:5001')
console.log("ipfs", ipfs);

export default function IPFSForm() {

    // QmRtcvpnZdyUigMBcJLNHjDxnawBv5Cd9CbxRyNHy9SkrW
    // QmcexpHnCcAupjpnCmGFNYXN9WRbUb4DtYumdDVE5pJTSj
    // QmXSNdWa5FGmPqTrP3uGGXobuv8Bzb5NyzVHb2maCUmTYS
    const [state, setState] = useState({});

    async function uploadToIpfs() {
        //article content to ipfs as .txt file
        let article = state.value;
        const { cid } = await ipfs.add(article)
        // await ipfs.files.mkdir('/destination-directory')
        // let folderStatus = await ipfs.files.stat('/example')
        await ipfs.files.write('/example/article3.txt',article,{ create: true })
        // console.log('CID', cid);
        // console.log('folderStatus', folderStatus);
        // let ls = await ipfs.files.ls('/example')
        // let read = await ipfs.files.read('/article')
        // await ipfs.files.cp('/example/article.txt', '/destination-directory/article.txt', {parents: true})
        // console.log('all articles', ls);
        // console.log('read', read);
    }

    function getFromIpfs(CID) {
        //CID string
    }

    function editArticle(CID) {

    }

    return (<>
        <input type="text"/>
        <button>Get Article</button>
        <div>
            <textarea onChange={(e) => {
                setState({...state, ['value']: e.target.value});
            }}
                      placeholder="CID"
                      value={state['value']}></textarea>
            <button onClick={uploadToIpfs}>upload</button>
        </div>
    </>);
}