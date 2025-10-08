import Navbar from "./Navbar"
import PropTypes from 'prop-types'

const Layout = ({ children }) => {
    return (
        <>
            <Navbar />
            <main>{children}</main>
        </>
    )
}

Layout.PropTypes = {
    children: PropTypes.node.isRequired,
}

export default Layout