import {Route, Routes} from "react-router-dom";
import Home from "../pages/Home.jsx";
import SinglePost from "../pages/SinglePost.jsx";
import Positions from "../pages/Positions.jsx";
import About from "../pages/About.jsx";
import Legal from "../pages/Legal.jsx";
import Privacy from "../pages/Privacy.jsx";
import Projects from "../pages/Projects.jsx";

// eslint-disable-next-line react/prop-types
const RouterNavigator = ({isLoaded, setIsLoaded}) => {
    return (
        <Routes>
            <Route path="/" element={<Home isLoaded={isLoaded} setIsLoaded={setIsLoaded} />} />
            <Route path="/post/:slug" element={<SinglePost isLoaded={isLoaded} setIsLoaded={setIsLoaded} />} />
            <Route path="/positions" element={<Positions />} />
            <Route path="/about" element={<About />} />
            <Route path="/legal" element={<Legal />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/projects" element={<Projects />} />
        </Routes>
    );
};

export default RouterNavigator;
