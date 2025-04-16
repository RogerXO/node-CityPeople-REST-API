"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
const router = (0, express_1.Router)();
exports.router = router;
router.get("/cities", controllers_1.citiesController.getAllValidation, controllers_1.citiesController.getAll);
router.get("/cities/:id", controllers_1.citiesController.getByIdValidation, controllers_1.citiesController.getById);
router.post("/cities", controllers_1.citiesController.createValidation, controllers_1.citiesController.create);
router.put("/cities/:id", controllers_1.citiesController.updateByIdValidation, controllers_1.citiesController.updateById);
router.delete("/cities/:id", controllers_1.citiesController.deleteByIdValidation, controllers_1.citiesController.deleteById);
