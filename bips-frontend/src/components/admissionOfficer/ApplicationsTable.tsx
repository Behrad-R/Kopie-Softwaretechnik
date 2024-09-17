import React, {useEffect, useState} from "react";
import {Applicant, Application, DegreeType, DocumentType, State, StudyProgram} from "../../generated";
import {useHistory} from "react-router-dom";
import {ColDef, DataGrid, ValueFormatterParams, ValueGetterParams} from "@material-ui/data-grid";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import {Box, IconButton} from "@material-ui/core";
import InfoIcon from "@material-ui/icons/Info";
import CardContextMenu from "../CardContextMenu";
import {theme} from "../../theme";
import StateChangeButton from "./StateChangeButton";

const ApplicationsTable: React.FC<{ applications: Application[], studyProgram: StudyProgram }> = (props) => {
    const history = useHistory();
    const reloadTable = (state: State, applicationId: string) => {
        setApplications([...applications, {...applications.filter(application => application.id === applicationId)[0], internState: state}])
    }

    const [applications, setApplications] = useState<Application[]>(props.applications)
    useEffect(()=> setApplications(props.applications),[props.applications])
    const columns: ColDef[] = [
        {
            field: "state",
            headerName: " ",
            renderCell: (params: ValueGetterParams) => {
                const state = params.getValue("internState")
                if (state === State.MARKED) {
                    return <BookmarkBorderIcon style={{color: "orange"}}/>
                } else if (state === State.ACCEPTED) {
                    return <CheckIcon style={{color: "green"}}/>
                } else if (state === State.DECLINED_BY_INSTITUTE) {
                    return <CloseIcon style={{color: "red"}}/>
                }
                return <div/>
            }
        },
        {field: 'id', headerName: 'ID', width: 300},
        {
            field: 'timestamp',
            headerName: 'Beworben am',
            width: 250,
            valueFormatter: (params: ValueFormatterParams) =>
                (new Date(params.value as Date)).toUTCString()
        },
        {
            field: 'euStudent',
            headerName: 'EU Student',
            width: 130,
            renderCell: (params: ValueGetterParams) => (
                (params.getValue("applicant") as Applicant).euStudent ? <CheckIcon/> : <CloseIcon/>
            )
        },
        {
            field: "highSchoolGrade",
            headerName: "Abitur Notendurchschnitt",
            width: 200,
            valueGetter: (params: ValueGetterParams) => {
                const grade = (params.getValue("applicant") as Applicant).degrees.filter(degree => degree.degreeType === DegreeType.SCHOOL)[0].gradeAverage
                if (grade) {
                    return grade;
                } else {
                    return "/"
                }
            }
        },
        {
            field: "waitingTerms",
            headerName: "Wartesemester",
            width: 150,
            valueGetter: (params: ValueGetterParams) =>
                (params.getValue("applicant") as Applicant).waitingTerms
        },
        {
            field: 'recommendations',
            headerName: 'Empfehlungen',
            width: 130,
            valueGetter: (params: ValueGetterParams) =>
                (params.getValue("applicant") as Applicant).documents.filter(document => document.type === DocumentType.RECOMMENDATION).length
        },
        {
            field: 'internships',
            headerName: 'Praktika',
            width: 130,
            valueGetter: (params: ValueGetterParams) =>
                (params.getValue("applicant") as Applicant).documents.filter(document => document.type === DocumentType.INTERNSHIP).length
        },
        {
            field: "detailsButton",
            headerName: " ",
            renderCell: (params: ValueGetterParams) => (
                <IconButton
                    onClick={() => history.push(`/ui/application/${params.getValue("id")}`)}><InfoIcon/></IconButton>
            )
        },
        {
            field: "editButton",
            headerName: " ",
            align: "right",
            flex: 1,
            renderCell: (params: ValueGetterParams) =>
                <Box style={{position: "absolute", right: 0}}>
                    <CardContextMenu entries={[
                        {child: <StateChangeButton state={State.DECLINED_BY_INSTITUTE} applicationId={params.getValue("id") as string} onOkAction={reloadTable}/>},
                        {child: <StateChangeButton state={State.MARKED} applicationId={params.getValue("id") as string} onOkAction={reloadTable}/>},
                        {child: <StateChangeButton state={State.ACCEPTED} applicationId={params.getValue("id") as string} onOkAction={reloadTable}/>}]}/>
                </Box>

        }
    ];


    return (
        <Box style={{height: "700px", backgroundColor: "white", boxShadow: theme.boxShadow, borderRadius: "5px"}}>
            <DataGrid rows={applications} columns={columns}/>
        </Box>
    )


}

export default ApplicationsTable;