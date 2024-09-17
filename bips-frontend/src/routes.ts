import Entrypoint from "./components/Entrypoint";
import MyApplicationsComponent from "./components/applicant/MyApplicationsComponent";
import StudyProgramsComponent from "./components/StudyProgramsComponent";
import ApplicationsComponent from "./components/admissionOfficer/ApplicationsComponent";
import DetailedApplicationComponent from "./components/admissionOfficer/DetailedApplicationComponent";

const rootRoute = "/ui"

/**
 * routes in the react application
 */
export const routes = [

    {
        path: `${rootRoute}/`,
        exact: true,
        component: Entrypoint
    },

    {
        path: `${rootRoute}/applications/:id`,
        exact: true,
        component: ApplicationsComponent
    },

    {
        path: `${rootRoute}/my-applications`,
        exact: true,
        component: MyApplicationsComponent
    },
    {
        path: `${rootRoute}/study-programs`,
        exact: true,
        component: StudyProgramsComponent
    },
    {
        path: `/ui/application/:id`,
        exact: true,
        component: DetailedApplicationComponent
    }


]