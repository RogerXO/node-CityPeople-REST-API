"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
const middlewares_1 = require("../shared/middlewares");
const router = (0, express_1.Router)();
exports.router = router;
// Cities routes
router.get("/cities", middlewares_1.ensureAuthenticated, controllers_1.citiesController.getAllValidation, controllers_1.citiesController.getAll);
router.get("/cities/:id", middlewares_1.ensureAuthenticated, controllers_1.citiesController.getByIdValidation, controllers_1.citiesController.getById);
router.post("/cities", middlewares_1.ensureAuthenticated, controllers_1.citiesController.createValidation, controllers_1.citiesController.create);
router.put("/cities/:id", middlewares_1.ensureAuthenticated, controllers_1.citiesController.updateByIdValidation, controllers_1.citiesController.updateById);
router.delete("/cities/:id", middlewares_1.ensureAuthenticated, controllers_1.citiesController.deleteByIdValidation, controllers_1.citiesController.deleteById);
// People routes
router.get("/people", middlewares_1.ensureAuthenticated, controllers_1.peopleController.getAllValidation, controllers_1.peopleController.getAll);
router.get("/people/:id", middlewares_1.ensureAuthenticated, controllers_1.peopleController.getByIdValidation, controllers_1.peopleController.getById);
router.post("/people", middlewares_1.ensureAuthenticated, controllers_1.peopleController.createValidation, controllers_1.peopleController.create);
router.put("/people/:id", middlewares_1.ensureAuthenticated, controllers_1.peopleController.updateByIdValidation, controllers_1.peopleController.updateById);
router.delete("/people/:id", middlewares_1.ensureAuthenticated, controllers_1.peopleController.deleteByIdValidation, controllers_1.peopleController.deleteById);
// SignIn / SignUp routes
router.post("/signup", controllers_1.usersController.signUpValidation, controllers_1.usersController.signUp);
router.post("/signin", controllers_1.usersController.signInValidation, controllers_1.usersController.signIn);
