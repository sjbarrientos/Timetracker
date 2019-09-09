//Server port
process.env.PORT = process.env.PORT || 3000;

//Enviroments
process.env.Node_ENV = process.env.Node_ENV || 'Dev';

//Database String
process.env.MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/timetracker';