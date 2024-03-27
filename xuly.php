<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Lấy dữ liệu từ biểu mẫu
    $email = $_POST['email'];
    $message = $_POST['message'];

    // Địa chỉ email của bạn
    $to = "dohungx307209@gmail.com";

    // Chủ đề email
    $subject = "Tin nhắn từ biểu mẫu liên hệ";

    // Nội dung email
    $body = "Email: $email\n\nNội dung:\n$message";

    // Gửi email
    if (mail($to, $subject, $body)) {
        echo "Cảm ơn bạn đã liên hệ với chúng tôi. Chúng tôi sẽ phản hồi bạn sớm nhất có thể!";
    } else {
        echo "Có lỗi xảy ra khi gửi email. Vui lòng thử lại sau!";
    }
} else {
    // Nếu không phải là phương thức POST, chuyển hướng người dùng đến trang liên hệ
    header("Location: contact.html");
}
?>