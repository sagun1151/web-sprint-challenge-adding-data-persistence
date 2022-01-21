// build your `Resource` model here
const db = require('../../data/dbConfig')

function getResources(){
    return db('resources')
}

async function insert(data){
    const [resource_id] = await db('resources').insert(data);
    return getResources().where({ resource_id }).first()
}

module.exports = {
    getResources,
    insert

}