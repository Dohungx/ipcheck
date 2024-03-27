document.addEventListener('DOMContentLoaded', function() {
    // Gọi API để lấy địa chỉ IP
    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            // Cập nhật địa chỉ IP vào phần tử HTML có id là 'user-ip'
            document.getElementById('user-ip').textContent = data.ip;
            // Gọi API để lấy thông tin chi tiết về địa chỉ IP
            fetch('https://ipapi.co/' + data.ip + '/json/')
                .then(response => response.json())
                .then(info => {
                    // Cập nhật thông tin về địa chỉ IP, vị trí, nhà cung cấp dịch vụ internet, vv.
                    document.getElementById('user-location').textContent = info.country_name + ', ' + info.region;
                    document.getElementById('isp-info').textContent = info.org;
                    document.getElementById('device-name').textContent = info.org;
                    document.getElementById('vpn-status').textContent = info.in_eu ? 'Có' : 'Không';
                    document.getElementById('browser-info').textContent = navigator.userAgent;
                    document.getElementById('network-info').textContent = navigator.connection.effectiveType;
                    document.getElementById('network-speed').textContent = navigator.connection.downlink + ' Mbps';
                    document.getElementById('current-time').textContent = 'Thời gian hiện tại: ' + new Date().toLocaleString();
                    document.getElementById('phone-number-check').textContent = info.phone ? 'Có' : 'Không';
                    document.getElementById('language-info').textContent = navigator.language;
                    document.getElementById('os-info').textContent = navigator.platform;
                    document.getElementById('resolution-info').textContent = screen.width + 'x' + screen.height;
                    document.getElementById('cpu-info').textContent = navigator.hardwareConcurrency;
                    document.getElementById('graphics-chip-info').textContent = navigator.userAgent.match(/(Intel|AMD|NVIDIA|ARM)/i)[0];
                    document.getElementById('ram-info').textContent = navigator.deviceMemory + ' GB';
                    // Ước lượng dung lượng ổ đĩa
                    navigator.storage.estimate().then(storageInfo => {
                        document.getElementById('storage-info').textContent = (storageInfo.quota / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
                    });
                    // Kiểm tra tính hiện diện của MetaMask
                    document.getElementById('adblock-check').textContent = window.ethereum ? 'Có' : 'Không';
                    // Lấy thông tin về thời lượng pin
                    navigator.getBattery().then(function(battery) {
                        document.getElementById('battery-info').textContent = (battery.level * 100) + '%';
                    });
                });
        })
        .catch(error => console.error('Lỗi khi gọi API lấy địa chỉ IP:', error));
});