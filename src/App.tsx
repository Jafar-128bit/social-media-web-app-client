import './app.css';

import {createBrowserRouter, RouterProvider, Outlet} from "react-router-dom";

import Search from "./pages/Search/Search";
import Create from "./pages/Create/Create";
import Notification from "./pages/Notification/Notification";
import Profile from "./pages/Profile/Profile";
import Home from "./pages/Home/Home";
import Navbar from "./components/NavBar/Navbar";
import Settings from "./pages/Settings/Settings";
import Saved from "./pages/Saved/Saved";
import YourLikes from "./pages/YourLikes/YourLikes";
import PopUpMenus from "./components/PopUpMenus/PopUpMenus";
import usePopState from "./hooks/usePopUpState";

const App = () => {
    const MainApp = () => {
        const [popUpContainerState, popMenuState] = usePopState();
        return <div className="app">
            {popUpContainerState && <section className="app__popUpMenuContainer">
                <PopUpMenus popMenuState={popMenuState}/>
            </section>}
            <Navbar/>
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
                {path: "/search", element: <Search/>,},
                {path: "/create", element: <Create/>},
                {path: "/notification", element: <Notification/>},
                {path: "/profile", element: <Profile/>},

                {path: "/settings", element: <Settings/>},
                {path: "/saved", element: <Saved/>},
                {path: "/your-likes", element: <YourLikes/>},
            ]
        },
        {
            path: "/credential",
            children: [
                {path: "sign-up", element: <div>Sign Up</div>},
                {path: "sign-in", element: <div>Sign In</div>}
            ]
        }
    ]);

    return <RouterProvider router={router}/>
}

export default App;
