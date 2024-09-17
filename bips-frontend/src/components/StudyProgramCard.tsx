import React, {useEffect, useState} from 'react';
import {StudyProgram} from "../generated";
import Card from "./Card";
import {Box, Button, Typography} from "@material-ui/core";
import {colors} from "../theme";
import ForwardIcon from "@material-ui/icons/Forward"
import {apiPaths} from "../apiPaths";
import {useHistory} from "react-router-dom"

/**
 * Custom styled button
 * @param studyProgramId
 * @constructor
 */
const ApplyNowButton: React.FC<{ studyProgramId: string }> = ({studyProgramId}) => {

    const history = useHistory();

    return (
        <Button
            endIcon={<ForwardIcon/>}
            style={{
                textTransform: "none",
                backgroundColor: colors.lightGray,
                borderRadius: "0px",
                color: colors.darkGray,
                padding: "10px"
            }}
            onClick={() => {
                fetch(apiPaths.application.apply.put(studyProgramId), {method: "PUT"})
                    .then((resp) => {
                        if (resp.ok) {
                            history.push("/ui/my-applications")
                        } else {
                            alert("Sie haben sich bereits für diesen Studiengang beworben.")
                        }
                    });
            }}
        >
            Verbindlich Bewerben
        </Button>
    )

}

interface Props {
    program: StudyProgram
}

/**
 * Frontend representation of a study program
 * @param program
 * @constructor
 */
const StudyProgramCard: React.FC<Props> = ({program}) => {

    const [amountApplications, setAmountApplications] = useState<string>();

    useEffect(() => {
        fetch(apiPaths.studyProgram.countApplications.get(program.id))
            .then(data => data.text())
            .then(data => setAmountApplications(data))
    }, [program.id])

    return (
        <
            Card
            padding={"40px"}>
            < Typography
                variant={"h4"}
                style={
                    {
                        marginBottom: "20px"
                    }
                }>
                {
                    program.name
                }
            </Typography>
            <Box display={"flex"}>
                <Box style={{marginRight: "40px"}}>
                    {createInfoLabel("Begin", new Date(program.startDate).toLocaleDateString(), "170px")}
                    {createInfoLabel("Studienplätze", program.studyPlaces, "170px", "green")}
                    {createInfoLabel("Nummerus Clausus", program.numerusClausus, "170px")}
                </Box>
                <Box style={{marginRight: "40px"}}>
                    {createInfoLabel("Regelstudienzeit", program.regularStudyTime, "150px")}
                    {createInfoLabel("Bewerber", amountApplications, "150px")}
                    {createInfoLabel("Abschluss", program.degree, "150px")}

                </Box>
                <Box>
                    {createInfoLabel("ECTS", program.credits)}
                </Box>
            </Box>
            <Box display={"flex"} marginTop={"30px"}>
                <Box flex={1} display="flex" flexDirection={"column"}>
                    <a href={program.studyManualLink} target="_blank" rel={"noreferrer"}>Modulhanbuch</a>
                    <a href={program.commonInfoLink} target="_blank" rel={"noreferrer"}>Allgemeine Infos zum Studium</a>
                </Box>
                <ApplyNowButton studyProgramId={program.id}/>
            </Box>
        </Card>
    );
};

export function createInfoLabel(title: string, value: any, width?: string, color?: string) {
    return (
        <Box display={"flex"} paddingBottom={"5px"}>
            <Typography style={{width: width ? width : "100px", color: colors.darkGray}}>{title}</Typography>
            <Typography style={{color: color}}>{value}</Typography>
        </Box>
    )
}

export default StudyProgramCard;