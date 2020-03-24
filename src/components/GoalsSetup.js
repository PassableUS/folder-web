import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { createGoals } from 'src/actions/goalsActions';
import { updateUserModals } from 'src/actions/userActions';
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

function GoalsSetup({ show, mode, pathwayData, courseData, onModalClose }) {
    const user = JSON.parse(localStorage.getItem('userProfile'));
    const lastWeekGoalSaved = user.weeklyGoalsLastAsked || '0';
    const dontShowModalAgain =
        mode == 'week' ?
            user.neverAskWeeklyGoals :
            (mode == 'course' ? user.neverAskCourseGoals : user.neverAskPathwayGoals);
    const classes = useStyles();
    const dispatch = useDispatch();
    const nowTime = (new Date).getTime();
    const shownThisWeek = moment(nowTime).startOf('week').isSame(moment(Number(lastWeekGoalSaved)).startOf('week'), 'day');
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
        
        if (onModalClose) {
            onModalClose();
        }
    };

    const handleDontShow = () => {
        if (onModalClose) {
            onModalClose();
        }
        const onSuccess = (data) => {localStorage.setItem('userProfile', JSON.stringify(data))};
        const onFailure = () => { alert('There was an error while sending asking again') };
        if (mode == 'week') {
            dispatch(updateUserModals({ neverAskWeeklyGoals: true }, onSuccess, onFailure));
        } else if (mode == 'course') {
            dispatch(updateUserModals({ neverAskCourseGoals: true }, onSuccess, onFailure));
        } else if (mode == 'pathway') {
            dispatch(updateUserModals({ neverAskPathwayGoals: true }, onSuccess, onFailure));
        }
        setModal({
            open: false
        });
    }

    
    const convertGoalsForBackend = (goals) => {
        const goalAdditions = {};

        if (mode == 'week') {
            goalAdditions.startDate = moment().startOf('week').startOf('day').toISOString();
            goalAdditions.endDate = moment().endOf('week').startOf('day').toISOString();
        } else if (mode == 'course') {
            goalAdditions.moduleId = courseData.moduleId;
            goalAdditions.courseURL = courseData.courseURL.split('/');
        } else if (mode == 'pathway') {
            goalAdditions.pathwayId = pathwayData.id;
        }
        
        return goals.reduce((acc, cur) => {
            if (cur.length == 0) return acc;
            return acc.concat({ ...goalAdditions, goal: cur, user: user.id });
        }, []);
    }
    
    const handleSave = () => {
        if (onModalClose) {
            onModalClose();
        }
        const onFailure = () => {
            alert('There was an error while setting goals')
        }
        const onSuccess = (data) => {
            if (mode == 'week') {
                const updateObject = { weeklyGoalsLastAsked: nowTime };
                const onUserUpdateSuccess = (data) => {localStorage.setItem('userProfile', JSON.stringify(data))};
                const onUserUpdateFailure = () => { alert('There was an error while sending user last asked'); }
                dispatch(updateUserModals(updateObject, onUserUpdateSuccess, onUserUpdateFailure));
            }
        }
        
        const data = convertGoalsForBackend(goals);
        dispatch(createGoals(data, onFailure, onSuccess));
        setModal({
            open: false
        });
    }

    useEffect(() => {
        if ([true, false].includes(show)) {
            setModal({open: show});        
        }
        }, [show]);

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

    const getModalTitle = () => {
        const titles = {
            'week': 'Please, enter your weekly goals:',
            'course': 'Please, enter your goals for this course:',
            'pathway': 'Please, enter your goals for this pathway:'
        };

        return titles[mode];
    }

    return (
        <>
            {
                ((!dontShowModalAgain && user.registrationStatus == "finished") || show) && (mode != 'week' || !shownThisWeek) &&

                <Modal
                    className={classes.modal}
                    onClose={handleModalClose}
                    open={modal.open}
                >
                    <Card className={classes.card}>
                        <CardHeader title={getModalTitle()}>
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

GoalsSetup.propTypes = {
    show: PropTypes.bool,
    mode: PropTypes.oneOf(['course', 'pathway', 'week']),
    pathwayData: PropTypes.shape({ id: PropTypes.string }),
    courseData: PropTypes.shape({ moduleId: PropTypes.string, courseURL: PropTypes.string }),
    onModalClose: PropTypes.func
};

export default GoalsSetup;
