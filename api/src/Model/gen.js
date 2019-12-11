var Q = require('q');

 genricResponse(query){
  var deferred = Q.defer();

  connection.query(query, (err, rows) => {

    if (!err) {
      deferred.resolve(rows);
    } else {
      deferred.reject(new Error(err));
    }
  });
  return deferred.promise;

}
