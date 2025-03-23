import {Route, Routes} from "react-router-dom";
import Home from "../pages/Home.jsx";
import SinglePost from "../pages/SinglePost.jsx";
import Positions from "../pages/Positions.jsx";

// eslint-disable-next-line react/prop-types
const RouterNavigator = ({isLoaded, setIsLoaded}) => {
    return (
        <Routes>
            <Route path="/" element={<Home isLoaded={isLoaded} setIsLoaded={setIsLoaded} />} />
            <Route path="/post/:slug" element={<SinglePost isLoaded={isLoaded} setIsLoaded={setIsLoaded} />} />
            <Route path="/positions" element={<Positions />} />
        </Routes>
    );
};

export default RouterNavigator;
