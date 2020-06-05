import { SET_TAGS, SET_GROUP_BY, SET_MERGE_US, SET_MERGE_UK } from "./constants";

export const initialState = {
  tags: [],
  groupBy: "webSites",
  mergedUS: [],
  mergedUK: [] 
};

function PostReducer(state = initialState, action) {
  switch (action.type) {
    case SET_TAGS:
      if (!action.data.length) {
        action.data = initialState.get("tags");
      }

      return {
        ...state,
        tags: action.data,
      };

    case SET_GROUP_BY:
      return {
        ...state,
        groupBy: action.data,
      };

      case SET_MERGE_US:
      return {
        ...state,
        mergedUS: action.data,
      };

      case SET_MERGE_UK:
        return {
          ...state,
          mergedUK: action.data,
        };

    default:
      return state;
  }
}

export default PostReducer;
