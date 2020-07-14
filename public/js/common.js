function a2s_getDBAll(table, callback) {
    var res;
    $.ajax({
        url: "/api/db/all",
        type: "GET",
        data: {table: table},
        success: function(result, textStatus, jqXHR){
            //console.log(`result1`, result);
            //console.log(`status1`, jqXHR.status);
            callback(null, result);
        },
        error: function(jqXHR, error) {
            //console.log(`error1`, error);
            //console.log(`status1`, jqXHR.status);
            callback(error, null);
        }
    });
}
function a2s_getDBAllOrderBy(table, ofield, order, callback) {
    var res;
    $.ajax({
        url: "/api/db/allOrderBy",
        type: "GET",
        data: {table: table, ofield: ofield, order: order},
        success: function(result, textStatus, jqXHR){
            //console.log(`result1`, result);
            //console.log(`status1`, jqXHR.status);
            callback(result);
        },
        error: function(jqXHR, error) {
            //console.log(`error1`, error);
            //console.log(`status1`, jqXHR.status);
            callback(error);
        }
    });
}

function a2s_getDBSome(table, fields, callback) {
    var res;
    $.ajax({
        url: "/api/db/some",
        type: "GET",
        data: {table: table, fields: fields},
        success: function(result, textStatus, jqXHR){
            //console.log(`result1`, result);
            //console.log(`status1`, jqXHR.status);
            callback(result);
        },
        error: function(jqXHR, error) {
            //console.log(`error1`, error);
            //console.log(`status1`, jqXHR.status);
            callback(error);
        }
    });
}
function a2s_getDBSomeOrderBy(table, fields, ofield, order, callback) {
    var res;
    $.ajax({
        url: "/api/db/someOrderBy",
        type: "GET",
        data: {table: table, fields: fields, ofield: ofield, order: order},
        success: function(result, textStatus, jqXHR){
           //console.log(`result1`, result);
            //console.log(`status1`, jqXHR.status);
            callback(result);
        },
        error: function(jqXHR, error) {
           //console.log(`error1`, error);
            //console.log(`status1`, jqXHR.status);
            callback(error);
        }
    });
}
function a2s_getDBByCond(table, cond, callback) {
    var res;
    $.ajax({
        url: "/api/db/byCond",
        type: "GET",
        data: {table: table, cond: cond},
        success: function(result, textStatus, jqXHR){
           //console.log(`result1`, result);
            //console.log(`status1`, jqXHR.status);
            callback(result);
        },
        error: function(jqXHR, error) {
            //console.log(`error1`, error);
           //console.log(`status1`, jqXHR.status);
            callback(error);
        }
    });
}
function a2s_getDBSomeByCond(table, fields, cond, callback) {
    var res;
    $.ajax({
        url: "/api/db/someByCond",
        type: "GET",
        data: {table: table, fields: fields, cond: cond},
        success: function(result, textStatus, jqXHR){
            //console.log(`result1`, result);
            //console.log(`status1`, jqXHR.status);
            callback(result);
        },
        error: function(jqXHR, error) {
            //console.log(`error1`, error);
            //console.log(`status1`, jqXHR.status);
            callback(error);
        }
    });
}
function a2s_getDBField(table, callback) {
    var res;
    $.ajax({
        url: "/api/db/field",
        type: "GET",
        data: {table: table},
        success: function(result, textStatus, jqXHR){
            //console.log(`result1`, result);
            //console.log(`status1`, jqXHR.status);
            callback(result);
        },
        error: function(jqXHR, error) {
            //console.log(`error1`, error);
            //console.log(`status1`, jqXHR.status);
            callback(error);
        }
    });
}
function a2s_addDB(table, values, callback) {
    var res;
    $.ajax({
        url: "/api/db",
        type: "POST",
        dataType: 'json',
        data: jQuery.param({table: table, values: values}),
        success: function(result, textStatus, jqXHR){
            //console.log(`result1`, result);
            //console.log(`status1`, jqXHR.status);
            callback(result);
        },
        error: function(jqXHR, error) {
            //console.log(`error1`, error);
            //console.log(`status1`, jqXHR.status);
            callback(error);
        }
    });
}

function a2s_addMulitipleDB(table, values, callback) {
    $.ajax({
        url: "/api/db/multiple",
        type: "POST",
        dataType: 'json',
        data: jQuery.param({table: table, values: values}),
        success: function(result, textStatus, jqXHR){
            //console.log(`result1`, result);
            //console.log(`status1`, jqXHR.status);
            callback(result);
        },
        error: function(jqXHR, error) {
            //console.log(`error1`, error);
            //console.log(`status1`, jqXHR.status);
            callback(error);
        }
    });
}


function a2s_modifyDBByCond(table, values, cond, callback) {
    var res;
    $.ajax({
        url: "/api/db/byCond",
        type: "put",
        dataType: 'json',
        data: {table: table, values: values, cond: cond},
        success: function(result, textStatus, jqXHR){
            //console.log(`result1`, result);
            //console.log(`status1`, jqXHR.status);
            callback(result);
        },
        error: function(jqXHR, error) {
            //console.log(`error1`, error);
            //console.log(`status1`, jqXHR.status);
            callback(error);
        }
    });
}
function a2s_searchDBByCond(table, field, value, callback) {
    var res;
    $.ajax({
        url: "/api/db/searchByCond",
        type: "GET",
        data: {table: table, field: field, value: value},
        success: function(result, textStatus, jqXHR){
            //console.log(`result1`, result);
            //console.log(`status1`, jqXHR.status);
            callback(null, result);
        },
        error: function(jqXHR, error) {
            //console.log(`error1`, error);
            //console.log(`status1`, jqXHR.status);
            callback(error, null);
        }
    });
}

function a2s_getDBSomeGroupBy(table, fields, group, callback) {
    var res;
    $.ajax({
        url: "/api/db/someGroupBy",
        type: "GET",
        data: {table: table, fields: fields, group: group},
        success: function(result, textStatus, jqXHR){
            //console.log(`result1`, result);
            //console.log(`status1`, jqXHR.status);
            callback(result);
        },
        error: function(jqXHR, error) {
            //console.log(`error1`, error);
            //console.log(`status1`, jqXHR.status);
            callback(error, null);
        }
    });
}