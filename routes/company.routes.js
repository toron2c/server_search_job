const Router = require( 'express' );

const router = new Router;

const companyController = require( './../controller/company.controller' );

// registation company
router.post( '/company-signup', companyController.createCompany );

// create a vacancy
router.post( '/create-vacancy', companyController.createVacancy );

// create deps with vacancy
router.post( '/create-vacancy/tag', companyController.addTagOnVacancy )

// create Tag
router.post( '/create-tag', companyController.createTag );

//get Tags
router.get( '/tag', companyController.getAllTags );

//get all vacancies company
router.get( '/active-vacancies/:id', companyController.getAllVacancyCompany );

router.get( '/vacancy/:id', companyController.getCountsResponse );


//change status vacancy
router.put( '/vacancy', companyController.changeStatusVacancy );

module.exports = router;