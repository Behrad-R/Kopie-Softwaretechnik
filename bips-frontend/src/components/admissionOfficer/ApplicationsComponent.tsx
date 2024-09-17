import React, {useEffect, useState} from 'react';
import {Box, Typography} from "@material-ui/core";
import {Application, State, StudyProgram} from "../../generated";
import CardContextMenu from "../CardContextMenu";
import ApplicationsTable from "./ApplicationsTable"
import {apiPaths} from "../../apiPaths";
import {useParams} from "react-router-dom";


/**
 * Main component for the admission officers table
 * @constructor
 */
const ApplicationsComponent: React.FC = () => {

    const [applications, setApplications] = useState<Application[]>([])

    const [studyProgram, setStudyProgram] = useState<StudyProgram>();

    const {id} = useParams<{ id: string }>();

    useEffect(() => {
        //Getting applications for study program with id 1 (Informatik BSc)
        fetch(apiPaths.application.byStudyProgram.get(id))
            .then(data => data.json())
            .then(data => setApplications(data))

        fetch(apiPaths.studyProgram.getById(id))
            .then(data => data.json())
            .then(data => setStudyProgram(data))
    }, [id])


    function getAmountWithState(state: State) {
        return applications.filter(application => application.internState === state).length;
    }

    return (
        <Box width={"100%"} display={"flex"} justifyContent={"center"} flexDirection={"column"}>
            <Box style={{marginBottom: "20px"}}>
                <Box display={"flex"}>
                    <Typography variant={"h4"} style={{flex: 1}}>
                        Bewerbungen {studyProgram?.name}: {applications.length}
                    </Typography>
                    <CardContextMenu entries={[{
                        child: "Bewerbungsvorgang abschließen",
                        onClick: () => {
                            fetch(apiPaths.studyProgram.finishProcess.patch(studyProgram?.id as string), {method: "PATCH"})
                                .then((resp) => {
                                        if (resp.ok) {
                                            //TODO do some stuff
                                        } else {
                                            alert("Etwas is schief gelaufen")
                                        }
                                    }
                                )
                        }
                    }]}/>
                </Box>
                <Typography>
                    <span style={{marginRight: "3px"}}>
                        Belegt:
                    </span>
                    <span style={{color: "green"}}>
                        {getAmountWithState(State.ACCEPTED)}
                    </span>
                    <span style={{marginLeft: "8px", marginRight: "3px"}}>
                        Vorgemerkt:
                    </span>
                    <span style={{color: "orange"}}>
                        {getAmountWithState(State.MARKED)}
                    </span>
                    <span style={{marginLeft: "8px", marginRight: "3px"}}>
                        Anzahl Plätze: 
                    </span>
                    <span>
                        {studyProgram?.studyPlaces}
                    </span>
                </Typography>
            </Box>
            <ApplicationsTable applications={applications} studyProgram={studyProgram as StudyProgram}/>
        </Box>
    );
};

export default ApplicationsComponent;