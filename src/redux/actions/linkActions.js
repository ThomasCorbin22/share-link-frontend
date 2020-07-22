import axios from "axios";

export const LOAD_LINK_SUCCESS_ACTION = "LOAD_LINK_SUCCESS_ACTION";
export const LOAD_LINK_FAILURE_ACTION = "LOAD_LINK_FAILURE_ACTION";

export const POST_LINK_SUCCESS_ACTION = "POST_LINK_SUCCESS_ACTION";
export const POST_LINK_FAILURE_ACTION = "POST_LINK_FAILURE_ACTION";

export function loadLinkSuccess(links) {
  return {
    type: LOAD_LINK_SUCCESS_ACTION,
    links,
  };
}

export function loadLinkFailure() {
  return {
    type: LOAD_LINK_FAILURE_ACTION,
  };
}

export function postLinkSuccess(links) {
  return {
    type: POST_LINK_SUCCESS_ACTION,
    links,
  };
}

export function postLinkFailure() {
  return {
    type: POST_LINK_FAILURE_ACTION,
  };
}

export function loadLinks() {
  return (dispatch) => {
    return axios
      .get("https://terrarie.net/app-04/links")
      .then((res) => {
        console.log("data", res.data);
        dispatch(loadLinkSuccess(res.data));
      })
      .catch((err) => {
        console.log("Failed", err);
        dispatch(loadLinkFailure());
      });
  };
}

export function postLink(link) {
  return (dispatch) => {
    console.log(link);
    return axios
      .post("https://terrarie.net/app-04/links", link)
      .then((res) => {
        console.log("data", res.data);
        dispatch(postLinkSuccess(res.data));
      })
      .catch((err) => {
        console.log("Failed", err);
        dispatch(postLinkFailure());
      });
  };
}
