// Hàm khởi tạo
function initialize() {
    displayIPInfo();
    displayDeviceInfo();
    checkVPNStatus();
    detectBrowser();
    displayNetworkInfo();
    displayLanguageInfo();
    displayOSInfo();
    displayScreenResolution();
    displayCPUInfo();
    displayRAMInfo();
    displayStorageInfo();
    displayNetworkSpeed();
    checkAdBlock();
    checkBattery();
    checkPhoneNumber();
}

// Gọi hàm khởi tạo khi trang được tải
window.onload = initialize;

// Hàm để lấy thông tin IP
async function getIPInfo() {
    try {
        const response = await fetch('https://ipinfo.io/json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Lỗi khi tải thông tin IP:', error);
    }
}

// Hàm để hiển thị thông tin ISP
async function displayIPInfo() {
    const ipInfo = await getIPInfo();
    document.getElementById('user-ip').innerText = ipInfo.ip;
    document.getElementById('user-location').innerText = ipInfo.city + ', ' + ipInfo.region + ', ' + ipInfo.country;
    document.getElementById('isp-info').innerText = ipInfo.org || "Không rõ";
}

// Hàm để kiểm tra và hiển thị tên thiết bị
function displayDeviceInfo() {
    const deviceName = navigator.userAgent;
    document.getElementById('device-name').innerText = ` ${deviceName}`;
}

// Hàm để kiểm tra trạng thái VPN
function checkVPNStatus() {
    const isVPN = /VPN|Proxy/i.test(navigator.userAgent);
    document.getElementById('vpn-status').innerText = isVPN ? 'Đang sử dụng VPN' : 'Không sử dụng VPN';
}

// Hàm để kiểm tra và hiển thị trình duyệt
function detectBrowser() {
    const userAgent = navigator.userAgent;
    let browserName = "Không rõ";

    if (userAgent.includes("Firefox")) {
        browserName = "Mozilla Firefox";
    } else if (userAgent.includes("Chrome")) {
        browserName = "Google Chrome";
    } else if (userAgent.includes("Safari")) {
        browserName = "Apple Safari";
    } else if (userAgent.includes("Edge")) {
        browserName = "Microsoft Edge";
    } else if (userAgent.includes("Opera") || userAgent.includes("OPR")) {
        browserName = "Opera";
    } else if (userAgent.includes("MSIE") || userAgent.includes("Trident/")) {
        browserName = "Internet Explorer";
    }

    document.getElementById("browser-info").innerText = ` ${browserName}.`;
}

// Hàm để kiểm tra và hiển thị tên mạng đang được kết nối
function displayNetworkInfo() {
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (connection) {
        const networkType = connection.type;
        const networkName = connection.effectiveType;

        let networkInfo = "Không thể xác định";
        if (networkName === 'wifi') {
            networkInfo = "Tên Mạng: Wi-Fi";
        } else if (networkName === 'cellular') {
            networkInfo = "Tên Mạng: Mạng Di Động";
        } else {
            networkInfo = "Tên Mạng: " + networkName;
        }
        document.getElementById("network-info").innerText = networkInfo;
    } else {
        document.getElementById("network-info").innerText = "Không thể xác định";
    }
}

// Hàm để kiểm tra và hiển thị tốc độ mạng
function displayNetworkSpeed() {
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (connection) {
        const networkSpeed = connection.downlink; // Lấy thông tin tốc độ mạng
        document.getElementById("network-speed").innerText = networkSpeed + " Mbps"; // Hiển thị thông tin tốc độ mạng
    } else {
        document.getElementById("network-speed").innerText = "Không thể xác định";
    }
}

// Hàm để cập nhật thời gian
function updateTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const currentTimeElement = document.getElementById('current-time');
    currentTimeElement.textContent = `Thời gian hiện tại: ${hours}:${minutes}:${seconds}`;
}

// Cập nhật thời gian mỗi giây
setInterval(updateTime, 1000);
updateTime();

// Hàm để kiểm tra và hiển thị ngôn ngữ
function displayLanguageInfo() {
    const userLanguage = navigator.language;
    document.getElementById("language-info").innerText = ` ${userLanguage}`;
}

// Hàm để kiểm tra và hiển thị thông tin hệ điều hành
function displayOSInfo() {
    const userAgent = navigator.userAgent;
    let osName = "Không rõ";

    if (userAgent.includes("Windows")) {
        osName = "Windows";
    } else if (userAgent.includes("Macintosh") || userAgent.includes("Mac OS")) {
        osName = "Mac OS";
    } else if (userAgent.includes("Linux")) {
        osName = "Linux";
    }

    document.getElementById("os-info").innerText = ` ${osName}`;
}

// Hàm để kiểm tra và hiển thị độ phân giải màn hình
function displayScreenResolution() {
    const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;
    document.getElementById("resolution-info").innerText = ` ${screenWidth}x${screenHeight}`;
}

// Hàm để kiểm tra và hiển thị thông tin CPU
function displayCPUInfo() {
    const cpuName = navigator.hardwareConcurrency || "Không rõ";
    document.getElementById("cpu-info").innerText = ` ${cpuName}`;
}

// Hàm để kiểm tra và hiển thị thông tin RAM
async function displayRAMInfo() {
    const memory = navigator.deviceMemory || "Unknown";
    document.getElementById("ram-info").innerText = ` ${memory} GB`;
}

// Hàm để kiểm tra và hiển thị thông tin dung lượng ổ đĩa
async function displayStorageInfo() {
    try {
        const storageInfo = await navigator.storage.estimate();
        const usage = storageInfo.usage || 0;
        const quota = storageInfo.quota || "Không rõ";
        document.getElementById("storage-info").innerText = ` ${usage} / ${quota} bytes`;
    } catch (error) {
        console.error('Lỗi khi tải thông tin về dung lượng ổ đĩa:',error);
    }
}

// Hàm kiểm tra và cập nhật trạng thái AdBlock
function checkAdBlock() {
    // Tạo một phần tử div có chứa quảng cáo kiểm tra
    const adElement = document.createElement('div');
    adElement.innerHTML = '&nbsp;';
    adElement.className = 'ad';
    adElement.style.width = '1px';
    adElement.style.height = '1px';
    adElement.style.position = 'absolute';
    adElement.style.top = '-10px';
    adElement.style.left = '-10px';

    // Thêm phần tử vào trang web
    document.body.appendChild(adElement);

    // Kiểm tra xem phần tử div có bị chặn bởi AdBlock hay không
    window.setTimeout(function () {
        if (adElement.offsetHeight === 0) {
            // Nếu chiều cao bằng 0, tức là bị chặn
            document.getElementById('adblock-check').innerText = 'Có';
        } else {
            // Nếu không, không bị chặn
            document.getElementById('adblock-check').innerText = 'Không';
        }

        // Loại bỏ phần tử kiểm tra khỏi trang web
        document.body.removeChild(adElement);
    }, 100);
}

// Hàm kiểm tra trạng thái pin
function checkBattery() {
    navigator.getBattery().then(function(battery) {
        function updateBatteryStatus() {
            document.getElementById('battery-info').textContent = battery.level * 100 + '%';
        }
        battery.addEventListener('chargingchange', updateBatteryStatus);
        battery.addEventListener('levelchange', updateBatteryStatus);
        updateBatteryStatus();
    });
}

// Hàm để kiểm tra số điện thoại
function checkPhoneNumber() {
    const userAgent = navigator.userAgent;
    const phoneNumberRegex = /\b\d{3}[-.]?\d{3}[-.]?\d{4}\b|\b\d{3}[.]\d{3}[.]\d{4}\b/; // Biểu thức chính quy để khớp với số điện thoại theo định dạng XXX-XXX-XXXX hoặc XXX.XXX.XXXX

    const phoneNumberFound = phoneNumberRegex.exec(userAgent);
    if (phoneNumberFound) {
        document.getElementById('phone-number-check').innerText = phoneNumberFound[0];
    } else {
        document.getElementById('phone-number-check').innerText = 'Không';
    }
}

// Gọi hàm kiểm tra số điện thoại khi trang được tải
checkPhoneNumber();
