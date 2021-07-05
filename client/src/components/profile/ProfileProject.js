import PropTypes from 'prop-types'
import { Fragment } from 'react'
import Moment from 'react-moment'

const ProfileProject = ({project}) => {
    return (
        <Fragment>
            {
                project.length > 0 && (
                    <Fragment>
                        {
                            project.map(pro=>(
                                <div key={pro._id} className="bg-light">
                                    <div>
                                        <img src={pro.url1} alt={pro.title}/>
                                        {
                                            pro.url2 === null ? ('') : (<img src={pro.url2} alt={pro.title} />)
                                        }
                                    </div>
                                    <div className="text-dark p-1">
                                        <ul>
                                            <li><h2>{pro.title}</h2></li>
                                            <li><b>Description: </b><em>{pro.description}</em></li><br/>
                                            <li><b>Date: </b><Moment format='YYYY/MM/DD'>{pro.from}</Moment></li>
                                            <li><b>Location: </b>{pro.location}</li>
                                        </ul>
                                    </div>
                                </div>
                            ))
                        }
                    </Fragment>
                )
            }
        </Fragment>
    )
}

ProfileProject.propTypes = {
    project: PropTypes.array.isRequired
}

export default ProfileProject
