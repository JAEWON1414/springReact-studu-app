import React from 'react';
import Calendar from './calendar/calendar';
import ListSubject from './ListSubject/ListSubject';

import Timetable from './timeTable/timeTable';
import Blog from './blog/blog';
import { ThemeProvider, css, styled, createGlobalStyle } from 'styled-components';
import { CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

const GlobalStyle = createGlobalStyle`
  *{
    font-family: "kim-jung-chul-myungjo", sans-serif
  };
  ul{
    list-style:none;
    padding: 0;
    margin:0;
  };
  li{
    list-style:none;
    padding:0;
  };
`;

const theme = {
  color: {
    black: 'rgb(56,55,67)',
    white: 'rgb(249,249,255)',
    lightGray: '#c3c2d5',
    darkGray: 'rgb(179,178,199)',
    lightPurple: 'rgb(240,239,255)',
  }
}
const Entire = styled.div`
  min-height: 101vh;
  min-width:1000px;
  background-color:${({ theme }) => theme.color.lightPurple};
`;
const Logo = styled.h2`
  margin-top:10px;
`;

const MenuBtn = styled.button`
  background-color: inherit;
  color:${({theme})=>theme.color.black};
  border: hidden;
  font-size:15px;
  &:hover{
    border-bottom:3px solid ${({theme})=>theme.color.black}; 
  }
  ${({ $isOpen }) =>
    $isOpen &&
    css`
        text-shadow: 0 0 10px rgba(0, 0, 0, 0.8);
        font-weight: 900;
    `}
`;
const MenuContainer = styled.div`
  display:flex;
  flex-direction: row;
  justify-content: space-around;
  width:80%;
  height:40px;
  margin-left:10%;
`;
const ProfileContainer = styled.div`
  display:flex;
  flex-direction: row;
  justify-content: center;
  width:150px;
  margin-top:15px;
  margin-right:30px;
`;

const Login = styled.button`
  border:none;
  font-size:10px;
  background-color:rgb(240,239,255);
`;
const SignUp = styled.button`
  border-radius:30px;
  font-family: "kim-jung-chul-myungjo", sans-serif;
  font-size:12px;
  padding:10px 15px;
  border:hidden;
  background-color:rgb(89,88,103);
  color: rgb(255,255,255);
  margin-left:10px;
  `;

const ProfileMenu = styled.div`
  font-size:12px;
  display: ${props => props.$isOpen ? 'flex' : 'none'};
  flex-direction: column;
  justify-content: space-around;
  top:60px;
  right:30px;
  position: absolute;
  background-color: #f9f9f9;
  min-width:  110px;
  z-index: 1;
  height:110px;
  border-radius:3px;
  &::before {
    content: '';
    position: absolute;
    top: -40px;
    right: 40px;
    border-width: 20px;
    border-style: solid;
    z-index:2;
    border-color: transparent transparent #f9f9f9 transparent;
  }
  &:after {
    content: '';
    position: absolute;
    top: -42px;
    right: 40px;
    border-width: 20px;
    border-style: solid;
    z-index:1;
    filter: blur(1px);
    border-color: transparent transparent rgba(0, 0, 0, 0.2) transparent;
  }
  box-shadow: 1px 1px 2px 0px rgba(0, 0, 0, 0.2),
   -1px -1px 2px 0px rgba(0,0,0,0.2),
   -1px 1px 2px 0px rgba(0,0,0,0.2),
   1px -1px 2px 0px rgba(0,0,0,0.2);
`;

const ProfileMenuBtnWrapper = styled.div`
  display:flex;
  justify-content:center;
  flex-direction:row;
  height:30%;
`;
const ProfileMenuBtn = styled.button`
  background-color:inherit;
  border:hidden;
  color:rgb(89,,88,103);
  width:80%;
  padding-bottom:5px;
  // margin-top:5px;
`;

const ProfileName = styled.div`
  border-bottom:1px solid;
  background-color:inherit;
  font-size:16px;
  position:relative;
  top:-3px;
`;

function MainPage() {
  const [pageID, setPageID] = React.useState("1");
  const onChangePageID = (id) => { setPageID(id); };
  const [userId, setUserId] = React.useState(localStorage.getItem('userId'));
  const logout = () => { setUserId(null); }
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Entire>
        <div className='d-flex justify-content-between'>
          <div style={{ width: "150px" }}></div>
          <Logo>로고</Logo>
          <Profile userId={userId} logout={logout}></Profile>
        </div>
        <MenuContainer>
          <MenuBtn onClick={() => onChangePageID("1")} $isOpen={pageID === "1"}>학습 관리</MenuBtn>
          <MenuBtn onClick={() => onChangePageID("3")} $isOpen={pageID === "3"}>시간표</MenuBtn>
          <MenuBtn onClick={() => onChangePageID("4")} $isOpen={pageID === "4"}>캘린더</MenuBtn>
          <MenuBtn onClick={() => onChangePageID("5")} $isOpen={pageID === "5"}>블로그</MenuBtn>
        </MenuContainer>
        <hr style={{ marginTop: "0px" }} />
        {pageID === "1" ? <ListSubject userId={userId} /> : null}
        {pageID === "3" ? <Timetable /> : null}
        {pageID === "4" ? <Calendar /> : null}
        {pageID === "5" ? <Blog /> : null}
      </Entire>
    </ThemeProvider>
  );
}

function Profile({ userId, logout }) {
  const navigate = useNavigate();
  const [isOpenMenu, setIsOpenMenu] = React.useState(false);
  const onClickLogin = () => { navigate('/login'); }
  const onClickProfile = () => { setIsOpenMenu(!isOpenMenu); }
  const onClickLogout = () => {
    localStorage.removeItem('userId')
    logout();
    window.location.reload();
  }
  return (
    <span>
      {userId !== null ?
        <ProfileContainer onClick={onClickProfile}>
          <CgProfile size="23" style={{ marginRight: "10px" }} />
          <ProfileName >{userId}</ProfileName>
          <ProfileMenu $isOpen={isOpenMenu}>
            <ProfileMenuBtnWrapper><ProfileMenuBtn onClick={onClickLogout} style={{ borderBottom: "1px solid rgb(195,195,213)" }}>로그아웃</ProfileMenuBtn></ProfileMenuBtnWrapper>
            <ProfileMenuBtnWrapper><ProfileMenuBtn style={{ borderBottom: "1px solid rgb(195,195,213)" }}>비밀번호 변경</ProfileMenuBtn></ProfileMenuBtnWrapper>
            <ProfileMenuBtnWrapper><ProfileMenuBtn>회원탈퇴</ProfileMenuBtn></ProfileMenuBtnWrapper>
          </ProfileMenu>
        </ProfileContainer>
        : <ProfileContainer >
          <Login onClick={onClickLogin}>로그인</Login>
          <SignUp onClick={() => navigate('/SignUp')}>회원가입</SignUp></ProfileContainer>}
    </span>
  )
}

export default MainPage;
