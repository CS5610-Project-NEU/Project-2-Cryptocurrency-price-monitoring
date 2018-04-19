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
      console.log(resp);
      store.dispatch({
        type: 'USER_FORM_ERROR',
        errors: resp.responseJSON.errors,
      });
    },
  });
}

request_users() {
  $.ajax("/api/v1/users", {
    method: "get",
    dataType: "json",
    contentType: "application/json; charset=UTF-8",
    success: (resp) => {
      store.dispatch({
        type: 'USERS_LIST',
        users: resp.data,
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
        });
      }
    });
}

    update_coins(data){
        $.ajax("/api/v1/purs", {
            method: "post",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            data: JSON.stringify(data),
            success: (resp) => {
                alert("Success" + resp.data);
            }
        })
    }

    update_alert(data){
        $.ajax("/api/v1/alerts", {
            method: "post",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            data: JSON.stringify(data),
            success: (resp) => {
                alert("Success" + resp.data);
            }
        })
    }


    get_coins(){
        $.ajax("/api/v1/coins", {
            method: "get",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            success: (resp) => {
                store.dispatch({
                    type: 'COINS_LIST',
                    data: resp.data,
                });
            }
        });
    }
}

export default new TheServer();
