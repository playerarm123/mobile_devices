/**
 * Detect-Andriod.js: User-Agent Parser
 *
 * @version 1.0.0
 * @author Anuwat Sukhsa
 *
 */

class DetectDevice {
    async findModel(model) {
        let deviceList = await (await fetch('js/detect/android_devices.json')).json();
        return deviceList.find(o => o.model === model);
    }
    isIpad(source){
        const regExp = /iPad/g;
        const matches = source.match(regExp);
        if(matches == null){
            return false;
        }
        return true;
    }
    async parse() {
        var ua = detect.parse(navigator.userAgent);
        var result = {
            source: ua.source,
            device_type: ua.device.type,
            device_model : '',
            os: ua.os.family,
            os_version: ua.os.version,
            browser: ua.browser.family,
            browser_version : ua.browser.version,
        }
        try {
            
            document.getElementById('source').innerHTML = result.source
            const regExp = /\(([^)]+)\)/g;
            const matches = [...ua.source.match(regExp)];
            var modelSource = matches[0].replace(/\(|\)/g,'');
            var modelExploded= modelSource.split(';');
            var modelName = 'not found';
            if(modelExploded.length > 0){
                modelName = modelExploded[modelExploded.length - 1].trim();
            }
            if (result.device_type == 'Mobile' && result.os == 'iOS') {
                result.device_model = modelExploded[0];
                if(this.isIpad(result.source)){
                    result.device_type ='iPad'
                }else{
                    result.device_type ='Mobile'
                }
            } else if (result.device_type == 'Mobile' && result.os == 'Android') {
                let modelInfo = await this.findModel(modelName);
                result.os_version = modelExploded[1];
                if(modelInfo){
                    result.device_model = modelInfo.brand+' '+modelInfo.marketing
                }else{
                    result.device_model = modelName;
                }
            }else if(result.device_type == 'Desktop' && ua.device.manufacturer == 'Apple'){
                result.device_model = 'MacBook';
            }
            this.showDetail(result);
        } catch (e) {
            console.log(e.message);
                console.log(e.stack);
                const [, lineno, colno] = e.stack.match(/(\d+):(\d+)/);
                console.log('Line:', lineno);
                console.log('Column:', colno);
                document.getElementById('showError').innerHTML = e +'Line : '+lineno;
        }
    }
    async showDetail(result){
        document.getElementById('source').innerHTML = result.source
        document.getElementById('device_type').innerHTML = result.device_type
        document.getElementById('device_model').innerHTML = result.device_model
        document.getElementById('os').innerHTML = result.os+` (${result.os_version})`;
        document.getElementById('browser').innerHTML = result.browser+` (${result.browser_version})`;
    }
}
const detectDevice = new DetectDevice();
