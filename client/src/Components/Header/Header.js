import './Header.scss';
import {useSelector, useDispatch} from 'react-redux';



const Header = () => {

    const index = useSelector(state => state.index);
    const dispatch = useDispatch();

    return (
        <div className = "header">
            {!index ?
                <div className = "phone-call btn" onClick = {() => dispatch({type: 'show'})}>
                    Dial Pad
                </div>:
                <div className = "visitor-information btn" onClick = {() => dispatch({type: 'show'})}>
                    Visitor's information
                </div>
            }
        </div>
    )
}

export default Header;