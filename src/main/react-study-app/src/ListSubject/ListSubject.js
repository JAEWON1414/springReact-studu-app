import React from 'react';
import DetailArea from './DetailArea';
import OverviewArea from './OverviewArea';
import styled from 'styled-components';
// import axios from "axios";
import { FaPlus } from "react-icons/fa6";
import { useDispatch,} from 'react-redux';
import Subjects from './Subjects.js';
const AreaContainer = styled.div`
    display:flex;
    justify-content: space-between;
    flex-direction: row;
    // width:80%;
    margin-right:10%;
    margin-left:10%;
    `;
const SubjectAddBtn = styled.button`
    margin-left:12%;
    color:rgb(89,88,103);
    background-color:rgb(240,239,255);
    border:none;
    width:20px;
    height:20px;
    margin-right:5px;
`;
const SubjectAddForm = styled.form`
    margin-top:20px;
    margin-bottom:30px;
    height:20px;
`;

const SubjectInput = styled.input`
    background-color:${({ theme }) => theme.color.white};
    border:none;
    outline: none;
    border-radius:5px;
    padding:5px;
    border:1px solid rgba(88,89,103,0.5);////////////////////////////////////
    height:30px;
`;

function ListSubject({ userId }) {
    const dispatch = useDispatch();
    const [list, setList] = React.useState(new Subjects());
    const [subjectInput, setSubjectInput] = React.useState("");
    const [showingIndex, setShowingIndex] = React.useState(0);
    const onChangeSubjectInput = (event) => {
        setSubjectInput(event.target.value);
    }
    const onChangeShowingIndex = (updatedShowingIndex) => {
        setShowingIndex(updatedShowingIndex);
    }
    const onSubmitSubject = (event) => {
        event.preventDefault();
        dispatch({
            type: 'listSlice/addSubject',
            subjectInput: subjectInput,
            userId: userId
        });
        setSubjectInput("");
    }
    const changeList = (updatedList) => {
        setList(updatedList);
    }
    
    return (
        <div>
            <SubjectAddForm onSubmit={onSubmitSubject}>
                <SubjectAddBtn><FaPlus></FaPlus></SubjectAddBtn>
                <SubjectInput style={{ width: "150px" }} type="Text"
                    value={subjectInput} placeholder="과목명" onChange={onChangeSubjectInput} />
            </SubjectAddForm>
            <AreaContainer>
                <OverviewArea showingIndex={showingIndex} changeShowingIndex={onChangeShowingIndex} userId={userId} />
                {showingIndex !== -1 ?
                    <DetailArea subjectIndex={showingIndex} list={list} changeList={changeList} userId={userId} /> : null}
            </AreaContainer>
        </div>
    );
}
export default ListSubject;