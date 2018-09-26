const app = require('./server/server');

const port = 8081;

app.listen(port, () => console.log(`Server started on port ${port}`));

//ip address on the network
// '10.2.0.49'