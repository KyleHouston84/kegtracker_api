const express = require('express');
const router = express.Router();
const mongoDb = require('../shared/mongo');
const collectionName = 'taps';


/* GET status of keg. */
router.get('/', function (req, res, next) {
    let filter;
    if (req.query.id) filter._id = ObjectId(req.query.id);

    mongoDb.get(filter, collectionName).then(result => {
        res.json({
            taps: result
        });
    });
});

router.post('/', (req, res, next) => {
    mongoDb.add(req.body, collectionName).then(result => {
        res.json({
            tap: result
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
        res.send("Missing tap ID");
    }
});

router.patch('/pour', (req, res, next) => {
    if (req.query.id) {
        const payload = {
            $inc: { 
                pours: 1,
                "keg.pours": 1
            }
        }
        mongoDb.findOneAndUpdate(req.query.id, payload, collectionName).then(result => {
            res.json({
                result: result
            });
        })
    }
});


module.exports = router;