const express = require('express');
const router = express.Router();
const mongoDb = require('../shared/mongo');
const collectionName = 'kegs';


/* GET status of keg. */
router.get('/', function (req, res, next) {
    console.log("GET KEGS")
    let filter;
    if (req.query.id) filter._id = ObjectId(req.query.id);

    mongoDb.get(filter, collectionName).then(result => {
        res.json({
            kegs: result
        });
    });
});

router.post('/', (req, res, next) => {
    console.log("add req:", req.body);
    mongoDb.add(req.body, collectionName).then(result => {
        res.json({
            keg: result
        });
    });
});

router.patch('/', (req, res, next) => {
    if (req.query.id) {
        mongoDb.update(req.query.id, req.body, collectionName).then(result => {
            res.json({
                result: result
            });
        });
    } else {
        res.send("Missing document ID");
    }

});


module.exports = router;