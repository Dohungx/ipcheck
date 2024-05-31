document.addEventListener('DOMContentLoaded', function() {
    // Lấy địa chỉ IP và thông tin vị trí
    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            document.getElementById('user-ip').textContent = data.ip;
            return fetch(`https://ipapi.co/${data.ip}/json/`);
        })
        .then(response => response.json())
        .then(data => {
            document.getElementById('user-location').textContent = `${data.city}, ${data.region}, ${data.country_name}`;
            document.getElementById('isp-info').textContent = data.org;
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

    // Lấy tên thiết bị, trình duyệt, hệ điều hành
    document.getElementById('device-name').textContent = navigator.userAgent;
    document.getElementById('browser-info').textContent = navigator.appName;
    document.getElementById('os-info').textContent = navigator.platform;

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


//kiểm tra CPU
document.addEventListener('DOMContentLoaded', function() {

    // Kiểm tra thông tin CPU
    function estimateCPU() {
        const start = performance.now();
        for (let i = 0; i < 1e7; i++) {} // Một vòng lặp nặng nề để đo thời gian
        const end = performance.now();
        const duration = end - start;

        let cpuSpeed;
        if (duration < 100) {
            cpuSpeed = 'Rất nhanh';
        } else if (duration < 200) {
            cpuSpeed = 'Nhanh';
        } else if (duration < 500) {
            cpuSpeed = 'Trung bình';
        } else {
            cpuSpeed = 'Chậm';
        }

        document.getElementById('cpu-info').textContent = `Thời gian tính toán: ${duration.toFixed(2)} ms, Tốc độ CPU: ${cpuSpeed}`;
    }

    estimateCPU();
});


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