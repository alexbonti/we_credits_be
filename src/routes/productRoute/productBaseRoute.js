
import UniversalFunctions from "../../utils/universalFunctions";
import Joi from "joi";
import Controller from "../../controllers";

const Config = UniversalFunctions.CONFIG;

const getProducts = {
  method: "GET",
  path: "/api/products/market",
  options: {
    description: "get Market Products",
    tags: ["api", "product"],
    handler: (request) => {
      return new Promise((resolve, reject) => {
        Controller.ProductController.getProducts(request.query, (error, success) => {
          if (error) {
            reject(UniversalFunctions.sendError(error));
          } else {
            resolve(
              UniversalFunctions.sendSuccess(
                Config.APP_CONSTANTS.STATUS_MSG.SUCCESS
                  .DEFAULT,
                success
              )
            );
          }
        });
      });
    },
    validate: {
      query: {
        skip: Joi.number().required(),
        limit: Joi.number().required(),
      },
      failAction: UniversalFunctions.failActionFunction
    },
    plugins: {
      "hapi-swagger": {
        responseMessages:
          Config.APP_CONSTANTS.swaggerDefaultResponseMessages
      }
    }
  }
};

export default [getProducts];
