import React, {useState} from 'react';
const IPFS = require('ipfs-http-client');
const ipfs = new IPFS({host:'127.0.0.1',port:8080,protocol:'https'});

export default function IPFSForm() {
    const [state, setState] = useState({});
    function uploadToIpfs(){
        //article content to ipfs as .txt file
        let article = state.value;


    }
    function getFromIpfs(CID){
        //CID string
    }
    function editArticle(CID){

    }
    return( <>
        <input type="text"/>
        <button >Get Article</button>
        <div>
            <textarea onChange={(e) => {setState({...state, ['value']: e.target.value});}}
                      placeholder="CID"
                      value={state['value']}></textarea>
            <button onClick={uploadToIpfs}>upload</button>
        </div>
    </>);
}