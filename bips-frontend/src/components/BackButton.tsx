import React from 'react';
import {Button} from "@material-ui/core";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {useHistory} from "react-router-dom"

/**
 * Button which redirects to the specified url with icon
 * @param backTo
 * @constructor
 */
const BackButton: React.FC<{backTo: string}> = ({backTo}) => {

    const history = useHistory();

    return (
        <Button startIcon={<ArrowBackIcon/>} onClick={() => history.push(backTo)} style={{textTransform: "none"}}>Zurück</Button>
    );
};

export default BackButton;