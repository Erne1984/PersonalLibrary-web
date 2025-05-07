import {
    createBrowserRouter,
} from "react-router-dom";

import FormBookPage from "./pages/FormBookPage/FormBookPage";


const appRoutes = createBrowserRouter([
    {
        path: "/",
        element: <FormBookPage />,
    },
]);

export default appRoutes;
