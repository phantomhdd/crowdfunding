<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title></title>
</head>
<body>
    <h4>Hai, {{ $name }}</h4>
    <p>Berikut adalah kode verifikasi untuk akun anda dengan alamat email <b>{{ $email }}</b>:</p>
    <h2>{{ $kode_otp }}</h2>
    <br />
    <p>Jika anda tidak merasa melakukan aktifitas ini, harap abaikan email ini.</p>
    <br />
    <br />
    <p>Terima kasih,</p>
    <p><b>Admin</b></p>
</body>
</html>