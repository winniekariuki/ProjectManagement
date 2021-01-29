import React from "react";
import { connect } from "react-redux";
import { opportunityActions } from "../../actions/opportunity.actions";
import { organisationActions } from "../../actions/organisation.action";
export default class OpportunityForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      opportunity: {
        name: "",
        account: "",
        amountStage: "",
        submitted: false,
      },
      accounts: [],
      amountStage: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getOrganisation();
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ submitted: true });
    const { opportunity } = this.state;
    if (opportunity) {
      this.props.create(opportunity);
    }
  }

  render() {
    const { creating, organisation } = this.props;
    const { opportunity, submitted } = this.state;
    return (
      <div className="col-md-6 col-md-offset-3">
        <form name="form" onSubmit={this.handleSubmit}>
          <div
            className={
              "form-group" +
              (submitted && !opportunity.name ? " has-error" : "")
            }
          >
            <label htmlFor="name">Name</label>
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
              "form-group" +
              (submitted && !opportunity.account ? " has-error" : "")
            }
          >
            <label>
              Accounts:
              <select value={this.state.value} onChange={this.handleChange}>
                {organisation.items &&
                  organisation.items.map((organisation) => (
                    <option key={organisation._id} value={organisation.name}>
                      {organisation.name}
                    </option>
                  ))}
              </select>
            </label>
            {submitted && !opportunity.account && (
              <div className="help-block">account is required</div>
            )}
          </div>
          <div
            className={
              "form-group" +
              (submitted && !opportunity.amountStage ? " has-error" : "")
            }
          >
            <label>
              Amount Stage:
              <select value={this.state.value} onChange={this.handleChange}>
                <option value="grapefruit">Grapefruit</option>
                <option value="lime">Lime</option>
                <option value="coconut">Coconut</option>
                <option value="mango">Mango</option>
              </select>
            </label>
            {submitted && !opportunity.amountStage && (
              <div className="help-block">ammount stage is required</div>
            )}
          </div>

          <div className="form-group">
            <button className="btn btn-primary">Create Opportunity</button>
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
  const {  organisation } = state;
  const { creating } = state.opportunity;
  return { creating, organisation };
}

const actionCreators = {
  create: opportunityActions.create,
  getOrganisation: organisationActions.getAll
};

const connectedOpportunityForm = connect(
  mapState,
  actionCreators
)(OpportunityForm);
export { connectedOpportunityForm as OpportunityForm };
