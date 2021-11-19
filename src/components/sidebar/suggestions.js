import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

const Suggestions = ({ userId }) => {

    const [profiles, setProfiles] = useState(null)

    // we need to get the suggested profiles (firebase server)
    // getSuggestedProfiles(userId)
    // call the async func from the server 
    // store it in state
    // render (wait for the profiles to be loaded )

    useEffect(() => { 

    }, [])

    return (
        <div className="text-gray-primary">
            suggestions
        </div>
    )
}

export default Suggestions

Suggestions.propTypes = { 
    useId: PropTypes.string
}