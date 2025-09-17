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
import TaxCalendar from "../pages/TaxCalendar.jsx";
import Portal from "../pages/Portal.jsx";
import {useEffect} from "react";
import {getData} from "../api/apiClient.jsx";
import {setArticles, setCategories, setNavItems} from "../redux/Reducer.jsx";
import {useDispatch} from "react-redux";
import useScrollToTop from "../hooks/useScrollToTop.js";

// eslint-disable-next-line react/prop-types
const RouterNavigator = ({isLoaded, setIsLoaded}) => {
    const dispatch = useDispatch();

    // Use the scroll to top hook
    useScrollToTop();

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const res = await getData('/api/posts?limit=10000');
                dispatch(setArticles(res.data.docs));
            } catch (err) {
                console.error('Error fetching articles:', err);
            }
        };
        void fetchArticles();
    }, [dispatch]);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const res = await getData('/api/categories');
                dispatch(setCategories(res.data.docs));
            } catch (err) {
                console.error('Error fetching categori:', err);
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
            <Route path="/tax-calendar" element={<TaxCalendar />} />
            <Route path="/portal" element={<Portal />} />
        </Routes>
    );
};

export default RouterNavigator;
