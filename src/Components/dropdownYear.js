import * as React from 'react'
import '../Styles/dropdownYear.css'

class dropdownYear extends React.Component {
    constructor(props) {
        super(props)
        this.state = { value: 'Year' }

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
                        <option value="default">Year</option>
                        <option value="freshman">Freshman</option>
                        <option value="sophomore">Sophomore</option>
                        <option value="junior">Junior</option>
                        <option value="senior">Senior</option>
                        <option value="graduate">Graduate</option>
                    </select>
                </label>
            </form>
        )
    }
}

export default dropdownYear
