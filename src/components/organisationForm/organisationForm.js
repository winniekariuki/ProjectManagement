import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { userActions } from "../../actions/user.actions";
import { organisationActions } from "../../actions/organisation.action";
import { organisation } from "../../reducers/organisation.reducer";

export default class OrganisationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      organisation: {
        name: "",
        address: "",
      },
      submitted: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    console.log("<><>",this.state.organisation)
    const { name, value } = event.target;
    const { organisation } = this.state;
    this.setState({
      organisation: {
        ...organisation,
        [name]: value,
      },
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    this.setState({ submitted: true });
    const { organisation } = this.state;
    if (organisation.name && organisation.address) {
      this.props.create(organisation);
    }
  }

  render() {
    const { create } = this.props;
    const { organisation, submitted } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <div
          className={
            "form-group" + (submitted && !organisation.name ? " has-error" : "")
          }
        >
          <label htmlFor="organisationName">OrganisationName</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={organisation.name}
            onChange={this.handleChange}
          />
          {submitted && !organisation.name && (
            <div className="help-block">OrganisationName is required</div>
          )}
        </div>
        <div
          className={
            "form-group" +
            (submitted && !organisation.address ? " has-error" : "")
          }
        >
          <label htmlFor="organisationAddress">OrganisationAddress:</label>
          <input
            type="text"
            className="form-control"
            name="address"
            value={organisation.address}
            onChange={this.handleChange}
          />
          {submitted && !organisation.address && (
            <div className="help-block">OrganisationAddress is required</div>
          )}
        </div>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
function mapState(state) {
  const { create } = state.creation;
  return { create };
}

const actionCreators = {
  create: organisationActions.create,
};

const connectedOrganisationForm = connect(
  mapState,
  actionCreators
)(OrganisationForm);
export { connectedOrganisationForm as OrganisationForm };
