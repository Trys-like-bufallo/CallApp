import './DiaPad.scss';
import {FaBackspace, FaPhoneAlt} from 'react-icons/fa';
import {useState, useRef, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import JsSIP from 'jssip';
import ua from '../../JsSIPConnect.js';
import axios from 'axios';
import host from '../../Host.js';


const DialPad = ({socket}) => {

    const [number, changeNumber] = useState('');
    const [session, setSession] = useState(undefined);
    const [incall, setIncall] = useState(false);
    const remoteAudio = useRef();

    useEffect(() => {
        socket.emit('send session', localStorage['session']);
    }, [])

    // auto trigger session
    const callStatus = useSelector(state => state.callStatus);
    const dispatch = useDispatch();
    // Register callbacks to desired call events
    var eventHandlers = {
        'progress': function(e) {
        //   console.log('Dang Goi');
            dispatch({type: 'calling'});
        },
        'failed': function(e) {
          // console.log(e);
          dispatch({type: 'failed'});
          setTimeout(() => {
              dispatch({type: 'disable'});
          }, 20000)
        },
        'ended': function(e) {
          // console.log(e);
            dispatch({type: 'ended'});
            setTimeout(() => {
                dispatch({type: 'disable'});
            }, 20000)
            setIncall(false);
        },
        'confirmed': function(e) {
        //   console.log('Dang Noi Chuyen');
            dispatch({type: 'callstart', payload: number});
        }
    };
    
    var options = {
        'eventHandlers'    : eventHandlers,
        'mediaConstraints' : { 'audio': true, 'video': false },
        'pcConfig': {
          'iceServers': [
            {'urls': 'stun:stun.l.google.com:19302'}
          ],
        }
    };
    
    ua.on('newRTCSession', (e) => {
    //   console.log('Dang Ket Noi!!!');
        dispatch({type: 'connect'});
        var session = e.session;
        setSession(session);
        session.on('confirmed', () => {
            // var localStream = session.connection.getLocalStreams()[0];
        });
        session.on('ended', () => {
        });
        session.on('failed', () => {
        });
        session.connection.addEventListener('addstream', function (e) {
            // set remote audio stream
            // remoteAudio.current.src = window.URL.createObjectURL(e.stream);
            // remoteAudio.current.play();
            const remoteAudio = document.createElement('audio');
            remoteAudio.srcObject = e.stream;
            remoteAudio.play();
            //console.log(e);
          });
    });
    const call = (phoneNumber) => {
        ua.call(phoneNumber, options);
    }
    const handleChange = (e) => {
        if(e == 'Escape')
        {
            session.terminate();
            setIncall(false);
            return;
        }
        if(e == "Backspace")
        {
            if(number.length > 0){
                const newNumber = number.substring(0, number.length-1);
                changeNumber(newNumber);
            }
            return;
        }
        if(e == "Enter")
        {
            if(number == '')
            {
                setTimeout(() => {
                    dispatch({type: 'disable'});
                }, 20000);
                dispatch({type: 'error'});
                return;
            }
            call(number);
            setIncall(true);
            return;
        }
        if((e < "0" || e > "9") && e != '*' && e != '#')
            return;
        changeNumber(number + e);
    }

    return (
        <div className = "dial-pad" >
            <div className="phonenumber">
                <input type="text" placeholder="Type phone number" className = "phonenumber-input" value = {number}
                onKeyDown = { (e) => handleChange(e.key) }/>
                <FaBackspace className="backspace" onClick = {() => handleChange('Backspace') }/>
            </div>
            <div className = "line"></div>
            <div className="call-status">
                {callStatus}
            </div>
            <div className = "grid-number">
                <div className="number" onClick = {() => handleChange('1')}>
                    1 
                </div>
                <div className="number" onClick = {() => handleChange('2')}>
                    2
                    <div className="text">ABC</div>
                </div>
                <div className="number" onClick = {() => handleChange('3')}>
                    3 
                    <div className="text">DEF</div>
                </div>
                <div className="number" onClick = {() => handleChange('4')}>
                    4 
                    <div className="text">GHI</div>
                </div>
                <div className="number" onClick = {() => handleChange('5')}>
                    5 
                    <div className="text">JKL</div>
                </div>
                <div className="number" onClick = {() => handleChange('6')}>
                    6 
                    <div className="text">MNO</div>
                </div>
                <div className="number"  onClick = {() => handleChange('7')}>
                    7 
                    <div className="text">PQRS</div>
                </div>
                <div className="number" onClick = {() => handleChange('8')}>
                    8 
                    <div className="text">TUV</div>
                </div>
                <div className="number" onClick = {() => handleChange('9')}>
                    9 
                    <div className="text">WXYZ</div>
                </div>
                <div className="number" onClick = {() => handleChange('*')}>
                    * 
                </div>
                <div className="number" onClick = {() => handleChange('0')}>
                    0 
                </div>
                <div className="number" onClick = {() => handleChange('#')}>
                    # 
                </div> 
            </div>
            {incall == false ?
                <div className="call-btn" onClick = {() => handleChange('Enter')}>
                    <FaPhoneAlt />
                </div>:
                <div className="off-btn" onClick = {() => handleChange('Escape')}>
                    <FaPhoneAlt />
                </div>
            }
            <audio ref = {remoteAudio} type = "audio"/>
        </div>
    )

}
export default DialPad;