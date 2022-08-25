const { sequelize, company, vacancy, user, tag } = require( './../models' );
const fs = require( 'fs' );
const { ok } = require( 'assert' );


class CompanyController {

    //create company
    async createCompany( req, res ) {
        const { company_name, company_login, company_password } = req.body;
        try {
            const fake_user = await user.create( { user_login: company_login, user_password: company_password } )
            await fake_user.destroy();
            const new_company = await company.create( { company_name, company_login, company_password } );
            sequelize.sync();
            return res.status( 200 ).json( { msg: "ok", result: 0 } );
        } catch ( e ) {
            const error = e.original.severity + " " + e.original.detail + " " + new Date + "\n";
            fs.appendFile( "./logs/logs.txt", error, ( err ) => { console.log( err ) } );
            return res.status( 406 ).json( { msg: "error", result: 1 } )

        }
    }


    // получаем количество откликов на вакансию
    async getCountsResponse( req, res ) {
        const { id } = req.params;

        try {
            const count = await vacancy.findOne( {
                where: {
                    vacancy_id: id
                },
                include: user
            } )
            res.status( 200 ).json( { msg: "ok", result: 0, count: count.users.length } );
        } catch ( err ) {
            res.status( 400 ).json( err );
        }
    }

    // create Tag
    async createTag( req, res ) {
        const { nameTag } = req.body;
        try {
            const newTag = await tag.create( { name: nameTag } );
            sequelize.sync();
            return res.status( 200 ).json( { msg: "ok", status: 0, newTag } );
        } catch ( err ) {
            console.warn( err );
            return res.status( 400 ).json( { msg: "error", status: 1 } )
        }
    }

    async getAllTags( req, res ) {
        try {
            const Tags = await tag.findAll( {
                attributes: ['name', 'id']
            } );
            return res.status( 200 ).json( { msg: "ok", status: 0, data: Tags } )
        } catch ( e ) {
            return res.status( 400 ).json( { msg: "error", status: 1 } );
        }
    }

    //create vacancy
    async createVacancy( req, res ) {
        const { company_id, title, description, english_lvl, grade, active } = req.body;
        try {
            const new_vacancy = await vacancy.create( { title, description, english_lvl, grade, company_id, active } );
            sequelize.sync();
            return res.status( 200 ).json( new_vacancy );
        } catch ( err ) {
            console.warn( err );
            return res.status( 400 ).json( { msg: "error", status: 1 } )
        }
    }

    // add tags on Vacancy
    async addTagOnVacancy( req, res ) {
        const { vacancy_id, tag_id } = req.body;
        try {
            const currVacancy = await vacancy.findOne( {
                where: {
                    vacancy_id: vacancy_id
                }
            } )

            const currTag = await tag.findOne( {
                where: {
                    id: tag_id
                }
            } )

            await currVacancy.addTag( currTag );
            sequelize.sync();
            return res.status( 200 ).json( { msg: "ok", status: 0 } )
        } catch ( e ) {
            console.log( e );
            return res.status( 500 ).json( { msg: "error", status: 1 } );
        }
    }

    // get vacancies company
    async getAllVacancyCompany( req, res ) {
        const { id } = req.params;
        try {
            const company_vacansies = await vacancy.findAll( {
                where: {
                    company_id: id,
                },
                attributes: ['vacancy_id', 'title', 'description', 'company_id']
            } );
            console.log( company_vacansies.length );
            company_vacansies.forEach( element => {
                element.dataValues.description = element.dataValues.description.split( '' ).slice( 0, 50 ).join( '' );
            } );
            return res.status( 200 ).json( company_vacansies );
        } catch ( err ) {
            console.warn( err );
            return res.status( 400 ).json( err );
        }
    }

    //close vacancy
    async changeStatusVacancy( req, res ) {
        const { company_id, vacancy_id, value } = req.body;

        try {
            const curr_vacancy = await vacancy.findOne( {
                where: {
                    company_id: company_id,
                    vacancy_id: vacancy_id
                }
            } )
            curr_vacancy.active = value;
            curr_vacancy.save();
            sequelize.sync();
            return res.status( 200 ).json( { msg: "ok", status: 0 } )
        } catch ( err ) {
            console.warn( err )
            return res.status( 200 ).json( { msg: "error", status: 1 } );
        }
    }
}

module.exports = new CompanyController();