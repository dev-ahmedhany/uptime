import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { FixedSizeList } from 'react-window';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        height: 400,
        maxWidth: 300,
        backgroundColor: theme.palette.background.paper,
    },
}));

function renderRow({ data, index, style }) {

    return (
        <ListItem button style={style} key={index}>
            <ListItemText primary={`${data[index].time} ${data[index].code} ${data[index].name}`} />
        </ListItem>
    );
}

renderRow.propTypes = {
    data: PropTypes.any.isRequired,
    index: PropTypes.number.isRequired,
    style: PropTypes.object.isRequired,
};

function VirtualizedList({ Data }) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <FixedSizeList height={400} width={300} itemSize={46} itemCount={Data.length} itemData={Data}>
                {renderRow}
            </FixedSizeList>
        </div>
    );
}

VirtualizedList.propTypes = {
    Data: PropTypes.any.isRequired
}

export default VirtualizedList