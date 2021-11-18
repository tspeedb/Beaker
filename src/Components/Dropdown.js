import * as React from 'react'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import '../Styles/Dropdown.css'
import { Link } from 'react-router-dom'

export default function Dropdown() {
    const [item, setItem] = React.useState('')

    const handleChange = (event) => {
        setItem(event.target.value)
    }

    return (
        <Box sx={{ width: 100 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                    {' '}
                    <AccountCircleIcon />{' '}
                </InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={item}
                    label="Select"
                    onChange={handleChange}
                >
                    <Link className="dropdown-link" to="../dashboard">
                        <MenuItem value={'/dashboard'}>Dashboard</MenuItem>
                    </Link>
                    <Link className="dropdown-link" to="../mymembers">
                        <MenuItem value={'/mymembers'}> Profile </MenuItem>
                    </Link>
                </Select>
            </FormControl>
        </Box>
    )
}
