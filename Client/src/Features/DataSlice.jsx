import { createSlice} from "@reduxjs/toolkit";


const initialState=[]


export const dataSlice=createSlice({
    name:'visualize',
    initialState,
    reducers:{

        //adding all data
        AddData:(state,action)=>
        {
            return action.payload.result;

        }
        // ,

        // //adding a message to the existing chat
        // addChat:(state,action)=>{
        //     const newchat=
        //     {
        //             chat:action.payload.msg,
        //             sender_id:action.payload.id,
        //             id:action.payload.n,
        //             image: action.payload.response                     
        //     }
        //     return {...state,Chat:
        //         {
        //             ...state.Chat,
        //             [action.payload.c_id]:
        //             [
        //                 ...(state.Chat[action.payload.c_id]||{}),
        //                 newchat
        //             ]
        //         }}
        // }
        // ,

        // //adding a message to a exisiting group chat
        // addGroupChat:(state,action)=>{
        //     const newchat=
        //         {
        //             message:action.payload.msg,
        //             sender_id:action.payload.id,
        //             name: action.payload.username,
        //             id:action.payload.n,
        //             image: action.payload.response
        //         }
        //         return {...state,GroupChat:
        //             {
        //                 ...state.GroupChat,
        //                 [action.payload.RoomId]:[
        //                     ...(state.GroupChat[action.payload.RoomId]||{}),
        //                     newchat
        //                 ]
        //             }}
        // }
        // ,
        // //reset the state
        // ResetChat:()=>{
        //     return{
        //         Chat:{},
        //         GroupChat:{}
        //     }
        // }
    }
})


export default dataSlice.reducer

export const {AddData}=dataSlice.actions