import { opportunityConstants } from "../constants/opportunity.constants";

export function opportunity(state = {}, action) {
  switch (action.type) {
    case opportunityConstants.GETALL_REQUEST:
      return {
        loading: true,
      };
    case opportunityConstants.GETALL_SUCCESS:
      return {
        items: action.opportunity,
      };
    case opportunityConstants.GETALL_FAILURE:
      return {
        error: action.error,
      };
    case opportunityConstants.GETONE_REQUEST:
      return {
        loading: true,
      };
    case opportunityConstants.GETONE_SUCCESS:
      return {
        ...state,
        items: state.items.map((opportunity) =>
          opportunity.id === action.id ? { ...opportunity } : opportunity
        ),
      };
    case opportunityConstants.GETONE_FAILURE:
      return {
        error: action.error,
      };
    case opportunityConstants.CREATE_REQUEST:
      return { creating: true };
    case opportunityConstants.CREATE_SUCCESS:
      return {};
    case opportunityConstants.CREATE_FAILURE:
      return {};
    default:
      return state;
  }
}
