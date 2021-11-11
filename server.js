const express = require('express');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static('public'));

app.use(require ('./routes/htmlRoute'))

app.use(require ('./routes/apiRoute'))

// Bind and Listen to the specified PORT
app.listen(PORT, function(){
    console.log(`App listening to PORT: ${PORT}`);
});



