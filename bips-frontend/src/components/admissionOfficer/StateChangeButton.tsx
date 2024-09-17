import React from 'react';
import {State} from "../../generated"
import {IconButton} from "@material-ui/core";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import {apiPaths} from "../../apiPaths";

/**
 * Sends a state change request to change the intern state of an application with param applicationId to param state
 * @param state new state to be set
 * @param applicationId id of application
 * @param onOkAction will be executed if the state change is persisted successfully on the server
 * @constructor
 */
const StateChangeButton: React.FC<{ state: State, applicationId: string, onOkAction: (newState: State, applicationId: string) => void }> = ({state, applicationId, onOkAction}) => {
    return (
        <IconButton onClick={() => {
            fetch(apiPaths.application.setInternState.patch(applicationId, state), {
                method: "PATCH",
            }).then((data) => {
                if (data.ok) {
                    onOkAction(state, applicationId)
                } else {
                    alert("Es ist ein Fehler aufgetreten")
                }
            })
        }}>
            {state === State.MARKED && <BookmarkBorderIcon style={{color: "orange"}}/>}
            {state === State.DECLINED_BY_INSTITUTE && <CloseIcon style={{color: "red"}}/>}
            {state === State.ACCEPTED && <CheckIcon style={{color: "green"}}/>}
        </IconButton>
    );
};

export default StateChangeButton;