const {exec} = require("child_process");
const IPFS =require('ipfs-http-client');
// const IPFS =require('ipfs');


const system = (command = 'ls -la') => {
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
    });
}

(async () => {
    // system('pwd');


// // connect to the default API address http://localhost:5001
//     const client = create()

// connect to a different API
    let ipfs = IPFS.create("http://localhost:5001")
//
// // connect using a URL
// //     const client = create(new URL('http://127.0.0.1:5002'))
//
// // call Core API methods
//     const { cid } = await ipfs.add('Hello world! i am not hello')
//     console.log("CID:", cid)


    // const ipfs = await IPFS.create()

    const data = 'Hello, i am qasim.       not'

// add your data to to IPFS - this can be a string, a Buffer,
// a stream of Buffers, etc
    const results = await ipfs.add(data)
    console.log("dir:", results);

    let dir =  await ipfs.files.mkdir('/example')
    console.log("dir:", dir);

    await ipfs.files.write(
        '/images/yourfile.jpg',
        imgdata,
        {create: true})
    console.log("CID:", results)

// we loop over the results because 'add' supports multiple
// additions, but we only added one entry here so we only see
// one log line in the output
//     for await (const { cid } of results) {
//         // CID (Content IDentifier) uniquely addresses the data
//         // and can be used to get it again.
//         console.log(cid.toString())
//     }
})()


