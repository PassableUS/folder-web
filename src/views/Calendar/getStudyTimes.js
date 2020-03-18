import moment from 'moment';

const inverseToFree = (events) => {
    //get first and last days of week
    const startOfPeriod = moment(events[0].start).startOf('week').startOf('day').toDate();
    const endOfPeriod = moment(events[events.length - 1].end).endOf('week').endOf('day').toDate();

    const freeTimes = [];
    events.forEach((event, i) => {
        if (i == 0) {
            freeTimes.push({ start: startOfPeriod, end: event.start });
        }
        else {
            freeTimes.push({ start: events[i - 1].end, end: event.start })
        }

    })
    
    freeTimes.push({ start: events[events.length - 1].end, end: endOfPeriod });

    return freeTimes
}

const cutByDay = (start, end) => {
    let intervalStart = moment(start);
    const intervalEnd = moment(end);

    //check if in different dates
    if (intervalStart.isSame(intervalEnd, 'date')) {
        return [{start, end}];
    } else {
        let daysDiff = intervalEnd.diff(intervalStart, 'd') + 2;
        const daylyIntervals = [];

        while (daysDiff) {
            let end;
            if (daysDiff == 1) {
                end = intervalEnd.toDate();
            } else {
                end = intervalStart.clone().endOf('day').toDate();
            }

            daylyIntervals.push({
                start: intervalStart.toDate(),
                end
            });
            intervalStart = intervalStart.add(1, 'd').startOf('day');
            daysDiff--;
        }
        return daylyIntervals;
    }
}

const pickTimeEachDay = (freeTimes, amountOfDays, minutesPerTime) => {
    const timesForStudy = [];
    const datesFilled = [];

    freeTimes.forEach(time => {
        //check if array filled 
        if (timesForStudy.length >= amountOfDays) return;

        const start = moment(time.start);
        const end = moment(time.end);

        const dateISOString = start.clone().startOf('day').toString();
        const index = datesFilled.indexOf(dateISOString);
        
        //date not there
        if (index == -1) {
            const minutesInRange = end.diff(start, 'minutes');

            if (minutesInRange >= minutesPerTime) {
                timesForStudy.push({
                    start: start.toDate(),
                    end: start.add(minutesPerTime, 'minutes').toDate()
                });
                datesFilled.push(dateISOString);
            }
        }
    });

    return timesForStudy;
}

export const getStudyTimes = (events, daysToWork, minutesToWork) => {
    // inversetofree
    const freeTime = inverseToFree(events);
    
    //cut by day
    const freeTimeByDay = freeTime.reduce((acc, cur) => {
        const byDate = cutByDay(cur.start, cur.end);
        return acc.concat(byDate)
    }, []);

    // pick time each day
    const studyTimes = pickTimeEachDay(freeTimeByDay, daysToWork, minutesToWork);

    return studyTimes;
}
