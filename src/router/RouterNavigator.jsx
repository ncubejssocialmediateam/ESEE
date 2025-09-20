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
import News from "../pages/News.jsx";
import PressReleases from "../pages/PressReleases.jsx";
import Administration from "../pages/Administration.jsx";
import Contact from "../pages/Contact.jsx";
import VisionMission from "../pages/VisionMission.jsx";
import Members from "../pages/Members.jsx";
import InemyKaele from "../pages/InemyKaele.jsx";
import Circulars from "../pages/Circulars.jsx";
import Publications from "../pages/Publications.jsx";
import Competitions from "../pages/Competitions.jsx";
import MemberSupport from "../pages/MemberSupport.jsx";
import PortalDebug from "../components/debug/PortalDebug.jsx";
import ErrorBoundary from "../components/debug/ErrorBoundary.jsx";
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
            <Route path="/portal" element={<ErrorBoundary><Portal /></ErrorBoundary>} />
            <Route path="/news" element={<News />} />
            <Route path="/press-releases" element={<PressReleases />} />
            <Route path="/administration" element={<Administration />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/vision-mission" element={<VisionMission />} />
                <Route path="/members" element={<Members />} />
                <Route path="/inemy-kaele" element={<InemyKaele />} />
                <Route path="/circulars" element={<Circulars />} />
                <Route path="/publications" element={<Publications />} />
                <Route path="/competitions" element={<Competitions />} />
                <Route path="/member-support" element={<MemberSupport />} />
                <Route path="/portal-debug" element={<PortalDebug />} />
        </Routes>
    );
};

export default RouterNavigator;
