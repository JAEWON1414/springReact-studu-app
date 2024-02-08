import React from 'react';
import Calendar from './calendar/calendar';
import ListSubject from './ListSubject/ListSubject';
import axios from "axios";
import Timetable from './timeTable/timeTable';
import Blog from './blog/blog';
import { ThemeProvider, css, styled, createGlobalStyle, keyframes } from 'styled-components';
import { CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch } from 'react-redux';


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
  min-width:1200px;
  background-color:${({ theme }) => theme.color.lightPurple};
`;
const Logo = styled.h2`
  margin-top:10px;
  width:100px;

`;

const stretchAnimation = keyframes`
  0% {
    transform: scaleX(0);
  }
  100% {
    transform: scaleX(100%);
  }
`;
const stretchAnimation2 = keyframes`
  0% {
    transform: scaleX(1);
  }
  100% {
    transform: scaleX(0);
  }
`;

const MenuBtn = styled.button`
  background-color: inherit;
  color:${({ theme }) => theme.color.black};
  border: hidden;
  font-size:15px;
  &:after{
    content:"";
      display:block;
      position:relative;
      top:14px;
      border-bottom:3px solid ${({ theme }) => theme.color.black}; 
      animation: ${stretchAnimation2} 0.5s forwards;
      width:100%;
  }
  &:hover{
    &:after{
      content:"";
      display:block;
      position:relative;
      top:14px;
      border-bottom:3px solid ${({ theme }) => theme.color.black}; 
      animation: ${stretchAnimation} 0.5s forwards;
      width:100%;
    }
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
  width:60%;
  height:50px;
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

const Header = styled.div`
  position: fixed;
  z-index: 9999;
  height: 50px;
  width: 100%;
  top: 0; 
  left: 0;
  background-color: rgb(240,239,255);
  box-shadow: 0px 1px 3px #c3c2d5;

`;
function MainPage() {
  const [pageID, setPageID] = React.useState("1");
  const onChangePageID = (id) => { setPageID(id); };
  const [userId, setUserId] = React.useState(localStorage.getItem('userId'));
  const logout = () => { setUserId(null); }
  const [loading, setLoading] = React.useState(true);
  const dispatch = useDispatch();

  const fetchData = async () => {
    try {
      const subjectsResponse = await axios.post('/api/subjects', userId);
      const subjectsFromServer = subjectsResponse.data;
      for (let subjectIndex = 0; subjectIndex < subjectsFromServer.length; subjectIndex++) {
        const subject = subjectsFromServer[subjectIndex];
        dispatch({
          type: 'listSlice/fetchSubjects',
          subjectName: subject.name,
          priority: subject.priority,
        });
        
        const chaptersResponse = await axios.post('/api/chapters', {
          userId: userId,
          subjectName: subject.name,
        });
        const chaptersFromServer = chaptersResponse.data;
        for (let chapterIndex = 0; chapterIndex < chaptersFromServer.length; chapterIndex++) {
          const chapter = chaptersFromServer[chapterIndex];
          dispatch({
            type: 'listSlice/fetchChapters',
            chapterName: chapter.chapterName,
            subjectIndex: subjectIndex,
            chapterPercent: chapter.chapterPercent
          })
          const itemResponse = await axios.post('/api/items', {
            userId: userId,
            subjectName: subject.name,
            chapterName: chapter.chapterName,
          });
          const itemsFromServer = itemResponse.data;
          for (let itemIndex = 0; itemIndex < itemsFromServer.length; itemIndex++) {
            const item = itemsFromServer[itemIndex];
            dispatch({
              type: 'listSlice/fetchItems',
              subjectIndex: subjectIndex,
              chapterIndex: chapterIndex,
              itemName: item.itemName,
              checked: item.checked
            })
          }
          dispatch({
            type: 'listSlice/setChapterPercent',
            subjectIndex: subjectIndex,
            chapterIndex: chapterIndex
          })
        }
        dispatch({
          type: 'listSlice/setSubjectProgressPercent',
          subjectIndex: subjectIndex
        })
        const taskResponse = await axios.post('/api/tasks', {
          userId: userId,
          subjectName: subject.name,
        })
        const tasksFromServer = taskResponse.data;
        for (let taskIndex = 0; taskIndex < tasksFromServer.length; taskIndex++) {
          const task = tasksFromServer[taskIndex];
          dispatch({
            type: 'listSlice/fetchTasks',
            subjectIndex: subjectIndex,
            taskName: task.taskName,
            year: task.year,
            month: task.month - 1,
            day: task.day,
            checked: task.checked
          })
        }
        dispatch({
          type: 'listSlice/setSubjectTaskPercent',
          subjectIndex: subjectIndex
        })

      }
      dispatch({
        type: 'listSlice/sortByPriority'
      })
      setLoading(false);

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  React.useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [null]);
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Entire>
        <Header>
          <div className='d-flex justify-content-between'>
            <MenuContainer >
              <Logo>로고</Logo>
              <MenuBtn onClick={() => onChangePageID("1")} $isOpen={pageID === "1"}>학습 관리</MenuBtn>
              <MenuBtn onClick={() => onChangePageID("3")} $isOpen={pageID === "3"}>시간표</MenuBtn>
              <MenuBtn onClick={() => onChangePageID("4")} $isOpen={pageID === "4"}>캘린더</MenuBtn>
              <MenuBtn onClick={() => onChangePageID("5")} $isOpen={pageID === "5"}>블로그</MenuBtn>
            </MenuContainer>
            <Profile userId={userId} logout={logout}></Profile>
          </div>
        </Header>
        <div style={{ paddingTop: "50px" }}>
          {loading ? <h2>loading...</h2>
            : <div>
              {pageID === "1" ? <ListSubject userId={userId} /> : null}
              {pageID === "3" ? <Timetable /> : null}
              {pageID === "4" ? <Calendar /> : null}
              {pageID === "5" ? <Blog /> : null}
            </div>}

        </div>
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
