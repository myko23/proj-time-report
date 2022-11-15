import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducer";

export default function store() {
	return configureStore({ reducer });
}
