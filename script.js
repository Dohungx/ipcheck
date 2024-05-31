document.addEventListener('DOMContentLoaded', async function() {
  // Hàm lấy địa chỉ IP và thông tin vị trí
  async function getIPInfo() {
    try {
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      document.getElementById('user-ip').textContent = data.ip;
      document.getElementById('user-location').textContent = `${data.city}, ${data.region}, ${data.country_name}`;
      document.getElementById('isp-info').textContent = data.org;
    } catch (error) {
      console.error('Error fetching IP info:', error);
    }
  }

  // Hàm lấy thông tin WebRTC
  async function getRTCInfo() {
    try {
      const rtcConnection = new RTCPeerConnection();
      rtcConnection.createDataChannel('');
      const offer = await rtcConnection.createOffer();
      await rtcConnection.setLocalDescription(offer);

      const waitForICEGathering = new Promise((resolve) => {
        rtcConnection.onicecandidate = (event) => {
          if (event.candidate === null) {
            resolve();
          }
        };
      });

      await waitForICEGathering;
      const sdp = rtcConnection.localDescription.sdp;
      const rtcIP = sdp.match(/candidate.* ([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}) /);
      document.getElementById('rtc').textContent = rtcIP ? rtcIP[1] : 'Không thể lấy thông tin WebRTC';
    } catch (error) {
      console.error('Error fetching WebRTC info:', error);
    }
  }

  // Lấy tên thiết bị
  function getDeviceName() {
    const userAgent = navigator.userAgent;
    let deviceName = 'Không xác định';
    if (/android/i.test(userAgent)) {
      deviceName = 'Thiết bị Android';
    } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      deviceName = 'Thiết bị iOS';
    } else if (/Mac/i.test(userAgent)) {
      deviceName = 'Máy tính Mac';
    } else if (/Windows/i.test(userAgent)) {
      deviceName = 'Máy tính Windows';
    }
    document.getElementById('device-name').textContent = deviceName;
  }

  // Lấy trạng thái VPN
  async function checkVPNStatus() {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      // Đây là ví dụ đơn giản để xác định VPN. Bạn có thể cần các dịch vụ chuyên biệt hơn.
      const isVPN = data.ip === '8.8.8.8'; // Thay thế bằng địa chỉ IP VPN của bạn để kiểm tra.
      document.getElementById('vpn-status').textContent = isVPN ? 'Đang sử dụng VPN' : 'Không sử dụng VPN';
    } catch (error) {
      console.error('Error checking VPN status:', error);
    }
  }

  // Lấy thông tin trình duyệt
  function getBrowserInfo() {
    const userAgent = navigator.userAgent;
    let browserName = 'Không xác định';
    if (userAgent.indexOf('Firefox') > -1) {
      browserName = 'Mozilla Firefox';
    } else if (userAgent.indexOf('SamsungBrowser') > -1) {
      browserName = 'Samsung Internet';
    } else if (userAgent.indexOf('Opera') > -1 || userAgent.indexOf('OPR') > -1) {
      browserName = 'Opera';
    } else if (userAgent.indexOf('Trident') > -1) {
      browserName = 'Internet Explorer';
    } else if (userAgent.indexOf('Edge') > -1) {
      browserName = 'Microsoft Edge';
    } else if (userAgent.indexOf('Chrome') > -1) {
      browserName = 'Google Chrome';
    } else if (userAgent.indexOf('Safari') > -1) {
      browserName = 'Safari';
    }
    document.getElementById('browser-info').textContent = browserName;
  }

  // Hiển thị thời gian hiện tại
  function displayCurrentTime() {
    const currentTime = new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });
    document.getElementById('current-time').textContent = `Thời gian hiện tại: ${currentTime}`;
  }

  // Lấy thông tin ngôn ngữ
  function getLanguageInfo() {
    const language = navigator.language || navigator.userLanguage;
    document.getElementById('language-info').textContent = language;
  }

  // Lấy thông tin hệ điều hành
  function getOSInfo() {
    const userAgent = navigator.userAgent;
    let os = 'Không xác định';
    if (/Windows NT 10.0/.test(userAgent)) {
      os = 'Windows 10';
    } else if (/Windows NT 6.2/.test(userAgent)) {
      os = 'Windows 8';
    } else if (/Windows NT 6.1/.test(userAgent)) {
      os = 'Windows 7';
    } else if (/Windows NT 6.0/.test(userAgent)) {
      os = 'Windows Vista';
    } else if (/Windows NT 5.1/.test(userAgent)) {
      os = 'Windows XP';
    } else if (/Mac OS X/.test(userAgent)) {
      os = 'Mac OS X';
    } else if (/Android/.test(userAgent)) {
      os = 'Android';
    } else if (/iOS|iPhone|iPad|iPod/.test(userAgent)) {
      os = 'iOS';
    }
    document.getElementById('os-info').textContent = os;
  }

  // Lấy độ phân giải màn hình
  function getScreenResolution() {
    const width = window.screen.width;
    const height = window.screen.height;
    document.getElementById('resolution-info').textContent = `${width} x ${height}`;
  }

  // Lấy thông tin AdBlock
  function checkAdBlock() {
    const adTest = document.createElement('div');
    adTest.innerHTML = '&nbsp;';
    adTest.className = 'adsbox';
    document.body.appendChild(adTest);
    window.setTimeout(() => {
      if (adTest.offsetHeight === 0) {
        document.getElementById('adTest').textContent = 'Đã bật AdBlock';
      } else {
        document.getElementById('adTest').textContent = 'Chưa bật AdBlock';
      }
      adTest.remove();
    }, 100);
  }

  // Lấy thông tin pin
  async function getBatteryInfo() {
    try {
      const battery = await navigator.getBattery();
      const level = Math.round(battery.level * 100) + '%';
      document.getElementById('battery-info').textContent = `Mức pin: ${level}, Sạc: ${battery.charging ? 'Có' : 'Không'}`;
    } catch (error) {
      console.error('Error fetching battery info:', error);
    }
  }
  
  getCPUInfo();
  getNetworkSpeed();

  // Gọi các hàm khi trang đã tải
  getIPInfo();
  getRTCInfo();
  getDeviceName();
  checkVPNStatus();
  getBrowserInfo();
  displayCurrentTime();
  getLanguageInfo();
  getOSInfo();
  getScreenResolution();
  checkAdBlock();
  getBatteryInfo();
  getCPUInfo();
  getNetworkSpeed();

  // Cập nhật thời gian mỗi giây
  setInterval(displayCurrentTime, 1000);
});