import PropTypes from 'prop-types'
import { Fragment } from 'react'
import Moment from 'react-moment'

const ProfileExperience = ({experience}) => {
    return (
            <Fragment>
            {experience.length > 0 && (
                <Fragment>
                    <div className="profile-exp bg-white p-2">
                        <h2 className="text-primary p-1">Experience</h2>
                        {experience.map(exp =>(
                            <div key={exp._id} className='p-1'>
                                <h3 className="text-dark">{exp.company}</h3>
                                <p>
                                    <Moment format = 'YYYY/MM/DD'>{exp.from}</Moment> - {
                                        !(exp.to) ? ('Now') : <Moment format='YYYY/MM/DD'>{exp.to}</Moment>
                                    }
                                </p>
                                <p><strong>Title: </strong>{exp.title}</p>
                                <p><strong>Description: </strong>{exp.description}</p>
                            </div>
                        ))}
                        </div>
                </Fragment>
            )}
            </Fragment>
    )
}

ProfileExperience.propTypes = {
    experience: PropTypes.array.isRequired
}

export default ProfileExperience
