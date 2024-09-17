import React, {useEffect, useState} from 'react';
import {Box} from "@material-ui/core";
import TopBar from "./components/TopBar";
import {colors} from "./theme";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {routes} from "./routes";
import {UserProfile} from "./generated";
import {UserProfileContext} from "./UserProfileContext";
import {apiPaths} from "./apiPaths";

/**
 * Main app view
 * @constructor
 */
function App() {

    const [userProfile, setUserProfile] = useState<UserProfile>()

    useEffect(() => {
        fetch(apiPaths.userProfile.get)
            .then(data => data.json())
            .then(data => setUserProfile(data))
    }, [])

    return (
        <UserProfileContext.Provider value={userProfile}>
            <Box height={"100vh"} width={"100%"} display={"flex"} flexDirection={"column"} overflow={"hidden"}
                 boxSizing={"borderBox"}>
                <TopBar/>
                <Box flex={1} display={"flex"} style={{backgroundColor: colors.backgroundGray, overflow: "auto"}} alignItems={"start"}
                     justifyContent={"center"} boxSizing={"border-box"} padding={"40px"}>
                    <Router>
                        <Switch>
                            {routes.map(route => <Route path={route.path} exact={route.exact}
                                                        component={route.component}/>)}
                        </Switch>
                    </Router>
                </Box>
            </Box>
        </UserProfileContext.Provider>
    );
}

export default App;
