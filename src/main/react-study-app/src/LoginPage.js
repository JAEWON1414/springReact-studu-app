import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
function LoginPage() {
    const navigate = useNavigate();
    const [userId, setUserId] = React.useState("");
        const [userPw, setUserPw] = React.useState("");
        const onChangeUserId = (event) => {
            setUserId(event.target.value);
        }
        const onChangeUserPw = (event) => {
            setUserPw(event.target.value);
        }

    const onSubmitUserId = (event) => {
        event.preventDefault();
            console.log("실행!()");
            axios
                .post('/api/users/login',{
                    userId:userId,
                    userPw:userPw
                })
                .then((res)=>{
                    if (res.data)
                        navigate('/MainPage', {state: userId});
                    else{

                        navigate('/');
                        alert("잘못된 로그인입니다");
                    }

                })
        }
    return (
        <div>

            <form onSubmit={onSubmitUserId}>
                <input id="userId" name="userId" value={userId}
                    type="Text" onChange={onChangeUserId} placeholder="Write userId"/>
                <input id="userPw" name="userPw" value={userPw}
                    type="Password" placeholder="Write Password" onChange={onChangeUserPw}/>
                <button type="submit">로그인</button>
            </form >
            <h3><Link to={`/MainPage`}>Login</Link></h3>
            <h3><Link to={`/SignUp`}>SignUp</Link></h3>
        </div>

    );
}

export default LoginPage;