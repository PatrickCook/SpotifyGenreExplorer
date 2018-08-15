import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
   getMyInfo,
   getTopTracks,
   setTokens,
   setErrorMsg,
   getArtistInfo
} from '../actions/actions';
import {
   Form,
   FormGroup,
   ControlLabel,
   FormControl,
   Button,
   Col
} from 'react-bootstrap';

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
      const {dispatch, params} = this.props;

      if (this.artistSearchText.value) {
         dispatch(getArtistInfo({
            artistSearchText: this.artistSearchText.value,
         }));
      } else {
         dispatch(
            setErrorMsg("Don't forget to fill in artist name!")
         );
      }
   }

/**
  * TODO: figure out how the artist information is null. Happens somewhere near
  * the action -> reducer sequence
  */
   /** Render the user's info */
   render() {
      const {loading, artists, errorMsg} = this.props
      const topArtist = artists ? artists.items[0].join(", ") : "No results"
      // if we're still loading, indicate such
      console.log( topArtist )


      return (

            <Form horizontal>
               <FormGroup >
                  <h2>{ errorMsg }</h2>

                  <Col componentClass={ControlLabel} sm={2}>
                     Artist Name
                  </Col>
                  <Col sm={10}>
                     <FormControl
                     inputRef={
                        ref => { this.artistSearchText = ref; }}
                        type="text"
                     />
                  </Col>
               </FormGroup>
               <h2> {topArtist} </h2>
               <FormGroup>
                  <Col smOffset={2} sm={10}>
                     <Button onClick={this.handleClick.bind(this)} type="submit">Search Artists</Button>
                  </Col>
               </FormGroup>
            </Form>
      );
   }
}
export default connect(state => state)(User);
