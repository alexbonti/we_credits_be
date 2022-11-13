import GenericService from './genericService';

import ForgetPasswordService from './forgetPasswordService';

import PaymentService from './paymentService';

export default {
  UserService: new GenericService('User'),
  ForgetPasswordService,
  PaymentService,
  AdminService: new GenericService('Admin'),
  TokenService: new GenericService('Token'),
  SSOManagerService: new GenericService('SSO'),
  ProductTypeService: new GenericService('ProductTypes'),
  ProductService: new GenericService('Product'),
  TransactionService: new GenericService("Transaction")
};
