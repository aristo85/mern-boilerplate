const express = require('express');
const app = express();
const mongooose = require('mongoose');

mongooose.connect('mongodb+srv://aristo85:123456Abc@cluster0-ehted.mongodb.net/test?retryWrites=true&w=majority',
    {useNewUrlParser: true}
    ).then(() => console.log('DB is connected')).catch(err => console.error(err));

app.get('/', (req, res) => {
    res.send('hello world');
})

app.listen(5000);