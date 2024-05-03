import React from "react";
import {Route,BrowserRouter} from "react-router-dom"
import Register from "../../components/Register";
const MyRoutes = () => (
    <>
        <BrowserRouter>
            <Route path="/register" element={<Register />}>
            </Route>
        </BrowserRouter>
    </>
);
export default MyRoutes;