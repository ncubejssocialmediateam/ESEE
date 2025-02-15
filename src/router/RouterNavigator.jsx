import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "../pages/Home.jsx";
import SinglePost from "../pages/SinglePost.jsx";

// eslint-disable-next-line react/prop-types
const RouterNavigator = ({isLoaded, setIsLoaded}) => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home isLoaded={isLoaded} setIsLoaded={setIsLoaded} />} />
                <Route path="/post/:slug" element={<SinglePost isLoaded={isLoaded} setIsLoaded={setIsLoaded} />} />
            </Routes>
        </Router>
    );
};

export default RouterNavigator;
