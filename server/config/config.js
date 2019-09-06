//PORT
process.env.PORT = process.env.PORT || 3000;

//Entorno
process.env.Node_ENV = process.env.Node_ENV || 'Dev'

//DB String
process.env.DBString = (process.env.Node_ENV === 'Dev') ? 'mongodb://localhost:27017/timetracker' : process.env.MONGO_URI;