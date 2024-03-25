// Hàm tìm kiếm IP
async function searchIP() {
    const ipAddress = document.getElementById('search-ip').value;
    try {
        const response = await fetch(`https://ipinfo.io/${ipAddress}/json`);
        const ipInfo = await response.json();
        // Hiển thị thông tin liên quan đến địa chỉ IP
        displayIPInfo(ipInfo);
    } catch (error) {
        console.error('Lỗi khi tìm kiếm địa chỉ IP:', error);
        // Hiển thị thông báo lỗi nếu có lỗi xảy ra
        document.getElementById('ip-info').innerText = 'Không tìm thấy thông tin cho địa chỉ IP này.';
    }
}

// Hàm hiển thị thông tin liên quan đến địa chỉ IP
function displayIPInfo(ipInfo) {
    const ipInfoHTML = `
        <p>Địa chỉ IP: ${ipInfo.ip}</p>
        <p>Vị trí: ${ipInfo.city}, ${ipInfo.region}, ${ipInfo.country}</p>
        <p>Nhà cung cấp dịch vụ internet: ${ipInfo.org || 'Không rõ'}</p>
    `;
    // Hiển thị thông tin trong khu vực có id="ip-info"
    document.getElementById('ip-info').innerHTML = ipInfoHTML;
}
