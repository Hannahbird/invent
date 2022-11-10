import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';

export default function CustomDateTimePicker({startDate, endDate, stateMgr, stateObj}) {
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
                    className="mt-2 me-2"
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
                    className="mt-2"
                />
            </LocalizationProvider>
        </div>
    );
}