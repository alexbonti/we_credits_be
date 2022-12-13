import ProductRoute from "./productRoute/productBaseRoute";
import UserBaseRoute from "./userRoute/userBaseRoute";
import AdminBaseRoute from "./adminRoute/adminBaseRoute";
import UploadBaseRoute from "./uploadRoute/uploadBaseRoute";
import UserProductRoute from "./userRoute/userProductRoute";

const Routes = [].concat(ProductRoute, UserBaseRoute, AdminBaseRoute, UploadBaseRoute, UserProductRoute);

export default Routes;
