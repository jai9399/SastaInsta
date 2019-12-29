const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/DataSelfie',{
    useNewUrlParser:true,
    useFindAndModify:false,
    useUnifiedTopology:true,
    useCreateIndex:true
})