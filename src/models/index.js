/**
 * Created by Sanchit
 */
import User from './user';
import Admin from './admin';
import Token from './token';
import SSO from './sso';
import ProductTypes from './productTypes';
import Product from './product';
import Transaction from './transaction';

const ForgetPassword = require('./forgotPasswordRequest');

export default {
  User,
  ForgetPassword,
  Admin,
  Token,
  SSO,
  ProductTypes,
  Product,
  Transaction
}