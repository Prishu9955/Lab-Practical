const express = require("express");
const app = express();
app.use((req, res, nextHandler) => {
    const timeNow = new Date().toLocaleString();

    console.log(`Request received at: ${timeNow}`);
    console.log(`Route hit: ${req.method} ${req.originalUrl}`);

    nextHandler();
});
app.get("/users1", (request, response) => {
    response.send("Users endpoint is working");
});

app.listen(4000, () => {
    console.log("Server is running at http://localhost:4000");
});
