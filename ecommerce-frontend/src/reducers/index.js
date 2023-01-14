import {combineReducers} from "redux";
import {userReducer} from './userReducer';
import {searchReducer} from "./searchReducer";
import {cartReducer} from "./cartReducer";
import {drawerReducer} from "./drawerReducer";
import {couponReducer} from "./couponReducer";
import {CODReducer} from "./CODReducer";
import { SingleProductIdReducer } from "./SingleProductId";
import { GroupBuyingPriceReducer } from "./GroupBuyingPriceReducer";

const rootReducer = combineReducers({
    user : userReducer,
    search : searchReducer,
    cart : cartReducer,
    drawer : drawerReducer,
    coupon : couponReducer,
    COD : CODReducer,
    SingleProductId:SingleProductIdReducer,
    GroupBuyingPrice:GroupBuyingPriceReducer,
});

export default rootReducer;
