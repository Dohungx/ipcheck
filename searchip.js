<script>
    function searchIP() {
        var ip = document.getElementById("search-ip").value;
        var url = "https://api.ipgeolocation.io/ipgeo?apiKey=YOUR_API_KEY&ip=" + ip;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                // Xử lý dữ liệu trả về ở đây
                var ipInfo = document.getElementById("ip-info");
                ipInfo.innerHTML = "Quốc gia: " + data.country_name + "<br>" +
                                    "Tỉnh/Thành phố: " + data.city + "<br>" +
                                    "Khu vực: " + data.region + "<br>" +
                                    "Mã bưu chính: " + data.postal + "<br>" +
                                    "Tọa độ: " + data.latitude + ", " + data.longitude;
            })
            .catch(error => {
                console.log(error);
                var ipInfo = document.getElementById("ip-info");
                ipInfo.innerHTML = "Không tìm thấy thông tin cho địa chỉ IP này.";
            });
    }
</script>