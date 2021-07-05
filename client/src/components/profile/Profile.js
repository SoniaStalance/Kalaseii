import React, {Fragment, useEffect} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import Spinner from '../layout/Spinner'
import {getProfileById} from '../../actions/profile'
import {Link} from 'react-router-dom'
import ProfileTop from './ProfileTop'
import ProfileAbout from './ProfileAbout'
import ProfileExperience from './ProfileExperience'
import ProfileProject from './ProfileProject'


const Profile = ({getProfileById, profile:{profile, loading}, auth, match}) => {
    useEffect(()=>{
        getProfileById(match.params.id);
    },[getProfileById, match.params.id]);
    
    
    return (
        <Fragment>
            {profile === null || loading ? (<Spinner/>) : (<Fragment>
                    <Link to='/profiles' className="btn btn-light">Back to Profiles</Link>
                    {auth.isAuthenticated && auth.loading === false && auth.user._id === profile.user._id && (<Link to='/edit-profile' className='btn btn-dark'>Edit Profile</Link>)}
                </Fragment>)}
                <div className="profile-grid my-1">
                    {profile !== null && (<Fragment>
                        <ProfileTop profile={profile}/>
                        <ProfileAbout profile={profile}/>
                        <ProfileExperience experience={profile.experience}/>
                        <ProfileProject project={profile.project} />
                        </Fragment>)}
                </div>
        </Fragment>
    )
}

Profile.propTypes = {
    getProfileById: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
})

export default connect(mapStateToProps, {getProfileById})(Profile)