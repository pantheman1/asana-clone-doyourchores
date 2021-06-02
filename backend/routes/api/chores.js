const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const { Chore, Zone, User } = require('../../db/models')

//test comment

// localhost:5000/api/chores/:zoneId
router.get('/:zoneId', asyncHandler(async (req, res) => {
    //if user gives us a zone then we'll filter chores by that zone
    //else return all chores regardless of zone
    const { zoneId } = req.params;
    console.log("zoneId--", zoneId)

    let chores = await Chore.findAll({
        where: {
            zoneId
        }
    });
    if (req.query.zone !== undefined) {
        chores = chores.filter(chore => {
            return req.query.zone == chore.dataValues.zoneId
        })
    }

    if (req.query.user !== undefined) {
        chores = chores.filter(chore => {
            return req.query.user == chore.dataValues.userId
        })
    }
    return res.json(chores);
}))

// localhost:5000/api/chores/:id
router.patch('/:id', asyncHandler(async (req, res) => {
    const { id } = req.params;
    const chore = await Chore.findByPk(id);
    const { isComplete } = req.body;

    chore.isComplete = !isComplete
    await chore.save();


    //is there a way to do this without sending back ALL of the chores?////////////////
    let chores = await Chore.findAll();
    if (req.query.zone !== undefined) {
        chores = chores.filter(chore => {
            return req.query.zone == chore.dataValues.zoneId
        })
    }

    if (req.query.user !== undefined) {
        chores = chores.filter(chore => {
            return req.query.user == chore.dataValues.userId
        })
    }
    return res.json(chores)
}))



// localhost:5000/api/chores/:id
router.get('/:id', asyncHandler(async (req, res) => {
    const chore = await Chore.findByPk(req.params.id);
    return res.json({ chore });
}))

// localhost:5000/api/chores/:zoneId/completed 
// this will return all completed chores in a specific zone
router.get('/:id/completed', asyncHandler(async function (req, res) {
    const isCompleteChore = await Chore.findAll({
        where: {
            'isComplete': true,
            'zoneId': req.params.id
        }
    });
    // console.log("____>>>>>", isCompleteChore)
    return res.json(isCompleteChore)
}));

// localhost:5000/api/chores/:zoneId/incomplete
// this will return all incomplete chores in a specific zone
router.get('/:id/incomplete', asyncHandler(async function (req, res) {
    const isIncompleteChore = await Chore.findAll({
        where: {
            'isComplete': false,
            'zoneId': req.params.id
        }
    });
    return res.json(isIncompleteChore)
}));


module.exports = router;