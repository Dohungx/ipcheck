const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3000;

// Kết nối đến cơ sở dữ liệu SQLite
const db = new sqlite3.Database('data.db', (err) => {
    if (err) {
        console.error('Lỗi khi kết nối đến cơ sở dữ liệu:', err.message);
    } else {
        console.log('Đã kết nối đến cơ sở dữ liệu SQLite');
        createTable();
    }
});

// Tạo bảng trong cơ sở dữ liệu nếu chưa tồn tại
function createTable() {
    db.run("CREATE TABLE IF NOT EXISTS UserAccess (id INTEGER PRIMARY KEY AUTOINCREMENT, ip TEXT, location TEXT)", (err) => {
        if (err) {
            console.error('Lỗi khi tạo bảng:', err.message);
        } else {
            console.log('Đã tạo bảng UserAccess');
        }
    });
}

// Ghi thông tin địa chỉ IP và vị trí vào cơ sở dữ liệu khi người dùng truy cập vào trang web
app.use((req, res, next) => {
    const ip = req.ip;
    const ipInfoUrl = `https://ipinfo.io/${ip}/json`;
    fetch(ipInfoUrl)
        .then(response => response.json())
        .then(data => {
            const { city, region, country } = data;
            const location = `${city}, ${region}, ${country}`;
            db.run("INSERT INTO UserAccess (ip, location) VALUES (?, ?)", [ip, location], (err) => {
                if (err) {
                    console.error('Lỗi khi ghi thông tin vào cơ sở dữ liệu:', err.message);
                } else {
                    console.log('Đã ghi thông tin vào cơ sở dữ liệu');
                }
            });
        })
        .catch(error => {
            console.error('Lỗi khi lấy thông tin IP:', error.message);
        });
    next();
});

// Định nghĩa route cho root path "/"
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Định nghĩa route cho file style.css
app.get('/style.css', (req, res) => {
    res.sendFile(__dirname + '/style.css');
});


// Đường dẫn tới script.js và menu.js
app.get('/script.js', (req, res) => {
    res.sendFile(__dirname + '/script.js');
});

app.get('/menu.js', (req, res) => {
    res.sendFile(__dirname + '/menu.js');
});

// Khởi động máy chủ
app.listen(port, () => {
    console.log(`Máy chủ đang chạy tại http://localhost:${port}`);
});