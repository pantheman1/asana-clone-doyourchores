const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const { Zone, Chore, Squad, User } = require('../../db/models');


// localhost:5000/api/zones/zone/:id
router.get('/zone/:zoneId', asyncHandler(async (req, res) => {
    const zone = await Zone.findByPk(req.params.zoneId, {
        attributes: ['location'],
    });
    return res.json({ zone })
}))

router.get('/:userId', asyncHandler(async function (req, res) {
    // this query finds the USER'S squad id
    const squadId = await User.findByPk(req.params.userId, {
        attributes: ['squad_id']
    });
    // this query takes the user's squad id and finds the zones and 
    const squad = await Squad.findByPk(squadId.dataValues.squad_id, {
        include: {
            model: Zone,
            include: Chore
        }
    })
    return res.json({ squad });
}));

// localhost:5000/api/zones/:id
router.post('/:zoneId', asyncHandler(async (req, res) => {
    const {
        name,
        user_id,
        zone_id,
        estimated_time,
        description
    } = req.body;

    const newChore = await Chore.create({
        name: name,
        user_id: user_id,
        zone_id: zone_id,
        estimated_time: estimated_time,
        description: description
    })
    res.json({ newChore })
}))

module.exports = router;