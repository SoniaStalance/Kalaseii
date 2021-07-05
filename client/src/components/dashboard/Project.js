import React from 'react';
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Moment from 'react-moment'
import { Fragment } from 'react'
import { deleteProject } from '../../actions/profile'

const Project = ({project, deleteProject}) => {
    const projects=project.map(pro=>(
        <div key={pro._id} className="profile bg-light">
            <div>
                <img src={pro.url1} alt={pro.title}/>
                {
                    pro.url2 === null ? ('') : (<img src={pro.url2} alt={pro.title} />)
                }
            </div>
            <div>
                <ul>
                    <li><h2>{pro.title}</h2></li>
                    <li><b>Description: </b><em>{pro.description}</em></li><br/>
                    <li><b>Date: </b><Moment format='YYYY/MM/DD'>{pro.from}</Moment></li>
                    <li><b>Location: </b>{pro.location}</li>
                </ul>
            </div>
            <div><button onClick={()=>deleteProject(pro._id)} className='btn btn-danger'>Delete</button></div>
        </div>
    ))
    return (
        <Fragment>
            <h2 className='my-2'>Projects</h2>
            {projects}
        </Fragment>
    )
}

Project.propTypes = {
    project: PropTypes.array.isRequired,
    deleteProject: PropTypes.func.isRequired
}

export default connect(null, {deleteProject})(Project);
