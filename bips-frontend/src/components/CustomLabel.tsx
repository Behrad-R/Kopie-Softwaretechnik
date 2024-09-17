import React from 'react';
import {Box, InputLabel} from "@material-ui/core";


/**
 * Lable with title
 * @constructor
 */
const CustomLabel = () => {
    return (
        <Box>

            <InputLabel>
                Test
            </InputLabel>
            <InputLabel style={{marginLeft: "10px"}}>
                Test 2
            </InputLabel>
        </Box>
    );
};

export default CustomLabel;