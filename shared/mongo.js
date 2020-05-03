const mongoDb = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const ObjectID = require('mongodb').ObjectID;

const connect = (collectionName) => {
    console.log("connecting to mongo...")
    return new Promise((resolve) => {
        mongoDb.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }, (err, client) => {
            if (err) {
                console.error(err);
                resolve(err);
                return
            }
            const db = client.db('kegs');
            const collection = db.collection(collectionName);
            console.log("connected to mongodb", db)
            resolve(collection);
        });
    });
};

const get = (filter, collectionName) => {
    return new Promise((resolve) => {
        connect(collectionName).then(collection => {
            console.log("getting from mongodb...");
            collection.find(filter).toArray((err, logs) => {
                resolve(logs);
            });
        });
    });
}

const add = (message, collectionName) => {
    return new Promise((resolve) => {
        connect(collectionName).then(collection => {
            collection.insertOne(message, (err, result) => {
                resolve(result.ops);
            });
        });
    });
}

const update = (id, payload, collectionName) => {
    let selection = {};
    selection._id = ObjectID(id);
    console.log("Update with ", payload)
    return new Promise((resolve) => {
        connect(collectionName).then(collection => {
            collection.updateOne(selection, {
                $set: payload
            }, (err, result) => {
                resolve(result);
            });
        });
    });
}


const mongo = {
    get: get,
    add: add,
    update: update
}

module.exports = mongo;