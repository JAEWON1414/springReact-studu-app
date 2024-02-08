import 'react-circular-progressbar/dist/styles.css';
import { FiEdit } from "react-icons/fi";
import { TiDeleteOutline } from "react-icons/ti";
import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { FaRegStar,FaStar } from "react-icons/fa";

const SubjectName = styled.div`
    background-color:inherit;
    color:${({ theme }) => theme.color.black};
    font-size:19px;
    font-weight:900;
    height:30px;
`;

const SubjectDelete = styled.button`
    padding:0px;
    border:none;
    background-color: inherit;
    position:relative;
    top:1px;
`;
const SubjectEdit = styled.button`
    padding:0px;
    border:none;
    background-color: inherit;
`;
const SubjectHeader = styled.span`
    display:flex;
    justify-content: space-between;
    flex-direction: row;
    margin-left:7%;
    margin-right:3%;
    margin-top:1%;
`;
const SubjectContainer = styled.div`
    height:90px;
    width:95%;
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
    min-width: 250px;
    width:30%;
`;

const ProgressContainer = styled.div`
    display:flex;
    flex-direction:row;
    justify-content:space-around;
`;
const ProgressLeft = styled.div`
    width:55px;
    margin-left:7%;
    font-size:14px;
    margin-right:7px;
`;
const ProgressBar = styled.div`
    width: 100%;
    height: 12px;
    margin-top:4px;
    background-color:${({ theme }) => theme.color.white};
    border-radius:12px;
    overflow: hidden;
`;

const Progress = styled.div`
    width: ${(props) => props.$width}%; 
    height: 12px;
    background-color:${({ theme }) => theme.color.black};
`;

const ProgressRight = styled.div`
    margin-left: 13px;
    width:120px;
    font-size:14px;
`;

const EditInput = styled.input`
    background-color:inherit;
    width:180px;
    border:hidden;
    outline:none;
    font-size:19px;
    font-weight:900;
    height:30px;
    border-bottom:1px solid ${({ theme }) => theme.color.black};
`;
function OverviewArea({ showingIndex, changeShowingIndex, userId }) {
    const subjects = useSelector(state => state.list.subjects);
    const dispatch = useDispatch();
    const [isOpenEdit, setIsOpenEdit] = React.useState(Array(subjects.length).fill(false));
    const [editInput, setEditInput] = React.useState([]);
    
    const onClickDeleteSubject = (e, subjectIndex) => {
        e.stopPropagation();
        dispatch({
            type: 'listSlice/deleteSubject',
            subjectIndex: subjectIndex,
            userId: userId
        })
        if (subjectIndex <= showingIndex) changeShowingIndex(showingIndex - 1);
    }
    const onClickShowing = (index) => {
        changeShowingIndex(index);
    }
    const onClickEdit = (e, index) => {
        e.stopPropagation();
        const updatedIsOpenEdit = [...isOpenEdit];
        updatedIsOpenEdit[index] = !updatedIsOpenEdit[index];
        setIsOpenEdit(updatedIsOpenEdit);
    }
    const onSubmitEdit = (event, subjectIndex) => {
        event.preventDefault();
        dispatch({
            type: 'listSlice/editSubjectName',
            userId: userId,
            subjectIndex: subjectIndex,
            newName: editInput[subjectIndex]
        })
        onClickEdit(event, subjectIndex);
    }
    const onChangeEditInput = (value, index) => {
        const updatedEditInput = [...editInput];
        updatedEditInput[index] = value;
        setEditInput(updatedEditInput);
    }
    const onClickBookMark = (e,subjectIndex) => {
        e.stopPropagation();
        dispatch({
            type:'listSlice/changePriority',
            userId:userId,
            subjectIndex:subjectIndex
        });
        dispatch({
            type:'listSlice/sortByPriority'
        })
    }
    React.useEffect(() => {
        const handleClickOutside = (event) => {
            if (event.target.className !== 'edit-input') {
                const updatedIsOpenEdit = Array(subjects.length).fill(false);
                setIsOpenEdit(updatedIsOpenEdit);
            }
        };
        document.addEventListener('click', handleClickOutside);
        let updatedEditInput = [];
        subjects.map((subject, index) => {
            updatedEditInput[index] = subject.subjectName;
            return subject;
        })
        setEditInput(updatedEditInput);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [subjects])
    return (
        <AreaOverview>
            {subjects.map((subject, index) => (
                (<li key={index}>
                    <SubjectContainer onClick={() => onClickShowing(index)}>
                        <SubjectHeader>
                            {!isOpenEdit[index] ? <SubjectName>{subject.subjectName}</SubjectName>
                                :
                                <form onSubmit={(event) => onSubmitEdit(event, index)}>
                                    <EditInput className="edit-input" type="text" value={editInput[index]}
                                        onChange={(event) => onChangeEditInput(event.target.value, index)}
                                        onClick={(event) => event.stopPropagation()} />
                                </form>}
                            <span>
                                <button onClick={(e)=>onClickBookMark(e,index)} style={{backgroundColor:'inherit', border:"none"}}>
                                    {subject.priority < 0 ? <div ><FaStar size="20" color="red"/></div> : <div><FaRegStar size="20"/></div>}</button>
                                <SubjectEdit onClick={(e) => onClickEdit(e, index)} style={{ marginRight: "5px" }}> <FiEdit size="20" /> </SubjectEdit>
                                <SubjectDelete onClick={(e) => onClickDeleteSubject(e, index)} ><TiDeleteOutline size="24" /></SubjectDelete>
                            </span>
                        </SubjectHeader>
                        <ProgressContainer>
                            <ProgressLeft>진도</ProgressLeft>
                            <ProgressBar><Progress $width={subject.progressPercent} /></ProgressBar>
                            <ProgressRight>{subject.progressPercent}%</ProgressRight>
                        </ProgressContainer>
                        <ProgressContainer>
                            <ProgressLeft>과제</ProgressLeft>
                            <ProgressBar><Progress $width={subject.taskPercent} /></ProgressBar>
                            {/* <ProgressRight>{list.countTask(index) !== 0 ? list.countCheckedTask(index) + "개/" + list.countTask(index) + "개" : "과제없음"}</ProgressRight> */}
                            <ProgressRight>{subject.checkedTasks}개/{subject.tasks.length}개</ProgressRight>
                        </ProgressContainer>
                    </SubjectContainer>
                </li>)
            ))}
        </AreaOverview>
    )
}

export default OverviewArea;