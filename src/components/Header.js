import PropTypes from 'prop-types'
import {useLocation} from 'react-router-dom'

import Button from './Button'

// const Header = () => {
//     return (
//         <header>
//             <h1>Task Tracker</h1>
//         </header>
//     )
// }

// Accepting props
// Syntax <Header title='Hello from props' /> in the App.js
// const Header = (props) => {
//     return (
//         <header>
//             <h1>{props.title}</h1>
//         </header>
//     )
// }

// Cleaner way
const Header = ({title, onAdd, showAdd}) => {

    const location = useLocation()

    return (
        <header className='header'>
            <h1>{title}</h1>
           {
            location.pathname === '/' 
            && 
            <Button onClick={onAdd} color={showAdd ? 'red' : 'green'} text={showAdd ? 'Close' : 'Add'} />
           }

            {/* InLine CSS */}
            {/* <h1 style={{color: 'red', backgroundColor: 'black'}}>{title}</h1> */}

            {/* From the variable */}
            {/* <h1 style={headingStyle}>{title}</h1> */}
        </header>
    )
}

// If <Header title='Hello from props' /> in the App.js, it will overwrite the default title
Header.defaultProps = {
    title: 'Task Tracker'
}

// If <Header title={1} /> in the App.js or any other data type, it will gives you an error
// If its required PropTypes.string.isRequired
Header.propTypes = {
    title: PropTypes.string.isRequired
}

// CSS in JS        
// const headingStyle = {
//     color: 'red', 
//     backgroundColor: 'steelblue'
// }

export default Header
