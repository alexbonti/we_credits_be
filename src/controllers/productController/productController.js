

/**
 * Please use appLogger for logging in this file try to abstain from console
 * levels of logging:
 * - TRACE - ‘blue’
 * - DEBUG - ‘cyan’
 * - INFO - ‘green’
 * - WARN - ‘yellow’
 * - ERROR - ‘red’
 * - FATAL - ‘magenta’
 */

import Service from "../../services";
import async from "async";
import UniversalFunctions from "../../utils/universalFunctions";
const Config = UniversalFunctions.CONFIG;
const ERROR = UniversalFunctions.CONFIG.APP_CONSTANTS.STATUS_MSG.ERROR;
const _ = require("underscore");

/**
 * 
 * @param {Object} payloadData 
 * @param {Function} callback 
 */
const getProducts = function (payloadData, callback) {
  let productData;

  async.series([
    (cb) => {
      const query = {
        onMarket: true,
        status: Config.APP_CONSTANTS.DATABASE.PRODUCT_STATUS.AVAILABLE,
      };
      const projection = {
        "sellerKyc.kycTransaction": 0
      };
      const populate = {
        path: "type"
      };
      Service.ProductService.getRecordWithPaginationPopulate(query, projection, populate, { skip: payloadData.skip, limit: payloadData.limit }, (err, data) => {
        if (err) cb(err);
        productData = data;
        cb(null);
      });
    }
  ], (err) => {
    if (err) callback(err)
    else callback(null, { data: productData })
  })
};

export default {
  getProducts: getProducts,
};
