import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import { connect } from 'react-redux';
import { deleteAccount, getCurrentProfile } from '../../actions/profile';
import Experience from './Experience'
import Project from './Project'
import DashboardActions from './DashboardActions'

const Dashboard = ({ getCurrentProfile, deleteAccount, auth: { user }, profile: { profile, loading} }) => {
    useEffect(()=>{
        getCurrentProfile();
    }, [getCurrentProfile]);//will run only once
    return loading && profile === null ? <Spinner/> : <Fragment>
        <h1 className="large text-primary">Dashboard</h1>
        <p className="lead">
            <i className="fas fa-user"></i> Welcome { user && user.name}
        </p>
        { profile !== null ? 
            <Fragment> 
                <DashboardActions user={profile.user}/>
                <Experience experience={profile.experience}/> 
                <Project project={profile.project}/>
                <div className="my-2">
                    <button onClick={()=> deleteAccount()} className="btn btn-danger"><i className="fas fa-user-minus"></i>Delete my Account</button>
                </div>
            </Fragment> 
            : 
            <Fragment>
                <p>Share your expertise with the world!</p>
                <Link to='/create-profile' className='btn btn-primary my-1'>Create Profile</Link>
            </Fragment>
        }
    </Fragment>
}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    deleteAccount: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
})

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard);
