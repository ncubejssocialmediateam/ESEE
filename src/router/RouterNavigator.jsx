import {Route, Routes} from "react-router-dom";
import Home from "../pages/Home.jsx";
import SinglePost from "../pages/SinglePost.jsx";
import Positions from "../pages/Positions.jsx";
import About from "../pages/About.jsx";
import Legal from "../pages/Legal.jsx";
import Privacy from "../pages/Privacy.jsx";
import Projects from "../pages/Projects.jsx";
import Business from "../pages/Business.jsx";
import Archive from "../pages/Archive.jsx";
import {useEffect, useState} from "react";
import {getData} from "../api/apiClient.jsx";
import {setArticles, setNavItems} from "../redux/Reducer.jsx";
import {useDispatch} from "react-redux";

// eslint-disable-next-line react/prop-types
const RouterNavigator = ({isLoaded, setIsLoaded}) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const res = await getData('/api/posts?limit=10000');
                dispatch(setArticles(res.data.docs));
            } catch (err) {
                console.error('Error fetching articles:', err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        void fetchArticles();
    }, [dispatch]);

    useEffect(() => {
        const fetchNavItems = async () => {
            try {
                const res = await getData('/api/globals/header');
                dispatch(setNavItems(res.data.navItems));
            } catch (err) {
                console.error('Error fetching header:', err);
            }
        };
        void fetchNavItems();
    }, []);

    return (
        <Routes>
            <Route path="/" element={<Home isLoaded={isLoaded} setIsLoaded={setIsLoaded} />} />
            <Route path="/post/:slug" element={<SinglePost isLoaded={isLoaded} setIsLoaded={setIsLoaded} />} />
            <Route path="/positions" element={<Positions />} />
            <Route path="/about" element={<About />} />
            <Route path="/legal" element={<Legal />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/business" element={<Business />} />
            <Route path="/archive" element={<Archive />} />
        </Routes>
    );
};

export default RouterNavigator;
