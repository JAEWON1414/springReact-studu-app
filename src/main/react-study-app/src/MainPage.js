import React from 'react';
import Calendar from './calendar/calendar';
import ListSubject from './ListSubject/ListSubject';
import ListTask from './listTask/listTask';
import Timetable from './timeTable/timeTable';
import Blog from './blog/blog';
import { ThemeProvider,css , styled } from 'styled-components';
import { CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
const HeaderContainer = styled.span`
    display:flex;
    justify-content: space-between;
    flex-direction: row;
`;
const MenuBtn = styled.button`
  background-color: inherit;
  color:rgb(56,55,67);
  border: hidden;
  font-size:15px;
  font-family: "kim-jung-chul-myungjo", sans-serif;
  display:relative;
  &:hover{
    border-bottom:3px solid rgb(56,55,67); 
  }
  // &:focus{
  //   text-shadow: 0 0 10px rgba(0, 0, 0, 0.8);
  //   font-weight: 900;
  // }
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
  margin-top:25px;
  margin-right:30px;
`;

const Login = styled.button`
  border:none;
  font-family: "kim-jung-chul-myungjo", sans-serif;
  font-size:15px;
  background-color:rgb(240,239,255);
`;
const SignUp = styled.button`
  border-radius:30px;
  font-family: "kim-jung-chul-myungjo", sans-serif;
  font-size:15px;
  padding:10px 15px;
  border:hidden;
  background-color:rgb(89,88,103);
  color: rgb(255,255,255);
  margin-left:10px;
  `;

const ProfileMenu = styled.div`
  display: ${props => props.$isOpen ? 'flex' : 'none'};
  flex-direction: column;
  justify-content: space-around;
  top:88px;
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
`;
const ProfileMenuBtn = styled.button`
  background-color:inherit;
  border:hidden;
  font-family: "kim-jung-chul-myungjo", sans-serif;
  color:rgb(89,,88,103);
  width:80%;
  padding-bottom:10px;
  margin-top:5px;
`;

const ProfileBtn = styled.button`
  border:hidden;
  border-bottom:1px solid;
  background-color:inherit;
  font-family: "kim-jung-chul-myungjo", sans-serif;
  font-size:18px;
`;


const theme = {
  fontFamily: 'kim-jung-chul-myungjo, sans-serif',
}
function MainPage() {
  const navigate = useNavigate();
  const [pageID, setPageID] = React.useState("1");
  const onChangePageID = (id) => { setPageID(id); };
  const [userId, setUserId] = React.useState(localStorage.getItem('userId'));
  const [isOpenMenu, setIsOpenMenu] = React.useState(false);

  const onClickLogout = () => {
    localStorage.removeItem('userId')
    setUserId(null);
    window.location.reload();
  }
  const onClickLogin = () => {
    navigate('/login');
  }
  const onClickProfile = () => {
    setIsOpenMenu(!isOpenMenu);
    console.log(isOpenMenu);
  }
  return (
    <ThemeProvider theme={theme}>
      <div style={{ height: "100vh", backgroundColor: "rgb(240,239,255)" }}>
        <HeaderContainer>
          <div style={{ width: "130px" }}></div>
          <h2>로고</h2>
          <span>
            {userId !== null ? <ProfileContainer onClick={onClickProfile}>
              <CgProfile size="30" style={{marginRight:"10px"}}/>
              <ProfileBtn>{userId}</ProfileBtn>
              <ProfileMenu $isOpen={isOpenMenu}>
                <ProfileMenuBtnWrapper><ProfileMenuBtn onClick={onClickLogout} style={{borderBottom:"1px solid rgb(195,195,213)"}}>로그아웃</ProfileMenuBtn></ProfileMenuBtnWrapper>
                <ProfileMenuBtnWrapper><ProfileMenuBtn style={{borderBottom:"1px solid rgb(195,195,213)"}}>비밀번호 변경</ProfileMenuBtn></ProfileMenuBtnWrapper>
                <ProfileMenuBtnWrapper><ProfileMenuBtn>회원탈퇴</ProfileMenuBtn></ProfileMenuBtnWrapper>
              </ProfileMenu>
            </ProfileContainer> :
              <ProfileContainer >
                <Login onClick={onClickLogin}>로그인</Login>
                <SignUp onClick={()=>navigate('/SignUp')}>회원가입</SignUp></ProfileContainer>}
          </span>
        </HeaderContainer>
        <MenuContainer>
          <MenuBtn onClick={() => onChangePageID("1")} $isOpen={pageID==="1"}>진도 관리</MenuBtn>
          {/* <MenuBtn onClick={() => onChangePageID("2")} $isOpen={pageID==="2"}>과제 관리</MenuBtn> */}
          <MenuBtn onClick={() => onChangePageID("3")} $isOpen={pageID==="3"}>시간표</MenuBtn>
          <MenuBtn onClick={() => onChangePageID("4")} $isOpen={pageID==="4"}>캘린더</MenuBtn>
          <MenuBtn onClick={() => onChangePageID("5")} $isOpen={pageID==="5"}>블로그</MenuBtn>
        </MenuContainer>
        <hr style={{marginTop:"0px", marginBottom:"0px"}}/>
        {pageID === "1" ? <ListSubject userId={userId} /> : null}
        {pageID === "2" ? <ListTask /> : null}
        {pageID === "3" ? <Timetable /> : null}
        {pageID === "4" ? <Calendar /> : null}
        {pageID === "5" ? <Blog /> : null}
      </div>
    </ThemeProvider>
  );
}

export default MainPage;
