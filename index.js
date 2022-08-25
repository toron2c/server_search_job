const express = require( 'express' );

const cors = require( 'cors' );

const userRouter = require( './routes/user.routes' );

const companyRouter = require( './routes/company.routes' );

const generalRouter = require( './routes/general.routes' );



const PORT = process.env.PORT || 7070;

const app = express();

app.use( cors() )

app.use( express.json() );

app.use( '/api/user/', userRouter );

app.use( '/api/company', companyRouter );

app.use( '/api/', generalRouter );



app.listen( PORT, async () => {
    console.log( `server started... on port = ${PORT}` );

} )

