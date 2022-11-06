import React, { useState } from 'react';
import dayjs from 'dayjs';
import AlarmIcon from '@mui/icons-material/Alarm';
import SnoozeIcon from '@mui/icons-material/Snooze';
import TextField from '@mui/material/TextField';
import ClockIcon from '@mui/icons-material/AccessTime';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';

export default function CustomDateTimePicker() {
    var now = dayjs()
    const [dateWithNoInitialValue, setDateWithNoInitialValue] = React.useState(null);
    const [dateWithInitialValue, setDateWithInitialValue] = React.useState(
        now,
    );

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <MobileDateTimePicker
                value={dateWithInitialValue}
                onChange={(newValue) => {
                    setDateWithInitialValue(newValue);
                }}
                label="Select Start Date"
                onError={console.log}
                inputFormat="MM/DD/YYYY hh:mm a"
                renderInput={(params) => <TextField {...params} />}
            />

            <MobileDateTimePicker
                value={dateWithNoInitialValue}
                onChange={(newValue) => {
                    setDateWithNoInitialValue(newValue);
                }}
                label="Select End Date"
                onError={console.log}
                inputFormat="MM/DD/YYYY hh:mm a"
                renderInput={(params) => <TextField {...params} />}
            />
        </LocalizationProvider>
    );
}