import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from 'styled-components';

export const UserBodyWrapper = styled.div`
    display:flex;
    justify-content:space-around;
    flex-direction:column;
    background-color: rgb(240,239,255);
    height: 100vh;
`;

export const Logo = styled.button`
    display:flex;
    justify-content:center;
    flex-direction:row;
    font-size:30px;
    background-color:inherit;
    border:hidden;
`;

export const UserContainerWrapper = styled.div`
    display:flex;
    justify-content:center;
    flex-direction:row;
    margin-bottom:100px;
`;

export const UserContainer = styled.div`
    display:flex;
    justify-content:space-around;
    flex-direction:column;
    background-color:rgb(195,194,213);
    border-radius:5%;
    width:270px;
    height:350px;
    padding:0px 50px;
`;

export const UserForm = styled.form`
    display:flex;
    justify-content:center;
    flex-direction:column;
    margin-top:20px;
`;
export const UserInput = styled.input`
    border:hidden;
    border-radius:5px;
    margin-bottom:5px;
    height:40px;
    background-color:rgb(246,246,251);
    padding-left: 40px;
    outline: none;
    color:rgb(89,88,103);
`;
export const UserButton = styled.button`
    border:hidden;
    border-radius:5px;
    margin-bottom:10px;
    height:45px;
    background-color:rgb(89,88,103);
    color:rgb(255,255,255);
    font-family: "kim-jung-chul-myungjo", sans-serif;
    margin-top:10px;
`;

const LoginFooter = styled.div`
    display:flex;
    justify-content:space-around;
    flex-direction:row;
    margin-bottom:50px;
`;

const Hr = styled.hr`
    width:100%;
    height:1px;
    background-color:rgb(56,55,67);
    marign-top:100px;
    margin-bottom:0px;
`;
const LoginLink = styled(Link)`
    text-decoration: none;
    color: rgb(56,55,67);
    font-size:10px;
    margin-bottom:20px;
    white-space: pre-wrap;
`;




function LoginPage() {
    const navigate = useNavigate();
    const [userId, setUserId] = React.useState("");
    const [userPw, setUserPw] = React.useState("");
    const onChangeUserId = (event) => { setUserId(event.target.value); }
    const onChangeUserPw = (event) => { setUserPw(event.target.value); }
    const onSubmitUserId = (event) => {
        event.preventDefault();
        axios.post('/api/users/login', {
            userId: userId,
            userPw: userPw
        }).then((res) => {
            if (res.data) {
                localStorage.setItem('userId', userId);
                navigate('/');
            }
            else {
                navigate('/login');
                alert("잘못된 로그인입니다");
            }
        })
    }

    return (
        <UserBodyWrapper>
            <Logo onClick={()=>navigate('/')}>로고</Logo>
            <UserContainerWrapper>
                <UserContainer>
                    <div></div>
                    <UserForm onSubmit={onSubmitUserId}>
                        <UserInput value={userId} type="Text" onChange={onChangeUserId} placeholder="ID   |" />
                        <UserInput value={userPw} type="Password" onChange={onChangeUserPw} placeholder="PW |" />
                        <UserButton type="submit">로그인</UserButton>
                    </UserForm>
                    <Hr />
                    <LoginFooter>
                        <LoginLink to={`/findId`}>아이디 찾기{"\u00A0"}{"\u00A0"}{"\u00A0"}{"\u00A0"}{"\u00A0"}{"\u00A0"}•</LoginLink>
                       
                        <LoginLink to={`/finrPw`}>비밀번호 찾기{"\u00A0"}{"\u00A0"}{"\u00A0"}{"\u00A0"}{"\u00A0"}{"\u00A0"}•</LoginLink>
                       
                        <LoginLink to={`/SignUp`}>회원가입</LoginLink>
                    </LoginFooter>
                </UserContainer>
            </UserContainerWrapper>
            <div styled={{ height: "100px" }}></div>
        </UserBodyWrapper>

    );
}

export default LoginPage;