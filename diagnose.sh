#!/bin/bash
echo "--- 1. real server IP ---"
curl -4 -s ifconfig.me
echo
echo
echo "--- 2. deployed file check ---"
ls -la /www/wwwroot/codelaksh.in/send-contact.php
echo
head -10 /www/wwwroot/codelaksh.in/send-contact.php
echo
echo "--- 3. local test, bypassing any CDN in front ---"
curl -s -w "\nSTATUS:%{http_code}\n" -X POST http://127.0.0.1/send-contact.php \
  -H "Host: codelaksh.in" -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","phone":"1234567890","service":"Web","message":"local test"}'
echo
echo "--- 4. outbound connectivity to MSG91 ---"
curl -v --max-time 10 https://control.msg91.com/api/v5/email/send 2>&1 | tail -20
echo
echo "--- 5. php-fpm error log ---"
tail -50 /www/server/php/84/var/log/php-fpm.log
