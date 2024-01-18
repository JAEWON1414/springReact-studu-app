
import React from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from 'styled-components';
import { UserBodyWrapper, Logo, UserContainerWrapper, UserContainer, UserForm , UserInput, UserButton} from './LoginPage';

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
        <UserBodyWrapper>
            <Logo onClick={()=>navigate('/')}>로고</Logo>
            <UserContainerWrapper>
                <UserContainer>
                    <UserForm onSubmit={onSubmitUserId}>
                        
                        <UserInput type="Text" placeholder='아이디를 입력하세요' value={userId} onChange={onChangeUserId} />
                        
                        <UserInput type="password" placeholder='비밀버호를 입력하세요' value={userPw} onChange={onChangeUserPw} />
                        <UserButton type="submit">회원가입</UserButton>
                    </UserForm>
                </UserContainer>
            </UserContainerWrapper>
            <div styled={{ height: "100px" }}></div>
        </UserBodyWrapper>
    )
}

export default SignUp;