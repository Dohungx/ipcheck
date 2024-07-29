document.addEventListener('DOMContentLoaded', function() {
  // Lấy địa chỉ IP và thông tin vị trí
  fetch('https://ipinfo.io/json?token=d9205e7cc88e69')
      .then(response => response.json())
      .then(data => {
          document.getElementById('user-ip').textContent = data.ip;
          document.getElementById('user-location').textContent = `${data.city}, ${data.region}, ${data.country}`;
          document.getElementById('isp-info').textContent = data.org;
      })
      .catch(err => console.error('Lỗi khi lấy thông tin IP:', err));

  // Lấy IP WebRTC
  function getRTCIP() {
      return new Promise((resolve, reject) => {
          const peerConnection = new RTCPeerConnection({ iceServers: [] });
          peerConnection.createDataChannel("");
          peerConnection.createOffer()
              .then(offer => peerConnection.setLocalDescription(offer))
              .catch(reject);

          peerConnection.onicecandidate = event => {
              if (event && event.candidate && event.candidate.candidate) {
                  const candidate = event.candidate.candidate;
                  const ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3})/;
                  const ipMatch = candidate.match(ipRegex);
                  if (ipMatch) resolve(ipMatch[1]);
              }
          };
      });
  }

  getRTCIP()
      .then(ip => document.getElementById('rtc').textContent = ip)
      .catch(() => document.getElementById('rtc').textContent = "Không thể lấy IP WebRTC");

  // Lấy tên trình duyệt
  function getBrowserName() {
      const userAgent = navigator.userAgent;
      let browserName = "Không xác định";

      if (userAgent.includes("Firefox")) browserName = "Mozilla Firefox";
      else if (userAgent.includes("Opera") || userAgent.includes("OPR")) browserName = "Opera";
      else if (userAgent.includes("Trident")) browserName = "Microsoft Internet Explorer";
      else if (userAgent.includes("Edge")) browserName = "Microsoft Edge";
      else if (userAgent.includes("Chrome")) browserName = "Google Chrome";
      else if (userAgent.includes("Safari")) browserName = "Apple Safari";

      return browserName;
  }

  document.getElementById('browser-info').textContent = getBrowserName();
  document.getElementById('language-info').textContent = navigator.language;
  document.getElementById('current-time').textContent = new Date().toLocaleString();

  // Cập nhật thời gian mỗi giây
  setInterval(() => {
      document.getElementById('current-time').textContent = new Date().toLocaleString();
  }, 1000);

  // Lấy độ phân giải màn hình
  document.getElementById('resolution-info').textContent = `${window.screen.width}x${window.screen.height}`;

  // Ước lượng tốc độ CPU
  function estimateCPUSpeed() {
      const start = performance.now();
      for (let i = 0; i < 1e7; i++) {} // Vòng lặp nặng để đo thời gian
      const end = performance.now();
      const duration = end - start;

      let cpuSpeed;
      if (duration < 30) cpuSpeed = 'Rất nhanh';
      else if (duration < 52) cpuSpeed = 'Nhanh';
      else if (duration < 120) cpuSpeed = 'Trung bình';
      else cpuSpeed = 'Chậm';

      return { duration: duration.toFixed(2), speed: cpuSpeed };
  }

  function displayCPUInfo() {
      const hardwareConcurrency = navigator.hardwareConcurrency;
      const cpuSpeedInfo = estimateCPUSpeed();

      document.getElementById('cpu-info').textContent = `${hardwareConcurrency} lõi, Thời gian: ${cpuSpeedInfo.duration} ms, Tốc độ CPU: ${cpuSpeedInfo.speed}`;
  }

  // Cập nhật thông tin CPU mỗi 2 giây
  displayCPUInfo();
  setInterval(displayCPUInfo, 2000);

  // Kiểm tra AdBlock
  function detectAdBlock() {
      const adTest = document.createElement('div');
      adTest.innerHTML = '&nbsp;';
      adTest.className = 'adsbox';
      document.body.appendChild(adTest);
      setTimeout(() => {
          document.getElementById('adTest').textContent = adTest.offsetHeight === 0 ? 'Đã bật' : 'Chưa bật';
          document.body.removeChild(adTest);
      }, 100);
  }
  detectAdBlock();

  // Lấy thông tin pin
  if (navigator.getBattery) {
      navigator.getBattery().then(battery => {
          document.getElementById('battery-info').textContent = Math.round(battery.level * 100) + '%';
      });
  } else {
      document.getElementById('battery-info').textContent = 'Không hỗ trợ';
  }

  // Lấy thông tin hệ điều hành
  function getOSInfo() {
      const userAgent = navigator.userAgent;
      let osInfo = "Không xác định";

      if (userAgent.includes("Win")) osInfo = "Windows";
      else if (userAgent.includes("Mac")) osInfo = "MacOS";
      else if (userAgent.includes("Linux")) osInfo = "Linux";
      else if (userAgent.includes("Android")) osInfo = "Android";
      else if (userAgent.includes("like Mac")) osInfo = "iOS";

      return osInfo;
  }

  document.getElementById('os-info').textContent = getOSInfo();

  // Kiểm tra trạng thái VPN
  function checkVPNStatus() {
      const vpnDetect = (navigator.connection && navigator.connection.type === 'vpn') ? 'Bật' : 'Chưa bật';
      document.getElementById('vpn-status').textContent = vpnDetect;
  }
  checkVPNStatus();

  // Lấy tên thiết bị
  document.getElementById('device-name').textContent = navigator.userAgent;


});

// Xử lý tương tác với modal
document.getElementById('continueBtn').addEventListener('click', function() {
  document.getElementById('myModal').style.display = 'none';
  document.getElementById('part2').style.display = 'block';
  localStorage.setItem('hasAccepted', 'true'); // Ghi nhớ lựa chọn của người dùng
});

document.getElementById('declineBtn').addEventListener('click', function() {
  document.getElementById('myModal').style.display = 'none';
  document.getElementById('part3').style.display = 'block';
  setTimeout(() => {
      window.location.href = 'https://www.google.com'; // Chuyển hướng nếu từ chối
  }, 2000);
});

// Kiểm tra lựa chọn của người dùng
if (localStorage.getItem('hasAccepted') === 'true') {
  document.getElementById('myModal').style.display = 'none';
  document.getElementById('part2').style.display = 'block';
}
