const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./graphql_schema/index');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const keys = require('./keys.json');
app.use(cors())
console.log(keys)
/* Connection made with Remote Server */
mongoose.connect(keys['MONGO_SERVER'])
mongoose.connection.once('open', () => {
    console.log('conneted to database');
});

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}));

app.listen(4000, () => {
    console.log('now listening for requests on port 4000');
});