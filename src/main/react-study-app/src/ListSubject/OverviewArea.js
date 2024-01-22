import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Subjects from './Subjects';
import { FiEdit } from "react-icons/fi";
import { TiDeleteOutline } from "react-icons/ti";
import { SubjectName, SubjectDelete, SubjectEdit } from './StyledComponent';
import React from 'react';
import styled from 'styled-components';
import axios from 'axios';

const SubjectHeader = styled.span`
    display:flex;
    justify-content: space-between;
    flex-direction: row;
    padding-top:0px;
    height:50px;`;

const SubjectWrapper = styled.div`
    height:80px;
    width:400px;
    margin-bottom:20px;
    background-color: #c3c2d5;
    display:flex;
    justify-content: space-between;
    flex-direction: column;
    border:4px solid rgb(195,194,213);
    box-shadow : 5px 5px 5px rgba(0,0,0,0.2);
    border-radius:20px;
    &:hover {
        box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.3);
      }
`;

const AreaOverview = styled.ul`
    // display:grid;
    // grid-template-columns: repeat(auto-fill, 700px);
    // grid-row-gap: 20px;
    // grid-auto-rows: 180px;
    width: 43%;
    // height:auto;
`;
const SubjectEditWrapper = styled.div`
    display: ${(props) => (props.$isOpen ? 'flex' : 'none')};
    flex-direction: column;
    justify-content: space-around;
`;

const LineProgressbar = styled.progress`
    // background-color:rgb(139, 123, 244);
    width:320px;
    height:30px;
    margin-left:20px;
`;

const ProgressContainer = styled.div`
    display:flex;
    flex-direction:row;
    justify-content:center;
`;
function OverviewArea({ list, changeList, showingIndex, changeShowingIndex, userId }) {
    const [isOpenEdit, setIsOpenMenu] = React.useState(Array(list.subjects.length).fill(false));
    const [editInput, setEditInput] = React.useState([]);
    const CircularProgressBar = ({ percentage }) => {
        return (
            <div style={{ width: '90px', margin: 'auto' }}>
                <CircularProgressbar
                    value={percentage}
                    text={`${percentage}%`}
                    styles={buildStyles({
                        textColor: 'black',
                        pathColor: 'rgb(139, 123, 244)',
                        trailColor: '#d6d6d6',
                        height: '30%',
                    })}
                />
            </div>
        );
    };

    const onClickDeleteSubject = (e,index) => {
        e.stopPropagation();
        axios.post('/api/subjects/delete', {
            userId: userId,
            name: list.subjects[index].name,
        });
        if (index <= showingIndex) changeShowingIndex(showingIndex - 1);
        const updatedList = new Subjects();
        updatedList.subjects = [...list.subjects];
        updatedList.deleteSubject(index);
        changeList(updatedList);
    }
    const onClickShowing = ( index) => { 
        changeShowingIndex(index); 
    }
    const onClickEdit = (e, index) => {
        e.stopPropagation();
        const updatedIsOpenEdit = [...isOpenEdit];
        updatedIsOpenEdit[index] = !updatedIsOpenEdit[index];
        setIsOpenMenu(updatedIsOpenEdit);
    }
    const onSubmitEdit = (event, index) =>{
        axios.post('/api/subjects/update',{
            userId:userId,
            name:list.subjects[index].name,
            newName:editInput[index]
        })
        event.preventDefault();
        const updatedList = new Subjects();
        updatedList.subjects = [...list.subjects];
        updatedList.subjects[index].name = editInput[index];
        changeList(updatedList);
        onClickEdit(index);
    }
    const onChangeEditInput = (value, index)=>{
        const updatedEditInput = [...editInput];
        if (updatedEditInput[index] === undefined) updatedEditInput[index] = ""
        updatedEditInput[index] = value;
        setEditInput(updatedEditInput);
    }
    return (
        <AreaOverview>
            {list.subjects.map((subject, index) => (
                (<li key={index}>
                    <SubjectEditWrapper $isOpen={isOpenEdit[index]}>
                        <form onSubmit={(event)=>onSubmitEdit(event, index)}>
                            <input type="text"
                            placeholder='과목 명'
                            value={editInput[index] || ""}
                            onChange={(event) => onChangeEditInput(event.target.value, index)} />
                        </form>
                    </SubjectEditWrapper>
                    <SubjectWrapper onClick={() => onClickShowing(index)}>
                        <SubjectHeader>
                            <SubjectName > {index + 1 + ". " + subject.name}</ SubjectName>
                            <span>
                                <SubjectEdit onClick={(e) => onClickEdit(e,index)}> <FiEdit size="20" /> </SubjectEdit>

                                <SubjectDelete onClick={(e) => onClickDeleteSubject(e,index)}><TiDeleteOutline size="24" /></SubjectDelete>
                            </span>
                        </SubjectHeader>
                        {/* <CircularProgressBar percentage={subject.progressPercent} /> */}
                        <ProgressContainer><LineProgressbar value={subject.progressPercent} max="100"/>
                        <div style={{marginLeft:"10px"}}>{subject.progressPercent}%</div></ProgressContainer>
                        
                    </SubjectWrapper>
                </li>)
            ))}
        </AreaOverview>
    )
}

export default OverviewArea;