import * as React from 'react';
import { Luxon } from 'luxon';
import TextField from '@mui/material/TextField';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';

export default function CustomDateTimePicker() {
    const [dateWithNoInitialValue, setDateWithNoInitialValue] =
        React.useState<Luxon | null>(null);

    return (
        <LocalizationProvider dateAdapter={AdapterLuxon}>
            <MobileDateTimePicker
                value={dateWithNoInitialValue}
                onChange={(newValue) => setDateWithNoInitialValue(newValue)}
                label="Set Date and Time"
                onError={console.log}
                renderInput={(params) => <TextField {...params} />}
            />
        </LocalizationProvider>
    );
};