import React from 'react';
import Calendar from './calendar/calendar';
import ListSubject from './ListSubject/ListSubject';
import ListTask from './listTask/listTask';
import Timetable from './timeTable/timeTable';
import Blog from './blog/blog';
import Logo from './Logo.png';
import { useLocation } from 'react-router-dom';
import {Link} from "react-router-dom";
import styled from "styled-components";

const HeaderContainer = styled.span`
    display:flex;
    justify-content: space-between;
    flex-direction: row;
`;
const MenuBtn = styled.button`
  background-color: rgb(167, 155, 243);
  padding: "10px 20px";
  border: hidden;
  border-radius: 20px;
  padding:10px;
  margin :10px;
  font-size:15px;
`;
const MenuContainer = styled.div`
  display:flex;
  flex-direction: row;
  justify-content: space-around;
  width:35%;
  height:60px;
  margin-left:5%;
`;
function MainPage() {
  const [pageID, setPageID] = React.useState("1");
  const onChangePageID = (id) => {
    setPageID(id);
  };
  const {state} = useLocation();


  return (
    <div style={{  height: "100vh" }}>
      <HeaderContainer>
        <img src={Logo} alt="logo" width="100" style={{marginLeft:"30%"}}></img>
        <MenuContainer>
          <MenuBtn onClick={()=>onChangePageID("1")}>진도 관리</MenuBtn>
          <MenuBtn onClick={()=>onChangePageID("2")}>과제 관리</MenuBtn>
          <MenuBtn onClick={()=>onChangePageID("3")}>시간표</MenuBtn>
          <MenuBtn onClick={()=>onChangePageID("4")}>캘린더</MenuBtn>
          <MenuBtn onClick={()=>onChangePageID("5")}>블로그</MenuBtn>
        </MenuContainer>
        <div>
          <p>{state}님</p>
          <button type="button"><Link to="/">로그아웃</Link></button>
        </div>
      </HeaderContainer>
      <hr />
      {pageID === "1" ? <ListSubject userId={state} /> : null}
      {pageID === "2" ? <ListTask /> : null}
      {pageID === "3" ? <Timetable /> : null}
      {pageID === "4" ? <Calendar /> : null}
      {pageID === "5" ? <Blog /> : null}
    </div>
  );
}

export default MainPage;
