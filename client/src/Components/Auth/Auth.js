import axios from 'axios';
import './Auth.scss';
import {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import host from '../../Host.js';
import ua from '../../JsSIPConnect.js';

const Auth = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [passcode, setPasscode] = useState('');
    const [status, setStatus] = useState({status:'', phoneNumber: ''});
    const [ip, setIp] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        axios.get('https://geolocation-db.com/json/')
        .then((res) => {
            setIp(res.data.IPv4);
        })  
    }, [])

    useEffect(() => {
        switch (status.status){
            case 'Login sucessfully':
                dispatch({type: 'login'});
                break;
            case 'needPhoneNumber':
                break;
            case 'need2FA':
                setPhoneNumber(status.phoneNumber);
                console.log(status.phoneNumber);
                axios.get(`${host}/genpasscode?username=${username}&password=${password}`)
                .then((res) => {
                    ua.sendMessage(status.phoneNumber,res.data, {
                        'succeeded': function(e){ console.log('send') },
                        'failed':    function(e){ console.log('error') }
                    })
                })
                break;
        }
    }, [status])
    

    const handleLogin = () => {
        axios.get(`${host}/login?username=${username}&password=${password}&ip=${ip}`)
        .then(res => setStatus(res.data))
        .catch(err => console.log(err));
    };

    const handleSetPhoneNumber = () => {
        axios.post(`${host}/addphonenumber`, {
            username: username, password: password, phoneNumber: phoneNumber, ip : ip,
        })
        .then(res => setStatus(res.data))
        .catch(err => console.log(err))
    }

    const handlePasscode = () => {
        axios.get(`${host}/certpasscode?username=${username}&password=${password}&passcode=${passcode}`)
        .then(res => {
            console.log(res.data);
        })
    }


    return (
        <div className = "login-page">
            <h1 className = "login-title">Login Page</h1>
            {status.status === '' ? (
                <div className="login">
                    <input type="text" placeholder="Enter your username" className = "username" value = {username} 
                    onChange = {(e) => setUsername(e.target.value)}/>
                    <input type="text" placeholder="Enter your password" className = "password" value = {password}
                    onChange = {(e) => setPassword(e.target.value)}/>
                    <button className="login-btn" onClick = {handleLogin}>Login</button>
                </div>) : status.status === 'needPhoneNumber' ? (
                <div className="need-phone-number">
                    <input type="text" className = "phone-number" placeholder="We need phone number to send passcode"
                    onChange = {(e) => setPhoneNumber(e.target.value)} value = {phoneNumber}/>
                    <button className = "add-phonenumber-btn" onClick = {handleSetPhoneNumber}>Add</button>
                </div>
                ):(
                    <div className = "need2FA">
                        <input type="text" className = "passcode" placeholder="Enter passcode have been send"
                        onChange = {(e) => setPasscode(e.target.value)} value = {passcode}/>
                        <button className = "cer-passcode" onClick = {handlePasscode}>Sent</button>
                    </div>
                )
            }
        </div>
    )
}

export default Auth;