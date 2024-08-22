import './app.css';

import {createBrowserRouter, RouterProvider, Outlet} from "react-router-dom";

import Search from "./pages/Search/Search";
import Notification from "./pages/Notification/Notification";
import Profile from "./pages/Profile/Profile";
import Home from "./pages/Home/Home";
import Navbar from "./components/NavBar/Navbar";
import Settings from "./pages/Settings/Settings";
import Saved from "./pages/Saved/Saved";
import YourLikes from "./pages/YourLikes/YourLikes";
import PopUpMenus from "./components/PopUpMenus/PopUpMenus";
import usePopState from "./hooks/usePopUpState";
import Credential from "./pages/Credential/Credential";
import PostPage from "./pages/PostPage/PostPage";

const App = () => {
    const MainApp = () => {
        const popMenuState = usePopState();
        const popUpMenuContainer = popMenuState.find(popUp => popUp.actionName === "popMenuContainer");

        return <div className="app">
            {
                popUpMenuContainer?.actionArgument &&
                <section className="app__popUpMenuContainer">
                    <PopUpMenus popMenuState={popMenuState}/>
                </section>
            }
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
                {path: "/notification", element: <Notification/>},
                {path: "/post", element: <PostPage/>},
                {path: "/profile/:username/:tab", element: <Profile/>},

                {path: "/settings", element: <Settings/>},
                {path: "/saved", element: <Saved/>},
                {path: "/your-likes", element: <YourLikes/>},
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
