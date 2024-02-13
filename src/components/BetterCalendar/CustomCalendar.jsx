import React, { useState } from 'react';
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import addMonths from 'date-fns/addMonths';
import subMonths from 'date-fns/subMonths';
import addWeeks from 'date-fns/addWeeks';
import subWeeks from 'date-fns/subWeeks';
import startOfToday from 'date-fns/startOfToday';

import { Calendar, dateFnsLocalizer, Navigate } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import TopToolbar from './TopToolbar';
import BottomToolbar from './BottomToolbar';
import { addDays, endOfWeek, subDays } from 'date-fns';

export const ToolbarContext = React.createContext();
const locales = {
    "en-Us": "en-Us",
};

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

const CustomCalendar = ({ setShowAddForm, handleEventSelect, ...props }) => {
    const [view, setView] = useState('month');
    const [date, setDate] = useState(new Date());

    const handleNavigate = (action) => {
        let newDate = date;

        switch (action) {
            case Navigate.PREVIOUS:
                if (view === 'month') {
                    newDate = subMonths(date, 1);
                } else if (view === 'week') {
                    newDate = subWeeks(date, 1);
                } else if (view === 'day') {
                    newDate = subDays(date, 1);
                }
                break;
            case Navigate.NEXT:
                if (view === 'month') {
                    newDate = addMonths(date, 1);
                } else if (view === 'week') {
                    newDate = addWeeks(date, 1);
                } else if (view === 'day') {
                    newDate = addDays(date, 1);
                }
                break;
            case Navigate.TODAY:
                newDate = startOfToday();
                break;
            default:
                break;
        }
        setDate(newDate);
    };


    const handleViewChange = (newView) => {
        setView(newView);
    };


    const eventStyleGetter = (event, start, end, isSelected) => {
        let newStyle = {
            backgroundColor: "#60A5FA",
            color: 'white',
            borderRadius: "0.25rem",
            border: "none",
            fontWeight: '600'
        };
        if (event.type === 'special') {
            newStyle.backgroundColor = "orange";
        }

        return {
            style: newStyle
        };
    };

    const dayStyleGetter = (date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const isToday = date.setHours(0, 0, 0, 0) === today.getTime();

        if (isToday) {
            return {
                style: {
                    backgroundColor: '#7BE495',
                    color: '#000000',
                },
            };
        }
        return {};
    };

    const slotStyleGetter = (date) => {
        const now = new Date();
        if (
            now.getDate() === date.getDate() &&
            now.getMonth() === date.getMonth() &&
            now.getFullYear() === date.getFullYear() &&
            now.getHours() === date.getHours()
        ) {
            return {
                style: {
                    backgroundColor: '#329D9C', 
                },
            };
        }
        return {};
    };

    const calendarProps = {
        ...props,
        view,
        localizer,
        onNavigate: handleNavigate,
        onView: handleViewChange,
        date,
        components: {
            ...props.components,
            toolbar: TopToolbar
        },
        eventPropGetter: eventStyleGetter,
        dayPropGetter: dayStyleGetter,
        slotPropGetter: slotStyleGetter,
        onSelectEvent: event => handleEventSelect(event)
    };

    let label;
    if (view === 'month') {
        label = format(date, 'MMMM yyyy', { locale: locales['en-US'] });
    } else if (view === 'week') {
        const start = startOfWeek(date, { weekStartsOn: getDay(startOfWeek(new Date())) });
        const end = endOfWeek(date, { weekStartsOn: getDay(startOfWeek(new Date())) });
        label = `${format(start, 'dd.MM.yyyy', { locale: locales['en-US'] })} - ${format(end, 'dd.MM.yyyy', { locale: locales['en-US'] })}`;
    } else if (view === 'day') {
        label = format(date, 'dd.MM.yyyy', { locale: locales['en-US'] });
    }

    return (
        <div>
            <ToolbarContext.Provider value={{ setShowAddForm }}>
                <Calendar {...calendarProps} />
            </ToolbarContext.Provider>
            <BottomToolbar
                onNavigate={handleNavigate}
                label={label}
            />
        </div>
    );
};

export default CustomCalendar;
