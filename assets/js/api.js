import store from './store';

class TheServer {

register_user(data) {
  $.ajax("/api/v1/users", {
    method: "post",
    dataType: "json",
    contentType: "application/json; charset=UTF-8",
    data: JSON.stringify({ user: data }),
    success: (resp) => {
      alert("User added!");
      store.dispatch({
        type: 'ADD_USER',
        user: resp.data,
      });
      store.dispatch({
        type: 'CLEAR_FORM'
      });
      store.dispatch({
        type: 'CLEAR_USER_ERROR'
      });
    },
    error: (resp) => {
      store.dispatch({
        type: 'USER_FORM_ERROR',
        errors: resp.responseJSON.errors,
      });
    },
  });
}

submit_signin(data) {
    $.ajax("/api/v1/token", {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(data),
      success: (resp) => {
        store.dispatch({
          type: 'SET_TOKEN',
          token: resp,
        });
      },
      error: (resp) => {
        store.dispatch({
          type: 'USER_FORM_ERROR',
          errors: {signin: 'Invalid Email Or Password'}
        })
      },
    });
  }
}

export default new TheServer();
