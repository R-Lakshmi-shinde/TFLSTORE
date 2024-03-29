var sql = require("./mysqlconnect");

var Customer = function (Customer) {
  this.first_name = Customer.first_name;
  this.last_name = Customer.last_name;
  this.birth_date = Customer.birth_date;
  this.address = Customer.address;
  this.city = Customer.city;
  this.state = Customer.state;
};
Customer.createCustomer = function (newCustomer, result) {
  console.log("New Customer to be added ");
  console.log(newCustomer);
  sql.query("insert into customers set ?", newCustomer, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      console.log(res.insertId);
      result(null, res.insertId);
    }
  });
};

Customer.getCustomerById = function (CustomerId, result) {
  sql.query(
    "select * from customers where customer_id = ? ",
    CustomerId,
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        console.log("particular customers")
        result(null, res);
      }
    }
  );
};

Customer.getAllCustomer = function (result) {
  console.log("Invoking dal getall Customers");

  sql.query("select * from customers", function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      console.log("Customers : ", res);
      result(null, res);
    }
  });
};

Customer.updateById = function (id, Customer, result) {
  sql.query(
    "update customers SET first_name = ?,last_name = ?, birth_date = ?, address = ?,city = ?, state = ?  WHERE customer_id = ?",
    [
      Customer.first_name,
      Customer.last_name,
      Customer.birth_date,
      Customer.address,
      Customer.city,
      Customer.state,
      id,
    ],
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(null, err);
      } else {
        console.log("updated successfully")
        result(null, res);
      }
    }
  );
};

Customer.remove = function (id, result) {
  sql.query(
    "DELETE FROM customers WHERE customer_id = ?",
    id,
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(null, err);
      } else {
        console.log("customer deleted successfully")
        result(null, res);
      }
    }
  );
};

module.exports = Customer;
