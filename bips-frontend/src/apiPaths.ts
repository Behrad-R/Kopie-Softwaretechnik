import {State} from "./generated";

/**
 * all paths to the spring boot backend
 */
export const apiPaths = {

    userProfile: {
        get: "/api/profile"
    },

    logout: {
        get: "/logout"
    },

    application: {
        current: {
            get: "/api/application/currentUser",
            delete: (applicationId: string) => `/api/application/currentUser/${applicationId}`
        },
        byStudyProgram: {
            get: (studyProgramId: string) => `/api/application/study-program/${studyProgramId}`
        },
        apply: {
            put: (studyProgramId: string) => `/api/application/apply/${studyProgramId}`
        },
        byId:{
            get: (applicationId: string) =>  `/api/application/${applicationId}`,
        },
        setInternState: {
            patch: (applicationId: string, internState: State) => `/api/application/${applicationId}/internState/${internState}`
        },
    },
    applicant:{
        getById: (applicantId: string) =>   `/api/applicant/${applicantId}`,
        getDocumentByID:(applicantId: string, documentId: string) => `/api/applicant/${applicantId}/documents/${documentId}`
    },
    studyProgram: {
        get: "/api/study-program",
        getById: (id: string) => `/api/study-program/${id}`,
        countApplications: {
            get: (studyProgramId: string) => `/api/study-program/${studyProgramId}/count-applications`
        },
        finishProcess: {
            patch: (studyProgramId: string) => `/api/study-program/${studyProgramId}/finish-process`
        }
    }
}