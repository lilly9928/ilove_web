var express = require('express');
var router = require('express').Router();
var opDB = require(__lib + '/database').opDB;
var logger = require(__lib + '/logger');
var common = require('../lib/common');


router.get('/db/all', function (req, res) {
    var table = req.query.table;
    opDB.getAll(table, function (error, result) {
      if (error) {
        logger.error(`CODE: ${error.code}, SQL: ${error.sql}`);
        var resVal = common.getResult(error, result);
        res.status(resVal.code).send(resVal.result);
      }
      else {
        res.status(200).send(result);
      }
    });
  });

  router.get('/db/allOrderBy', function (req, res) {
    var table = req.query.table;
    var ofield = req.query.ofield;
    var order = req.query.order;
    if (order == '' || order == undefined || order == null) { order = "asc"; }
    opDB.getAllOrderBy(table, ofield, order, function (error, result) {
      if (error) {
        logger.error(`CODE: ${error.code}, SQL: ${error.sql}`);
        var resVal = common.getResult(error, result);
        res.status(resVal.code).send(resVal.result);
      }
      else {
        res.status(200).send(result);
      }
    });
  });

  router.get('/db/some', function (req, res) {
    var table = req.query.table;
    if (fields == '' || fields == undefined || fields == null) { fields = '*'; }
    opDB.getSome(table, fields, function (error, result) {
      if (error) {
        logger.error(`CODE: ${error.code}, SQL: ${error.sql}`);
        var resVal = common.getResult(error, result);
        res.status(resVal.code).send(resVal.result);
      }
      else {
        res.status(200).send(result);
      }
    });
  });

  router.get('/db/someOrderBy', function (req, res) {
    var table = req.query.table;
    var fields = req.query.fields;
    var ofield = req.query.ofield;
    var order = req.query.order;
    if (order == '' || order == undefined || order == null) { order = "asc"; }
    if (fields == '' || fields == undefined || fields == null) { fields = '*'; }
    opDB.getSomeOrderBy(table, fields, ofield, order, function (error, result) {
      if (error) {
        logger.error(`CODE: ${error.code}, SQL: ${error.sql}`);
        var resVal = common.getResult(error, result);
        res.status(resVal.code).send(resVal.result);
      }
      else {
        res.status(200).send(result);
      }
    });
  });

  router.get('/db/byCond', function (req, res) {
    var table = req.query.table;
    var cond = req.query.cond;
    opDB.getByCond(table, cond, function (error, result) {
      if (error) {
        logger.error(`CODE: ${error.code}, SQL: ${error.sql}`);
        var resVal = common.getResult(error, result);
        res.status(resVal.code).send(resVal.result);
      }
      else {
        res.status(200).send(result);
      }
    });
  });
  router.get('/db/someGroupBy', function (req, res) {
    var table = req.query.table;
    var fields = req.query.fields;
    var group = req.query.group;
    opDB.getSomeGroupBy(table, fields, group, function (error, result) {
      if (error) {
        logger.error(`CODE: ${error.code}, SQL: ${error.sql}`);
        var resVal = common.getResult(error, result);
        res.status(resVal.code).send(resVal.result);
      }
      else {
        res.status(200).send(result);
      }
    });
  });
  router.get('/db/someByCond', function (req, res) {
    var table = req.query.table;
    var fields = req.query.fields;
    var cond = req.query.cond;
    if (fields == '' || fields == undefined || fields == null) { fields = '*'; }
    opDB.getSomeByCond(table, fields, cond, function (error, result) {
      if (error) {
        logger.error(`CODE: ${error.code}, SQL: ${error.sql}`);
        var resVal = common.getResult(error, result);
        res.status(resVal.code).send(resVal.result);
      }
      else {
        res.status(200).send(result);
      }
    });
  });

  router.get('/db/orderByCond', function (req, res) {
    var table = req.query.table;
    var cond = req.query.cond;
    var order = req.query.order;
    opDB.getByCond(table, cond, order, function (error, result) {
      if (error) {
        logger.error(`CODE: ${error.code}, SQL: ${error.sql}`);
        var resVal = common.getResult(error, result);
        res.status(resVal.code).send(resVal.result);
      }
      else {
        res.status(200).send(result);
      }
    });
  });

  router.get('/db/field', function (req, res) {
    var table = req.query.table;
    opDB.getField(table, function (error, result) {
      if (error) {
        logger.error(`CODE: ${error.code}, SQL: ${error.sql}`);
        var resVal = common.getResult(error, result);
        res.status(resVal.code).send(resVal.result);
      }
      else {
        res.status(200).send(result);
      }
    });
  });
  
  router.post('/db', function (req, res) {
    var table, values;
    req.body.table == undefined ? table = req.query.table : table = req.body.table;
    req.body.values == undefined ? values = req.query.values : values = req.body.values;
    values = JSON.parse(values);
    opDB.add(table, values, function (error, result) {
      if (error) {
        logger.error(`CODE: ${error.code}, SQL: ${error.sql}`);
        var resVal = common.getResult(error, result);
        res.status(resVal.code).send(resVal.result);
      }
      else {
        res.status(200).send(result);
      }
  
    });
  });
  
  router.post('/db/multiple', function (req, res) {
    var table, values;
    req.body.table == undefined ? table = req.query.table : table = req.body.table;
    req.body.values == undefined ? values = req.query.values : values = req.body.values;;
    //values = JSON.parse(values);
    opDB.addMultiple(table, values, function (error, result) {
      if (error) {
        logger.error(`CODE: ${error.code}, SQL: ${error.sql}`);
        var resVal = common.getResult(error, result);
        res.status(resVal.code).send(resVal.result);
      }
      else {
        res.status(200).send(result);
      }
  
    });
  });
  
  router.delete('/db/byCond', function (req, res) {
    var table, values;
    req.body.table == undefined ? table = req.query.table : table = req.body.table;
    req.body.cond == undefined ? cond = req.query.cond : cond = req.body.cond;
    opDB.deleteByCond(table,cond,(error,result)=>{
      if(error){
        logger.error(`CODE: ${error.code}, SQL: ${error.sql}`);
        var resVal = common.getResult(error, result);
        res.status(resVal.code).send(resVal.result);
      } else {
        if (result.affectedRows == 0) {
          res.status(204).send(result);
        }
        else {
          res.status(200).send(result);
        }
      }
    })  
  });

  router.put('/db/byCond', function (req, res) {
    var table, values;
    req.body.table == undefined ? table = req.query.table : table = req.body.table;
    req.body.values == undefined ? values = req.query.values : values = req.body.values;
    req.body.cond == undefined ? cond = req.query.cond : cond = req.body.cond;
    values = JSON.parse(values);
    opDB.updateByCond(table, values, cond, function (error, result) {
      if (error) {
        logger.error(`CODE: ${error.code}, SQL: ${error.sql}`);
        var resVal = common.getResult(error, result);
        res.status(resVal.code).send(resVal.result);
      }
      else {
        if (result.affectedRows == 0) {
          res.status(204).send(result);
        }
        else {
          res.status(200).send(result);
        }
      }
    });
  });

  router.get('/db/searchByCond', function (req, res) {
    var table = req.query.table;
    var field = req.query.field;
    var value = req.query.value;
    if (field == 'all') {
      opDB.getField(table, function (error, result1) {
        if (error) {
          logger.error(`CODE: ${error.code}, SQL: ${error.sql}`);
          var resVal = common.getResult(error, result1);
          res.status(resVal.code).send(resVal.result);
        }
        else if (result1.length <= 0) {
          logger.error(`EMPTY FIELD, SQL: ${error.sql}`);
          res.status(204).send(result1);
        }
        else {
          var fields = [];
          for (var i = 0; i < result1.length; i++) {
            fields[i] = result1[i].Field;
          }
          opDB.searchAll(table, fields, value, function (error, result2) {
            if (error) {
              logger.error(`CODE: ${error.code}, SQL: ${error.sql}`);
              var resVal = common.getResult(error, result2);
              res.status(resVal.code).send(resVal.result);
            }
            else if (result2.length <= 0) {
              logger.error(`EMPTY VALUE, SQL: ${error.sql}`);
              res.status(204).send(result2);
            }
            else {
              res.status(200).send(result2);
            }
          });
        }
      });
    }
    else {
      opDB.searchByCond(table, field, value, function (error, result) {
        if (error) {
          logger.error(`CODE: ${error.code}, SQL: ${error.sql}`);
          var resVal = common.getResult(error, result);
          res.status(resVal.code).send(resVal.result);
        }
        else {
          if (result.length <= 0) {
            res.status(204).send(result);
          }
          else {
            res.status(200).send(result);
          }
        }
      });
    }
  });

  module.exports = router;

