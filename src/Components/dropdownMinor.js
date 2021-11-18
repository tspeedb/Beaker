import * as React from 'react'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import '../Styles/Dropdown.css'

export default function DropdownMinor() {
    const [item, setItem] = React.useState('')

    const handleChange = (event) => {
        setItem(event.target.value)
    }

    return (
        <Box id="select-year" sx={{ width: 250 }}>
            <FormControl fullWidth>
                <InputLabel id="select-label">Minor</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={item}
                    label="Select"
                    onChange={handleChange}
                >
                    <MenuItem value={'ACCT'}>Accounting</MenuItem>
                    <MenuItem value={'AFAM'}>African American Studies</MenuItem>
                    <MenuItem value={'ANIM'}>Animation</MenuItem>
                    <MenuItem value={''}>Applied Mathematics</MenuItem>
                    <MenuItem value={'ARHS'}>Art History</MenuItem>
                    <MenuItem value={'ASPA'}>
                        Asian and Pacific Studies
                    </MenuItem>
                    <MenuItem value={'APAM'}>
                        Asian Pacific American Studies
                    </MenuItem>
                    <MenuItem value={''}>Biochemistry</MenuItem>
                    <MenuItem value={'BIOL'}>Biology</MenuItem>
                    <MenuItem value={'BADM'}>Business Administration</MenuItem>
                    <MenuItem value={'CATH'}>Catholic Studies</MenuItem>
                    <MenuItem value={'CHEM'}>Chemistry</MenuItem>
                    <MenuItem value={'CLST'}>
                        Chicana/o and Latina/o Studies
                    </MenuItem>
                    <MenuItem value={'CHIN'}>Chinese</MenuItem>
                    <MenuItem value={'CLAR'}>Classics and Archaeology</MenuItem>
                    <MenuItem value={'CMSI'}>Computer Science</MenuItem>
                    <MenuItem value={'DANC'}>Dance</MenuItem>
                    <MenuItem value={'ECON'}>Economics</MenuItem>
                    <MenuItem value={'EECE'}>Electrical Engineering</MenuItem>
                    <MenuItem value={'ENGL'}>English</MenuItem>
                    <MenuItem value={'ENVS'}>Environmental Science</MenuItem>
                    <MenuItem value={'EVST'}>Environmental Studies</MenuItem>
                    <MenuItem value={'FTVS'}>
                        Film, Television, and Media Studies
                    </MenuItem>
                    <MenuItem value={'FREN'}>French</MenuItem>
                    <MenuItem value={'GRMN'}>German</MenuItem>
                    <MenuItem value={'HEAS'}>Health and Society</MenuItem>
                    <MenuItem value={'HIST'}>History</MenuItem>
                    <MenuItem value={'INBA'}>International Business</MenuItem>
                    <MenuItem value={'INDP'}>
                        International Documentary Production
                    </MenuItem>
                    <MenuItem value={'INRE'}>International Relations</MenuItem>
                    <MenuItem value={'IRST'}>Irish Studies</MenuItem>
                    <MenuItem value={'ITAL'}>Italian</MenuItem>
                    <MenuItem value={'JWST'}>Jewish Studies</MenuItem>
                    <MenuItem value={'JOUR'}>Journalism</MenuItem>
                    <MenuItem value={'MDGK'}>Modern Greek Studies</MenuItem>
                    <MenuItem value={'MUSC'}>Music</MenuItem>
                    <MenuItem value={'PJST'}>
                        Peace and Justice Studies
                    </MenuItem>
                    <MenuItem value={'PHIL'}>Philosophy</MenuItem>
                    <MenuItem value={'PHYS'}>Physics</MenuItem>
                    <MenuItem value={'POLS'}>Political Science</MenuItem>
                    <MenuItem value={'PSYC'}>Psychology</MenuItem>
                    <MenuItem value={'PBRL'}>Public Relations</MenuItem>
                    <MenuItem value={'SCWR'}>Screenwriting</MenuItem>
                    <MenuItem value={'SOCL'}>Sociology</MenuItem>
                    <MenuItem value={'SPAN'}>Spanish</MenuItem>
                    <MenuItem value={'STDS'}>
                        Statistics and Data Science
                    </MenuItem>
                    <MenuItem value={'SDAT'}>Studio Arts</MenuItem>
                    <MenuItem value={'THEA'}>Theatre Arts</MenuItem>
                    <MenuItem value={'THST'}>Theological Studies</MenuItem>
                    <MenuItem value={'URBN'}>Urban Studies</MenuItem>
                    <MenuItem value={'WGST'}>
                        Women's and Gender Studies
                    </MenuItem>
                </Select>
            </FormControl>
        </Box>
    )
}
