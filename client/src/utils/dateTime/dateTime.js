import React, { useState } from 'react';
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';

export default function CustomDateTimePicker(props) {
    console.log(props.startDate);

    const [startDateWithInitialValue, setStartDateWithInitialValue] = React.useState(props.startDate);

    const [endDateWithInitialValue, setEndDateWithInitialValue] = React.useState(props.endDate);

    return (
        <div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <MobileDateTimePicker
                    value={startDateWithInitialValue}
                    onChange={(newValue) => {
                        setStartDateWithInitialValue(newValue);
                    }}
                    label="Select Start Date"
                    onError={console.log}
                    inputFormat="MM/DD/YYYY hh:mm a"
                    renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <MobileDateTimePicker
                    value={endDateWithInitialValue}
                    onChange={(newValue) => {
                        setEndDateWithInitialValue(newValue);
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