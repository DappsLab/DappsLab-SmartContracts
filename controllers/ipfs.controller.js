const IpfsController =require('ipfs-http-client');
let fs = require('fs');
let ipfs = IpfsController.create("http://localhost:5001")

async function write(filePath, data){
    try {
        await fs.writeFileSync('upload/'+filePath, data, 'utf8');
    }catch (e) {
        console.log('error in writing file', e)
    }
}
async function read(filePath){
    try {
        let file = await fs.readFileSync('upload/'+filePath, 'utf8');
        return file;
    }catch (e) {
        console.log('error in reading file',e)
    }

}
module.exports = {
    read: async (req, res) => {
        let data = await ipfs.pin.add('QmabA6rX8uu4sERRwU5paRGNmwhoHggh7xbAtVrihho19Q');
        return data;
    },
    create: async (req, res) => {
        let {article, passport} = req.body;
        let data = {
            article,
            oldVersion:null,
        }
        let file = JSON.stringify(data)
        let fileName = new Date().getTime()+'.json';
        let filePath = '/example/'+passport+'/'+fileName;
        // await write(fileName, data);
        // let file = await read(fileName)

        try{
            await ipfs.files.mkdir('/example/'+passport, { parents: true });
        }catch (e) {
            console.log('ipfs dir error => ', e)
        }
        console.log('filePath', filePath);
        await ipfs.files.write(
            filePath,
            file,
            {create: true})
        let stat = await ipfs.files.stat(filePath)
        let cid = stat.cid.toString();
        await ipfs.pin.add(cid)
        return res.json({stat, cid});
    },
    update: async (req, res) => {
        let {article, passport, articleCID} = req.body;
        let data = {
            article,
            oldVersion:articleCID,
        }
        let fileName = new Date().getTime()+'.json';
        let filePath = '/example/'+passport+'/'+fileName;
        let file = JSON.stringify(data)
        try{
            await ipfs.files.mkdir('/example/'+passport, { parents: true });

        }catch (e) {
            console.log('ipfs dir error => ', e)
        }
        console.log('file path => ', filePath);
        await ipfs.files.write(
            filePath,
            file,
            {create: true})
        let stat = await ipfs.files.stat(filePath)
        let cid = stat.cid.toString();
        await ipfs.pin.add(cid)
        return res.json({stat, cid});
    },
}