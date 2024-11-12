import './app.css';

import {createBrowserRouter, RouterProvider, Outlet, useNavigate} from "react-router-dom";
import {
    MainProfileCardTemplate,
    NavigationTemplate,
    PopupTemplate, ProfileActivityMenuTemplate,
    ProfileInfoCardTemplate,
} from './template/indexTemplate';
import Home from "./pages/Home/Home";
import Credential from "./pages/Credential/Credential";
import Profile from "./pages/Profile/Profile";
import Test from "./pages/TestPage/Test";
import {ProfileDataType} from "./type/type";
import {useSelector} from "react-redux";
import {useEffect} from "react";

const App = () => {
    const MainApp = () => {
        const currentProfileData: ProfileDataType = useSelector((state: any) => state.authProfileSlice.profileData);
        const navigate = useNavigate();

        useEffect(() => {
            if (currentProfileData === null) {
                navigate("/credential/sign-in");
            }
        },[currentProfileData]);

        return <div className="app">
            <NavigationTemplate/>
            <PopupTemplate/>
            <section className="app__pageContainer noScroll">
                <MainProfileCardTemplate/>
                <ProfileInfoCardTemplate/>
                <ProfileActivityMenuTemplate/>
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
                {path: "/profile", element: <Profile/>,},
            ]
        },
        {
            path: "/credential",
            children: [
                {path: "sign-in", element: <Credential type={"sign-in"}/>},
                {path: "sign-up", element: <Credential type={"sign-up"}/>}
            ]
        },
        {
            path: "/test",
            element: <Test/>,
        }
    ]);

    return <RouterProvider router={router}/>
}

export default App;
