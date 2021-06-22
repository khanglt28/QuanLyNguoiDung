function NguoiDungServices() {
  this.getListUserApi = function () {
    return axios({
      url: "https://60bc9ad2b8ab37001759f4d8.mockapi.io/api/users",
      method: "GET",
    });
  };

  this.addUserApi = function (user) {
    return axios({
      url: "https://60bc9ad2b8ab37001759f4d8.mockapi.io/api/users",
      method: "POST",
      data: user,
    });
  };

  this.deleteUserApi = function (id) {
    return axios({
      url: `https://60bc9ad2b8ab37001759f4d8.mockapi.io/api/users/${id}`,
      method: "DELETE",
    });
  };

  this.getUserById = function (id) {
    return axios({
      url: `https://60bc9ad2b8ab37001759f4d8.mockapi.io/api/users/${id}`,
      method: "GET",
    });
  };

  this.updateUserApi = function (user) {
    return axios({
      url: `https://60bc9ad2b8ab37001759f4d8.mockapi.io/api/users/${user.id}`,
      method: "PUT",
      data: user,
    });
  };
}
