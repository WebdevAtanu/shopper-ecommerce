import app from './app.js';
import databaseConnection from './database/db.js';
const port=8080;

app.listen(8080,()=>{
	console.log(`server running: http://localhost:${port}`);
})

databaseConnection();