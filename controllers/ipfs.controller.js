const IPFS =require('ipfs-http-client');
let ipfs = IPFS.create("http://localhost:5001")

module.exports = {
    create: async (req, res) => {
        let {article, passport} = req.body;
        let data = {
            article,
            oldVersion:null,
        }
        let file = JSON.stringify(data)
        const {cid} = await ipfs.add(file)
        try{
            await ipfs.files.mkdir('/example/'+passport, { parents: true });
        }catch (e) {
            console.log('ipfs dir error => ', e)
        }
        await ipfs.files.write(
            '/example/'+passport+'/'+data.now()+'.json',
            file,
            {create: true})

        return cid;
    },
    update: async (req, res) => {
        let {article, passport, articleCID} = req.body;
        let data = {
            article,
            oldVersion:articleCID,
        }
        let file = JSON.stringify(data)
        const {cid} = await ipfs.add(file)
        try{
            await ipfs.files.mkdir('/example/'+passport, { parents: true });
        }catch (e) {
            console.log('ipfs dir error => ', e)
        }
        await ipfs.files.write(
            '/example/'+passport+'/'+data.now()+'.json',
            file,
            {create: true})
        return cid;
    },
}