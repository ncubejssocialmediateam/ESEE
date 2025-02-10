import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "../pages/Home.jsx";
import SinglePost from "../pages/SinglePost.jsx";
import Archive from "../pages/Archive.jsx";

// eslint-disable-next-line react/prop-types
const RouterNavigator = ({isLoaded, setIsLoaded}) => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home isLoaded={isLoaded} setIsLoaded={setIsLoaded} />} />
                <Route path="/post/:id" element={<SinglePost isLoaded={isLoaded} setIsLoaded={setIsLoaded} />} />
                <Route path="/archive" element={<Archive />} />
            </Routes>
        </Router>
    );
};

export default RouterNavigator;
