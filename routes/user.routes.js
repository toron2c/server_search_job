const Router = require( 'express' );

const router = new Router;

const userController = require( './../controller/user.controller' );

// create user, registation
router.post( '/signup', userController.createUser );

// get users vacancies,
router.get( '/my-vacancies/:id', userController.getVacanciesUser );

//create response on vacancy
router.post( '/vacancies', userController.postResponseOnVacancy );

//cancel response on vacnacy
router.delete( '/vacancies/:userId/:vacancyId', userController.deleteResponseOnVacansy );


module.exports = router;