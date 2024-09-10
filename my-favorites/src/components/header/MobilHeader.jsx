import React, { useContext, useEffect, useState } from 'react';
import Path from '../../paths.js';
import { Link } from "react-router-dom";
import translateHeader from "../../utils/translator/translateHeader.js";
import { useLanguage } from "../../context/LanguageContext.jsx";
import authContext from "../../context/authContext.jsx";


export default function MobilHeader() {
    const [language, setLanguage] = useLanguage();
    const { _id, isAuthenticated, email,} = useContext(authContext);
    const [menuOpen, setMenuOpen] = useState(false);

    const getNavLinkClass = (path) => {
        return location.pathname.includes(path) ? 'current-page' : '';
    };

    const handleLanguageChange = (e) => {
        setLanguage(e.target.value);
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!e.target.closest('.dropdown-menu') && !e.target.closest('.menu-toggle')) {
                setMenuOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <>
                <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
                    <div className="burger-menu"></div>
                    <div className="burger-menu"></div>
                    <div className="burger-menu"></div>
                </button>

                
                <div className={`dropdown-menu ${menuOpen ? 'open' : ''}`}>
                    <Link className={getNavLinkClass(Path.Books)} to={Path.Books} onClick={closeMenu}>{translateHeader.books[language]}</Link>
                    <Link className={getNavLinkClass(Path.Movies)} to={Path.Movies} onClick={closeMenu}>{translateHeader.movies[language]}</Link>
                    <Link className={getNavLinkClass(Path.Series)} to={Path.Series} onClick={closeMenu}>{translateHeader.series[language]}</Link>
                    <Link className={getNavLinkClass(Path.Podcasts)} to={Path.Podcasts} onClick={closeMenu}>{translateHeader.podcasts[language]}</Link>
                    <Link className={getNavLinkClass(Path.EmailForm)} to={Path.EmailForm} onClick={closeMenu}>{translateHeader.contactUs[language]}</Link>

                    {isAuthenticated ? (
                        <>
                            <div className='profilMenu'>
                                <p className='profilMenu-email'>{email}</p>
                                <Link className={getNavLinkClass(Path.MyRecommends)} to={`${Path.MyRecommends}/${_id}`} onClick={closeMenu}>{translateHeader.myRecommendations[language]}</Link>
                                <Link className={getNavLinkClass(Path.Recommend)} to={Path.Recommend} onClick={closeMenu}>{translateHeader.recommend[language]}</Link>
                                <Link className={getNavLinkClass(Path.MyFavorites)} to={`${Path.MyFavorites}/${_id}`} onClick={closeMenu}>{translateHeader.favorites[language]}</Link>
                                <Link to={Path.Logout} onClick={closeMenu}>{translateHeader.logout[language]}</Link>
                            </div>
                        </>
                    ) : (
                        <>
                            <Link className={getNavLinkClass(Path.Login)} to={Path.Login} onClick={closeMenu}>{translateHeader.login[language]}</Link>
                            <Link className={getNavLinkClass(Path.Register)} to={Path.Register} onClick={closeMenu}>{translateHeader.register[language]}</Link>
                        </>
                    )}

                    <div className="language-selector">
                        <select value={language} onChange={handleLanguageChange}>
                            <option value="en">English</option>
                            <option value="de">Deutsch</option>
                            <option value="bg">Български</option>
                        </select>
                    </div>
                </div>

        </>
    );
}
