import {Applicant, Application, DegreeType, DocumentType, Gender, State} from "./generated";

export const studyProgramsMock = [{
    credits: 180,
    id: "1",
    name: "Informatik",
    deadline: new Date(),
    language: "Deutsch",
    numerusClausus: 0,
    regularStudyTime: 6,
    startDate: new Date(),
    studyPlaces: 200,
    commonInfoLink: "https://wiso.uni-koeln.de/de/studium/bachelor/bachelor-wirtschaftsinformatik",
    degree: "Bsc Informatik",
    studyManualLink: "https://wiso.uni-koeln.de/sites/fakultaet/dokumente/downloads/bachelor/b_mhb_po15_winfo.pdf"
}]

export const applicantMock: Applicant = {
    id: "1",
    address: {
        country: "Deutschland",
        houseNumber: "20b",
        street: "Universitätsstraße",
        zipCode: "50937"
    },
    degrees: [{
        id: "1",
        documentName:"Abitur",
        gradeAverage: 2.3,
        type: DocumentType.DEGREE,
        degreeType: DegreeType.SCHOOL,
        description: "Test description",
        nameOfInstitute: "Schule in Köln"
    }],
    documents: [],
    euStudent: true,
    gender: Gender.MALE,
    phoneNumber: "0175555587",
    waitingTerms: 2
}

export const applicationsMock: Application[] = [
    {
        studyProgram: studyProgramsMock[0],
        applicant: applicantMock,
        externState: State.PENDING,
        id: "1",
        internState: State.ACCEPTED,
        timestamp: new Date(),
        acceptanceChoice: State.AWAIT_RESPONSE

    },

    {
        studyProgram: studyProgramsMock[0],
        applicant: applicantMock,
        externState: State.PENDING,
        id: "2",
        internState: State.DECLINED_BY_INSTITUTE,
        timestamp: new Date(),
        acceptanceChoice: State.AWAIT_RESPONSE

    },

    {
        studyProgram: studyProgramsMock[0],
        applicant: applicantMock,
        externState: State.PENDING,
        id: "3",
        internState: State.MARKED,
        timestamp: new Date(),
        acceptanceChoice: State.AWAIT_RESPONSE

    },
    {
        studyProgram: studyProgramsMock[0],
        applicant: applicantMock,
        externState: State.PENDING,
        id: "4",
        internState: State.PENDING,
        timestamp: new Date(),
        acceptanceChoice: State.AWAIT_RESPONSE

    }



]