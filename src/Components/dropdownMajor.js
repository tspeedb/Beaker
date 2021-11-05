import * as React from 'react'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import '../Styles/Dropdown.css'

export default function DropdownMajor() {
    const [item, setItem] = React.useState('')

    const handleChange = (event) => {
        setItem(event.target.value)
    }

    return (
        <Box id="select-year" sx={{ width: 250 }}>
            <FormControl fullWidth>
                <InputLabel id="select-label">Major</InputLabel>
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
                    <MenuItem value={'APMT'}>Applied Mathematics</MenuItem>
                    <MenuItem value={'APPH'}>Applied Physics</MenuItem>
                    <MenuItem value={'ARHS'}>Art History</MenuItem>
                    <MenuItem value={'ASPA'}>
                        Asian and Pacific Studies
                    </MenuItem>
                    <MenuItem value={'BCHM'}>Biochemistry</MenuItem>
                    <MenuItem value={'BIOL'}>Biology</MenuItem>
                    <MenuItem value={'CHEM'}>Chemistry</MenuItem>
                    <MenuItem value={'CLST'}>
                        Chicana/o and Latina/o Studies
                    </MenuItem>
                    <MenuItem value={'CIVL'}>Civil Engineering</MenuItem>
                    <MenuItem value={'CLAR'}>Classics and Archaeology</MenuItem>
                    <MenuItem value={'CMST'}>Communication Studies</MenuItem>
                    <MenuItem value={'CMSI'}>Computer Science</MenuItem>
                    <MenuItem value={'DANC'}>Dance</MenuItem>
                    <MenuItem value={'ECON'}>Economics</MenuItem>
                    <MenuItem value={'EECE'}>Electrical Engineering</MenuItem>
                    <MenuItem value={'ENGL'}>English</MenuItem>
                    <MenuItem value={'ENTR'}>Entrepreneurship</MenuItem>
                    <MenuItem value={'ENVS'}>Environmental Science</MenuItem>
                    <MenuItem value={'EVST'}>Environmental Studies</MenuItem>
                    <MenuItem value={'PROD'}>
                        Film and Television Production
                    </MenuItem>
                    <MenuItem value={'FTVS'}>
                        Film, Television, and Media Studies
                    </MenuItem>
                    <MenuItem value={'FNCE'}>Finance</MenuItem>
                    <MenuItem value={'FREN'}>French</MenuItem>
                    <MenuItem value={'HHSC'}>
                        Health and Human Sciences
                    </MenuItem>
                    <MenuItem value={'HIST'}>History</MenuItem>
                    <MenuItem value={'HUMA'}>Humanities</MenuItem>
                    <MenuItem value={'ISBA'}>
                        Information Systems and Business Analytics
                    </MenuItem>
                    <MenuItem value={'INRE'}>International Relations</MenuItem>
                    <MenuItem value={'JOUR'}>Journalism</MenuItem>
                    <MenuItem value={'LIBS'}>
                        Liberal Studies (Elementary Education)
                    </MenuItem>
                    <MenuItem value={'MGMT'}>
                        Management and Leadership
                    </MenuItem>
                    <MenuItem value={'MRKT'}>Marketing</MenuItem>
                    <MenuItem value={'MATH'}>Mathematics</MenuItem>
                    <MenuItem value={'MECH'}>Mechanical Engineering</MenuItem>
                    <MenuItem value={'MDLG'}>Modern Languages</MenuItem>
                    <MenuItem value={'MUSC'}>Music</MenuItem>
                    <MenuItem value={'PHIL'}>Philosophy</MenuItem>
                    <MenuItem value={'PHYS'}>Physics</MenuItem>
                    <MenuItem value={'POLS'}>Political Science</MenuItem>
                    <MenuItem value={'PSYC'}>Psychology</MenuItem>
                    <MenuItem value={'RECA'}>Recording Arts</MenuItem>
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
