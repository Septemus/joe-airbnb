import React from "react";
import {Routes,Route,BrowserRouter} from "react-router-dom"
import Register from "../../components/Register";
const MyRoutes = () => (
    <>
        <BrowserRouter>
            <Routes>
                <Route path="/register" element={<Register />}>
                </Route>
            </Routes>
        </BrowserRouter>
    </>
);
export default MyRoutes;