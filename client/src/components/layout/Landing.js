/*
ES7 React/Redux snippets
racfe (enter)
*/
import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export const Landing = ({ isAuthenticated }) => {
    if(isAuthenticated){
        return <Redirect to = '/dashboard'/>
    }
    return (
        <section className="landing">
        <div className="dark-overlay">
            <div className="landing-inner">
                <h1 className="x-large">Kalaseii</h1>
                <p className="lead">
                    Find professional designers and artists specialized in modern art, decorative walls, floors and ceilings. Join now and be a part of Kalaseii - The Aesthetic Wave.
                </p>
                <div className="buttons">
                    <Link to="/register" className="btn btn-primary">Sign Up</Link>
                    <Link to="/login" className="btn btn-light">Login</Link>
                </div>
            </div>
        </div>
        </section>
    )
}
Landing.propTypes = {
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps)(Landing);