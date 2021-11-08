import axios from 'axios';
import './Auth.scss';
import {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import host from '../../Host.js';


const Auth = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [passcode, setPasscode] = useState('');
    const [status, setStatus] = useState({status: '', email: '', session: ''});
    const [ip, setIp] = useState('');
    const load = useSelector(state => state.load);
    const dispatch = useDispatch();

    useEffect(() => {
        axios.get('https://geolocation-db.com/json/')
        .then((res) => {
            setIp(res.data.IPv4);
        })
        .then(() => {
            if(localStorage['session'])
            {
                axios.get(`${host}/checksession?session=${localStorage['session']}`)
                .then(res => {
                    setStatus(res.data);
                });
            }
        })
        .then(() => {
            dispatch({type: 'load'});
        })
    }, [])

    useEffect(() => {
        switch (status.status){
            case 'Login sucessfully':
                dispatch({type: 'login'});
                localStorage['session'] = status.session;
                break;
            case 'needEmail':
                break;
            case 'need2FA':
                axios.get(`${host}/GenPasscode?username=${username}&password=${password}&email=${status.email}`)
                break;
            case 'Wrong2FA':
                alert('Please enter correct passcode');
            case 'WrongAccount':
                alert('Please enter correct username or password');
        }
    }, [status])
    

    const handleLogin = () => {
        axios.get(`${host}/login?username=${username}&password=${password}&ip=${ip}`)
        .then(res => setStatus(res.data))
        .catch(err => console.log(err));
    };

    const handleSetEmail = () => {
        axios.post(`${host}/addemail`, {
            username: username, password: password, email: email, ip : ip,
        })
        .then(res => setStatus(res.data))
        .catch(err => console.log(err))
    }

    const handlePasscode = () => {
        axios.get(`${host}/certpasscode?username=${username}&password=${password}&passcode=${passcode}&ip=${ip}`)
        .then(res => {
            console.log(res.data);
            setStatus(res.data);
        })
    }

    if(!load)
    {
      return (
        <div>
          <h1>Loadding...</h1>
        </div>
      )
    }

    return (
        <div className = "login-page">
            <h1 className = "login-title">Login Page</h1>
            {(status.status === '' || status.status === 'WrongAccount') ? (
                <div className="login">
                    <input type="text" placeholder="Enter your username" className = "username" value = {username} 
                    onChange = {(e) => setUsername(e.target.value)}/>
                    <input type="text" placeholder="Enter your password" className = "password" value = {password}
                    onChange = {(e) => setPassword(e.target.value)}/>
                    <button className="login-btn" onClick = {handleLogin}>Login</button>
                </div>) : status.status === 'needEmail' ? (
                <div className="need-phone-number">
                    <input type="text" className = "phone-number" placeholder="We need email to send passcode"
                    onChange = {(e) => setEmail(e.target.value)} value = {email}/>
                    <button className = "add-phonenumber-btn" onClick = {handleSetEmail}>Add</button>
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