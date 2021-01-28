import { opportunityConstants } from "../constants/opportunity.constants";
import { opportunityService } from "../services";
import { userConstants } from "../constants/users.constants";
import { userService } from "../services";
import { alertActions } from "./alert.actions";

export const opportunityActions = {
  logout,
  create,
  getAll,
  getById,
};

function logout() {
  userService.logout();
  return { type: userConstants.LOGOUT };
}

function create(opportunity) {
  return (dispatch) => {
    dispatch(request(opportunity));

    opportunityService.create(opportunity).then(
      (opportunity) => {
        dispatch(success());
        dispatch(alertActions.success("Opportunity created successful"));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(opportunity) {
    return { type: opportunityConstants.CREATE_REQUEST, opportunity };
  }
  function success(opportunity) {
    return { type: opportunityConstants.CREATE_SUCCESS, opportunity };
  }
  function failure(error) {
    return { type: opportunityConstants.CREATE_FAILURE, error };
  }
}

function getAll() {
  return (dispatch) => {
    dispatch(request());

    opportunityService.getAll().then(
      (opportunity) => dispatch(success(opportunity)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request() {
    return { type: opportunityConstants.GETALL_REQUEST };
  }
  function success(opportunity) {
    return { type: opportunityConstants.GETALL_SUCCESS, opportunity };
  }
  function failure(error) {
    return { type: opportunityConstants.GETALL_FAILURE, error };
  }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function getById(id) {
  return (dispatch) => {
    dispatch(request(id));

    opportunityService.getById(id).then(
      (opportunity) => dispatch(success(id)),
      (error) => dispatch(failure(id, error.toString()))
    );
  };

  function request(id) {
    return { type: opportunityConstants.GETONE_REQUEST, id };
  }
  function success(id) {
    return { type: opportunityConstants.GETONE_SUCCESS, id };
  }
  function failure(id, error) {
    return { type: opportunityConstants.GETONE_FAILURE, id, error };
  }
}
