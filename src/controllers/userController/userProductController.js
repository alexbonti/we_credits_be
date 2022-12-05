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

const getProductTypes = function (userData, callback) {
  let productTypes;
  let userFound;
  appLogger.info(userData)
  async.series([
    (cb) => {
      const query = {
        _id: userData.userId,
      };
      const options = { lean: true };
      Service.UserService.getRecord(query, {}, options, (err, data) => {
        if (err) cb(err);
        else {
          if (data.length == 0) cb(ERROR.INCORRECT_ACCESSTOKEN);
          else {
            userFound = (data && data[0]) || null;
            if (userFound.isBlocked) cb(ERROR.ACCOUNT_BLOCKED)
            cb();
          }
        }
      });
    },
    (cb) => {
      Service.ProductTypeService.getRecord({}, {}, {}, (err, data) => {
        if (err) cb(err)
        else {
          productTypes = data;
          cb()
        }
      })
    }
  ], (err) => {
    if (err) callback(err)
    else callback(null, { data: productTypes })
  })
}

const getProducts = function (userData, payloadData, callback) {
  let productData;
  let userFound;
  appLogger.info(userData)
  async.series([
    (cb) => {
      const query = {
        _id: userData.userId,
      };
      const options = { lean: true };
      Service.UserService.getRecord(query, {}, options, (err, data) => {
        if (err) cb(err);
        else {
          if (data.length == 0) cb(ERROR.INCORRECT_ACCESSTOKEN);
          else {
            userFound = (data && data[0]) || null;
            if (userFound.isBlocked) cb(ERROR.ACCOUNT_BLOCKED)
            cb();
          }
        }
      });
    },
    (cb) => {
      const query = {
        userId: userData.userId,
      };
      const projection = {
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

const createProducts = function (userData, payloadData, callbackRoute) {
  let userFound, productData, transactionData;
  async.series(
    [
      (cb) => {
        const query = {
          _id: userData.userId,
        };
        const options = { lean: true };
        Service.UserService.getRecord(query, {}, options, (err, data) => {
          if (err) cb(err);
          else {
            if (data.length == 0) cb(ERROR.INCORRECT_ACCESSTOKEN);
            else {
              userFound = (data && data[0]) || null;
              if (userFound.isBlocked) cb(ERROR.ACCOUNT_BLOCKED)
              cb();
            }
          }
        });
      },
      (cb) => {
        const criteria = {
          _id: payloadData.type
        }
        Service.ProductTypeService.getRecord(criteria, {}, {}, (err, data) => {
          if (err) cb(err)
          else {
            if (data.length == 0) cb(ERROR.PRODUCT_TYPE_NO_EXIST)
            else cb()
          }
        })
      },
      (cb) => {
        payloadData.userId = userFound._id;
        Service.ProductService.createRecord(payloadData, (err, data) => {
          if (err) cb(err)
          else {
            productData = data;
            cb()
          }
        })
      }
    ],
    (error) => {
      if (error) {
        callbackRoute(error);
      } else {
        callbackRoute(null, { data: productData });
      }
    }
  );
}

const getMarketProducts = function (userData, payloadData, callback) {
  let productData;
  let userFound;
  appLogger.info(userData)
  async.series([
    (cb) => {
      const query = {
        _id: userData.userId,
      };
      const options = { lean: true };
      Service.UserService.getRecord(query, {}, options, (err, data) => {
        if (err) cb(err);
        else {
          if (data.length == 0) cb(ERROR.INCORRECT_ACCESSTOKEN);
          else {
            userFound = (data && data[0]) || null;
            if (userFound.isBlocked) cb(ERROR.ACCOUNT_BLOCKED)
            cb();
          }
        }
      });
    },
    (cb) => {
      const query = {
        onMarket: true,
        status: Config.APP_CONSTANTS.DATABASE.PRODUCT_STATUS.AVAILABLE
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

const addSellerKyc = function (userData, payloadData, callbackRoute) {
  let userFound;
  async.series(
    [
      (cb) => {
        const query = {
          _id: userData.userId,
        };
        const options = { lean: true };
        Service.UserService.getRecord(query, {}, options, (err, data) => {
          if (err) cb(err);
          else {
            if (data.length == 0) cb(ERROR.INCORRECT_ACCESSTOKEN);
            else {
              userFound = (data && data[0]) || null;
              if (userFound.isBlocked) cb(ERROR.ACCOUNT_BLOCKED)
              cb();
            }
          }
        });
      },
      (cb) => {
        const query = {
          _id: payloadData.id,
        };
        const projection = {
        };
        Service.ProductService.getRecord(query, projection, {}, (err, data) => {
          if (err) cb(err);
          else {
            if (data.length == 0) cb(ERROR.PRODUCT_NO_EXIST)
            else cb()
          }
        });
      },
      (cb) => {
        const criteria = {
          _id: payloadData.id
        }
        const dataToUpdate = {
          $set: {
            "sellerKyc.documentUrl": payloadData.kycDocument,
            "sellerKyc.kycSignature": payloadData.kycSignature
          }
        }
        Service.ProductService.updateRecord(criteria, dataToUpdate, {}, (err, data) => {
          if (err) cb(err)
          else cb()
        })
      }
    ],
    (error) => {
      if (error) {
        callbackRoute(error);
      } else {
        callbackRoute(null, {});
      }
    }
  );
}

const addSellerKycPayment = function (userData, payloadData, callbackRoute) {
  let userFound, productData;
  async.series(
    [
      (cb) => {
        const query = {
          _id: userData.userId,
        };
        const options = { lean: true };
        Service.UserService.getRecord(query, {}, options, (err, data) => {
          if (err) cb(err);
          else {
            if (data.length == 0) cb(ERROR.INCORRECT_ACCESSTOKEN);
            else {
              userFound = (data && data[0]) || null;
              if (userFound.isBlocked) cb(ERROR.ACCOUNT_BLOCKED)
              cb();
            }
          }
        });
      },
      (cb) => {
        const query = {
          _id: payloadData.id,
        };
        const projection = {
        };
        Service.ProductService.getRecord(query, projection, {}, (err, data) => {
          if (err) cb(err);
          else {
            if (data.length == 0) cb(ERROR.PRODUCT_NO_EXIST)
            else {
              productData = data && data[0] || null;
              cb()
            }
          }
        });
      },
      (cb) => {
        const dataToSend = {
          first_name: userFound.firstName,
          last_name: userFound.lastName,
          emailId: userFound.emailId
        }
        Service.PaymentService.createStripeCustomer(dataToSend, function (err, data) {
          if (err) cb(err)
          else {
            userFound.stripeId = data.id;
            const criteria = {
              _id: userFound._id
            }
            const dataToUpdate = {
              $set: {
                stripeId: data.id
              }
            }
            Service.UserService.updateRecord(criteria, dataToUpdate, {}, function (err, data) {
              if (err) cb(err)
              else cb()
            })
          }
        })
      },
      // (cb) => {
      //     const dataToSend = {
      //         customerId: userFound.stripeId,
      //         cardSource: payloadData.cardSource
      //     }
      //     Service.PaymentService.addStripeCard(dataToSend, function (err, data) {
      //         if (err) cb(ERROR.PAYMENT_DECLINED)
      //         else {
      //             cardDetails = data;
      //             cb()
      //         }
      //     })
      // },
      (cb) => {
        const criteria = {
          _id: productData._id
        }
        const dataToUpdate = {
          $set: {
            "sellerKyc.kycTransaction": {
              amount: 50,
              paymentStatus: "COMPLETED"
            }
          }
        }
        Service.ProductService.updateRecord(criteria, dataToUpdate, {}, (err, data) => {
          if (err) cb(err)
          else cb()
        })
      }
    ],
    (error) => {
      if (error) {
        callbackRoute(error);
      } else {
        callbackRoute(null, {});
      }
    }
  );
}

const addBuyerToProduct = function (userData, payloadData, callbackRoute) {
  let userFound, productData, transactionData;
  async.series(
    [
      (cb) => {
        const query = {
          _id: userData.userId,
        };
        const options = { lean: true };
        Service.UserService.getRecord(query, {}, options, (err, data) => {
          if (err) cb(err);
          else {
            if (data.length == 0) cb(ERROR.INCORRECT_ACCESSTOKEN);
            else {
              userFound = (data && data[0]) || null;
              if (userFound.isBlocked) cb(ERROR.ACCOUNT_BLOCKED)
              cb();
            }
          }
        });
      },
      (cb) => {
        const query = {
          _id: payloadData.id,
        };
        const projection = {
        };
        Service.ProductService.getRecord(query, projection, {}, (err, data) => {
          if (err) cb(err);
          else {
            if (data.length == 0) cb(ERROR.PRODUCT_NO_EXIST)
            else {
              productData = data && data[0] || null;
              if (productData.userId.toString() == userData.userId.toString()) cb(ERROR.SAME_USER_FOR_PRODUCT)
              else {
                cb()
              }
            }
          }
        });
      },
      (cb) => {
        const dataToSave = {
          productId: productData._id,
          buyerId: userFound._id
        }
        Service.TransactionService.createRecord(dataToSave, (err, data) => {
          if (err) cb(err)
          else {
            transactionData = data;
            cb()
          }
        })
      },
      (cb) => {
        const criteria = {
          _id: productData._id
        }
        const dataToUpdate = {
          $set: {
            activeTransaction: transactionData._id,
            status: Config.APP_CONSTANTS.DATABASE.PRODUCT_STATUS.PROCESSING
          }
        }
        Service.ProductService.updateRecord(criteria, dataToUpdate, {}, (err, data) => {
          if (err) cb(err)
          else cb()
        })
      }
    ],
    (error) => {
      if (error) {
        callbackRoute(error);
      } else {
        callbackRoute(null, { data: transactionData });
      }
    }
  );
}

const addBuyerKyc = function (userData, payloadData, callbackRoute) {
  let userFound, transactionData;
  async.series(
    [
      (cb) => {
        const query = {
          _id: userData.userId,
        };
        const options = { lean: true };
        Service.UserService.getRecord(query, {}, options, (err, data) => {
          if (err) cb(err);
          else {
            if (data.length == 0) cb(ERROR.INCORRECT_ACCESSTOKEN);
            else {
              userFound = (data && data[0]) || null;
              if (userFound.isBlocked) cb(ERROR.ACCOUNT_BLOCKED)
              cb();
            }
          }
        });
      },
      (cb) => {
        const query = {
          _id: payloadData.id,
        };
        const projection = {
        };
        Service.TransactionService.getRecord(query, projection, {}, (err, data) => {
          if (err) cb(err);
          else {
            if (data.length == 0) cb(ERROR.TRANSACTION_NO_EXIST)
            else {
              transactionData = data && data[0] || null;
              cb()
            }
          }
        });
      },
      (cb) => {
        const criteria = {
          _id: transactionData._id
        }
        const dataToUpdate = {
          $set: {
            "buyerKyc.documentUrl": payloadData.kycDocument,
            "buyerKyc.kycSignature": payloadData.kycSignature
          }
        }
        Service.TransactionService.updateRecord(criteria, dataToUpdate, {}, (err, data) => {
          if (err) cb(err)
          else {
            cb()
          }
        })
      }
    ],
    (error) => {
      if (error) {
        callbackRoute(error);
      } else {
        callbackRoute(null, {});
      }
    }
  );
}

const addBuyerKycPayment = function (userData, payloadData, callbackRoute) {
  let userFound, transactionData;
  async.series(
    [
      (cb) => {
        const query = {
          _id: userData.userId,
        };
        const options = { lean: true };
        Service.UserService.getRecord(query, {}, options, (err, data) => {
          if (err) cb(err);
          else {
            if (data.length == 0) cb(ERROR.INCORRECT_ACCESSTOKEN);
            else {
              userFound = (data && data[0]) || null;
              if (userFound.isBlocked) cb(ERROR.ACCOUNT_BLOCKED)
              cb();
            }
          }
        });
      },
      (cb) => {
        const query = {
          _id: payloadData.id,
        };
        const projection = {
        };
        Service.TransactionService.getRecord(query, projection, {}, (err, data) => {
          if (err) cb(err);
          else {
            if (data.length == 0) cb(ERROR.TRANSACTION_NO_EXIST)
            else {
              transactionData = data && data[0] || null;
              cb()
            }
          }
        });
      },
      (cb) => {
        const dataToSend = {
          first_name: userFound.firstName,
          last_name: userFound.lastName,
          emailId: userFound.emailId
        }
        Service.PaymentService.createStripeCustomer(dataToSend, function (err, data) {
          if (err) cb(err)
          else {
            userFound.stripeId = data.id;
            const criteria = {
              _id: userFound._id
            }
            const dataToUpdate = {
              $set: {
                stripeId: data.id
              }
            }
            Service.UserService.updateRecord(criteria, dataToUpdate, {}, function (err, data) {
              if (err) cb(err)
              else cb()
            })
          }
        })
      },
      // (cb) => {
      //     const dataToSend = {
      //         customerId: userFound.stripeId,
      //         cardSource: payloadData.cardSource
      //     }
      //     Service.PaymentService.addStripeCard(dataToSend, function (err, data) {
      //         if (err) cb(ERROR.PAYMENT_DECLINED)
      //         else {
      //             cardDetails = data;
      //             cb()
      //         }
      //     })
      // },
      (cb) => {
        const criteria = {
          _id: transactionData._id
        }
        const dataToUpdate = {
          $set: {
            "buyerKyc.kycTransaction": {
              amount: 50,
              paymentStatus: "COMPLETED"
            }
          }
        }
        Service.TransactionService.updateRecord(criteria, dataToUpdate, {}, (err, data) => {
          if (err) cb(err)
          else cb()
        })
      }
    ],
    (error) => {
      if (error) {
        callbackRoute(error);
      } else {
        callbackRoute(null, {});
      }
    }
  );
}

export default {
  createProducts,
  getProductTypes,
  getProducts,
  getMarketProducts,
  addSellerKyc,
  addSellerKycPayment,
  addBuyerToProduct,
  addBuyerKyc,
  addBuyerKycPayment
};
