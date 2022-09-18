// const mysql = require('mysql2');
const express = require('express');
// const inputCheck = require('./utils/inputCheck');
// const { message } = require('statuses');
const db = require('./db/connections');
const apiRoutes = require('./routes/apiRoutes');


const PORT = process.env.PORT || 3001;
const app = express();

// express middleware
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use('/api', apiRoutes);

// const db = mysql.createConnection(
//     {
//         host: 'localhost',
//         user: 'root',
//         password: '',
//         database: 'election'
//     },
//     console.log('connected to the election database')
// );

// app.get('/api/candidates', (req, res) => {
//     const sql = `SELECT c.*, p.name 
//         FROM candidates as c 
//         LEFT JOIN parties as p ON c.party_id = p.id`;

//     db.query(sql, (err, results)=>{
//         if (err) {
//             res.status(500).json({err:err.message});
//             return;
//         }
//         res.json({
//             message: 'success',
//             data: results
//         });
//     });
// });


// // fetching for a single candidates
// app.get('/api/candidate/:id', (req, res) => {
//     const sql = `SELECT c.*, p.name 
//         FROM candidates as c
//         LEFT JOIN parties as p ON c.party_id = p.id
//         WHERE c.id=?`;
//     const params = [req.params.id];

//     db.query(sql,params, (err, row) => {
//         if(err) {
//             res.status(400).json({err:err.message});
//             return;
//         }
//         res.json({
//             message: 'success',
//             data: row
//         })
//     })
// })

// app.delete('/api/candidate/:id', (req, res) =>{
//     const sql = `DELETE FROM candidates WHERE id = ?`;
//     const params = [req.params.id];

//     db.query( sql, params, (err, results) => {
//         if (err) {
//             res.statusMessage(400).json({err:err.message});
//         } else if (!results.affectedRows) {
//             res.json({
//                 message: "candidates cannot be found!"
//             });
//         } else {
//             res.json({
//                 message: "deleted",
//                 changes: results.affectedRows,
//                 id: req.params.id
//             })
//         }
//     })
// })

// // Create a candidate
// app.post('/api/candidate', ({body}, res) =>{
//     const errors = inputCheck(body, 'first_name', 'last_name', 'industry_connected');
//     if (errors) {
//         res.status(400).json({err:errors});
//         return;
//     }

//     const sql = `INSERT INTO candidates (first_name, last_name, industry_connected)
//     VALUES (?,?,?)`;
//     const params = [body.first_name, body.last_name, body.industry_connected];

//     db.query (sql, params, (err, results) => {
//         if (err) {
//             res.status(400).json({err: err.message})
//             return;
//         }
//         res.json({
//             message: 'success',
//             data: body
//         });
//     });
// });

// // update a candidate's party
// app.put('/api/candidate/:id', (req, res) => {
//     const errors = inputCheck(req.body, 'party_id');
//     if(errors) {
//         res.status(400).json({error:errors});
//         return;
//     }

//     const sql = `UPDATE candidates SET party_id = ? WHERE id = ?`;
//     const params = [req.body.party_id, req.params.id];

//     db.query(sql, params, (err, results) => {
//         if (err) {
//             res.status(400).json({error:err.message});
//         } else if (!results.affectedRows) {
//             res.json({
//                 message: "candidate cannot be found!"
//             });
//         } else {
//             res.json({
//                 message: "success",
//                 data: req.body,
//                 changes: results.affectedRows
//             });
//         }
//     });
// });





// app.get('/api/parties', (req, res) => {
//     const sql = `SELECT * FROM parties`;

//     db.query(sql, (err, results) => {
//         if (err) {
//             res.status(500).json({error:err.message});
//             return;
//         }
//         res.json({
//             message:'success',
//             data: results
//         });
//     });
// });

// app.get('/api/party/:id', (req, res )=> {
//     const sql = `SELECT * FROM parties WHERE id = ?`
//     const params = [req.params.id];

//     db.query(sql, params, (err, row) => {
//         if (err) {
//             res.status(400).json({error:err.message});
//             return;
//         }
//         res.json({
//             message: 'success',
//             data: row
//         });
//     });
// });


// app.delete('/api/party/:id', (req, res) => {
//     const sql = `DELETE FROM parties WHERE id =?`;
//     const params = [req.params.id];

//     db.query(sql, params, (err, results) => {
//         if (err) {
//             res.status(400).json({err:err.message});
//         } else if (!results.affectedRows) {
//             res.json({message: "party not found"});
//         } else {
//             res.json({
//                 message: "deleted",
//                 data: results.affectedRows,
//                 id: req.params.id
//             });
//         }
//     });
// });
// db.query(`DELETE FROM candidates WHERE id =?`, 1, (err, results)=>{
//     if(err){
//         console.log(err);
//     }
//     console.log(results);
// });

// const sql = `INSERT INTO candidates (id, first_name, last_name, industry_connected)
//     VALUE(?,?,?,?)`;

// const params = [1, "Ronald", "Firbank", 1];

// db.query(sql, params, (err, result) => {
//     if (err){
//         console.log(err);
//     }
//     console.log(result);
// });


app.use((req, res) => {
    res.status(404).end();
});

db.connect(err => {
    if (err) throw err;
    console.log('Database connected');
    app.listen(PORT, () => {
        console.log(`server running on port ${PORT}`);
    });
});

