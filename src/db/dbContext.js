const sqlite3 = require('sqlite3').verbose();

//Create a singleton that stores the DB connection instance
const sqliteInstance = (()=>{
    let dbInstance = undefined ;
    init();
    function init(){
        dbInstance = new sqlite3.Database('receipt-processor.db', (err) => {
            if (err) {
              return console.error(err.message);
            }
            console.log('Connected to the in-memory SQlite database.');
          });;

          dbInstance.run("CREATE TABLE IF NOT EXISTS receipts (id INTEGER PRIMARY KEY, retailer TEXT, purchaseDate TEXT, purchaseTime TEXT, total TEXT, items TEXT)");
    }
    function getInstance(text){
        if(dbInstance ===  undefined){
            init();
        }
        return  dbInstance;
    }

    return {
        init,
        getInstance
    }
})();

module.exports = {getInstance: sqliteInstance.getInstance};