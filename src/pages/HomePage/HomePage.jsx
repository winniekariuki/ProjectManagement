import React from "react";
import { connect } from "react-redux";
import Organisation from "../../organisation/organisation";

import { CardColumns, Container } from "react-bootstrap";
import { userActions } from "../../actions/user.actions";
import { organisationActions } from "../../actions/organisation.action";
import { OrganisationForm } from "../../components/organisationForm/organisationForm";
import { Modal } from "../../components/Modal/modal";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
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
    this.props.getOrganisation();
  }

  handleDeleteUser(id) {
    return (e) => this.props.deleteUser(id);
  }

  render() {
    const { organisation } = this.props;
    console.log("promount", this.props);
    const organisationItem =
      organisation.items &&
      organisation.items.map((organisation) => (
        <Organisation name={organisation.name} address={organisation.address} />
      ));

    return (
      <div class="container">
        <Modal
        class="modal-dialog modal-fullscreen-sm-down"
          show={this.state.show}
          handleClose={this.hideModal}
        
        >
          <OrganisationForm />
        </Modal>
        
        <button
          type="button"
          class="btn"
          onClick={this.showModal}
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
          <i class="fas fa-plus"></i>Add Account
        </button>
        <div
          class="row row-cols-1  row-cols-md-3 g-4"
          style={{ width: "1000px" }}
        >
          {organisationItem}
        </div>
      </div>
    );
  }
}

function mapState(state) {
  const { users, authentication, organisation } = state;
  const { user } = authentication;
  return { user, users, organisation };
}

const actionCreators = {
  getUsers: userActions.getAll,
  getOrganisation: organisationActions.getAll,
  createOrganisation: organisationActions.create,
};

const connectedHomePage = connect(mapState, actionCreators)(HomePage);
export { connectedHomePage as HomePage };
