import './app.css';

import {createBrowserRouter, RouterProvider, Outlet} from "react-router-dom";
import {NavigationTemplate} from './components/template/indexTemplate';
import Home from "./pages/Home/Home";
import Credential from "./pages/Credential/Credential";

const App = () => {
    const MainApp = () => {
        return <div className="app">
            <NavigationTemplate/>
            <section className="app__pageContainer noScroll">
                <Outlet/>
            </section>
        </div>
    }

    const router = createBrowserRouter([
        {
            path: "",
            element: <MainApp/>,
            children: [
                {path: "/", element: <Home/>,},
            ]
        },
        {
            path: "/credential",
            children: [
                {path: "sign-in", element: <Credential type={"sign-in"}/>},
                {path: "sign-up", element: <Credential type={"sign-up"}/>}
            ]
        },
    ]);

    return <RouterProvider router={router}/>
}

export default App;
