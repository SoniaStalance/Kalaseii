import React, { Fragment, useState } from 'react'
import {Link, withRouter} from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {addProject} from '../../actions/profile'

const AddProject = ({addProject, history}) => {
    const [formData, setFormData] = useState({
        url1: '',
        url2: '',
        location: '',
        title: '',
        proj_date:'',
        description:''
    });

    const {url1, url2, location, title, proj_date, description} = formData;

    const onChange = e =>setFormData({...formData, [e.target.name]:e.target.value });


    return (
        <Fragment>
            <h1 className="large text-primary">
            Add Project
            </h1>
            <p className="lead">
                <i className="fas fa-code-branch"></i> Add photos of your projects
            </p>
            <small>* = required title</small>
            <form className="form" onSubmit={e=>{
                e.preventDefault();
                addProject(formData, history)
            }}>
                <div className="form-group">
                <input type="text" placeholder="title" name="title" value={title} onChange={e=>onChange(e)}/>
                </div>
                <div className="form-group">
                <input type="text" placeholder="* location" name="location" value={location} onChange={e=>onChange(e)} />
                </div>

                <div className="form-group">
                <h4>Project Date</h4>
                <input type="date" name="proj_date" value={proj_date} onChange={e=>onChange(e)}/>
                </div>

                <div className="form-group">
                <textarea
                    maxLength="300"
                    name="description"
                    cols="30"
                    rows="5"
                    placeholder="Project Description (max 300 words)"
                    value={description} onChange={e=>onChange(e)}
                ></textarea>
                </div>

                <div className="form-group">
                <input type="text" placeholder="* url1" name="url1" value={url1} onChange={e=>onChange(e)} />
                </div>

                <div className="form-group">
                <input type="text" placeholder="  optional url2" name="url2" value={url2} onChange={e=>onChange(e)}/>
                </div>

                <input type="submit" className="btn btn-primary my-1" />
                <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
            </form>
        </Fragment>
    )
}

AddProject.propTypes = {
    addProject: PropTypes.func.isRequired
}

export default connect(null,{addProject})(withRouter(AddProject))
