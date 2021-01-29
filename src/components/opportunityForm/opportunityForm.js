import React from 'react'


export default class Opportunity extends React.Component {
    constructor(props) {
      super(props);
      this.state = {value: 'coconut'};
      this.state = {value: 'Negotiations'};
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
      this.setState({value: event.target.value});
    }
  
    handleSubmit(event) {
      alert('Your favorite flavor is: ' + this.state.value);
      event.preventDefault();
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
         <label for="OpportunityName">OpportunityName:</label>
         <input type="text" id="OpportunityName" name="OpportunityName"/><br></br>
          <label>
            Account
            <select value={this.state.value} onChange={this.handleChange}>
              <option value="grapefruit">Grapefruit</option>
              <option value="lime">Lime</option>
              <option value="coconut">Coconut</option>
              <option value="mango">Mango</option>
            </select>
          </label>
          <label>
            Amount Stage
            <select value={this.state.value} onChange={this.handleChange}>
              <option value="Discovery">Discovery</option>
              <option value="Proposal shared">Proposal shared</option>
              <option value="Negotiations">Negotiations</option>
            </select>
          </label>
          <input type="submit" value="Submit" />
        </form>
      );
    }
  }
