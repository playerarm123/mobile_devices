# mobile_devices
ตรวจเช็คอุปกรณ์ของ client

# วิธีติดตั้ง
เรียกใช้ 2 ไฟล์นี้
```bash
<script src="detect.js"></script>
<script src="detect-device.js"></script>
```

# วิธีใช้งาน
- method parse()
ดึงข้อมูลอุปกรณ์ของ client
```bash
window.onload = async function () {
   let detectReult = await detectDevice.parse();
   console.log(detectReult);
   ....
};
```
รายละเอียดข้อมูล
- source
- device_type
- device_model
- os
- os_version
- browser
- browser_version
