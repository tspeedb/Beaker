import * as React from 'react'
import '../Styles/Dropdown.css'

class dropdownMajor extends React.Component {
    constructor(props) {
        super(props)
        this.state = { value: 'Major' }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
        this.setState({ value: event.target.value })
    }

    handleSubmit(event) {
        event.preventDefault()
    }

    render() {
        console.log('Major')
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    <select
                        value={this.state.value}
                        onChange={this.handleChange}
                    >
                        <option value="default">Major</option>
                        <option value="ACCT">Accounting</option>
                        <option value="AFAM">African American Studies</option>
                        <option value="ANIM">Animation</option>
                        <option value="APMT">Applied Mathematics</option>
                        <option value="APPH">Applied Physics</option>
                        <option value="ARHS">Art History</option>
                        <option value="ASPA">Asian and Pacific Studies</option>
                        <option value="BCHM">Biochemistry</option>
                        <option value="BIOL">Biology</option>
                        <option value="CHEM">Chemistry</option>
                        <option value="CLST">
                            Chicana/o and Latina/o Studies
                        </option>
                        <option value="CIVL">Civil Engineering</option>
                        <option value="CLAR">Classics and Archaeology</option>
                        <option value="CMST">Communication Studies</option>
                        <option value="CMSI">Computer Science</option>
                        <option value="DANC">Dance</option>
                        <option value="ECON">Economics</option>
                        <option value="EECE">Electrical Engineering</option>
                        <option value="ENGL">English</option>
                        <option value="ENTR">Entrepreneurship</option>
                        <option value="ENVS">Environmental Science</option>
                        <option value="EVST">Environmental Studies</option>
                        <option value="PROD">
                            Film and Television Production
                        </option>
                        <option value="FTVS">
                            Film, Television, and Media Studies
                        </option>
                        <option value="FNCE">Finance</option>
                        <option value="FREN">French</option>
                        <option value="HHSC">Health and Human Sciences</option>
                        <option value="HIST">History</option>
                        <option value="HUMA">Humanities</option>
                        <option value="ISBA">
                            Information Systems and Business Analytics
                        </option>
                        <option value="INRE">International Relations</option>
                        <option value="JOUR">Journalism</option>
                        <option value="LIBS">
                            Liberal Studies (Elementary Education)
                        </option>
                        <option value="MGMT">Management and Leadership</option>
                        <option value="MRKT">Marketing</option>
                        <option value="MATH">Mathematics</option>
                        <option value="MECH">Mechanical Engineering</option>
                        <option value="MDLG">Modern Languages</option>
                        <option value="MUSC">Music</option>
                        <option value="PHIL">Philosophy</option>
                        <option value="PHYS">Physics</option>
                        <option value="POLS">Political Science</option>
                        <option value="PSYC">Psychology</option>
                        <option value="RECA">Recording Arts</option>
                        <option value="SCWR">Screenwriting</option>
                        <option value="SOCL">Sociology</option>
                        <option value="SPAN">Spanish</option>
                        <option value="STDS">
                            Statistics and Data Science
                        </option>
                        <option value="SDAT">Studio Arts</option>
                        <option value="THEA">Theatre Arts</option>
                        <option value="THST">Theological Studies</option>
                        <option value="URBN">Urban Studies</option>
                        <option value="WGST">Women's and Gender Studies</option>
                    </select>
                </label>
            </form>
        )
    }
}

export default dropdownMajor
