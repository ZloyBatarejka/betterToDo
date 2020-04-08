import axios from 'axios';
import {
  CREATE_POST,
  DELETE_POST,
  COMPLETE_POST,
  HIDE_ALERT,
  SHOW_ALERT,
  HIDE_LOADER,
  GET_DATA,
} from './types';

const URL = process.env.REACT_APP_URL;

export function hideAlert() {
  return {
    type: HIDE_ALERT,
  };
}

export function showAlert(text) {
  return (dispatch) => {
    dispatch({
      type: SHOW_ALERT,
      payload: text,
    });
    setTimeout(() => {
      dispatch(hideAlert());
    }, 3000);
  };
}
export function finishLoading() {
  return {
    type: HIDE_LOADER,
  };
}
export function getData() {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${URL}.json`);
      const data = Array.from(Object.entries(response.data)).map((item) => {
        const post = item[1];
        post.url = item[0];
        return post;
      });
      dispatch({ type: GET_DATA, payload: data });
      dispatch(finishLoading());
    } catch (e) {
      dispatch({ type: GET_DATA, payload: [] });
      dispatch(finishLoading());
      showAlert('Data problems');
    }
  };
}

export function createPost(post) {
  return async (dispatch) => {
    try {
      await axios.post(`${URL}.json`, post); // Если работать исключительно с локальным стейтом, БД иногда не успевает
      dispatch({ type: CREATE_POST, payload: post }); // зарегать изменнения
      dispatch(getData());
    } catch (e) {
      showAlert('Data problems');
      dispatch({ type: CREATE_POST, payload: post });
    }
  };
}
export function deletePost(posts, url) {
  return async (dispatch) => {
    try {
      await axios.delete(`${URL}/${url}.json`);
      dispatch({ type: DELETE_POST, payload: posts });
      dispatch(getData());
    } catch (e) {
      showAlert('Data problems');
      dispatch({ type: DELETE_POST, payload: posts });
    }
  };
}
export function completePost(posts, post, url) {
  return async (dispatch) => {
    try {
      await axios.patch(`${URL}/${url}.json`, post);
      dispatch({ type: COMPLETE_POST, payload: posts });
      dispatch(getData());
    } catch (e) {
      showAlert('Data problems');
      dispatch({ type: COMPLETE_POST, payload: posts });
    }
  };
}
