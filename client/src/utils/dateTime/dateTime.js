import * as React from 'react';
import dayjs from 'dayjs';
import AlarmIcon from '@mui/icons-material/Alarm';
import SnoozeIcon from '@mui/icons-material/Snooze';
import TextField from '@mui/material/TextField';
import ClockIcon from '@mui/icons-material/AccessTime';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import Stack from '@mui/material/Stack';

export default function CustomDateTimePicker() {
    const [dateWithNoInitialValue, setDateWithNoInitialValue] = React.useState(null);
    const [dateWithInitialValue, setDateWithInitialValue] = React.useState(
        dayjs('2019-01-01T18:54'),
    );

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack spacing={3}>
                <MobileDateTimePicker
                    value={dateWithNoInitialValue}
                    onChange={(newValue) => {
                        setDateWithNoInitialValue(newValue);
                    }}
                    label="Select Start Date"
                    onError={console.log}
                    inputFormat="YYYY/MM/DD hh:mm a"
                    renderInput={(params) => <TextField {...params} />}
                />
                <MobileDateTimePicker
                    value={dateWithNoInitialValue}
                    onChange={(newValue) => {
                        setDateWithNoInitialValue(newValue);
                    }}
                    label="Select End Date"
                    onError={console.log}
                    inputFormat="YYYY/MM/DD hh:mm a"
                    renderInput={(params) => <TextField {...params} />}
                />
            </Stack>
        </LocalizationProvider>
    );
}