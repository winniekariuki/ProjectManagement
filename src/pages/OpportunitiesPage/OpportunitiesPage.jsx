import React from "react";
// import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Opportunity from "../../Opportunity/Opportunity";

import { CardColumns, Container } from "react-bootstrap";
import { userActions } from "../../actions/user.actions";
import { opportunityActions } from "../../actions/opportunity.actions";
import { organisationActions } from "../../actions/organisation.action";
import { Modal } from "../../components/Modal/modal";
import { OpportunityForm }  from "../../components/opportunityForm/opportunityForm";

class OpportunitiesPage extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props,"<>><>props")
    this.state = {
      show: false,
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  componentDidMount() {
    this.props.getUsers();
    this.props.getOpportunities();
  }

  handleDeleteUser(id) {
    return (e) => this.props.deleteUser(id);
  }

  render() {
    const { opportunity } = this.props;
    console.log("<>>props", opportunity.items);

    const opportunityItem =
      opportunity.items &&
      opportunity.items.map((opportunity) => (
        <Opportunity
          key={opportunity._id}
          name={opportunity.name}
          account={opportunity.account}
          amountStage={opportunity.amountStage}
        />
      ));

    return (
      <div class="container">
        <Modal show={this.state.show} handleClose={this.hideModal} class="modal-dialog modal-fullscreen-sm-down">
          <OpportunityForm />
        </Modal>
        <button type="button" class="btn" onClick={this.showModal}
         style={{
          marginLeft: "821px",
          marginRight: "77px",
          marginTop: "10px",
          width: "149px",
          marginBottom: "10px",
          backgroundColor: "blue",
          color: "white",
          fontWeight: "bold",
          borderRadius: "8px",
          boxShadow: "black",
          borderWidth: "1px",
        }}
        >
          <i class="fas fa-plus"></i>Add Opportunity
        </button>
        <div
          class="row row-cols-1  row-cols-md-3 g-4"
          style={{ width: "1000px" }}
        >{opportunityItem}</div>
      </div>
    );
  }
}

function mapState(state) {
  const { users, authentication, opportunity,organisation } = state;
  const { user } = authentication;
  return { user, users, opportunity, organisation };
}

const actionCreators = {
  getUsers: userActions.getAll,
  getOpportunities: opportunityActions.getAll,
  getOrganisation: organisationActions.getAll,
  createOpportunities: opportunityActions.create,
};

const connectedOpportunitiesPage = connect(
  mapState,
  actionCreators
)(OpportunitiesPage);
export { connectedOpportunitiesPage as OpportunitiesPage };
