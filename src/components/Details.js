import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: '12em',
        backgroundColor: theme.palette.background.paper,
        position: 'relative',
        overflow: 'auto',
        maxHeight: 300,
    },
    listSection: {
        backgroundColor: 'inherit',
    },
    ul: {
        backgroundColor: 'inherit',
        padding: 0,
    },
}));

function Details({ Data }) {
    const classes = useStyles();

    return (
        <List className={classes.root} subheader={<li />}>
            {Data.map((sectionId, index) => (
                <li key={`section-${index}`} className={classes.listSection}>
                    <ul className={classes.ul}>
                        <ListSubheader>{sectionId.name}</ListSubheader>
                        {sectionId.Data.map((item, subIndex) => (
                            <ListItem key={`item-${index}-${subIndex}`}>
                                <ListItemText primary={`${item.time}`} />
                                <ListItemText primary={`Error code : ${item.code}`} />
                            </ListItem>
                        ))}
                    </ul>
                </li>
            ))}
        </List>
    );
}

Details.propTypes = {
    Data: PropTypes.any.isRequired
}

export default Details;
