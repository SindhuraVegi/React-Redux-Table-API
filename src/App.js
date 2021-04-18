import React from "react";
import Index from "./view/Index";
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
import Data from "./redux/reducer/data";

const store = createStore(
  combineReducers({
    Data,
  })
);

export default function App() {
  return (
    <Provider store={store}>
      <Index />
    </Provider>
  );
}
