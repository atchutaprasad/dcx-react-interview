import React from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'

import { getUser, removeUserSession } from '../Utils/Common';

class Dashboard extends React.Component {
  user = {};
  constructor(props) {
    super(props);
    this.user = getUser();
    this.state = {shownewtask : 'block', taskList : [], newTaskvalue: ''};
  }

  handleLogout() {
    removeUserSession();
    this.props.history.push('/login');
  }

  newTaskmodalWindow(toggleData){
    this.setState({
      shownewtask: toggleData,
      newTaskvalue : ''
    });
  }


  newTaskValueChange(event) {
    this.setState({newTaskvalue: event.target.value});
  }

  addNewTaskmodalWindow() {
    // alert('An essay was submitted: ' + this.state.newTaskvalue);
    var newTaskList = this.state.taskList;
    newTaskList.push({label : this.state.newTaskvalue});
    this.setState({taskList: newTaskList});
    this.newTaskmodalWindow('none');
  }

  pieChart(){
    return (<PieChart
      radius = {40}
      center = {[50,50]}
    data={[
      { title: 'test', value: 85, color: '#E38627'},
      { title: 'test2', value: 15, color: '#C13C37'}
    ]}
  />)
  }


  newTaskModalWindowRender() {
    return (<div><div className="modal fade show" style={{display: this.state.shownewtask}}>
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">+ New Task</h5>
          <button type="button" className="btn-close" onClick={()=>this.newTaskmodalWindow('none')}  data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="modal-body">
          <div className="mb-3">
            <label  className="form-label">Task Name</label>
            <input type="text" className="form-control"  placeholder="Task Name" value={this.state.newTaskvalue} onChange={this.newTaskValueChange.bind(this)}/>
          </div>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-primary" onClick={()=>this.addNewTaskmodalWindow()} >+ New Task</button>
        </div>
      </div>
    </div>
  </div>
  <div className="modal-backdrop fade show" style={{display: this.state.shownewtask}}></div></div>)
  }

  render() {
    return (
        <div>
          <div className="container headerDashboard">
              <div className="row">
              <div className="col ">
                <h1>Hello, Welcome {this.user?.name}!  <input type="button" className="btn extrreamRight btn-primary" onClick={this.handleLogout.bind(this)} value="Logout" /></h1>
              </div>
            </div>
          </div>
          <div className="container mb-3">
            <div className="row">
              <div className="col">
                  <div className="panel diskHeight"> 
                      <h4>Tasks Completed</h4>
                      <p><span className="maxFontSize">{this.state.taskList.length}</span>/10</p>
                  </div>
              </div>
              <div className="col">
                  <div className="panel diskHeight"> 
                      <h4>Latest Created Tasks</h4>
                      <ul>
                          {this.state.taskList.map(function(tasklistit, i){
                             return (
                                <li key="{tasklistit.label}">{tasklistit.label}</li>
                             )
                          })}
                        
                      </ul>
                  </div>
              </div>
              <div className="col">
                  <div className="panel diskHeight"> 
                        {this.pieChart()}
                  </div>
              </div>
            </div>
          </div>
          <div className="container mt-10">
            <div className="row">
              <div className="col-6">
                    <h4>Tasks</h4>
                </div>
                <div className="col-6">
                  <div className="input-group">
                      
                      <input type="text" placeholder="Search Task" aria-label="First name" className="form-control mg-r3"/>
                      <button type="button" className="btn btn-primary" onClick={()=>this.newTaskmodalWindow('block')} >+ New Task</button>
                    </div>
                </div>
              </div> 
            </div>

            <div className="container mt-10">
              <div className="row">
                <div className="col">
                    <div className="panel">
                          <ul className="listElement">

                          {this.state.taskList.map(function(tasklistitem, i){
                              return (
                                <li key="{tasklistitem.label}">
                                <div className="form-check">
                                  <span className="fontAwesomeIcons"><span><FontAwesomeIcon icon={faTrash} /></span><span><FontAwesomeIcon icon={faEdit} /></span></span>

                                  <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                                  <label className="form-check-label fontAwesomeLabel">
                                      {tasklistitem.label}
                                  </label>
                                  
                                </div>

                            </li>
                              )
                          })}

                           
                          </ul>
                    </div>

                </div>
              </div>
            </div>
                 
                 
          {this.newTaskModalWindowRender()}
              
      </div>
      )
  }
}
/*
 <button type="button" onClick={()=>this.newTaskmodalWindow('block')}  className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
              </button>
function Dashboard(props) {
  const user = getUser();

  // handle click event of logout button
  const handleLogout = () => {
    removeUserSession();
    props.history.push('/login');
  }

  

  return (
    <div>
      {this.modalWindow()}
      Welcome {user?.name}!<br /><br />
      <input type="button" onClick={handleLogout} value="Logout" />
    </div>
  );
}
*/
export default Dashboard;
