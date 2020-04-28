/**
*  Biz Actions :: actions are just the names of the actions we want to perform.
*  We must 'dispatch' our actions in order to modify the store. The dispatched 
*  actions will be sent to the reducer, and the reducer will perform the action. 
    NOTE: These can be in there own folder if we had a big enough amount of actions
          I am just keeping them in this file for convenience, and it's easier to
          understand for now.
*/ 
export const setBiz = (biz) =>{ // fired when we set the biz state variable
    return { 
        type: 'SETBIZ', 
        payload: biz 
    };
}

  
// Initial Biz State
const initialBizState = {
    biz: [],  // object to be built by adding a new biz
};


/** 
 * Biz State Reducer :: listens for any Biz Action action to be dispatched, then mutates
 * the Biz state depending on the action. 
 */ 
const bizReducer = (state=initialBizState, action) => {
    switch (action.type) 
    {
        case 'SETBIZ':
            // unpacks the biz state, then sets the the biz attriute to the payload.
            // the payload is sent along with the dispatched action by parameter.
            // NOTE: it is important that we do not want to mutate the state
            //       of the biz attribute. What we want to do is set it with 
            return { ...state, biz: action.payload };
       
        default:
            return state

        // examples:
        /**
        case 'ADDBIZ':
            // this will append a new business
            return { 
                ...state, 
                biz: [...state.biz, action.payload]
            }
        case 'REMOVEBiz':
            return{
                ...state,
                biz: [
                    ...state.biz.slice(0, action.index), 
                    ...state.biz.slice(action.index + 1)
                ]
            }
        case 'SETDURATION':
            // summation over all clip lengths
            let newBizcount = 0.0;
            return{
                ...state,
                totalCount: state.biz.length(),  // you settting biz state variables
            }
         */
    }
}

export default bizReducer;
