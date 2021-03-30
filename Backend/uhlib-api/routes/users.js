const express = require('express');
const router = express.Router();
const usersService = require('../services/usersService');

/* GET USERS WITH FILTER */
router.get('/', async function(req, res, next) {
  
//    req.params.filter

console.log(JSON.stringify(req.query));
 //   console.log(`${req.query.sort[1]} : ${req.query.filter.title}`);
    
   
  try {
    res.json(await usersService.getByFIlter(
      JSON.parse(req.query.sort),
      JSON.parse(req.query.range),
      JSON.parse(req.query.filter) ));
  } catch (err) {
    console.error(`Get error `, err.message);
    next(err);
  }
});

/* GET ALL USERS */
router.get('/allusers', async function(req, res, next) {
  try {
    res.json(await usersService.get(req.query.page));
  } catch (err) {
    console.error(`Get error `, err.message);
    next(err);
  }
});

/* GETUSER BY ID */
router.get('/find/:id', async function(req, res, next) {
    let id  = req.params.id;
    // console.log('id is ${id}');
    try {
      res.json(await usersService.getUser(id));
    } catch (err) {
      console.error(`Get error `, err.message);
      next(err);
    }
});

/* GET USER BY STATE */
router.get('/state/:name', async function(req, res, next) {
  let name  = req.params.name;
  // console.log('id is ${id}');
  try {
    res.json(await usersService.getUserByState(name));
  } catch (err) {
    console.error(`Get error `, err.message);
    next(err);
  }
});

/* POST NEW USER PARAM NO INJECTION */
router.post('/', async function(req, res, next) {
  console.log('Create user /')
  try {
    res.json(await usersService.createNoInjection(req.body));
  } catch (err) {
    console.error(`Error while creating new user`, err.message);
    next(err);
  }
});

/* POST NEW USER */
router.post('/createuser', async function(req, res, next) {
    let id  = req.params.id;
    // console.log('id is ${id}');
    try {
      res.json(await usersService.create(req));
    } catch (err) {
      console.error(`Error while creating new user `, err.message);
      next(err);
    }
});

/* UPDATE USER AT BASE*/

router.put('/:id', async function(req, res, next) {
  console.log('id is ${id}');

  
  try {
    res.json(await usersService.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Update error `, err.message);
    next(err);
  }
});

/* UPDATE USER  */

router.put('/updateuser/:id', async function(req, res, next) {
    console.log('id is ${id}');
    
    try {
      res.json(await usersService.updateNoBody(req));
    } catch (err) {
      console.error(`Update  error `, err.message);
      next(err);
    }
});

/* DELETE USER */

router.delete('/deleteuser', async function(req, res, next) {
    console.log('id is ${id}');
    try {
      res.json(await usersService.remove(req));
    } catch (err) {
      console.error(`Delete error `, err.message);
      next(err);
    }
});

module.exports = router;