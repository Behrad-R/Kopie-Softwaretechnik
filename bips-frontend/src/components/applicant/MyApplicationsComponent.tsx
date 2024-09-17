import React, {useEffect, useState} from 'react';
import {Box} from "@material-ui/core";
import {colors} from "../../theme";
import AddIcon from "@material-ui/icons/Add"
import {useHistory} from "react-router-dom"
import {Application} from "../../generated";
import ApplicationCard from "./ApplicationCard";
import {apiPaths} from "../../apiPaths";


/**
 * Button to add a new application
 * @constructor
 */
const AddStudyProgramButton = () => {

    const history = useHistory();

    return (
        <Box
            border={`2px solid ${colors.lightGray}`}
            height="250px"
            minWidth="600px"
            marginTop="40px"
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            style={{cursor: "pointer"}}
            marginBottom={"40px"}
            onClick={() => history.push("/ui/study-programs")}
        >
            <AddIcon style={{color: colors.lightGray, height: "30px", width: "30px"}}/>
        </Box>
    )
}


const MyApplicationsComponent = () => {

    const [applications, setApplications] = useState<Application[]>([])

    useEffect(() => {
        fetch(apiPaths.application.current.get)
            .then(data => data.json())
            .then(data => setApplications(data))
    }, [])

    return (
        <Box>
            {applications.map(application => <ApplicationCard application={application}/>)}
            <AddStudyProgramButton/>
        </Box>
    );
};

export default MyApplicationsComponent;