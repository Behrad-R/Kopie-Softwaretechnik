import React, {useEffect, useState} from 'react';
import {Box} from "@material-ui/core";
import StudyProgramCard from "./StudyProgramCard";
import {StudyProgram} from "../generated";
import BackButton from "./BackButton";
import {apiPaths} from "../apiPaths";

/**
 * Main view of study programs
 * @constructor
 */
const StudyProgramsComponent = () => {

    const [studyPrograms, setStudyPrograms] = useState<StudyProgram[]>([])

    useEffect(() => {
        fetch(apiPaths.studyProgram.get)
            .then(data => data.json())
            .then(data => setStudyPrograms(data))
    }, [])


    return (
        <Box display={"flex"} flexDirection={"column"} width={"100%"}>
            <Box width={"100%"} alignItems={"start"} display={"flex"}>
                <BackButton backTo={"/ui"}/>
            </Box>
            <Box display={"flex"} flexDirection={"column"} width={"100%"} alignItems={"center"} paddingTop={"20px"}>
                {studyPrograms.map(program => <StudyProgramCard program={program}/>)}
            </Box>
        </Box>
    );
};

export default StudyProgramsComponent;