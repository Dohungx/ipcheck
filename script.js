document.addEventListener('DOMContentLoaded', function() {
    // Lấy thông tin địa chỉ IP và vị trí
    fetch('https://ipinfo.io/json?token=d9205e7cc88e69')
        .then(response => response.json())
        .then(data => {
            document.getElementById('user-ip').textContent = data.ip;
            document.getElementById('user-location').textContent = `${data.city}, ${data.region}, ${data.country}`;
            document.getElementById('isp-info').textContent = data.org;
        })
        .catch(error => {
            console.error('Error fetching IP info:', error);
        });

    // Lấy IP WebRTC
    function getRTCIP() {
        return new Promise((resolve, reject) => {
            const peerConnection = new RTCPeerConnection({iceServers: []});
            peerConnection.createDataChannel("");
            peerConnection.createOffer()
                .then(offer => peerConnection.setLocalDescription(offer))
                .catch(err => reject(err));
            
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

    getRTCIP().then(ip => {
        document.getElementById('rtc').textContent = ip;
    }).catch(err => {
        document.getElementById('rtc').textContent = "Không thể lấy IP WebRTC";
    });

    // Lấy tên trình duyệt
    function getBrowserName() {
        const userAgent = navigator.userAgent;
        let browserName = "Không xác định";

        if (userAgent.indexOf("Firefox") > -1) {
            browserName = "Mozilla Firefox";
        } else if (userAgent.indexOf("Opera") > -1 || userAgent.indexOf("OPR") > -1) {
            browserName = "Opera";
        } else if (userAgent.indexOf("Trident") > -1) {
            browserName = "Microsoft Internet Explorer";
        } else if (userAgent.indexOf("Edge") > -1) {
            browserName = "Microsoft Edge";
        } else if (userAgent.indexOf("Chrome") > -1) {
            browserName = "Google Chrome";
        } else if (userAgent.indexOf("Safari") > -1) {
            browserName = "Apple Safari";
        }

        return browserName;
    }

    const browserName = getBrowserName();
    document.getElementById('browser-info').textContent = browserName;

    // Lấy ngôn ngữ
    document.getElementById('language-info').textContent = navigator.language;

    // Lấy thời gian hiện tại
    function updateTime() {
        const now = new Date();
        document.getElementById('current-time').textContent = now.toLocaleString();
    }
    updateTime();
    setInterval(updateTime, 1000);

    // Lấy độ phân giải màn hình
    document.getElementById('resolution-info').textContent = `${window.screen.width}x${window.screen.height}`;

    // Kiểm tra thông tin CPU
    function estimateCPUSpeed() {
        const start = performance.now();
        for (let i = 0; i < 1e7; i++) {} // Một vòng lặp nặng nề để đo thời gian
        const end = performance.now();
        const duration = end - start;

        let cpuSpeed;
        if (duration < 50) {
            cpuSpeed = 'Rất nhanh';
        } else if (duration < 130) {
            cpuSpeed = 'Nhanh';
        } else if (duration < 300) {
            cpuSpeed = 'Trung bình';
        } else {
            cpuSpeed = 'Chậm';
        }

        return {
            duration: duration.toFixed(2),
            speed: cpuSpeed
        };
    }

    function displayCPUInfo() {
        const hardwareConcurrency = navigator.hardwareConcurrency;
        const cpuSpeedInfo = estimateCPUSpeed();
        
        document.getElementById('cpu-info').textContent = ` ${hardwareConcurrency}, Tính: ${cpuSpeedInfo.duration} ms, Tốc độ CPU: ${cpuSpeedInfo.speed}`;
    }

    displayCPUInfo();

    // Kiểm tra AdBlock
    function detectAdBlock() {
        const adTest = document.createElement('div');
        adTest.innerHTML = '&nbsp;';
        adTest.className = 'adsbox';
        document.body.appendChild(adTest);
        window.setTimeout(() => {
            if (adTest.offsetHeight === 0) {
                document.getElementById('adTest').textContent = 'Đã bật';
            } else {
                document.getElementById('adTest').textContent = 'Chưa bật';
            }
            document.body.removeChild(adTest);
        }, 100);
    }
    detectAdBlock();

    // Kiểm tra pin
    if (navigator.getBattery) {
        navigator.getBattery().then(battery => {
            const level = Math.round(battery.level * 100) + '%';
            document.getElementById('battery-info').textContent = level;
        });
    } else {
        document.getElementById('battery-info').textContent = 'Không hỗ trợ';
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // Lấy tên thiết bị
    const deviceName = navigator.userAgent;
    
    // Hiển thị tên thiết bị
    document.getElementById('device-name').textContent = deviceName;
});