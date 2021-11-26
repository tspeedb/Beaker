import * as React from 'react'
import '../Styles/Dropdown.css'

class dropdownMinor extends React.Component {
    constructor(props) {
        super(props)
        this.state = { value: 'Minor' }

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
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    <select
                        value={this.state.value}
                        onChange={this.handleChange}
                    >
                        <option value="default">Minor</option>
                        <option value="ACCT">Accounting</option>
                        <option value="AFAM">African American Studies</option>
                        <option value="ANIM">Animation</option>
                        <option value="">Applied Mathematics</option>
                        <option value="ARHS">Art History</option>
                        <option value="ASPA">Asian and Pacific Studies</option>
                        <option value="APAM">
                            Asian Pacific American Studies
                        </option>
                        <option value="">Biochemistry</option>
                        <option value="BIOE">Bioethics</option>
                        <option value="BIOL">Biology</option>
                        <option value="BADM">Business Administration</option>
                        <option value="CATH">Catholic Studies</option>
                        <option value="CHEM">Chemistry</option>
                        <option value="CLST">
                            Chicana/o and Latina/o Studies
                        </option>
                        <option value="CHIN">Chinese</option>
                        <option value="CLAR">Classics and Archaeology</option>
                        <option value="CMSI">Computer Science</option>
                        <option value="DANC">Dance</option>
                        <option value="ECON">Economics</option>
                        <option value="EECE">Electrical Engineering</option>
                        <option value="ENGL">English</option>
                        <option value="ENVS">Environmental Science</option>
                        <option value="EVST">Environmental Studies</option>
                        <option value="FTVS">
                            Film, Television, and Media Studies
                        </option>
                        <option value="FNCE">Finance</option>
                        <option value="FREN">French</option>
                        <option value="GRMN">German</option>
                        <option value="HEAS">Health and Society</option>
                        <option value="HIST">History</option>
                        <option value="IGI">
                            Interactive, Gaming, and Immersive Media
                        </option>
                        <option value="INBA">International Business</option>
                        <option value="">
                            International Documentary Production
                        </option>
                        <option value="">International Relations</option>
                        <option value="IRST">Irish Studies</option>
                        <option value="ITAL">Italian</option>
                        <option value="JWST">Jewish Studies</option>
                        <option value="JOUR">Journalism</option>
                        <option value="MATH">Math</option>
                        <option value="MDGK">Modern Greek Studies</option>
                        <option value="MUSC">Music</option>
                        <option value="PJST">Peace and Justice Studies</option>
                        <option value="PHIL">Philosophy</option>
                        <option value="PHYS">Physics</option>
                        <option value="POLS">Political Science</option>
                        <option value="PSYC">Psychology</option>
                        <option value="PRCX">Public Relations</option>
                        <option value="SCWR">Screenwriting</option>
                        <option value="SOCL">Sociology</option>
                        <option value="SPAN">Spanish</option>
                        <option value="">Statistics and Data Science</option>
                        <option value="ART">Studio Arts</option>
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

export default dropdownMinor
