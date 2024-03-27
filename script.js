// Hàm để lấy thông tin IP
async function getIPInfo() {
    try {
        const response = await fetch('https://ipinfo.io/json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Lỗi khi tải thông tin IP:', error);
        throw error; // Ném lỗi để xử lý ở mức độ cao hơn
    }
}

// Hàm để hiển thị thông tin IP
async function displayIPInfo() {
    try {
        const ipInfo = await getIPInfo();
        document.getElementById('user-ip').innerText = ipInfo.ip;
        document.getElementById('user-location').innerText = `${ipInfo.city}, ${ipInfo.region}, ${ipInfo.country}`;
        document.getElementById('isp-info').innerText = ipInfo.org || "Không rõ";
    } catch (error) {
        console.error('Lỗi khi hiển thị thông tin IP:', error);
    }
}

// Hàm để hiển thị thông tin thiết bị
function displayDeviceInfo() {
    const deviceName = navigator.userAgent;
    document.getElementById('device-name').innerText = deviceName;
}

// Hàm để kiểm tra và hiển thị trạng thái VPN
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

    document.getElementById("browser-info").innerText = browserName;
}

// Hàm để kiểm tra và hiển thị thông tin mạng
function displayNetworkInfo() {
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (connection) {
        const networkType = connection.type;
        const networkName = connection.effectiveType;

        let networkInfo = "Không thể xác định";
        if (networkName === 'wifi') {
            networkInfo = "Wi-Fi";
        } else if (networkName === 'cellular') {
            networkInfo = "Mạng Di Động";
        } else {
            networkInfo = networkName;
        }
        document.getElementById("network-info").innerText = "Tên Mạng: " + networkInfo;
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

// Gọi các hàm để hiển thị thông tin khi trang được tải
async function displayAllInfo() {
    displayDeviceInfo();
    await displayIPInfo();
    checkVPNStatus();
    detectBrowser();
    displayNetworkInfo();
    displayNetworkSpeed();
}

// Gọi hàm để hiển thị tất cả thông tin khi trang được tải
displayAllInfo();