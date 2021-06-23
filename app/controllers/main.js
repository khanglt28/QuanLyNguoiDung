var service = new NguoiDungServices();
var validation = new Validation();
var userArr = [];

function getEle(id) {
  return document.getElementById(id);
}

function getData() {
  service
    .getListUserApi()
    .then(function (result) {
      // console.log(result.data);
      renderListUser(result.data);
      userArr = result.data;
    })
    .catch(function (error) {
      console.log(error);
    });
}

getData();

function displayError(status) {
  var error = document.getElementsByClassName("alert alert-danger");
  for (var i = 0; i < error.length; i++) {
    error[i].style.display = status;
  }
}

function getInputs(isAdd, id) {
  var _taiKhoan = getEle("TaiKhoan").value;
  var _hoTen = getEle("HoTen").value;
  var _matKhau = getEle("MatKhau").value;
  var _email = getEle("Email").value;
  var _hinhAnh = getEle("HinhAnh").value;
  var _loaiND = getEle("loaiNguoiDung").value;
  var _ngonNgu = getEle("loaiNgonNgu").value;
  var _moTa = getEle("MoTa").value;

  var isValid = true;

  // kiểm tra tài khoản
  if (isAdd === true) {
    isValid &=
      validation.kiemTraRong(
        _taiKhoan,
        "tbTaiKhoan",
        "(*) Tài khoản không được để trống"
      ) &&
      validation.kiemTraAccountTrung(
        _taiKhoan,
        "tbTaiKhoan",
        "(*) Tài khoản đã tồn tại",
        userArr
      );
  }

  // kiểm tra họ và tên
  isValid &=
    validation.kiemTraRong(
      _hoTen,
      "tbHoTen",
      "(*) Tên nhân viên không được để trống"
    ) &&
    validation.kiemTraKyTuChuoi(
      _hoTen,
      "tbHoTen",
      "(*) Tên nhân viên phải là chữ"
    );

  //kiẻm tra mật khẩu
  isValid &=
    validation.kiemTraRong(
      _matKhau,
      "tbMatKhau",
      "(*) Mật khẩu không được để trống"
    ) &&
    validation.kiemTraDoDaiKyTu(
      _matKhau,
      "tbMatKhau",
      "(*) Độ dài mật khẩu từ 6-8 ký tự",
      6,
      8
    ) &&
    validation.kiemTraMatKhau(
      _matKhau,
      "tbMatKhau",
      "(*) Mật khẩu phải chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt)"
    );

  //kiểm tra email
  isValid &=
    validation.kiemTraRong(
      _email,
      "tbEmail",
      "(*) Email không được để trống"
    ) &&
    validation.kiemTraEmail(
      _email,
      "tbEmail",
      "(*) Email phải đúng định dạng.Ví dụ: example@gmail.com"
    );

  isValid &= validation.kiemTraRong(
    _hinhAnh,
    "tbHinhAnh",
    "(*) Hình ảnh không được để trống"
  );

  isValid &= validation.kiemTraRong(
    _loaiND,
    "tbLoaiND",
    "(*) Chọn loại người dùng"
  );

  isValid &= validation.kiemTraRong(
    _ngonNgu,
    "tbNgonNgu",
    "(*) Chọn loại ngôn ngữ"
  );

  // kiểm tra mô tả
  isValid &=
    validation.kiemTraRong(_moTa, "tbMoTa", "(*) Mô tả không được để trống") &&
    validation.kiemTraDoDaiKyTu(
      _moTa,
      "tbMoTa",
      "(*) Mô tả không vượt quá 60 ký tự",
      1,
      60
    );

  if (isValid) {
    var nguoiDung = new NguoiDung(
      id,
      _taiKhoan,
      _hoTen,
      _matKhau,
      _email,
      _ngonNgu,
      _loaiND,
      _hinhAnh,
      _moTa
    );
    return nguoiDung;
  }
  return null;
}

function renderListUser(list) {
  var contentHTML = "";
  list.forEach(function (user, index) {
    contentHTML += `
        <tr>
            <td>${index + 1}</td>
            <td>${user.taiKhoan}</td>
            <td>${user.matKhau}</td>
            <td>${user.hoTen}</td>
            <td>${user.email}</td>
            <td>${user.ngonNgu}</td>
            <td>${user.loaiND}</td>
            <td>
            <button class="btn btn-info" data-toggle="modal" data-target="#myModal" onclick="suaNguoiDung(${
              user.id
            })">Sửa</button>
              <button class="btn btn-danger" onclick="xoaNguoiDung(${
                user.id
              })">Xoá</button>
            </td>
        </tr>
      `;
  });

  getEle("tblDanhSachNguoiDung").innerHTML = contentHTML;
}

// render modal thêm người dùng
getEle("btnThemNguoiDung").addEventListener("click", function (event) {
  //chặn web bị load lại
  event.preventDefault();

  // document.getElementsByClassName("modal-body")[0].clear();
  document.getElementsByClassName("modal-title")[0].innerHTML =
    "Thêm Người Dùng";

  var footer =
    '<button class="btn btn-primary" id="btnAdd" onclick="addUser()">Thêm Người Dùng</button>';
  document.getElementsByClassName("modal-footer")[0].innerHTML = footer;
  // document.getElementById("bodyForm").reset();
  document.getElementsByClassName("modal-body")[0].reset();
});

/**
 * Thêm Người Dùng vào Api
 */

function addUser() {
  /**
   * DOM lấy valuer tù inputs
   */
  var nguoiDung = getInputs(true, "");

  if (nguoiDung) {
    service
      .addUserApi(nguoiDung)
      .then(function (result) {
        // console.log(result);
        alert("Thêm thành công !");
        //Tắt modal
        document.getElementsByClassName("close")[0].click();
        //Làm mới trang
        getData();
      })
      .catch(function (error) {
        console.log(error);
      });
  } else {
    console.log("Thông tin không hợp lệ !");
  }
}

/**
 * Xoá người dùng
 */
function xoaNguoiDung(id) {
  console.log("Xoá");
  service
    .deleteUserApi(id)
    .then(function () {
      getData();
      alert("Xoá người dùng thành công !");
    })
    .catch(function (error) {
      console.log(error);
    });
}

/**
 * Sửa người dùng
 */
function suaNguoiDung(id) {
  document.getElementsByClassName("modal-title")[0].innerHTML =
    "Sửa Người Dùng";

  var footer = `<button class="btn btn-primary" onclick="capNhatNguoiDung(${id})">Cập nhật</button>`;
  document.getElementsByClassName("modal-footer")[0].innerHTML = footer;

  service
    .getUserById(id)
    .then(function (result) {
      console.log(result.data);
      // Show thông tin ra các thẻ inputs
      getEle("TaiKhoan").value = result.data.taiKhoan;
      getEle("TaiKhoan").disabled = true;
      getEle("HoTen").value = result.data.hoTen;
      getEle("MatKhau").value = result.data.matKhau;
      getEle("Email").value = result.data.email;
      getEle("HinhAnh").value = result.data.hinhAnh;
      getEle("loaiNguoiDung").value = result.data.loaiND;
      getEle("loaiNgonNgu").value = result.data.ngonNgu;
      getEle("MoTa").value = result.data.moTa;
    })
    .catch(function (error) {
      console.log(error);
    });
}

/**
 * Cập nhật người dùng
 */
function capNhatNguoiDung(id) {
  var nguoiDung = getInputs(false, id);

  if (nguoiDung) {
    service
      .updateUserApi(nguoiDung)
      .then(function () {
        alert("Cập nhật thành công !");
        // Tắt modal
        document.getElementsByClassName("close")[0].click();
        // Làm mới trang
        getData();
      })
      .catch(function (error) {
        console.log(error);
      });
  } else {
    // alert("Cập nhật thất bại !");
    console.log("Cập nhật thất bại !");
  }
}
