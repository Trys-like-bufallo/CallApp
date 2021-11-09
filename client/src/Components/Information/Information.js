import socket from '../../socket.js';
import getMac from 'getmac';

const Information = () => {

    const infor = {
        ip: 'unknow',
        OS: 'unknow',
        browser: 'unknow',
        MacAddress: 'unknow',
        internetSpeed: 'unknow',
    };

    useEffect(() => {
        axios.get('https://geolocation-db.com/json/')
        .then((res) => {
            // Get ip address
            const ip = res.data.IPv4;
            infor.ip = ip;
        })
        .then(() => {
            const OS = window.navigator.appVersion;
            infor.OS = OS;
        })
        .then(() => {
            const Browser = window.navigator.userAgent;
            infor.browser = Browser;
        })
        .then(() => {
            const mac = getMac();
            infor.MacAddress = mac;
        })
        .then(() => {

        })

    }, [])

    return (
        <div className = "Information">

        </div>
    )
}