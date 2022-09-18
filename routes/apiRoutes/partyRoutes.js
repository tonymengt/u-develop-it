const express = require('express');
const router = express.Router();
const db = require('../../db/connections');


router.get('/parties', (req, res) => {
    const sql = `SELECT * FROM parties`;

    db.query(sql, (err, results) => {
        if (err) {
            res.status(500).json({error:err.message});
            return;
        }
        res.json({
            message:'success',
            data: results
        });
    });
});

router.get('/party/:id', (req, res )=> {
    const sql = `SELECT * FROM parties WHERE id = ?`
    const params = [req.params.id];

    db.query(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({error:err.message});
            return;
        }
        res.json({
            message: 'success',
            data: row
        });
    });
});


router.delete('/party/:id', (req, res) => {
    const sql = `DELETE FROM parties WHERE id =?`;
    const params = [req.params.id];

    db.query(sql, params, (err, results) => {
        if (err) {
            res.status(400).json({err:err.message});
        } else if (!results.affectedRows) {
            res.json({message: "party not found"});
        } else {
            res.json({
                message: "deleted",
                data: results.affectedRows,
                id: req.params.id
            });
        }
    });
});

module.exports = router;