import React, {Component} from 'react'
import moment from 'moment'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import TodoDataService from '../../api/todo/TodoDataService'
import AuthenticationService from './AuthenticationService'

class TodoComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id : this.props.match.params.id,
            description : '',
            targetDate : moment(new Date()).format('YYYY-MM-DD'),
            isDone : ''
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.validate = this.validate.bind(this);
    }

    onSubmit(values) {       
        let username = AuthenticationService.getLoggedInUserName();  
        let todo = {
            id: this.state.id,
            description: values.description,
            targetDate: values.targetDate,
            isDone: values.isDone
        }


        if(this.state.id === -1) {
            TodoDataService.createTodo(username, todo)
                .then(() => this.props.history.push('/todos'));

        } else {      
            TodoDataService.updateTodo(username, this.state.id, todo)
                .then(() => this.props.history.push('/todos'));
        }
    }

    onCancel() {
        window.history.back();
    }

    componentDidMount() {
        if(this.state.id === -1) {
            return
        }

        let username = AuthenticationService.getLoggedInUserName();
        TodoDataService.retrieveTodo(username, this.state.id)
            .then(response => this.setState({
                description: response.data.description,
                targetDate: moment(response.data.targetDate).format('YYYY-MM-DD'),
                isDone: response.data.done
            }))
    }

    validate(values) {
        let errors = {}
        if(!values.description) {
            errors.description = 'Enter a Description'
        } else if (values.description.length < 5) {
            errors.description = 'Enter at least 5 characteres Description'
        }
        
        // if ((values.isDone.values('false')) || (values.isDone !== 'true')) {
        //     console.log(values.isDone)
        //     console.log(typeof values.isDone)
        //     errors.isDone = 'The value for "Is Done?" should be either true or false'
        // }

        if(!moment(values.targetDate).isValid()) {
            errors.targetDate = 'Enter a valid Target Date'
        }

        return errors
    }

    render() {
            let {description, targetDate, isDone} = this.state            

            return (
                        <div className="text-center" >
                            <h1>Todo</h1>
                            <div className="todo">
                                <Formik
                                    initialValues = {{description, targetDate, isDone}}
                                    onSubmit = {this.onSubmit}
                                    validateOnChange = {false}
                                    validateOnBlur = {false}
                                    validate = {this.validate}
                                    enableReinitialize = {true}                                    
                                >
                                    {
                                        (props) => (
                                            <Form>
                                                <ErrorMessage name="description" component="div" className="alert alert-warning"></ErrorMessage>
                                                <ErrorMessage name="targetDate" component="div" className="alert alert-warning"></ErrorMessage>
                                                <ErrorMessage name="isDone" component="div" className="alert alert-warning"></ErrorMessage>
                                               <fieldset className="form-group">
                                                    <label>Description</label>
                                                    <Field className="form-control" type="text" name="description"/>
                                               </fieldset>
                                               <fieldset className="form-group">
                                                    <label>Target Date</label>
                                                    <Field className="form-control" type="date" name="targetDate"/>
                                               </fieldset> 
                                               <fieldset className="form-group">
                                                    <label>Is Done?</label>
                                                    <Field className="form-control" type="text" name="isDone"/>
                                               </fieldset>
                                                {/* <Field
                                                    name="isDone"
                                                    render={({ field }) => (                                                            
                                                        <>                                                                                                                        
                                                        <div className="radio-item">Is Done?
                                                            <label htmlFor="true">Yes</label>
                                                            <input {...field} id="true" value="true" checked={field.value === 'true'} name="type" type="radio"/>                                                                
                                                            <label htmlFor="false">No</label>
                                                            <input {...field} id="false" value="false" checked={field.value === 'false'} name="type" type="radio"/>                                                                
                                                        </div>
                                                        </>
                                                    )}
                                                /> */}
                                               <button className="btn btn-success" type="submit">Save</button>                                               
                                               <button className="btn btn-warning" onClick={this.onCancel}>Cancel</button>  
                                            </Form>                                        
                                        )
                                    }
                                </Formik>
                            </div>
                        </div>
                    )
    }
}

export default TodoComponent