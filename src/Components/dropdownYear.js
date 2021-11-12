import * as React from 'react'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import '../Styles/dropdownYear.css'

export default function DropdownYear() {
    return (
        <div className="select-year">
            <FormControl sx={{ width: 250 }}>
                <InputLabel>Year</InputLabel>
                <Select>
                    <MenuItem value={'freshman'}>Freshman</MenuItem>
                    <MenuItem value={'sophomore'}>Sophomore</MenuItem>
                    <MenuItem value={'junior'}>Junior</MenuItem>
                    <MenuItem value={'senior'}>Senior</MenuItem>
                    <MenuItem value={'graduate'}>Graduate</MenuItem>
                </Select>
            </FormControl>
        </div>
    )
}
