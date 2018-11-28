import React, { Component } from 'react'
import { Redirect, withRouter} from 'react-router-dom'
import { connect } from 'react-redux'
// import classNames from 'classnames';
// import { withStyles } from '@material-ui/core/styles';
// import MenuItem from '@material-ui/core/MenuItem';
// import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import { postPhoto } from '../store'

// import CloudinaryWidget from '../CloudinaryWidget'

// const styles = theme => ({
// container: {
//   display: 'flex',
//   flexWrap: 'wrap',
// },
// textField: {
//   marginLeft: theme.spacing.unit,
//   marginRight: theme.spacing.unit,
// },
// dense: {
//   marginTop: 16,
// },
// menu: {
//   width: 200,
// },
// })


class PhotoForm extends Component {
  state = {
  }

  handleChange = (e) => {
    e.preventDefault()
    let change = { [e.target.name]: e.target.value }
    this.setState(change)
  }

  // handleChange = name => event => {
  //   this.setState({
  //     [name]: event.target.value,
  //   })
  // }
  //
  // materialForm = () => {
  //   const { classes } = this.props
  //   return (
  //     <div id='photo-form'>
  //     <h2>Add New Photo</h2>
  //     <form className={classes.container} noValidate autoComplete="off">
  //       <TextField
  //         id="outlined-with-placeholder"
  //         label="With placeholder"
  //         placeholder="Placeholder"
  //         className={classes.textField}
  //         margin="normal"
  //         variant="outlined"
  //       />
  //       <TextField
  //         id="outlined-with-placeholder"
  //         label="With placeholder"
  //         placeholder="Placeholder"
  //         className={classes.textField}
  //         margin="normal"
  //         variant="outlined"
  //       />
  //       <TextField
  //         id="outlined-with-placeholder"
  //         label="With placeholder"
  //         placeholder="Placeholder"
  //         className={classes.textField}
  //         margin="normal"
  //         variant="outlined"
  //       />
  //     </form>
  //     </div>
  //   )
  // }
  checkForUser = () => {
    if (!localStorage.getItem('token')) {
      return <Redirect to='/login' />
    }
  }

  showWidget = (widget) => {
    widget.open()
  }

  checkUploadResult = (resultEvent) => {
    if (resultEvent.event === 'success') {
      console.log(this.props.currentUser.id);
      this.props.postPhoto({user_id: this.props.currentUser.id, caption: '', url: resultEvent.info.secure_url})
      .then(this.props.history.push(`/profile`))
    }
  }



  render() {
    let widget = window.cloudinary.createUploadWidget({ cloudName: "dnmpjwixe", uploadPreset: "tsdo8id4" }, (error, result) => { this.checkUploadResult(result) })

    return (
      <div id='photo-form-container'>
        <h2>Add New Photo</h2>
        <Button onClick={() => this.showWidget(widget)} variant="outlined" color="primary">Upload Photo</Button>
        <form id='photo-form'>
          <input type="file" name="photo" placeholder="Photo"/>
          <br/>
          <input onChange={this.handleChange} type="text" name="caption" placeholder="caption"/>
          <br/>
          <Button variant="outlined" color="primary">Add Photo</Button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.auth.currentUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    postPhoto: (user, photo) => dispatch(postPhoto(user, photo))
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PhotoForm))
