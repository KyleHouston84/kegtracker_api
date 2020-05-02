const express = require('express');
const router = express.Router();
const mongoDb = require('../shared/mongo');
const collectionName = 'kegs';


/* GET status of keg. */
router.get('/', function (req, res, next) {
    console.log("GET KEGS")
    if (req.query.id) filter._id = ObjectId(req.query.id);

    mongoDb.get(filter, collectionName).then(result => {
        res.json({
            kegs: result
        });
    });
});

router.post('/', (req, res, next) => {
    mongoDb.add(req.body, collectionName).then(result => {
        res.json({
            keg: result
        });
    });
});

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



module.exports = router;