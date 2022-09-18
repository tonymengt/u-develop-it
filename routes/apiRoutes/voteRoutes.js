const express = require("express");
const router = express.Router();
const db = require("../../db/connections");
const inputCheck = require("../../utils/inputCheck");

router.get("/votes", (req, res) => {
  const sql = `SELECT candidates.*, parties.name AS party_name, COUNT(candidate_id) AS count                                                                                                
FROM votes
LEFT JOIN candidates ON votes.candidate_id = candidates.id
LEFT JOIN parties ON candidates.party_id = parties.id
GROUP BY candidate_id ORDER BY count DESC`;

  db.query(sql, (err, results) => {
    if (err) {
      res.status(500).json({ err: err.message });
      return;
    }

    res.json({
      message: "success",
      data: results,
    });
  });
});

router.post("/vote", (req, res) => {
  const errors = inputCheck(req.body, "voter_id", "candidate_id");
  if (errors) {
    res.status(400).json({ error: errors });
    return;
  }

  const sql = `INSERT INTO votes (voter_id, candidate_id) VALUE (?,?)`;
  const params = [req.body.voter_id, req.body.candidate_id];

  db.query(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ err: err.message });
    }
    res.json({
      message: "success",
      data: req.body,
      changes: row.affectedRows,
    });
  });
});

module.exports = router;
