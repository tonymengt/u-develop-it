const express = require('express');
const router = express.Router();
const db = require('../../db/connections');
const inputCheck = require('../../utils/inputCheck');

router.get('/candidates', (req, res) => {
    const sql = `SELECT c.*, p.name 
        FROM candidates as c 
        LEFT JOIN parties as p ON c.party_id = p.id`;

    db.query(sql, (err, results)=>{
        if (err) {
            res.status(500).json({err:err.message});
            return;
        }
        res.json({
            message: 'success',
            data: results
        });
    });
});


// fetching for a single candidates
router.get('/candidate/:id', (req, res) => {
    const sql = `SELECT c.*, p.name 
        FROM candidates as c
        LEFT JOIN parties as p ON c.party_id = p.id
        WHERE c.id=?`;
    const params = [req.params.id];

    db.query(sql,params, (err, row) => {
        if(err) {
            res.status(400).json({err:err.message});
            return;
        }
        res.json({
            message: 'success',
            data: row
        })
    })
})

router.delete('/candidate/:id', (req, res) =>{
    const sql = `DELETE FROM candidates WHERE id = ?`;
    const params = [req.params.id];

    db.query( sql, params, (err, results) => {
        if (err) {
            res.statusMessage(400).json({err:err.message});
        } else if (!results.affectedRows) {
            res.json({
                message: "candidates cannot be found!"
            });
        } else {
            res.json({
                message: "deleted",
                changes: results.affectedRows,
                id: req.params.id
            })
        }
    })
})

// Create a candidate
router.post('/candidate', ({body}, res) =>{
    const errors = inputCheck(body, 'first_name', 'last_name', 'industry_connected');
    if (errors) {
        res.status(400).json({err:errors});
        return;
    }

    const sql = `INSERT INTO candidates (first_name, last_name, industry_connected)
    VALUES (?,?,?)`;
    const params = [body.first_name, body.last_name, body.industry_connected];

    db.query (sql, params, (err, results) => {
        if (err) {
            res.status(400).json({err: err.message})
            return;
        }
        res.json({
            message: 'success',
            data: body
        });
    });
});

// update a candidate's party
router.put('/candidate/:id', (req, res) => {
    const errors = inputCheck(req.body, 'party_id');
    if(errors) {
        res.status(400).json({error:errors});
        return;
    }

    const sql = `UPDATE candidates SET party_id = ? WHERE id = ?`;
    const params = [req.body.party_id, req.params.id];

    db.query(sql, params, (err, results) => {
        if (err) {
            res.status(400).json({error:err.message});
        } else if (!results.affectedRows) {
            res.json({
                message: "candidate cannot be found!"
            });
        } else {
            res.json({
                message: "success",
                data: req.body,
                changes: results.affectedRows
            });
        }
    });
});

module.exports = router;