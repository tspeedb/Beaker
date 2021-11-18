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
                    <MenuItem value={'AERO'}>
                        Aeronautics and Space Systems Certificate
                    </MenuItem>
                    <MenuItem value={'AFAM'}>African American Studies</MenuItem>
                    <MenuItem value={'ANIM'}>Animation</MenuItem>
                    <MenuItem value={''}>Applied Mathematics</MenuItem>
                    <MenuItem value={''}>Applied Physics</MenuItem>
                    <MenuItem value={'ARHS'}>Art History</MenuItem>
                    <MenuItem value={'ASPA'}>
                        Asian and Pacific Studies
                    </MenuItem>
                    <MenuItem value={''}>
                        Bilingual Teacher Education - Chinese or Spanish
                    </MenuItem>
                    <MenuItem value={''}>Biochemistry</MenuItem>
                    <MenuItem value={'BIOE'}>Bioethics</MenuItem>
                    <MenuItem value={'BIOL'}>Biology</MenuItem>
                    <MenuItem value={'BSAN'}>Business Analytics</MenuItem>
                    <MenuItem value={''}>
                        Catholic Archdiocesan School Teacher
                    </MenuItem>
                    <MenuItem value={''}>
                        Catholic School Administration Certificate
                    </MenuItem>
                    <MenuItem value={''}>
                        Center for Undergraduate Teacher Preparation
                    </MenuItem>
                    <MenuItem value={''}>
                        Charter/Small School Leadership
                    </MenuItem>
                    <MenuItem value={'CHEM'}>Chemistry</MenuItem>
                    <MenuItem value={'CLST'}>
                        Chicana/o and Latina/o Studies
                    </MenuItem>
                    <MenuItem value={''}>
                        Child Welfare & Attendance Added Authorization
                    </MenuItem>
                    <MenuItem value={'CIVL'}>Civil Engineering</MenuItem>
                    <MenuItem value={'CLAR'}>Classics and Archaeology</MenuItem>
                    <MenuItem value={''}>
                        Climate Change Solutions Certificate
                    </MenuItem>
                    <MenuItem value={'CMST'}>Communication Studies</MenuItem>
                    <MenuItem value={'CMSI'}>Computer Science</MenuItem>
                    <MenuItem value={''}>Counseling</MenuItem>
                    <MenuItem value={''}>Cybersecurity Certificate</MenuItem>
                    <MenuItem value={'DANC'}>Dance</MenuItem>
                    <MenuItem value={''}>Doctor of Juridical Science</MenuItem>
                    <MenuItem value={'ECON'}>Economics</MenuItem>
                    <MenuItem value={''}>
                        Educational Leadership for Social Justice
                    </MenuItem>
                    <MenuItem value={'EDST'}>Educational Studies</MenuItem>
                    <MenuItem value={'EECE'}>Electrical Engineering</MenuItem>
                    <MenuItem value={'ELED'}>Elementary Education</MenuItem>
                    <MenuItem value={'EPMC'}>
                        Engineering Project Management Certificate
                    </MenuItem>
                    <MenuItem value={'ENGL'}>English</MenuItem>
                    <MenuItem value={'ENTR'}>Entrepreneurship</MenuItem>
                    <MenuItem value={'ENSI'}>
                        Entrepreneurship and Sustainable Innovation
                    </MenuItem>
                    <MenuItem value={'ENVS'}>Environmental Science</MenuItem>
                    <MenuItem value={'EVST'}>Environmental Studies</MenuItem>
                    <MenuItem value={'EXED'}>Executive Education</MenuItem>
                    <MenuItem value={'ENGL'}>Executive MBA</MenuItem>
                    <MenuItem value={'PROD'}>
                        Film and Television Production
                    </MenuItem>
                    <MenuItem value={'FTVS'}>
                        Film, Television, and Media Studies
                    </MenuItem>
                    <MenuItem value={'FNCE'}>Finance</MenuItem>
                    <MenuItem value={'FREN'}>French</MenuItem>
                    <MenuItem value={'GLEM'}>
                        Global Entrepreneurial Management
                    </MenuItem>
                    <MenuItem value={'GWMC'}>
                        Groundwater Management Certificate
                    </MenuItem>
                    <MenuItem value={'HHSC'}>
                        Health and Human Sciences
                    </MenuItem>
                    <MenuItem value={'HCSE'}>
                        Healthcare Systems Engineering
                    </MenuItem>
                    <MenuItem value={'HEDA'}>
                        Higher Education Administration
                    </MenuItem>
                    <MenuItem value={'HIST'}>History</MenuItem>
                    <MenuItem value={'HUMA'}>Humanities</MenuItem>
                    <MenuItem value={'INED'}>Inclusive Education</MenuItem>
                    <MenuItem value={'ISBA'}>
                        Information Systems and Business Analytics
                    </MenuItem>
                    <MenuItem value={'INRE'}>International Relations</MenuItem>
                    <MenuItem value={'JDTL'}>Joint J.D./Tax LL.M.</MenuItem>
                    <MenuItem value={'JJDM'}>Joint J.D./MBA</MenuItem>
                    <MenuItem value={'JOUR'}>Journalism</MenuItem>
                    <MenuItem value={'JDDP'}>Juris Doctor Day Program</MenuItem>
                    <MenuItem value={'JDEP'}>
                        Juris Doctor Evening Program
                    </MenuItem>
                    <MenuItem value={'LHCS'}>Lean Healthcare Systems</MenuItem>
                    <MenuItem value={'LIBS'}>
                        Liberal Studies (Elementary Education)
                    </MenuItem>
                    <MenuItem value={'TFAP'}>
                        LMU/Teach for America Partnership
                    </MenuItem>
                    <MenuItem value={'MGMN'}>Management</MenuItem>
                    <MenuItem value={'MGMT'}>
                        Management and Leadership
                    </MenuItem>
                    <MenuItem value={'MFAT'}>
                        Marital & Family Therapy/Art Therapy
                    </MenuItem>
                    <MenuItem value={'MRKT'}>Marketing</MenuItem>
                    <MenuItem value={'MSLL'}>Master of Laws (LL.M.)</MenuItem>
                    <MenuItem value={'MSLT'}>
                        Master of Laws (Tax LL.M.)
                    </MenuItem>
                    <MenuItem value={'MSLS'}>
                        Master of Science in Legal Studies (M.L.S.)
                    </MenuItem>
                    <MenuItem value={'MSTL'}>Master of Tax Law (M.T.)</MenuItem>
                    <MenuItem value={'MATH'}>Mathematics</MenuItem>
                    <MenuItem value={'MBAP'}>MBA Program</MenuItem>
                    <MenuItem value={'MECH'}>Mechanical Engineering</MenuItem>
                    <MenuItem value={'MDLG'}>Modern Languages</MenuItem>
                    <MenuItem value={'MUSC'}>Music</MenuItem>
                    <MenuItem value={'OMLT'}>
                        Online Master of Laws (Tax LL.M.)
                    </MenuItem>
                    <MenuItem value={'OMTL'}>
                        Online Master of Tax Law (M.T.)
                    </MenuItem>
                    <MenuItem value={'PLAC'}>
                        Partners in Los Angeles Catholic Education (PLACE)
                    </MenuItem>
                    <MenuItem value={'PSTH'}>Pastoral Theology</MenuItem>
                    <MenuItem value={'PHIL'}>Philosophy</MenuItem>
                    <MenuItem value={'PHYS'}>Physics</MenuItem>
                    <MenuItem value={'POLS'}>Political Science</MenuItem>
                    <MenuItem value={'PAHP'}>
                        Pre-Allied Health Post-Baccalaureate Program
                    </MenuItem>
                    <MenuItem value={'PPBP'}>
                        Premedical Post-Baccalaureate Program
                    </MenuItem>
                    <MenuItem value={'PSYC'}>Psychology</MenuItem>
                    <MenuItem value={'RLAA'}>
                        Reading & Literacy Added Authorization
                    </MenuItem>
                    <MenuItem value={'RECA'}>Recording Arts</MenuItem>
                    <MenuItem value={'SLDA'}>
                        School Leadership & Administration
                    </MenuItem>
                    <MenuItem value={'SPSY'}>School Psychology</MenuItem>
                    <MenuItem value={'SCWR'}>Screenwriting</MenuItem>
                    <MenuItem value={'SCED'}>Secondary Education</MenuItem>
                    <MenuItem value={'SOCL'}>Sociology</MenuItem>
                    <MenuItem value={'SWAC'}>
                        Software Architecture Certificate
                    </MenuItem>
                    <MenuItem value={'SDHE'}>
                        Solutions for Sustainable Development, Health and Equity
                        Certificate
                    </MenuItem>
                    <MenuItem value={'SPAN'}>Spanish</MenuItem>
                    <MenuItem value={'SPED'}>Special Education</MenuItem>
                    <MenuItem value={'STDS'}>
                        Statistics and Data Science
                    </MenuItem>
                    <MenuItem value={'SDAT'}>Studio Arts</MenuItem>
                    <MenuItem value={'SUSC'}>
                        Sustainability Certificate
                    </MenuItem>
                    <MenuItem value={'SEEM'}>
                        Systems Engineering & Engineering Management
                    </MenuItem>
                    <MenuItem value={'SENC'}>
                        Systems Engineering Certificate
                    </MenuItem>
                    <MenuItem value={'TPIP'}>
                        Teaching Programs for Interns/Practitioners
                    </MenuItem>
                    <MenuItem value={'THEA'}>Theatre Arts</MenuItem>
                    <MenuItem value={'TAPP'}>
                        Theatre Arts M.F.A.: Performance Pedagogy
                    </MenuItem>
                    <MenuItem value={'THST'}>Theological Studies</MenuItem>
                    <MenuItem value={'URBN'}>Urban Studies</MenuItem>
                    <MenuItem value={'WWTC'}>
                        Water and Wastewater Treatment Certificate
                    </MenuItem>
                    <MenuItem value={'WQMC'}>
                        Water Quality Management Certificate
                    </MenuItem>
                    <MenuItem value={'WGST'}>
                        Women's and Gender Studies
                    </MenuItem>
                    <MenuItem value={'WPFT'}>
                        Writing and Producing for Television
                    </MenuItem>
                    <MenuItem value={'WFTS'}>Writing for the Screen</MenuItem>
                    <MenuItem value={'YGST'}>Yoga Studies</MenuItem>
                </Select>
            </FormControl>
        </Box>
    )
}
