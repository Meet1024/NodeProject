const express = require('express');
const router = express.Router();
const registerController = require('../controllers/registerController');

router.post('/', registerController.handleNewUser);

module.exports = router;


// const deleteUser = (req, res) => {
//     const user = data.employees.find(emp => emp.id === parseInt(req.body.id))
//     if (!user) {
//         res.sendStatus(404).write('Not Found')
//     }
//     const filteredArray = data.employees.filter(emp => emp.id !== user.id)
//     data.setData([...filteredArray])
//     res.json(data.employees)
// }