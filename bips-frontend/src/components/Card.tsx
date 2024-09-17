import React from 'react';
import {Box} from "@material-ui/core";
import {theme} from "../theme";


interface Props {
    width?: string,
    padding?: string
}

/**
 * Simple container for frontend components with white background and shadow
 * @param props
 * @constructor
 */
const Card: React.FC<Props> = (props) => {
    return (
        <Box boxShadow={theme.boxShadow} padding={props.padding ? props.padding : "20px"} boxSizing={"border-box"}
             style={{backgroundColor: "white"}} width={props.width} marginBottom={"30px"}>
            {props.children}
        </Box>
    );
};

export default Card;