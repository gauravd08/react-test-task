import { GET_TAGS } from "../../config/endPoints";
import { httpGet } from "../../utils/http";
import { SET_TAGS, SET_GROUP_BY, SET_MERGE_US, SET_MERGE_UK } from "./constants";
import _ from "lodash";

export const setTags = (data = []) => {
  return { type: SET_TAGS, data };
};

export const setMergeUS = (data = []) => {
  return { type: SET_MERGE_US, data };
};

export const setMergeUK = (data = []) => {
  return { type: SET_MERGE_UK, data };
};

export const setGroupBy = (data = []) => {
  return { type: SET_GROUP_BY, data };
};

export const fetchTags = () => {
  return async (dispatch, getState) => {
    let res = await httpGet(GET_TAGS);
    const tagsState = getState("tags");
    const groupBy = tagsState.tags.groupBy;

    if (groupBy === "webSites") {
      let data = _.chain(res.data)
        .groupBy("region")
        .map((value, key) => ({ region: key, tags: value }))
        .value();

      dispatch(setTags(data));
    } else if(groupBy === 'tags') {
      let data = _(res.data)
        .groupBy("tagName")
        .map((objs, key) => ({
          tagName: key,
          count: _.sumBy(objs, "count"),
        }))
        .value();

      dispatch(setTags(data));
    }
  };
};
