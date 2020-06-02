// "start": "http-server -p 8080 -c-1 dist/coffeeapp",
const express = require('express');
const app = express();

app.use(express.static(`${__dirname}/dist/coffeeapp`));

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`listening by : ${port}`);
});