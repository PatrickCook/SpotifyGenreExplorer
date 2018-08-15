import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getMyInfo, getTopTracks, setTokens} from '../actions/actions';
import {Form, FormGroup, ControlLabel, FormControl, Button, Col} from 'react-bootstrap';

/**
 * Our user page
 * Displays the user's information
 */
class User extends Component {
   constructor(props) {
      super(props)

      this.state = {
         playlistName: null,
         playlistSize: null,
         timeRange: null
      }
   }
   /** When we mount, get the tokens from react-router and initiate loading the info */
   componentDidMount() {
      // params injected via react-router, dispatch injected via connect
      const {dispatch, params} = this.props;
      const {accessToken, refreshToken} = params;
      dispatch(setTokens({accessToken, refreshToken}));
      dispatch(getMyInfo());
   }

   handleClick() {
      console.log(this.pName.value, this.pSize.value)
      this.props.dispatch(getTopTracks({
         id: this.props.user.id,
         name: this.pName.value || "Refined Palette Medium",
         range: "short_term",
         size: this.pSize.value || 10
      }));
   }

   /** Render the user's info */
   render() {
      const {loading, tracks} = this.props
      // if we're still loading, indicate such
      if (loading) {
         return <h2>Loading...</h2>;
      }
      return (

            <Form horizontal>
               <FormGroup >
                  <Col componentClass={ControlLabel} sm={2}>
                     Playlist Name
                  </Col>
                  <Col sm={10}>
                     <FormControl inputRef={ref => { this.pName = ref; }} type="text" placeholder="Awesome Tunes"/>
                  </Col>
               </FormGroup>

               <FormGroup >
                  <Col componentClass={ControlLabel} sm={2}>
                     Playlist Size
                  </Col>
                  <Col sm={10}>
                     <FormControl inputRef={ref => { this.pSize = ref; }} type="number" placeholder="10"/>
                  </Col>
               </FormGroup>

               <FormGroup>
                  <Col smOffset={2} sm={10}>
                     <Button onClick={this.handleClick.bind(this)} type="submit">Sign in</Button>
                  </Col>
               </FormGroup>
            </Form>
      );
   }
}
export default connect(state => state)(User);
