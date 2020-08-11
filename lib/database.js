var mysql = require('mysql');
var config = require(__base + '/config.json');
var logger = require(__lib + '/logger');


var pool = mysql.createPool({
    connectionLimit: 100,
    host: config.DB.host,
    port: config.DB.port,
    user: config.DB.user,
    password: config.DB.password,
    database: config.DB.database
});
var opDB = {
    getAll: function (table, callback) {
        var query = `SELECT * FROM ${table}`;
        excuteQuery(query, callback);
    },
    getAllOrderBy: function (table, ofield, order, callback) {
        var query = `SELECT * FROM ${table} ORDER BY ${ofield} ${order}`;
        excuteQuery(query, callback);
    },
    getSome: function (table, fields, callback) {
        var query = `SELECT ${fields} FROM ${table}`;
        excuteQuery(query, callback);
    },
    getSomeOrderBy: function (table, fields, ofield, order, callback) {
        var query = `SELECT ${fields} FROM ${table} ORDER BY ${ofield} ${order}`;
        excuteQuery(query, callback);
    },
    getByCond: function (table, cond, callback) {
        var query = `SELECT * FROM ${table} WHERE ${cond}`;
        excuteQuery(query, callback);
    },
    getSomeByCond: function (table, fields, cond, callback) {
        var query = `SELECT ${fields} FROM ${table} WHERE ${cond}`;
        excuteQuery(query, callback);
    },
    getOrderByCond: function (table, cond, order, callback) {
        var query = `SELECT * FROM ${table} WHERE ${cond} ORDER BY ${order}`;
        excuteQuery(query, callback);
    },
    getSomeOrderByCond: function (table, fields, cond, order, callback) {
        if(fields == ''){
            fields = '*';
        }
        var query = `SELECT ${fields} FROM ${table} `;
        if(cond != ''){
            query += `WHERE ${cond} `
        }
        if(order != ''){
            query += `ORDER BY ${order}`; 
        }
        excuteQuery(query, callback);
    },  
    getSomeGroupBy: function (table, fields, group, callback) {
        if(fields == ''){
            fields = '*';
        }
        var query = `SELECT ${fields} FROM ${table} `;
        if(group != ''){
            query += `GROUP BY ${group} `
        }
        excuteQuery(query, callback);
    },
    getField: function (table, callback) {
        var query = `SHOW COLUMNS FROM ${table}`;
        excuteQuery(query, callback);
    },
    add: function (table, values, callback) {
        pool.getConnection(function(error, db) {
            db.query('INSERT INTO ?? SET ?', [table, values], function(error, result) {
                db.release();
                callback(error, result);
            });
        });
    },
    insert_image: function(user_id, image, image_usage, image_content, image_date, callback) {
        pool.getConnection(function(err, con){
            var sql = `insert into image(user_id, image, image_usage, image_content, image_date) values('${user_id}', '${image}', '${image_usage}', '${image_content}', '${image_date}')`
            con.query(sql, function(err, result) {
                con.release()
                if(err) callback(err)
                else callback(null, result)
            })
        })
      },
    addMultiple: function (table, values, callback) {
        var query = `INSERT INTO ${table} VALUES ${values}`;
        excuteQuery(query, callback);
    },
    deleteByCond: function (table, cond, callback) {
        var query = `DELETE FROM ${table} WHERE ${cond}`;
        excuteQuery(query, callback);
    },    
    updateByCond: function (table, values, cond, callback) {
        pool.getConnection(function(error, db) {
            db.query(query=`UPDATE ?? SET ? WHERE ${cond}`, [table, values], function(error, result) {
                db.release();
                callback(error, result);
            });
        });
    },
    searchByCond: function (table, field, value, callback) {
        var query = `SELECT * FROM ${table} WHERE ${field} like '%${value}%'`;
        excuteQuery(query, callback);
    },
    searchAll: function (table, fields, value, callback) {
        var query = `SELECT * FROM ${table} WHERE `;
        for (var i = 0; i < fields.length; i++) {
            if (i != fields.length - 1) {
                query += `${fields[i]} like '%${value}%' OR `;
            }
            else {
                query += `${fields[i]} like '%${value}%'`;
            }
        }
        excuteQuery(query, callback);
    },
};
var excuteQuery= function(query, callback) {
    if (query === undefined) {
    logger.error(`query is undefined`);
        callback(null, null);
    }
    else {
        pool.getConnection(function(error, db) {
            db.query(query, function(error, result) {
                /* db.release(); */
                callback(error, result);
            });
        });
    }
}
/* DB Transaction 조작 함수 */
var opDBTransaction = {
    getAll: function (db, table, callback) {
        var query = `SELECT * FROM ${table}`;
        db.query(query, function(error, result) {
            callback(error, result);
        });
    },
    getAllOrderBy: function (db, table, ofield, order, callback) {
        var query = `SELECT * FROM ${table} ORDER BY ${ofield} ${order}`;
        db.query(query, function(error, result) {
            callback(error, result);
        });
    },
    getSome: function (db, table, fields, callback) {
        var query = `SELECT ${fields} FROM ${table}`;
        db.query(query, function(error, result) {
            callback(error, result);
        });
    },
    getSomeOrderBy: function (db, table, fields, ofield, order, callback) {
        var query = `SELECT ${fields} FROM ${table} ORDER BY ${ofield} ${order}`;
        db.query(query, function(error, result) {
            callback(error, result);
        });
    },
    getByCond: function (db, table, cond, callback) {
        var query = `SELECT * FROM ${table} WHERE ${cond}`;
        db.query(query, function(error, result) {
            callback(error, result);
        });
    },
    getSomeByCond: function (db, table, fields, cond, callback) {
        var query = `SELECT ${fields} FROM ${table} WHERE ${cond}`;
        db.query(query, function(error, result) {
            callback(error, result);
        });
    },
    getOrderByCond: function (db, table, cond, order, callback) {
        var query = `SELECT * FROM ${table} WHERE ${cond} ORDER BY ${order}`;
        db.query(query, function(error, result) {
            callback(error, result);
        });
    },
    getSomeOrderByCond: function (db, table, fields, cond, order, callback) {
        if(fields == ''){
            fields = '*';
        }
        var query = `SELECT ${fields} FROM ${table} `;
        if(cond != ''){
            query += `WHERE ${cond} `
        }
        if(order != ''){
            query += `ORDER BY ${order}`; 
        }
        db.query(query, function(error, result) {
            callback(error, result);
        });
    },  
    getSomeGroupBy: function (db, table, fields, group, callback) {
        if(fields == ''){
            fields = '*';
        }
        var query = `SELECT ${fields} FROM ${table} `;
        if(group != ''){
            query += `GROUP BY ${group} `
        }
        db.query(query, function(error, result) {
            callback(error, result);
        });
    },
    getField: function (db, table, callback) {
        var query = `SHOW COLUMNS FROM ${table}`;
        db.query(query, function(error, result) {
            callback(error, result);
        });
    },
    add: function (db, table, values, callback) {
        db.query('INSERT INTO ?? SET ?', [table, values], function(error, result) {
            callback(error, result);
        });
    },
    addMultiple: function (db, table, values, callback) {
        var query = `INSERT INTO ${table} VALUES ${values}`;
        db.query(query, function(error, result) {
            callback(error, result);
        });
    },
    deleteByCond: function (db, table, cond, callback) {
        var query = `DELETE FROM ${table} WHERE ${cond}`;
        db.query(query, function(error, result) {
            callback(error, result);
        });
    },    
    updateByCond: function (db, table, values, cond, callback) {
        db.query(query=`UPDATE ?? SET ? WHERE ${cond}`, [table, values], function(error, result) {
            callback(error, result);
        });
    },
    searchByCond: function (db, table, field, value, callback) {
        var query = `SELECT * FROM ${table} WHERE ${field} like '%${value}%'`;
        db.query(query, function(error, result) {
            callback(error, result);
        });
    },
    searchAll: function (db, table, fields, value, callback) {
        var query = `SELECT * FROM ${table} WHERE `;
        for (var i = 0; i < fields.length; i++) {
            if (i != fields.length - 1) {
                query += `${fields[i]} like '%${value}%' OR `;
            }
            else {
                query += `${fields[i]} like '%${value}%'`;
            }
        }
        db.query(query, function(error, result) {
            callback(error, result);
        });
    },
};

module.exports = {
    excuteQuery,
    pool,
    opDB,
    opDBTransaction,

};
