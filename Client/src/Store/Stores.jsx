import {configureStore} from '@reduxjs/toolkit'
import  dataSliceReducer  from '../Features/DataSlice'

export const store=configureStore({
    reducer:{
        visualize:dataSliceReducer
    },
})