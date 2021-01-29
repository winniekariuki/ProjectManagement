import React from "react";
import { connect } from "react-redux";
import { organisationActions }  from "../../actions/organisation.action.js"

class OrganisationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      address: "",
      submitted: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ submitted: true });
    const { name, address } = this.state;
    if (name && address) {
      this.props.create(name, address);
    }
  }

  render() {
    const { creating } = this.props;
    const { name, address, submitted } = this.state;
    return (
      <div className="col-md-6 col-md-offset-3">
        <form name="form" onSubmit={this.handleSubmit}>
          <div
            className={
              "form-group" + (submitted && !name ? " has-error" : "")
            }
          >
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={name}
              onChange={this.handleChange}
            />
            {submitted && !name && (
              <div className="help-block">name is required</div>
            )}
          </div>
          <div
            className={
              "form-group" + (submitted && !address ? " has-error" : "")
            }
          >
            <label htmlFor="address">address</label>
            <input
              type="text"
              className="form-control"
              name="address"
              value={address}
              onChange={this.handleChange}
            />
            {submitted && !address && (
              <div className="help-block">address is required</div>
            )}
          </div>
          <div className="form-group">
            <button className="btn btn-primary">Create Account</button>
            {creating && (
              // eslint-disable-next-line jsx-a11y/alt-text
              <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
            )}
          </div>
        </form>
      </div>
    );
  }
}

function mapState(state) {
  const { creating } = state.organisation;
  return { creating };
}

const actionCreators = {
  create: organisationActions.create,
};

const connectedOrganisationForm = connect(mapState, actionCreators)(OrganisationForm);
export { connectedOrganisationForm as OrganisationForm };
