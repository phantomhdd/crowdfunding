<!DOCTYPE html>
<html>
<head>
    <style media="all" type="text/css">
        #yiv8849059339 td, #yiv8849059339 p, #yiv8849059339 h1, #yiv8849059339 h3, #yiv8849059339 a {font-family:Helvetica, Arial, sans-serif;}
    </style>
</head>
<body>
    <div>
        <table style="width:538px;background-color:#393836;" align="center" cellspacing="0" cellpadding="0">
            <tr>
                <td style="min-height:65px;background-color:#000000;border-bottom:1px solid #4d4b48;text-align:center;padding:1em;">
                    {{-- <img src="https://sanbercode.com/assets/img/identity/logo-horizontal.svg" width="538" height="65" alt="Sanbercode"> --}}
                    <span style="font-size:2em;color:#8acef5;font-family:Arial, Helvetica, sans-serif;font-weight:bold;">CrowdFunding&trade;</span>
                </td>
            </tr>
            <tr>
                <td bgcolor="#17212e">
                    <table width="470" border="0" align="center" cellpadding="0" cellspacing="0" style="padding-left:5px;padding-right:5px;padding-bottom:10px;">
                        <tr bgcolor="#17212e">
                            <td style="padding-top:32px;">
                            <span style="padding-top:16px;padding-bottom:16px;font-size:24px;color:#66c0f4;font-family:Arial, Helvetica, sans-serif;font-weight:bold;">
                                Dear {{ $name }},
                            </span><br>
                            </td>
                        </tr>
                        
                        <tr>
                            <td style="padding-top:12px;">
                            <span style="font-size:17px;color:#c6d4df;font-family:Arial, Helvetica, sans-serif;font-weight:bold;">
                                <p>Berikut adalah kode verifikasi untuk akun anda dengan alamat email: <span style="color:#FFFFFF;font-weight:bold;">{{ $email }}</span></p>
                            </span>
                            </td>
                        </tr>
                        
                        <tr>
                            <td>
                                <div>
                                    <span style="font-size:24px;color:#66c0f4;font-family:Arial, Helvetica, sans-serif;font-weight:bold;">
                                        {{ $kode_otp }}
                                    </span>
                                </div>
                            </td>
                        </tr>
                        
                        <tr>
                            <td style="padding:10px;font-size:12px;line-height:17px;color:#c6d4df;font-family:Arial, Helvetica, sans-serif;">
                                    <p style="color:#61696d;">
                                        Jika anda tidak merasa melakukan aktifitas ini, harap <span style="color:#98adbd;font-weight:bold;">abaikan email ini</span>.
                                    </p>
                            </td>
                        </tr>
                        
                        <tr>
                            <td style="font-size:12px;color:#6d7880;padding-top:16px;padding-bottom:60px;">
                                Terima kasih,<br>
                                <span style="color:#98adbd;font-weight:bold;">Admin</span>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </div>
</body>
</html>