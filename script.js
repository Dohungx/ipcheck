window.addEventListener('load', function() {
    // Lấy địa chỉ IP của người dùng
    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            document.getElementById('user-ip').innerText = data.ip;
        })
        .catch(error => console.error('Error fetching IP address:', error));
    
    // Lấy thông tin vị trí của người dùng dựa trên địa chỉ IP
    fetch('https://ipapi.co/json/')
        .then(response => response.json())
        .then(data => {
            document.getElementById('user-location').innerText = `${data.city}, ${data.region}, ${data.country_name}`;
            document.getElementById('isp-info').innerText = data.org;
            document.getElementById('device-name').innerText = navigator.platform;
            document.getElementById('browser-info').innerText = navigator.userAgent;
            document.getElementById('language-info').innerText = navigator.language;
            document.getElementById('os-info').innerText = `${navigator.platform}, ${navigator.userAgent}`;
            document.getElementById('resolution-info').innerText = `${screen.width}x${screen.height}`;
            document.getElementById('cpu-info').innerText = navigator.hardwareConcurrency ? navigator.hardwareConcurrency : "N/A";
            document.getElementById('battery-info').innerText = navigator.getBattery ? "Supported" : "Not Supported";
            document.getElementById('vpn-status').innerText = data.is_proxy ? "Đang sử dụng VPN" : "Không sử dụng VPN";
        })
        .catch(error => console.error('Error fetching user location:', error));

    // Hiển thị thời gian hiện tại
    var currentTime = new Date();
    document.getElementById('current-time').innerText = 'Thời gian hiện tại: ' + currentTime.toLocaleString();
});