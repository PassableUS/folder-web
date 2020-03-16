import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { createGoals } from 'src/actions/goalsActions';
import { makeStyles } from '@material-ui/styles';
import {
    Modal,
    Card,
    CardHeader,
    CardActions,
    CardContent,
    Button,
    FormControlLabel,
    FormGroup,
    IconButton,
    InputAdornment,
    Input,
    colors
} from '@material-ui/core';
import { HighlightOff, AddCircle } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        display: "flex",
        flexDirection: "column",
        width: "fit-content",
        margin: "auto",
        minWidth: "600px"
    },
    formLabel: {
        marginLeft: 0,
        marginBottom: "20px"
    },
    input: {
        width: "100%"
    },
    removeButton: {
        position: "absolute",
        color: colors.red[500]
    },
    addButton: {
        width: "fit-content",
        marginLeft: "auto",
        marginRight: "-8px"
    },
    actionButton: {
        marginLeft: "auto"
    }
}));

function GoalsSetup() {
    //helper to check if dates are from the same week
    const startOfWeek = (_moment, _offset) => {
        return _moment.add("days", _moment.weekday() * -1 + (_moment.weekday() >= 7 + _offset ? 7 + _offset : _offset));
    }

    const isSameWeek = (firstDay, secondDay, offset) => {
        const firstMoment = moment(firstDay);
        const secondMoment = moment(secondDay);

        return startOfWeek(firstMoment, offset).isSame(startOfWeek(secondMoment, offset), "day");
    }

    //check if modal with dates was shown and then show if
    const lastWeekGoalSaved = localStorage.getItem("lastWeekGoalSaved") || '0';
    const dontShowModalAgain = !!localStorage.getItem("dontShowGoalModalAgain");
    const classes = useStyles();
    const dispatch = useDispatch();
    const nowTime = (new Date).getTime();
    const shownThisWeek = isSameWeek(nowTime, Number(lastWeekGoalSaved), 0);
    const [modal, setModal] = useState({
        open: true
    });
    const [goals, setGoals] = useState([]);

    const numberOfInitialFields = 3;

    const handleChangeInput = (i, event) => {
        const values = [...goals];
        const { value } = event.target;
        values[i] = value;
        setGoals(values);
    }

    const handleAddInput = (numberOfFields) => {
        const values = [...goals];
        const field = '';
        for (let i = 0; i < numberOfFields; i++) {
            values.push(field);
        }
        setGoals(values);
    }

    const handleRemoveInput = (i) => {
        const values = [...goals];        
        values.splice(i, 1);
        setGoals(values);
    }

    const handleModalClose = () => {
        setModal({
            open: false
        });
    };

    const handleDontShow = () => {
        localStorage.setItem("dontShowGoalModalAgain", "true");
        setModal({
            open: false
        });
    }

    const convertGoalsForBackend = (goals) => {
        return goals.map(goal => ({
            goal, 
            startDate: moment().startOf('week').startOf('day').toISOString(),
            endDate: moment().endOf('week').startOf('day').toISOString(),
        }));
    }

    const handleSave = () => {
        const onFailure = () => {
            alert('There was an error while setting goals')
        }
        const onSuccess = () => { 
            localStorage.setItem("lastWeekGoalSaved", nowTime.toString());
        }

        const data = convertGoalsForBackend(goals);
        dispatch(createGoals(data, onFailure, onSuccess));
        setModal({
            open: false
        });
    }

    useEffect(() => {
        handleAddInput(numberOfInitialFields);
    }, [])

    const spawnTextFields = () => {
        return goals.map((textField, i) =>
            (<FormControlLabel
                className={classes.formLabel}
                key={i.toString()}
                control={
                    <Input
                        className={classes.input}
                        type="text"
                        value={textField}
                        name="goal"
                        onChange={(e) => handleChangeInput(i, e)}
                        endAdornment={
                            goals.length > 3 ?
                            <InputAdornment position="end">
                                <IconButton
                                    className={classes.removeButton}
                                    aria-label="Remove goal"
                                    onClick={() => handleRemoveInput(i)}
                                >
                                    <HighlightOff />
                                </IconButton>
                            </InputAdornment>
                            : ''
                        }
                    />
                }
            />)
        )
    }
    return (
        <>
            {
                dontShowModalAgain != "true" && !shownThisWeek &&

                <Modal
                    className={classes.modal}
                    onClose={handleModalClose}
                    open={modal.open}
                >
                    <Card className={classes.card}>
                        <CardHeader title="Please, enter your weekly goals:">
                        </CardHeader>
                        <CardContent>
                            <FormGroup>
                                {
                                    spawnTextFields()
                                }
                                {
                                    goals.length < 5 && 
                                    <IconButton
                                        className={classes.addButton}
                                        size="medium"
                                        edge="end"
                                        color="primary"
                                        aria-label="Add goal"
                                        onClick={() => handleAddInput(1)}
                                    >
                                        <AddCircle />
                                    </IconButton>
                                }
                            </FormGroup>
                        </CardContent>
                        <CardActions>
                            <Button onClick={handleDontShow} size="small" className={classes.actionButton}>
                                Don't show again
                        </Button>
                            <Button onClick={handleSave} size="small" color="primary" className={classes.actionButton}>
                                Save
                        </Button>
                        </CardActions>
                    </Card>
                </Modal>
            }
        </>
    );
}


export default GoalsSetup;
