const express = require('express');
const cors = require('cors');

const app = express();

require(`./database/dbConn`);

app.use(express.json());
app.use(cors({origin: '*'}));

app.use('/auth', require(`./routes/auth`));
app.use('/bid', require(`./routes/bid`));
app.use('/data', require(`./routes/data`));

const port = 5002;
app.listen(port, ()=>{
    console.log(`Server Running on port: ${port}`);
});
