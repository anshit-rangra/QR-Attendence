const app = require("./src/app");
const { initRedis } = require("./src/config/redis.config.js");
require("dotenv").config();
const connectDB = require("./src/db/db.js");


(async () => {
  await initRedis(); // Redis initialize
})();


connectDB().then(() => {

    app.listen(3000, () => {
        console.log("Server is running on port 3000");
    })

}).catch((error) => {
    console.log("Failed to connect to the database", error);
});