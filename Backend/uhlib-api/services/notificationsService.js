const db = require('./db');
const helper = require('../helper');

async function getSingleUser(user_id){
    const rows = await db.query(
      `SELECT *
      FROM NOTIFICATIONS WHERE user_id = '${user_id}'`
    );
    const data = helper.cleanRows(rows);
    return data;
  }

  async function getUsers(){
    const rows = await db.query(
      `SELECT *
      FROM NOTIFICATIONS`
    );
    const data = helper.cleanRows(rows);
    var ndata = JSON.parse(JSON.stringify(data).split('"id":').join('"user_id":'));
    return ndata;
  }

  async function getEmployees(){
    const rows = await db.query(
      `SELECT *
      FROM EMPLOYEE_NOTIFICATIONS`
    );
    const data = helper.cleanRows(rows);
    var ndata = JSON.parse(JSON.stringify(data).split('"id":').join('"employee_id":'));
    return ndata;
  }

  async function getSingleEmployee(employee_id){
    const rows = await db.query(
      `SELECT *
      FROM EMPLOYEE_NOTIFICATIONS WHERE employee_id =${employee_id}`
    );
    const data = helper.cleanRows(rows);
    return data;
  }


  async function getOneEmployeeNotification(ID){
    const rows = await db.query(
      `SELECT *
      FROM EMPLOYEE_NOTIFICATIONS WHERE ID =${ID}`
    );
    const data = helper.cleanRows(rows);
    var ndata = JSON.parse(JSON.stringify(data).split('"employee_id":').join('"id":'));
    return ndata[0];
  }



  async function removeOneUserNotification(req){
    let id = req.body.id;
    let key_id = req.body.key_id;
    const result = await db.query(`
    DELETE FROM NOTIFICATIONS where ID= ${key_id} AND user_id=${id}`);

    let message = `Error in deleting user ${id}`;

    if (result.affectedRows) {
      message = `User ${id} deleted successfully`;
    }

  return {message};
}  

  async function removeUserNotification(req){
    let id = req.body.id;
    const result = await db.query(`
    DELETE FROM NOTIFICATIONS where user_id=${id}`);

    let message = `Error in deleting user ${id}`;

    if (result.affectedRows) {
      message = `User ${id} deleted successfully`;
    }

  return {message};
}  


async function removeOneEmployeeNotification(req){
  let id = req.body.id;
  const result = await db.query(`
  DELETE FROM EMPLOYEE_NOTIFICATIONS where ID= ${id}`);

  let message = `Error in deleting ${id}`;

  if (result.affectedRows) {
    message = `${id} deleted successfully`;
  }

return {message};
}  

async function removeEmployeeNotification(req){
  let id = req.body.id;
  const result = await db.query(`
  DELETE FROM EMPLOYEE_NOTIFICATIONS where employee_id=${id}`);

  let message = `Error in deleting employee ${id}`;

  if (result.affectedRows) {
    message = `employee ${id} deleted successfully`;
  }

return {message};
}

//ONE FILTER, EMPLOYEE VIEW?
FilterE = async(filter) =>{
  let pair = Object.keys(filter);
  let key  = pair[0];
  const rows = await db.query(
    `Select * from EMPLOYEE_NOTIFICATIONS where ${key}=${filter[key]}`
  );

  const data = helper.cleanRows(rows);
  console.log(data);
  return {
    data
  }
}


module.exports = {
    getUsers,
    getSingleUser,
    getEmployees,
    getSingleEmployee,
    getOneEmployeeNotification,
    removeOneUserNotification,
    removeUserNotification,
    removeOneEmployeeNotification,
    removeEmployeeNotification,
    FilterE,
}