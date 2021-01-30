import React from "react";
import { connect } from "react-redux";
import { organisationActions } from "../../actions/organisation.action.js";
import { opportunityActions } from "../../actions/opportunity.actions";
class OpportunityForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      opportunity: {
        name: "",
        account: "",
        amountStage: "Negotiations",
      },
      value: 'Negotiations',
      submitted: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getOrganisation();
  }
  handleChange(event) {
    const { name, value } = event.target;
    const { opportunity } = this.state;
    this.setState({
      opportunity: {
        ...opportunity,
        [name]: value,
      },
    });
  }
  

  handleSubmit(event) {
    event.preventDefault();

    this.setState({ submitted: true });
    const { opportunity } = this.state;
    if (opportunity.name && opportunity.account && opportunity.amountStage) {
      this.props.create(opportunity);
    }
  }
  handleDropDown = (event) => {
    const { name, value } = event.target;
    const { opportunity } = this.state;
    this.setState({
      opportunity: {
        ...opportunity,
        [name]: value,
      },
    });
  };



  render() {
    const { creating, organisation } = this.props;
    const amountStageNames = [{"id":"1","name":"Discovery"},{"id":"2","name":"Proposal Shared"},{"id":"3","name":"Negotiations"}];
    const { opportunity, submitted } = this.state;
    return (
      <div className=""   style={{
        width: "369px",
        borderRadius: "17px",
        height: "300px",
        padding: "10px",
      }}>
        <form name="form" onSubmit={this.handleSubmit}>
          <div
            className={
              "form-group mb-3" +
              (submitted && !opportunity.name ? " has-error" : "")
            }
          >
            <label htmlFor="name">Opportunity Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={opportunity.name}
              onChange={this.handleChange}
            />
            {submitted && !opportunity.name && (
              <div className="help-block">name is required</div>
            )}
          </div>
          <div
            className={
              "form-group mb-3" +
              (submitted && !opportunity.account ? " has-error" : "")
            }
          >
            <label htmlFor="address">account :</label>
            <select
              className="dropdown"
              name="account"
              value={opportunity.account}
              onChange={this.handleDropDown}
            >
              {organisation.items &&
                organisation.items.map((organisation) => (
                  <option key={organisation._id} value={organisation.name}>
                    {organisation.name}
                  </option>
                ))}
            </select>
            {submitted && !opportunity.account && (
              <div className="help-block">account is required</div>
            )}
          </div>
          <div
            className={
              "form-group mb-3" +
              (submitted && !opportunity.amountStage ? " has-error" : "")
            }
          >
             <label>
          Opportunity Amount Stage : 
          <select value={organisation.amountStage} onChange={this.handleChange}>
            <option value={organisation.amountStage}>Discovery</option>
            <option value={organisation.amountStage}>Negotiations</option>
            <option value={organisation.amountStage}>Proposal Shared</option>
          </select>
        </label>
            {submitted && !opportunity.amountStage && (
              <div className="help-block">amount stage is required</div>
            )}
          </div>
          <div className="form-group mb-3">
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
  const { users, authentication, organisation, creating } = state;
  const { user } = authentication;
  return { user, users, organisation, creating };
}

const actionCreators = {
  create: opportunityActions.create,
  getOrganisation: organisationActions.getAll,
};

const connectedOpportunityForm = connect(
  mapState,
  actionCreators
)(OpportunityForm);
export { connectedOpportunityForm as OpportunityForm };
