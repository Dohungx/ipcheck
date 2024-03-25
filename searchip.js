// searchip.js

function searchIP() {
    fetch("https://ipinfo.io/json")
        .then(response => response.json())
        .then(data => {
            var ipInfo = document.getElementById("ip-info");
            ipInfo.innerHTML = "IP: " + data.ip + "<br>" +
                                "Quốc gia: " + data.country + "<br>" +
                                "Khu vực: " + data.region + "<br>" +
                                "Thành phố: " + data.city + "<br>" +
                                "Mã bưu chính: " + data.postal + "<br>" +
                                "Tọa độ: " + data.loc;
        })
        .catch(error => {
            console.error("Đã xảy ra lỗi: " + error);
        });
}