
import React from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
function SignUp() {
    const navigate = useNavigate();
    const [userId, setUserId] = React.useState("");
    const [userPw, setUserPw] = React.useState("");
    const onChangeUserId = (event) => { setUserId(event.target.value); }
    const onChangeUserPw = (event) => { setUserPw(event.target.value); }
    const onSubmitUserId = (event) => {
        event.preventDefault();
        axios.post('/api/users', {
            userId: userId,
            userPw: userPw
        }).then((res) => {
            if (res.data) {
                navigate('/');
                alert("회원가입이 완료되었습니다")
            }
            else {
                navigate('/SignUp');
                alert("잘못된 아이디입니다");
            }
        })
    }
    return (
        <div>
            <form onSubmit={onSubmitUserId}>
                <label>아이디</label>
                <input type="Text" placeholder='아이디를 입력하세요' value={userId} onChange={onChangeUserId} />
                <label>비밀번호</label>
                <input type="password" placeholder='비밀버호를 입력하세요' value={userPw} onChange={onChangeUserPw} />
                <button type="submit">회원가입</button>
            </form>
        </div>
    )
}

export default SignUp;