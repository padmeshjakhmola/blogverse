const { connectToDB } = require("./db");
const app = require("./app");
const port = 3000;

connectToDB();
app.listen(port, () => console.log(`BlogPost app listening on port ${port}!`));
