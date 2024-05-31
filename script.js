document.addEventListener("DOMContentLoaded", function () {
  // Lấy địa chỉ IP của người dùng
  fetch('https://api.ipify.org?format=json')
    .then(response => response.json())
    .then(data => {
      document.getElementById('user-ip').textContent = data.ip;
    });

  // Lấy thông tin trình duyệt và hệ điều hành
  const userAgent = navigator.userAgent;
  document.getElementById('browser-info').textContent = userAgent;

  // Lấy thông tin hệ điều hành
  const os = navigator.platform;
  document.getElementById('os-info').textContent = os;

  // Lấy độ phân giải màn hình
  const resolution = `${window.screen.width} x ${window.screen.height}`;
  document.getElementById('resolution-info').textContent = resolution;

  // Lấy thông tin ngôn ngữ
  const language = navigator.language;
  document.getElementById('language-info').textContent = language;

  // Lấy tên thiết bị (giới hạn)
  const deviceName = navigator.userAgentData ? navigator.userAgentData.brands.map(b => b.brand).join(', ') : navigator.userAgent;
  document.getElementById('device-name').textContent = deviceName;

  // Kiểm tra trạng thái VPN (giả định, do không có cách chính xác để kiểm tra)
  document.getElementById('vpn-status').textContent = "Không xác định";

  // Kiểm tra WebRTC
  if (window.RTCPeerConnection) {
    const rtc = new RTCPeerConnection({ iceServers: [] });
    rtc.createDataChannel('', { reliable: false });
    rtc.onicecandidate = function (evt) {
      if (evt.candidate) {
        const rtcInfo = evt.candidate.candidate;
        document.getElementById('rtc').textContent = rtcInfo;
      }
    };
    rtc.createOffer().then(offer => rtc.setLocalDescription(offer));
  } else {
    document.getElementById('rtc').textContent = "Không hỗ trợ WebRTC";
  }

  // Lấy thời gian hiện tại
  function updateTime() {
    const now = new Date();
    document.getElementById('current-time').textContent = now.toLocaleString();
  }
  setInterval(updateTime, 1000);

  // Lấy thông tin nhà cung cấp Internet (ISP)
  fetch('https://ipapi.co/json/')
    .then(response => response.json())
    .then(data => {
      document.getElementById('user-location').textContent = `${data.city}, ${data.region}, ${data.country_name}`;
      document.getElementById('isp-info').textContent = data.org;
    });

  // Lấy thông tin pin
  if (navigator.getBattery) {
    navigator.getBattery().then(function (battery) {
      const level = battery.level * 100;
      document.getElementById('battery-info').textContent = `${level}% ${battery.charging ? ' (Đang sạc)' : ''}`;
    });
  } else {
    document.getElementById('battery-info').textContent = "Không hỗ trợ";
  }

  // Kiểm tra AdBlock
  function detectAdBlock() {
    const adBlockEnabled = !document.getElementById('ad-test').offsetHeight;
    document.getElementById('adTest').textContent = adBlockEnabled ? "Đang bật" : "Không bật";
  }
  detectAdBlock();
});

// Phần tử giả để kiểm tra AdBlock
const adTest = document.createElement('div');
adTest.id = 'ad-test';
adTest.style.display = 'none';
document.body.appendChild(adTest);