import React, {useContext} from 'react';
import {Box, Button, Typography} from "@material-ui/core";
import {colors, theme} from "../theme";
import {apiPaths} from "../apiPaths";
import {UserProfileContext} from "../UserProfileContext";

/**
 * The top bar with logout button and username display
 * @constructor
 */
const TopBar = () => {

    const userProfile = useContext(UserProfileContext)

    return (
        <Box
            width={"100%"}
            height={"90px"}
            display={"flex"}
            style={{backgroundColor: "#3e3e3e", color: "white"}}
            alignItems={"center"}
            padding={"0px 40px"}
            boxShadow={theme.boxShadow}
            zIndex={10}
            boxSizing={"border-box"}
            minHeight={"90px"}
        >
            <Box flex={1}>
                <Typography variant={"h5"}>Bips</Typography>
                <Typography style={{color: colors.lightGray}}>University of Cologne</Typography>
            </Box>
            <Box display={"flex"} alignItems={"center"}>
                <Typography style={{
                    marginRight: "20px",
                    fontSize: "20px"
                }}>{userProfile?.firstname} {userProfile?.lastname}</Typography>
                <form action={apiPaths.logout.get} method={"GET"}>
                    <Button color={"inherit"} type={"submit"} style={{textTransform: "none"}}>Logout</Button>
                </form>
            </Box>
        </Box>
    );
};

export default TopBar;