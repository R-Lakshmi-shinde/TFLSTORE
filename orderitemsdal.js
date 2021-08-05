var sql = require("./mysqlconnect");

var OrderItem = function (OrderItem) {
  this.order_id = OrderItem.product_id;
  this.product_id = OrderItem.product_id;
  this.quantity = OrderItem.quantity;
  this.unit_price = OrderItem.unit_price;
};

OrderItem.createOrderItem = function (newOrderItem, result) {
  console.log("New Orderitem to be added ");
  console.log(newOrderItem);
  sql.query("INSERT INTO order_items values ?", newOrderItem, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      console.log(res.insertId);
      result(null, res.insertId);
    }
  });
};

OrderItem.getOrderItemById = function (OrderItemId, result) {
  sql.query(
    "select * from order_items where order_id = ? ",
    OrderItemId,
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        result(null, res);
      }
    }
  );
};

OrderItem.getAllOrderItem = function (result) {
  console.log("Invoking dal getall OrderItems");

  sql.query("SELECT * FROM order_items", function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      console.log("OrderItems : ", res);
      result(null, res);
    }
  });
};

OrderItem.updateById = function (id, OrderItem, result) {
  sql.query(
    "update order_items set quantity = ?,unit_price = ?  WHERE order_id = ? ",
    [
      OrderItem.quantity,
      OrderItem.unit_price,
      id
    ],
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(null, err);
      } else {
        result(null, res);
      }
    }
  );
};

OrderItem.remove = function (id,result) {
  sql.query(
    "DELETE FROM order_items WHERE order_id = ?",
    [id],
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(null, err);
      } else {
        result(null, res);
      }
    }
  );
};

module.exports = OrderItem;
