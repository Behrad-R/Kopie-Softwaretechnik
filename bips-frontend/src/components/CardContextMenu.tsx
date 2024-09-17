import React from "react";
import {Button, Menu, MenuItem} from "@material-ui/core";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

/**
 * child wil be displayed as menu item
 */
interface Props {
    entries: { child: any, onClick?: () => void }[]
}

/**
 * Context menu to use on cards
 * @param props
 * @constructor
 */
const CardContextMenu: React.FC<Props> = (props) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Button onClick={handleClick}>
                <MoreHorizIcon/>
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >

                {props.entries.map(entry => <MenuItem onClick={() => {
                    entry.onClick && entry.onClick()
                    handleClose()
                }}>{entry.child}</MenuItem>)}

            </Menu>
        </div>
    );
}

export default CardContextMenu;