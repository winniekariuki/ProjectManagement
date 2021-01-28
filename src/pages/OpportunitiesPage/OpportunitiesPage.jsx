import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Opportunity from '../../Opportunity/Opportunity';

import {CardColumns, Container} from 'react-bootstrap';
import { userActions } from '../../actions/user.actions';
import { opportunityActions } from '../../actions/opportunity.actions';

class OpportunitiesPage extends React.Component {
    componentDidMount() {
        this.props.getUsers();
        this.props.getOpportunities();
    }

    handleDeleteUser(id) {
        return (e) => this.props.deleteUser(id);
    }

    render() {
        const { opportunity } = this.props;
        console.log("<>>props",opportunity.items);
      
        const opportunityItem = opportunity.items && opportunity.items.map(opportunity => (
          <Opportunity
          key={opportunity._id}
            name={opportunity.name}
            account={opportunity.account}
            amountStage={opportunity.amountStage}
            
          />
      
        ));
        
        return (
            <Container>
                <CardColumns>{opportunityItem}</CardColumns>
               
                </Container>
        );
    }
}

function mapState(state) {
    const { users, authentication,opportunity } = state;
    const { user } = authentication;
    return { user, users, opportunity };
}

const actionCreators = {
    getUsers: userActions.getAll,
    getOpportunities: opportunityActions.getAll,
}

const connectedOpportunitiesPage = connect(mapState, actionCreators)(OpportunitiesPage);
export { connectedOpportunitiesPage as OpportunitiesPage };