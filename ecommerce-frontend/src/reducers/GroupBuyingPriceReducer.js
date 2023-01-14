export const GroupBuyingPriceReducer = (state=[], action)=>{
    switch (action.type){
        case 'Group_Buying_Price':
          return action.payload;
     
        default:
          return state;

    }
}