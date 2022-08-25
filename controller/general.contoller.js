const { sequelize, company, user, vacancy, tag } = require( './../models' )
const fs = require( 'fs' );
class GeneralController {

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
    // get Vacancy
    async getVacancy( req, res ) {
        const { id } = req.params;
        try {
            const currVacancy = await vacancy.findOne( {
                where: {
                    vacancy_id: id
                },
                attributes: ['vacancy_id', 'title', 'description', 'english_lvl', 'grade', 'company_id', 'active']
            } )
            const tags = await vacancy.findOne( {
                where: {
                    vacancy_id: id
                },
                include: tag
            } )
            const tagName = tags.tags.map( ( el ) => {
                return el.name;
            } )
            return res.status( 200 ).json( { currVacancy, tagName } )
        } catch ( e ) {
            console.log( e );
            res.status( 500 ).json( e );
        }
    }

    // get all vacancies
    async getAllVacancies( req, res ) {
        try {
            const allVacancies = await vacancy.findAll( {
                where: {
                    active: true
                },
                attributes: ['vacancy_id', 'title', 'description', 'company_id']
            } )

            allVacancies.forEach( element => {
                element.dataValues.description = element.dataValues.description.split( '' ).slice( 0, 50 ).join( '' );
            } );
            res.status( 200 ).json( allVacancies );

        } catch ( e ) {
            const error = `${e}` + new Date + `\n`;
            fs.appendFile( "./logs/logs.txt", error, ( err ) => { console.log( err ) } );
            return res.status( 500 ).json( { msg: "error", result: 1 } )
        }

    }

    // login

    async authorization( req, res ) {
        const { login, password } = req.body;
        try {
            let curr = await user.findOne( {
                where: {
                    user_login: login,
                    user_password: password
                }
            } )
            if ( curr === null ) {
                curr = await company.findOne( {
                    where: {
                        company_login: login,
                        company_password: password
                    }
                } )
            }
            res.status( 200 ).json( {
                msg: "ok",
                status: 0,
                data: {
                    id: curr.user_id || curr.company_id,
                    login: curr.user_login || curr.company_login,
                    role: curr.role

                }
            } );
        } catch ( e ) {
            const str = `${e}` + new Date + `\n`;
            fs.appendFile( "./logs/logs.txt", str, ( err ) => { console.log( err ) } );
            return res.status( 500 ).json( { msg: "error", result: 1 } )
        }

    }
}


module.exports = new GeneralController();