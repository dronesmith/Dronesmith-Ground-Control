import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class DirForm extends React.Component {

  constructor(props){
    super(props)
    this.state={
      currentAddress: "",
      destinationAddress: "",
    }

    this.onChange= this.onChange.bind(this)
    this.onSubmit= this.onSubmit.bind(this)
    this.sendData= this.sendData.bind(this)
}

    onChange(e, name){
      var change = {};
      change[e.target.id]=e.target.value;
      this.setState(change);
    }

    sendData(){
      var form =      
            {
            locations: [
               {this.state.currentAddress},
                {this.state.destinationAddress}
            ],
            options: {
                avoids: [],
                avoidTimedConditions: false,
                doReverseGeocode: true,
                shapeFormat: raw,
                generalize: 0,
                routeType: fastest,
                timeType: 1,
                locale: en_US,
                unit: m,
                enhancedNarrative: false,
                drivingStyle: 2,
                highwayEfficiency: 21.0
                }
            }
                
      // this.props.saveValues(form)
      debugger
        $.ajax({
          url: "localhost:3000/getForm/"
          data: form,
          type: "POST",
          success: function(data){
            function sendSendPoints(data)
          }.bind(this),
          error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
      });
    }
 //
 
    sendSendPoints(data){
      var form = data["route"]["shape"]["shapePoints"]       
       const mapKEY = 
      debugger
        $.ajax({
          url: "http://www.api.dronesmith.io/api/drone/{{dronename}}/goto"
          data: form,
          type: "POST",
          success: function(data){
            function sendSendPoints(data)
          }.bind(this),
          error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
      });
    }

    //  saveValues(fields) {
    //     fieldValues = Object.assign({}, fieldValues, fields);
    // }

     onSubmit(e){
      e.preventDefault();
      this.sendData(this.state)
    };

    render(){
        return (
          <div>
            <div class="mdl-grid">
              <form onChange={this.onChange}>
                <br/>

                <TextField
                  id="destinationAddress"
                  hintText="Where to go"
                />
                <TextField
                  id="currentAddress"
                  hintText="Where are you"
                />
                    <br/>

                    <RaisedButton onClick={this.onSubmit} label="Go somewhere" />
                </form>
             </div>
          </div>
        )

      }
  }

    export default DirForm;
