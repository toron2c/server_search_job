const Router = require( 'express' );

const router = new Router;

const generalController = require( './../controller/general.contoller' );

// login
router.post( '/login', generalController.authorization );

// get all vacancies

router.get( '/vacancies', generalController.getAllVacancies );

// get vacancy
router.get( '/vacancies/:id', generalController.getVacancy )

module.exports = router;