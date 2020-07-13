
var moment      = require('moment');
                  require('moment-timezone');
                  moment.tz.setDefault("Asia/Seoul");

exports.getResult = function(error, result) {
    var resVal = {
      result: '',
      code: '',
      error: '',
    }
    if (!error) {
      if (result.length > 0) {
        resVal.result = result;
        resVal.code = 200;
        resVal.error = null;
      }
      else {
        resVal.result = null;
        resVal.code = 204;
        resVal.error = error;
      }
    }
    else {
      switch(error.code) {
        case 'ER_NO_SUCH_TABLE':
          resVal.result = null;
          resVal.code = 404;
          resVal.error = error;
        break;
        case 'ER_PARSE_ERROR':
          resVal.result = null;
          resVal.code = 400;
          resVal.error = error;
        break;
        case 'ER_BAD_FIELD_ERROR':
          resVal.result = null;
          resVal.code = 400;
          resVal.error = error;
        break;      
        case 'ER_WRONG_VALUE_COUNT_ON_ROW':
          resVal.result = null;
          resVal.code = 400;
          resVal.error = error;
        break;      
        case 'ER_DUP_ENTRY':
            resVal.result = null;
            resVal.code = 409;
            resVal.error = error;      
        break;
        default:
          resVal.result = null;
          resVal.code = 501;
          resVal.error = error;
      }
    }
    return resVal;
}