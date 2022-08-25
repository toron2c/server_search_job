const fs = require( 'fs' )
const { sequelize, user, vacancy, company, User_Vacancies } = require( './../models' )

class UserController {
    // create user
    async createUser( req, res ) {
        const { user_login, user_password } = req.body;
        try {
            const fake_company = await company.create( { company_name: "FakeCompany", company_login: user_login, company_password: user_password } );

            await fake_company.destroy();
            const new_user = await user.create( { user_login, user_password } )

            sequelize.sync();


            return res.status( 200 ).json( { msg: "ok", result: 0 } );
        }
        catch ( e ) {
            const error = e.original.severity + " " + e.original.detail + " " + new Date + "\n";
            fs.appendFile( "./logs/logs.txt", error, ( err ) => { console.log( err ) } );
            return res.status( 500 ).json( { msg: "error", result: 1 } )
        }
    }


    // get vacancies user
    async getVacanciesUser( req, res ) {
        const { id } = req.params;
        try {
            const user_curr = await user.findOne( {
                where: {
                    user_id: id
                },
                include: vacancy
            } )
            const b = user_curr.vacancies.map( ( el ) => {
                return el.vacancy_id;
            } )
            return res.status( 200 ).json( { msg: "ok", status: 0, idS: b } );
        } catch ( err ) {
            console.log( err );
            return res.status( 400 ).json( err );
        }
    }

    //create response on vacancy
    async postResponseOnVacancy( req, res ) {
        const { user_id, vacancy_id } = req.body;
        try {
            const user_curr = await user.findOne( {
                where: {
                    user_id: user_id
                }
            } )

            const vacancy_curr = await vacancy.findOne( {
                where: {
                    vacancy_id: vacancy_id
                }
            } )

            await user_curr.addVacancy( vacancy_curr );
            sequelize.sync();

            return res.status( 200 ).json( "ok" );
        } catch ( err ) {
            console.log( err );
            return res.status( 406 ).json( err );
        }
    }

    // cancel response vacancy
    async deleteResponseOnVacansy( req, res ) {
        const { userId, vacancyId } = req.params;
        try {
            const currUser = await user.findOne( {
                where: {
                    user_id: userId,
                },
            } )
            const currVacancy = await vacancy.findOne( {
                where: {
                    vacancy_id: vacancyId
                }
            } )
            await currUser.removeVacancy( currVacancy );
            sequelize.sync();
            return res.status( 200 ).json( { msg: "ok", status: 0 } );
        } catch ( err ) {
            console.log( err )
            return res.status( 400 ).json( err );
        }
    }
}

module.exports = new UserController();