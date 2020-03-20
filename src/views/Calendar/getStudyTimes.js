import moment from 'moment';

const inverseToFree = (events) => {
    const startOfPeriod = moment(events[0].start).startOf('week').startOf('day').toDate();
    const endOfPeriod = moment(events[events.length - 1].end).endOf('week').endOf('day').toDate();
    
    const freeTimes = [];
    events.forEach((event, i) => {
        if (i == 0) {
            freeTimes.push({ start: startOfPeriod, end: moment(event.start).toDate() });
        }
        else {
            if (moment(events[i - 1].end).isSame(moment(event.start))) return;
            freeTimes.push({ start: moment(events[i - 1].end).toDate(), end: moment(event.start).toDate() })
        }

    })
    
    freeTimes.push({ start: moment(events[events.length - 1].end).toDate(), end: endOfPeriod });

    return freeTimes
}

const cutByDay = (start, end) => {
    let intervalStart = moment(start);
    const intervalEnd = moment(end);
    
    //check if in different dates
    if (intervalStart.isSame(intervalEnd, 'date')) {
        return [{start, end}];
    } else {
        const daylyIntervals = [];

        while (true) {
            const endOfTheStartDay = intervalStart.clone().endOf('day');
            let end;
            if (endOfTheStartDay.isAfter(intervalEnd) || endOfTheStartDay.isSame(intervalEnd)) {
                end = intervalEnd;
            } else {
                end = endOfTheStartDay;
            }
            
            daylyIntervals.push({
                start: intervalStart.toDate(),
                end: end.toDate()
            });
            intervalStart = intervalStart.add(1, 'd').startOf('day');
            
            if (endOfTheStartDay.isAfter(intervalEnd) || endOfTheStartDay.isSame(intervalEnd)) {
                break;
            }
        }
        return daylyIntervals;
    }
}

const pickTimeEachDay = (freeTimes, amountOfDays, minutesPerTime) => {
    const timesForStudy = [];
    const datesFilled = [];

    freeTimes.forEach(time => {
        if (timesForStudy.length >= amountOfDays) return;

        const start = moment(time.start);
        const end = moment(time.end);

        if (start.isSame(end)) {
            return;
        }

        const dateISOString = start.clone().startOf('day').toString();
        const index = datesFilled.indexOf(dateISOString);

        const endOfTheWeek = end.clone().endOf('week');
        if (end.isAfter(endOfTheWeek)) return;
        
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
