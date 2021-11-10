import axios from 'axios';
import './Auth.scss';
import {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import host from '../../Host.js';
import {nowURL} from '../../Host.js';
import {useLocation} from 'react-router-dom';


const Auth = () => {

    const search = useLocation().search;
    const session = new URLSearchParams(search).get('session');
    const dispatch = useDispatch();

    useEffect(() => {
        if(!session){
            window.location.href = `http://localhost:3010?URL=${nowURL}`;
        }
        else {
            axios.get(`${host}/checksession?session=${session}`)
            .then(res => {
                if(res.data.status == 'session success'){
                    dispatch({type: 'login'});
                    dispatch({type: 'load'});
                }
                else{
                    alert('Login Failed');
                    window.location.reload;
                }
            })
        }
    }, [])
    
    return (
        <div className="auth">
            
        </div>
    )
}

export default Auth;