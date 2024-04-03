window.addEventListener('load', function() {
    // Lấy địa chỉ IP của người dùng
    fetch('https://ipinfo.io/json')
        .then(response => response.json())
        .then(data => {
            document.getElementById('user-ip').textContent = data.ip;
        })
        .catch(error => console.error('Lỗi khi lấy địa chỉ IP:', error));
    
    // Lấy thông tin vị trí của người dùng dựa trên địa chỉ IP
    fetch('https://ipinfo.io/json')
        .then(response => response.json())
        .then(data => {
            document.getElementById('user-location').textContent = `${data.city}, ${data.region}, ${data.country_name}`; // Hiển thị thông tin vị trí
            document.getElementById('isp-info').textContent = data.org; // Hiển thị thông tin ISP
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
// Cập nhật thời gian liên tục
setInterval(function() {
    var currentTime = new Date();
    document.getElementById('current-time').textContent = 'Thời gian hiện tại: ' + currentTime.toLocaleString();
}, 1000); // Cập nhật mỗi 1 giây (1000 milliseconds)

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

    // Kiểm tra sự hỗ trợ của API Network Information và hiển thị loại kết nối mạng
    if ('connection' in navigator) {
        var connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        var connectionType = connection.effectiveType;
        document.getElementById('network-info').textContent = connectionType;
    } else {
        document.getElementById('network-info').textContent = "Không hỗ trợ";
    }

    // Kiểm tra trình chặn quảng cáo và hiển thị kết quả
    var adTest = document.createElement('div');
    adTest.innerHTML = '&nbsp;';
    adTest.className = 'ad';
    adTest.style.position = 'absolute';
    adTest.style.top = '-100px';
    document.body.appendChild(adTest);
    setTimeout(function() {
        if (adTest.offsetHeight === 0) {
            document.getElementById('adblock-check').textContent = 'Có';
        } else {
            document.getElementById('adblock-check').textContent = 'Không';
        }
        adTest.remove();
    }, 100);
});

document.addEventListener('DOMContentLoaded', function() {
    // Tìm các phần tử HTML cần được cập nhật
    const speedTestElement = document.getElementById('speed-test');

    // Khởi tạo Speedtest
    const speedTest = new Speedtest();

    // Xử lý sự kiện cập nhật tốc độ mạng
    speedTest.onupdate = function(data) {
        // Cập nhật tốc độ mạng
        speedTestElement.textContent = 'Tải lên: ' + (data.upload / 1024 / 1024).toFixed(2) + ' Mbps, ' +
                                       'Tải xuống: ' + (data.download / 1024 / 1024).toFixed(2) + ' Mbps';
    };

    // Bắt đầu Speedtest
    speedTest.start();
});