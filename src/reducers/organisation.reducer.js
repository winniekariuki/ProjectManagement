import { organisationConstants } from "../constants/organisation.constants";

export function organisation(state = {}, action) {
  switch (action.type) {
    case organisationConstants.GETALL_REQUEST:
      return {
        loading: true,
      };
    case organisationConstants.GETALL_SUCCESS:
      return {
        items: action.organisation,
      };
    case organisationConstants.GETALL_FAILURE:
      return {
        error: action.error,
      };
    case organisationConstants.GETONE_REQUEST:
      return {
        loading: true,
      };
    case organisationConstants.GETONE_SUCCESS:
      return {
        ...state,
        items: state.items.map((organisation) =>
          organisation.id === action.id ? { ...organisation } : organisation
        ),
      };
    case organisationConstants.GETONE_FAILURE:
      return {
        error: action.error,
      };
    case organisationConstants.CREATE_REQUEST:
      return { creating: true };
    case organisationConstants.CREATE_SUCCESS:
      return {};
    case organisationConstants.CREATE_FAILURE:
      return {};
    default:
      return state;
  }
}
