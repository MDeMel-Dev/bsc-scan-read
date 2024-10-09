var express = require('express');
var util = require('../config/util.js');
var router = express.Router();
const contractInteraction = require('../services/bscscan/contractReadInteraction');

router.get('/', function(req, res) {
    res.render('partials/play', {
        title: 'Chess Hub - Game',
        user: req.user,
        isPlayPage: true
    });
});

router.post('/', function(req, res) {
    var side = req.body.side;
    //var opponent = req.body.opponent; // playing against the machine in not implemented
    var token = util.randomString(20);
    res.redirect('/game/' + token + '/' + side);
});

// New route to interact with the smart contract
router.get('/total-supply', async (req, res) => {
    try {
        const result = await contractInteraction.callContractFunction('totalSupply');
        
        res.json({ 
            success: true, 
            totalSupply: result.toString()
        });
    } catch (error) {
        console.error('Error interacting with contract:', error);
        res.status(500).json({ success: false, error: 'Failed to interact with the contract' });
    }
});

module.exports = router;