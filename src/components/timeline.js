/*eslint-disable no-nested-ternary */
import { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton'
import usePhotos from '../hooks/use-photos'
import Post from './post'
// import FollowPeople from './followpeople';
import FollowPeople from './suggestions/';
import FollowPeopleDesktop from './followpeople';

const Timeline = () => {

    const { photos } = usePhotos();

    /* Mobile */
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1076);

    const updateMedia = () => {
        setIsMobile(window.innerWidth < 1076);
    }
    useEffect(() => {
        window.addEventListener('resize', updateMedia);
        return () => window.removeEventListener('resize', updateMedia);
    }, []);

    return (
        <div className="container col-span-2 mt- text-white-primary ">
            {
                !photos ? (
                    <>
                        {[...new Array(4)].map((_, index) =>
                            <Skeleton
                                key={index}
                                count={4}
                                width={1080}
                                height={1350}
                                className="mb-5"
                            />
                        )}
                    </>
                ) : photos?.length > 0 ? (
                    photos.map((content) => <Post key={content.docId} content={content} />)
                ) : (
                    isMobile ? (
                        <div className="text-center text-2x1"><FollowPeople /> </div>
                    ) : (
                        <div className="text-center text-2x1"><FollowPeopleDesktop /> </div>
                    ) 
                )
            }

        </div>
    )
}

export default Timeline

// 1) get the logged in user pictures (custom hooks)
    // 2) on loading pictures, reaact skeleton
    // 3) create post component
    // 4) render photos if they are loaded & exist
    // 5) if no has photos, tell user to upload photos
