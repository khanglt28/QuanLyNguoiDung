function Validation() {
  this.kiemTraRong = function (input, id, mess) {
    if (input.trim() === "") {
      getEle(id).innerHTML = mess;
      getEle(id).className =
        "alert alert-danger p-1 w-100 text-danger bg-gradient-danger d-block";
      return false;
    } else {
      getEle(id).innerHTML = "";
      getEle(id).className = "";
      return true;
    }
  };

  this.kiemTraDoDaiKyTu = function (input, id, mess, min, max) {
    if (input.length >= min && input.length <= max) {
      getEle(id).innerHTML = "";
      getEle(id).className = "";
      return true;
    }
    getEle(id).innerHTML = mess;
    getEle(id).className =
      "alert alert-danger p-1 w-100 text-danger bg-gradient-danger d-block";
    return false;
  };

  this.kiemTraKyTuChuoi = function (input, id, mess) {
    var regex =
      "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
      "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
      "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$";
    if (input.match(regex)) {
      getEle(id).innerHTML = "";
      getEle(id).className = "";
      return true;
    }
    getEle(id).innerHTML = mess;
    getEle(id).className =
      "alert alert-danger p-1 w-100 text-danger bg-gradient-danger d-block";
    return false;
  };

  this.kiemTraEmail = function (input, id, mess) {
    var regex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (input.toLowerCase().match(regex)) {
      getEle(id).innerHTML = "";
      getEle(id).className = "";
      return true;
    }
    getEle(id).innerHTML = mess;
    getEle(id).className =
      "alert alert-danger p-1 w-100 text-danger bg-gradient-danger d-block";
    return false;
  };

  this.kiemTraMatKhau = function (input, id, mess) {
    var regex =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,10}$/;
    if (input.match(regex)) {
      getEle(id).innerHTML = "";
      getEle(id).className = "";
      return true;
    }
    getEle(id).innerHTML = mess;
    getEle(id).className =
      "alert alert-danger p-1 w-100 text-danger bg-gradient-danger d-block";
    return false;
  };

  this.kiemTraAccountTrung = function (input, id, mess, arr) {
    var status = true;
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].taiKhoan === input) {
        status = false;
        break;
      }
    }
    if (status) {
      getEle(id).innerHTML = "";
      getEle(id).className = "";
      return true;
    }
    getEle(id).innerHTML = mess;
    getEle(id).className =
      "alert alert-danger p-1 w-100 text-danger bg-gradient-danger d-block";
    return false;
  };
}
