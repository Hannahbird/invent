import React, { useState } from 'react';
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';

export default function CustomDateTimePicker({startDate, endDate, stateMgr, stateObj}) {
    console.log(startDate);

    const [startDateWithInitialValue, setStartDateWithInitialValue] = React.useState(startDate);

    const [endDateWithInitialValue, setEndDateWithInitialValue] = React.useState(endDate);

    return (
        <div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <MobileDateTimePicker
                    value={startDate}
                    onChange={/*(newValue) => {
                        setStartDateWithInitialValue(newValue);*/
                        (newValue) => {
                            stateMgr({
                                ...stateObj,
                                eventStartDate: newValue
                            })
                        }
                    }
                    label="Select Start Date"
                    onError={console.log}
                    inputFormat="MM/DD/YYYY hh:mm a"
                    renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <MobileDateTimePicker
                    value={endDate}
                    onChange={(newValue) => {
                        stateMgr({
                            ...stateObj,
                            eventEndDate: dayjs(newValue)
                        })
                    }}
                    label="Select End Date"
                    onError={console.log}
                    inputFormat="MM/DD/YYYY hh:mm a"
                    renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>
        </div>
    );
}