import * as React from 'react'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import '../Styles/Dropdown.css'

export default function DropdownYear() {
    const [item, setItem] = React.useState('')

    const handleChange = (event) => {
        setItem(event.target.value)
    }

    return (
        <Box id="select-year" sx={{ width: 250 }}>
            <FormControl fullWidth>
                <InputLabel id="select-label"> Year </InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={item}
                    label="Select"
                    onChange={handleChange}
                >
                    <MenuItem value={'freshman'}>Freshman</MenuItem>
                    <MenuItem value={'sophomore'}>Sophomore</MenuItem>
                    <MenuItem value={'junior'}>Junior</MenuItem>
                    <MenuItem value={'senior'}>Senior</MenuItem>
                </Select>
            </FormControl>
        </Box>
    )
}
