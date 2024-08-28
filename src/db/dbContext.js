const sqlite3 = require('sqlite3').verbose();

//Create a singleton that stores the DB connection instance
const sqliteInstance = (()=>{
    let dbInstance = undefined ;

    const init  = () => {
        dbInstance = new sqlite3.Database('receipt-processor.db', (err) => {
            if (err) {
              return console.error(err.message);
            }
            console.log('Connected to the in-memory SQlite database.');
          });;
    }
    init();
    const getInstance = (text) => {
        console.log(dbInstance, text)
        if(dbInstance ===  undefined){
            console.log("Hit", text)
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