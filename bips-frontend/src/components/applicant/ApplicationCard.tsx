import React, {useEffect, useState} from 'react';
import {Application, State} from "../../generated";
import Card from "../Card";
import {Box, Typography} from "@material-ui/core";
import {createInfoLabel} from "../StudyProgramCard";
import {i18n} from "../../i18n";
import CardContextMenu from "../CardContextMenu";
import {apiPaths} from "../../apiPaths";

interface Props {
    application: Application
}


/**
 * Main view of the applicant
 * @param application
 * @constructor
 */
const ApplicationCard: React.FC<Props> = ({application}) => {
    const [amountApplications, setAmountApplications] = useState<string>();

    useEffect(() => {
        fetch(apiPaths.studyProgram.countApplications.get(application.studyProgram.id))
            .then(data => data.text())
            .then(data => setAmountApplications(data))
    }, [application.studyProgram.id])

    return (
        <Card padding={"40px"}>
            <Box display={"flex"}>
                <Typography variant={"h4"} style={{marginBottom: "20px", flex: 1}}>Bewerbung</Typography>
                <CardContextMenu entries={[{child: "Bewerbung zurückziehen", onClick: () => {
                        fetch(apiPaths.application.current.delete(application.id), {method: "delete" }).then((data) => {
                            if (data.ok) {
                                window.location.reload();
                            } else {
                                alert("Es ist ein Fehler aufgetreten")
                            }
                        });
                    }}]}/>
            </Box>
            {createInfoLabel("Studiengang", application.studyProgram.name, "150px")}
            <Box display={"flex"}>
                <Box style={{marginRight: "40px"}}>
                    {createInfoLabel("Bewerber", amountApplications, "150px")}
                    {createInfoLabel("Status", i18n.state.get(application.externState), "150px", application.externState === State.ACCEPTED ? "green" : "black")}
                    {createInfoLabel("Frist", new Date(application.studyProgram.deadline).toLocaleDateString(), "150px")}
                </Box>
                <Box style={{marginRight: "40px"}}>
                    {createInfoLabel("Freie Plätze", application.studyProgram.studyPlaces, "150px", "green")}
                    {createInfoLabel("Beworben am", new Date(application.timestamp).toLocaleDateString(), "150px")}
                    <Box>
                        <a href={application.studyProgram.studyManualLink} target="_blank"
                           rel={"noreferrer"}>Modulhanbuch </a>
                    </Box>
                </Box>
            </Box>
        </Card>
    );
};

export default ApplicationCard;