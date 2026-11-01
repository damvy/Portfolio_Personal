// --- BÀI 1: TÍNH CAN CHI & CUNG HOÀNG ĐẠO ---
function traCuu() {
    var inputDate = document.getElementById("txtNgaySinh").value;

    if (inputDate == "") {
        alert("Vui lòng chọn ngày sinh!");
        return;
    }

    var parts = inputDate.split("-");
    var nam = parseInt(parts[0]);
    var thang = parseInt(parts[1]);
    var ngay = parseInt(parts[2]);

    // Kiểm tra ngày sinh hợp lệ
    var ngaySinh = new Date(nam, thang - 1, ngay);

    if (ngaySinh.getFullYear() != nam ||
        ngaySinh.getMonth() != thang - 1 ||
        ngaySinh.getDate() != ngay) {
        alert("Ngày sinh không hợp lệ!");
        return;
    }


    // Mảng Thiên Can và Địa Chi
    var cans = ["Canh", "Tân", "Nhâm", "Quý", "Giáp",
        "Ất", "Bính", "Đinh", "Mậu", "Kỷ"];

    var chis = ["Thân", "Dậu", "Tuất", "Hợi", "Tý", "Sửu",
        "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi"];

    // Tính Can Chi
    var can = cans[nam % 10];
    var chi = chis[nam % 12];


    // Xác định cung hoàng đạo
    var cung = "";

    if ((thang == 3 && ngay >= 21) || (thang == 4 && ngay <= 19)) {
        cung = "Bạch Dương";
    } else if ((thang == 4 && ngay >= 20) || (thang == 5 && ngay <= 20)) {
        cung = "Kim Ngưu";
    } else if ((thang == 5 && ngay >= 21) || (thang == 6 && ngay <= 20)) {
        cung = "Song Tử";
    } else if ((thang == 6 && ngay >= 21) || (thang == 7 && ngay <= 22)) {
        cung = "Cự Giải";
    } else if ((thang == 7 && ngay >= 23) || (thang == 8 && ngay <= 22)) {
        cung = "Sư Tử";
    } else if ((thang == 8 && ngay >= 23) || (thang == 9 && ngay <= 22)) {
        cung = "Xử Nữ";
    } else if ((thang == 9 && ngay >= 23) || (thang == 10 && ngay <= 22)) {
        cung = "Thiên Bình";
    } else if ((thang == 10 && ngay >= 23) || (thang == 11 && ngay <= 21)) {
        cung = "Thiên Yết";
    } else if ((thang == 11 && ngay >= 22) || (thang == 12 && ngay <= 21)) {
        cung = "Nhân Mã";
    } else if ((thang == 12 && ngay >= 22) || (thang == 1 && ngay <= 19)) {
        cung = "Ma Kết";
    } else if ((thang == 1 && ngay >= 20) || (thang == 2 && ngay <= 18)) {
        cung = "Bảo Bình";
    } else {
        cung = "Song Ngư";
    }

    var kq = "Năm " + nam + " là năm " + can + " " + chi
        + " - Cung hoàng đạo: " + cung;
    document.getElementById("lblKetQuaCanChi").innerHTML = kq;
    // Hien thi hinh cung hoang dao
    var tenFileCung = {
        "Bạch Dương": "bach-duong",
        "Kim Ngưu": "kim-nguu",
        "Song Tử": "song-tu",
        "Cự Giải": "cu-giai",
        "Sư Tử": "su-tu",
        "Xử Nữ": "xu-nu",
        "Thiên Bình": "thien-binh",
        "Thiên Yết": "thien-yet",
        "Nhân Mã": "nhan-ma",
        "Ma Kết": "ma-ket",
        "Bảo Bình": "bao-binh",
        "Song Ngư": "song-ngu"
    };

    // Hien thi hinh con giap
    var tenFileConGiap = {
        "Tý": "ty",
        "Sửu": "suu",
        "Dần": "dan",
        "Mão": "mao",
        "Thìn": "thin",
        "Tỵ": "ty",
        "Ngọ": "ngo",
        "Mùi": "mui",
        "Thân": "than",
        "Dậu": "dau",
        "Tuất": "tuat",
        "Hợi": "hoi"
    };

    var hinhConGiap = document.getElementById("hinhConGiap");
    hinhConGiap.src = "images/" + tenFileConGiap[chi] + ".jpg";
    hinhConGiap.alt = "Con giáp " + chi;
    var hinhCung = document.getElementById("hinhCung");
    hinhCung.src = "images/" + tenFileCung[cung] + ".jpg";
    hinhCung.alt = "Cung hoàng đạo " + cung;

    document.getElementById("khungHinhAnh").style.display = "flex";
}


// --- BÀI 2: RANDOM USER GALLERY ---
function layUser() {
    var khung = document.getElementById("khungUser");
    khung.innerHTML = "Đang tải danh sách người dùng...";

    fetch("https://randomuser.me/api/?results=10")
        .then(function (response) {
            if (!response.ok) {
                throw new Error("Không thể tải danh sách người dùng!");
            }
            return response.json();
        })
        .then(function (data) {
            var dsUser = data.results;
            var html = "";

            for (var i = 0; i < dsUser.length; i++) {
                var u = dsUser[i];

                html += '<div class="user-card">';
                html += '<img src="' + u.picture.large + '" alt="Ảnh đại diện" style="width: 80px; height: 80px; border-radius: 50%;">';
                html += '<h3>' + u.name.first + ' ' + u.name.last + '</h3>';
                html += '<p style="font-size: 12px; overflow-wrap: anywhere;">' + u.email + '</p>';
                html += '<p>' + u.location.country + '</p>';
                html += '</div>';
            }

            khung.innerHTML = html;
        })
        .catch(function (error) {
            khung.innerHTML = "Không thể tải dữ liệu. Vui lòng thử lại!";
            console.log("Lỗi API người dùng:", error);
        });
}


// --- BÀI 3: API HÀNH CHÍNH VIỆT NAM ---
function loadTinhThanh() {
    var select = document.getElementById("selTinh");

    if (!select) {
        return;
    }

    fetch("https://provinces.open-api.vn/api/?depth=1")
        .then(function (response) {
            if (!response.ok) {
                throw new Error("Không thể tải danh sách tỉnh!");
            }
            return response.json();
        })
        .then(function (listTinh) {
            for (var i = 0; i < listTinh.length; i++) {
                var opt = document.createElement("option");
                opt.value = listTinh[i].code;
                opt.textContent = listTinh[i].name;
                select.appendChild(opt);
            }
        })
        .catch(function (error) {
            console.log("Lỗi tải tỉnh thành:", error);
            alert("Không thể tải danh sách tỉnh thành!");
        });
}

document.addEventListener("DOMContentLoaded", function () {
    loadTinhThanh();
});

function layXaPhuong() {
    var maTinh = document.getElementById("selTinh").value;
    var selXa = document.getElementById("selXa");

    selXa.innerHTML = '<option value="">-- Chọn Xã/Phường --</option>';

    if (maTinh == "") {
        return;
    }

    fetch("https://provinces.open-api.vn/api/p/" + maTinh + "?depth=3")
        .then(function (response) {
            if (!response.ok) {
                throw new Error("Không thể tải danh sách xã/phường!");
            }
            return response.json();
        })
        .then(function (data) {
            var districts = data.districts || [];

            for (var i = 0; i < districts.length; i++) {
                var wards = districts[i].wards || [];

                for (var j = 0; j < wards.length; j++) {
                    var opt = document.createElement("option");
                    opt.value = wards[j].code;
                    opt.textContent = wards[j].name;
                    selXa.appendChild(opt);
                }
            }
        })
        .catch(function (error) {
            console.log("Lỗi tải xã/phường:", error);
            alert("Không thể tải danh sách xã/phường!");
        });
}
document.addEventListener("DOMContentLoaded", function () {
    var form = document.getElementById("formCuTru");

    if (!form) {
        return;
    }

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        var hoTen = document.getElementById("txtHoTen").value.trim();
        var oNgaySinh = document.querySelector("#formCuTru #txtNgaySinh");
        var ngaySinh = oNgaySinh.value;

        console.log("Ngày sinh lấy được:", ngaySinh);

        if (ngaySinh) {
            var ngay = ngaySinh.split("-");
            ngaySinh = ngay[2] + "/" + ngay[1] + "/" + ngay[0];
        } else {
            ngaySinh = "Chưa nhập ngày sinh";
        }
        var gioiTinh = document.getElementById("selGioiTinh").value;
        var cccd = document.getElementById("txtCCCD").value.trim();
        var sdt = document.getElementById("txtSDT").value.trim();
        var email = document.getElementById("txtEmail").value.trim();
        var diaChi = document.getElementById("txtDiaChi").value.trim();

        var selTinh = document.getElementById("selTinh");
        var selXa = document.getElementById("selXa");

        if (!selTinh.value || !selXa.value) {
            alert("Vui lòng chọn tỉnh/thành phố và xã/phường!");
            return;
        }

        var tenTinh = selTinh.options[selTinh.selectedIndex].text;
        var tenXa = selXa.options[selXa.selectedIndex].text;

        document.getElementById("ketQuaCuTru").innerHTML =
            "<h3>Đăng ký thành công!</h3>" +
            "<p><strong>Họ và tên:</strong> " + hoTen + "</p>" +
            "<p><strong>Ngày sinh:</strong> " + ngaySinh + "</p>" +
            "<p><strong>Giới tính:</strong> " + gioiTinh + "</p>" +
            "<p><strong>Số CCCD:</strong> " + cccd + "</p>" +
            "<p><strong>Số điện thoại:</strong> " + sdt + "</p>" +
            "<p><strong>Email:</strong> " + (email || "Chưa cung cấp") + "</p>" +
            "<p><strong>Địa chỉ:</strong> " + diaChi + "</p>" +
            "<p><strong>Tỉnh/Thành phố:</strong> " + tenTinh + "</p>" +
            "<p><strong>Xã/Phường:</strong> " + tenXa + "</p>";
    });
});

// --- BÀI 4: MINI WEATHER APP ---
async function xemThoiTiet() {
    var thanhPho = document.getElementById("txtThanhPho").value.trim();
    var ketQua = document.getElementById("ketQuaThoiTiet");

    if (thanhPho == "") {
        alert("Vui lòng nhập tên thành phố!");
        return;
    }

    // Chuẩn hóa chữ hoa, chữ thường và khoảng trắng
    thanhPho = thanhPho.toLowerCase().trim().replace(/\s+/g, " ");

    thanhPho = thanhPho.normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d");

    var apiKey = "a3e93af47a0c507db74903a6ae1bf521";

    var url = "https://api.openweathermap.org/data/2.5/weather?q="
        + encodeURIComponent(thanhPho)
        + "&units=metric&appid=" + apiKey + "&lang=vi";

    try {
        ketQua.innerHTML = "Đang tải dữ liệu thời tiết...";

        var response = await fetch(url);

        if (!response.ok) {
            if (response.status == 401) {
                throw new Error("API key không hợp lệ hoặc chưa được kích hoạt!");
            } else if (response.status == 404) {
                throw new Error("Không tìm thấy thành phố!");
            } else {
                throw new Error("Không thể lấy dữ liệu thời tiết!");
            }
        }

        var data = await response.json();

        var text = "Thành phố: " + data.name + "<br>"
            + "Nhiệt độ: " + data.main.temp + " °C<br>"
            + "Độ ẩm: " + data.main.humidity + "%<br>"
            + "Trạng thái: " + data.weather[0].description;

        ketQua.innerHTML = text;

    } catch (error) {
        ketQua.innerHTML = '<span style="color:red;">Lỗi: '
            + error.message + '</span>';

        console.log("Lỗi thời tiết:", error);
    }
}