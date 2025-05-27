import { RequestHandler } from "express";
import { ObjectSchema } from "yup";

export type TProperty = "body" | "query" | "params" | "header";
export type TAllSchemas = Record<TProperty, ObjectSchema<any>>

export type TValidation = (schemas: Partial<TAllSchemas>) => RequestHandler
