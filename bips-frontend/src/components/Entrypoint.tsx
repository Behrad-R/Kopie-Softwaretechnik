import React, {useContext} from 'react';
import {Redirect} from "react-router-dom"
import {UserProfileContext} from "../UserProfileContext";
import {UserProfile} from "../generated";
import {roleMappings} from "../roleMappings";


/**
 * The main entrypoint for all users. Here is decided where the user will be redirected based on the last occurring mappable role in his profile.
 * Mappable roles can be found in roleMappings.tsx
 * @constructor
 */
const Entrypoint = () => {

    const userProfile = useContext(UserProfileContext)

    function getEntryRoute(userProfile: UserProfile | undefined): string {
        let route = "";
        userProfile?.roles.forEach(role => {
            const found = roleMappings.get(role)
            if (found) {
                route = found;
            }
        })
        return route;
    }

    return (
        <React.Fragment>
            {userProfile && <Redirect to={getEntryRoute(userProfile)}/>}
        </React.Fragment>
    )
};


export default Entrypoint;