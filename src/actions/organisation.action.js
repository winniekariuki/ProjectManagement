import { organisationConstants } from "../constants/organisation.constants";
import { organisationService } from "../services";
import { userConstants } from "../constants/users.constants";
import { userService } from "../services";
import { alertActions } from "./alert.actions";

export const organisationActions = {
  logout,
  create,
  getAll,
  getById,
};

function logout() {
  userService.logout();
  return { type: userConstants.LOGOUT };
}

function create(name,address) {
  return (dispatch) => {
    dispatch(request({name,address}));

    organisationService.create(name,address)
    .then(
      organisation => {
        dispatch(success(organisation));
        dispatch(alertActions.success("organisation created successful"));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(organisation) {
    return { type: organisationConstants.CREATE_REQUEST, organisation };
  }
  function success(organisation) {
    return { type: organisationConstants.CREATE_SUCCESS, organisation };
  }
  function failure(error) {
    return { type: organisationConstants.CREATE_FAILURE, error };
  }
}

function getAll() {
  return (dispatch) => {
    dispatch(request());

    organisationService.getAll().then(
      (organisation) => dispatch(success(organisation)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request() {
    return { type: organisationConstants.GETALL_REQUEST };
  }
  function success(organisation) {
    return { type: organisationConstants.GETALL_SUCCESS, organisation };
  }
  function failure(error) {
    return { type: organisationConstants.GETALL_FAILURE, error };
  }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function getById(id) {
  return (dispatch) => {
    dispatch(request(id));

    organisationService.getById(id).then(
      (organisation) => dispatch(success(id)),
      (error) => dispatch(failure(id, error.toString()))
    );
  };

  function request(id) {
    return { type: organisationConstants.GETONE_REQUEST, id };
  }
  function success(id) {
    return { type: organisationConstants.GETONE_SUCCESS, id };
  }
  function failure(id, error) {
    return { type: organisationConstants.GETONE_FAILURE, id, error };
  }
}
