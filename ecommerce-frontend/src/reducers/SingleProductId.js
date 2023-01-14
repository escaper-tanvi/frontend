export const SingleProductIdReducer = (state=[], action)=>{
    switch (action.type){
        case 'SINGLE_PRODUCT_ID':
          return action.payload;
     
        default:
          return state;

    }
}