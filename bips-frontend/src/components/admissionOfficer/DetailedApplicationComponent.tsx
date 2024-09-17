import React, {useEffect, useState} from 'react';
import {
    Box, IconButton,
    List,
    ListItem,
    Paper,
    Table, TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Typography
} from "@material-ui/core";
import BackButton from "../BackButton";
import Card from "../Card";
import {useParams} from "react-router";
import {apiPaths} from "../../apiPaths";
import {Application, DocumentType, State} from "../../generated";
import {createInfoLabel} from "../StudyProgramCard";
import {i18n} from "../../i18n";
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import StateChangeButton from "./StateChangeButton";
import {useHistory} from "react-router-dom";


/**
 * A button with pdf logo on it wicht redirects to the specified url
 * @param url
 * @constructor
 */
const PdfDownloadButton: React.FC<{ url: string }> = ({url}) => {

    return (
        <a href={url} target={"_blank"} rel={"noreferrer"}>
            <IconButton>
                <PictureAsPdfIcon/>
            </IconButton>
        </a>
    )
}

const DetailedApplicationComponent = () => {


    const {id} = useParams<{ id: string }>();

    const [application, setApplication] = useState<Application>();

    const history = useHistory();

    useEffect(() => {
        fetch(apiPaths.application.byId.get(id))
            .then(data => {
                    if (data.ok) {
                        return data.json().then(data => setApplication(data))
                    }
                }
            )
    }, [id])

    const reloadTable = () => {
        history.push(`/ui/applications/${application?.studyProgram.id}`);
    }


    return (
        <Box display={"flex"} flexDirection={"column"} width={"100%"}>
            <Box width={"100%"} alignItems={"start"} display={"flex"}>
                <BackButton backTo={`/ui/applications/${application?.studyProgram.id}`}/>
            </Box>
            <Box display={"flex"} flexDirection={"column"} width={"100%"} alignItems={"center"} paddingTop={"20px"}>
                <Box display={"flex"} flexDirection={"column"} width={"100%"} alignItems={"center"} paddingTop={"20px"}>
                    <Card width={"70%"} padding={"10px"}>
                        <Box padding={"3%"}>
                            <Typography gutterBottom variant="h5" component="h2">Bewerber</Typography>
                            <List>
                                <ListItem>{createInfoLabel("Studiengang", application?.studyProgram.name, "170px")}</ListItem>
                                <ListItem>{createInfoLabel("EU-Student", application?.applicant.euStudent ? "Ja" : "Nein", "170px")}</ListItem>
                                <ListItem>{createInfoLabel("Wartesemester", application?.applicant.waitingTerms, "170px")}</ListItem>
                                <ListItem>{createInfoLabel("Beworben am", new Date(application?.timestamp as unknown as string).toLocaleDateString(), "170px")}</ListItem>
                            </List>
                            <Typography gutterBottom variant="h6" style={{marginBottom: "20px"}}>Abschlüsse</Typography>
                            <Paper variant="outlined" square style={{marginBottom: "20px"}}>
                                <TableContainer component={Paper}>
                                    <Table aria-label="simple table">
                                        <TableBody>
                                            {application?.applicant.degrees.map(degree => (
                                                <TableRow key={degree.id}>
                                                    <TableCell width={"180px"}>{i18n.degree.get(degree.degreeType)}</TableCell>
                                                    <TableCell>{degree.nameOfInstitute}</TableCell>
                                                    <TableCell>{degree.gradeAverage}</TableCell>
                                                    <TableCell>{degree.description}</TableCell>
                                                    <TableCell align={"right"}>
                                                        <PdfDownloadButton
                                                            url={apiPaths.applicant.getDocumentByID(application?.applicant.id, degree.id)}/>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Paper>
                            <Typography gutterBottom variant="h6" style={{marginBottom: "20px"}}>Dokumente</Typography>
                            <Paper variant="outlined" square>
                                <TableContainer component={Paper}>
                                    <Table aria-label="simple table">
                                        <TableBody>
                                            {application?.applicant.documents.filter(document => document.type !== DocumentType.DEGREE).map(document => (
                                                <TableRow key={document.id}>
                                                    <TableCell width={"180px"}>{i18n.document.get(document.type)}</TableCell>
                                                    <TableCell>{document.description}</TableCell>
                                                    <TableCell align={"right"}>
                                                        <PdfDownloadButton
                                                            url={apiPaths.applicant.getDocumentByID(application?.applicant.id, document.id)}/>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Paper>
                        </Box>
                        <Box display={"flex"} width={"100%"} justifyContent={"center"} padding={"20px"} boxSizing={"border-box"}>
                            <StateChangeButton state={State.DECLINED_BY_INSTITUTE} applicationId={application?.id as string} onOkAction={reloadTable}/>
                            <StateChangeButton state={State.MARKED} applicationId={application?.id as string} onOkAction={reloadTable}/>
                            <StateChangeButton state={State.ACCEPTED} applicationId={application?.id as string} onOkAction={reloadTable}/>
                        </Box>
                    </Card>
                </Box>
            </Box>
        </Box>
    );
};

export default DetailedApplicationComponent;