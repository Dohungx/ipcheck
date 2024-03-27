window.addEventListener('load', function() {
    // Lấy địa chỉ IP của người dùng
    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            document.getElementById('user-ip').textContent = data.ip;
        })
        .catch(error => console.error('Lỗi khi lấy địa chỉ IP:', error));
    
    // Lấy thông tin vị trí của người dùng dựa trên địa chỉ IP
    fetch('https://ipapi.co/json/')
        .then(response => response.json())
        .then(data => {
            document.getElementById('user-location').textContent = `${data.city}, ${data.region}, ${data.country_name}`;
            document.getElementById('isp-info').textContent = data.org;
            document.getElementById('device-name').textContent = navigator.platform;
            document.getElementById('browser-info').textContent = navigator.userAgent;
            document.getElementById('language-info').textContent = navigator.language;
            document.getElementById('os-info').textContent = navigator.platform;
            document.getElementById('resolution-info').textContent = `${screen.width}x${screen.height}`;
            document.getElementById('cpu-info').textContent = navigator.hardwareConcurrency ? navigator.hardwareConcurrency : "N/A";
            document.getElementById('vpn-status').textContent = data.is_proxy ? "Đang sử dụng VPN" : "Không sử dụng VPN";
        })
        .catch(error => console.error('Lỗi khi lấy thông tin vị trí của người dùng:', error));

    // Hiển thị thời gian hiện tại
    var currentTime = new Date();
    document.getElementById('current-time').textContent = 'Thời gian hiện tại: ' + currentTime.toLocaleString();

    // Kiểm tra hỗ trợ Battery Status API và hiển thị thông tin về pin
    if (navigator.getBattery) {
        navigator.getBattery().then(function(battery) {
            // Hiển thị trạng thái pin và lắng nghe sự kiện thay đổi
            updateBatteryStatus(battery);
            battery.addEventListener('chargingchange', function() {
                updateBatteryStatus(battery);
            });

            function updateBatteryStatus(battery) {
                var batteryInfo = battery.charging ? 'Đang sạc' : 'Không sạc';
                batteryInfo += ', Pin: ' + (battery.level * 100).toFixed(2) + '%';
                document.getElementById('battery-info').textContent = batteryInfo;
            }
        });
    } else {
        document.getElementById('battery-info').textContent = "Không hỗ trợ";
    }
});