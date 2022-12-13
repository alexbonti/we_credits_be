/**
 * Created by Sanchit
 */
import User from './user';
import Admin from './admin';
import Token from './token';
import SSO from './sso';
import ProductType from './productType';
import Product from './product';
import Transaction from './transaction';

const ForgetPassword = require('./forgotPasswordRequest');

export default {
  User,
  ForgetPassword,
  Admin,
  Token,
  SSO,
  ProductType,
  Product,
  Transaction
}