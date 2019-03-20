import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignOutLinks'

const Navbar = props => {
    const { auth } = props;
    const links = auth.email ? <SignedInLinks /> : <SignedOutLinks />

    return (
        <nav>
            <div>
							<Link to='/'>Expense Tracker</Link>
							{ links }
						</div>
        </nav>
    )
}

const mapStateToProps = state => {
    console.log(state, 'navbar')
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(Navbar);