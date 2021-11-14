import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import * as ROUTES from '../constants/routes'
import '../styles/css/not-found.css'
import ButtonBase from '@material-ui/core/ButtonBase';
import HomeIcon from '@material-ui/icons/Home';
import SearchBar from '../components/searchbar'


const NotFound = () => {

    useEffect(() => {
        document.title = 'Not Found - Upluxure';
    }, [])

    return (
        <div className="notfound">
            <div className="notfound_box mx-auth max-w-screen-lg">
                <p className="text-center text2x1 text-white-primary">
                    Page Not Found
                </p>
            </div>
            <div className="notfound_searchbox">
                <SearchBar />
            </div>
            <div className="notfound_home">
                <Link to={ROUTES.DASHBOARD} >
                    <ButtonBase>
                        <HomeIcon></HomeIcon>
                    </ButtonBase>
                </Link>
            </div>
        </div>
    )
}

export default NotFound
