import { configureStore } from "@reduxjs/toolkit";
import {Auth}  from "./auth";
import { reducer } from "./reducer";
import { combineReducers } from 'redux'

const com_reducer = combineReducers({
  reducer: reducer,
  auth:Auth
})


const store = configureStore({
  reducer:com_reducer
});

export default store;
