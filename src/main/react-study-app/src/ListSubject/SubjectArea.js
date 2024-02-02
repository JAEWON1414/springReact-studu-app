import { IoIosArrowDropleft, IoIosArrowDropdown } from "react-icons/io";
import { MdOutlineCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import { TiDeleteOutline } from "react-icons/ti";
import { SubjectCheckbox, SubjectToggle, SubjectDelete } from './StyledComponent';

import React from 'react';
import styled from 'styled-components';
import { FaPlus } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";
import { useDispatch, useSelector } from 'react-redux';

export const Header = styled.div`
    display:flex;
    justify-content:start;
    flex-direction:column;
    margin-left:2%;
    margin-bottom:10px;
`;

export const Title = styled.div`
    font-size:20px;
`;
export const Input = styled.input`
    background-color:inherit;
    border:none;
    outline: none;
    border-bottom:1px solid rgba(88,89,103,0.5);
`;
const ProgressWrapper = styled.div`
    background-color:${({ theme }) => theme.color.darkGray};
    border-radius:10px;
    border:10px solid ${({ theme }) => theme.color.darkGray};
    margin-bottom:10px;
`;
const ProgressContainer = styled.div`
    display:flex;
    flex-direction:row;
    justify-content:space-betwwen;
    margin-top:3px;
`;
const ProgressLeft = styled.div`
    min-width:130px;
    width:30%;
    font-size:16px;
    margin-top:12px;
    margin-right:5px;
    position:relative;
    top:-6px;
    font-weight:500;
    display:flex;
    justify-content:start;
    flex-direction:row;
`;
const ProgressBar = styled.div`
    min-width: 10px;
    width:60%;
    height: 12px;
    background-color:rgb(240,239,255);
    border-radius:12px;
    overflow: hidden;
    position:relative;
    top:3px;
    margin-right:10px;
`;

const Progress = styled.div`
    width: ${(props) => props.$width}%; 
    height: 12px;
    background-color:rgb(56,55,67);
    
`;

const ProgressRight = styled.div`
    display:flex;
    flex-direction:row;
    justify-content:start;
    position:relative;
    top:5px;
    width:70%;
`;

const EditBtn = styled.div`
    position:relative;
    top:-5px;
`;
const EditInput = styled.input`
    background-color:inherit;
    border:hidden;
    outline:none;
    width:100%;
    height:20px;
    font-size:16px;
    padding:0; 
    border-bottom:1px solid ${({ theme }) => theme.color.black};
    
    `;


function SubjectArea({ subjectIndex, userId }) {
    const dispatch = useDispatch();
    const subjects = useSelector(state => state.list.subjects);
    const chapters = subjects[subjectIndex].chapters;

    const [chapterInput, setChapterInput] = React.useState("");
    const onChangechapterInput = (event) => { setChapterInput(event.target.value); };

    const onSubmitChapterInput = (event) => {
        event.preventDefault();
        dispatch({
            type: 'listSlice/addChapter',
            subjectIndex: subjectIndex,
            chapterInput: chapterInput,
            userId: userId,
        })
        dispatch({
            type: 'listSlice/subjectProgressPercent',
            subjectIndex: subjectIndex
        });
        setChapterInput("");
    };
    return (
        <div style={{ width: "45%" }}>
            <Header>
                <Title>진도관리</Title>
                <form onSubmit={onSubmitChapterInput} style={{ color: "rgb(89,88,103)" }}>
                    <FaPlus style={{ marginRight: "5px" }}></FaPlus>
                    <Input type="text" placeholder='입력' value={chapterInput}
                        onChange={onChangechapterInput} />
                </form>
            </Header>
            <ul style={{ padding: "0" }}>{chapters.map((chapter, chapterIndex) => (
                <Chapter key={chapterIndex} subjectIndex={subjectIndex} chapterIndex={chapterIndex} userId={userId} />
            ))}
            </ul>
        </div>
    );
}

function Chapter({ subjectIndex, chapterIndex, userId }) {
    const subjects = useSelector(state => state.list.subjects);
    const chapters = subjects[subjectIndex].chapters;
    const chapter = chapters[chapterIndex];
    const dispatch = useDispatch();

    const [editInput, setEditInput] = React.useState([]);
    const [isOpenEdit, setIsOpenEdit] = React.useState(Array(chapters.length).fill(false));
    const onClickShowingItems = (chapterIndex) => {
        dispatch({
            type: 'listSlice/convertShowingItems',
            subjectIndex: subjectIndex,
            chapterIndex: chapterIndex
        });
    }

    const onClickDeleteChapter = (chapterIndex) => {
        dispatch({
            type: 'listSlice/deleteChapter',
            userId: userId,
            subjectIndex: subjectIndex,
            chapterIndex: chapterIndex
        })
        dispatch({
            type: 'listSlice/setSubjectProgressPercent',
            subjectIndex: subjectIndex
        })
    }

    const onClickChapterChecked = (chapterIndex) => {
        dispatch({
            type: 'listSlice/convertChapterChecked',
            userId: userId,
            subjectIndex: subjectIndex,
            chapterIndex: chapterIndex,
        })
        dispatch({
            type: 'listSlice/setChapterPercent',
            subjectIndex: subjectIndex,
            chapterIndex: chapterIndex
        });
        dispatch({
            type: 'listSlice/setSubjectProgressPercent',
            subjectIndex: subjectIndex
        })
    }
    const onClickEdit = (e, index) => {
        e.stopPropagation();
        const updatedIsOpenEdit = [...isOpenEdit];
        updatedIsOpenEdit[index] = !updatedIsOpenEdit[index];
        setIsOpenEdit(updatedIsOpenEdit);
    }
    const onChangeEditInput = (value, index) => {
        const updatedEditInput = [...editInput];
        if (updatedEditInput[index] === undefined) updatedEditInput[index] = ""
        updatedEditInput[index] = value;
        setEditInput(updatedEditInput);
    }
    const onSubmitEdit = (event, chapterIndex) => {
        event.preventDefault();
        dispatch({
            type: 'listSlice/editChapterName',
            userId: userId,
            subjectIndex: subjectIndex,
            chapterIndex: chapterIndex,
            newName: editInput[chapterIndex]
        })
        onClickEdit(event, chapterIndex);
    }
    React.useEffect(() => {
        const handleClickOutside = (event) => {
            if (event.target.className !== 'edit-input') {
                const updatedIsOpenEdit = Array(subjects[subjectIndex].chapters.length).fill(false);
                setIsOpenEdit(updatedIsOpenEdit);
            }
        };
        document.addEventListener('click', handleClickOutside);
        let updatedEditInput = [];
        chapters.map((chapter, index) => {
            updatedEditInput[index] = chapter.chapterName;
            return chapter;
        })
        setEditInput(updatedEditInput);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [subjectIndex]);
    return (
        <ProgressWrapper>
            <li key={chapterIndex}>
                <ProgressContainer>
                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", width: "170px" }}>
                        <ProgressLeft>
                            <SubjectCheckbox onClick={() => onClickChapterChecked(chapterIndex)}>{chapter.progressPercent === 100 ? <MdOutlineCheckBox size="24" /> : <MdCheckBoxOutlineBlank size="24" />}</SubjectCheckbox>
                            {!isOpenEdit[chapterIndex]
                                ? <div style={{ position: "relative", top: "-3px", height: "100%", fontSize: "16px" }}>{chapter.chapterName}</div>
                                : <form onSubmit={(event) => onSubmitEdit(event, chapterIndex)}>
                                    <EditInput className="edit-input" type="text" value={editInput[chapterIndex] || ""}
                                        onChange={(event) => onChangeEditInput(event.target.value, chapterIndex)}
                                        onClick={(event) => event.stopPropagation()} />

                                </form>}
                        </ProgressLeft>
                    </div>
                    <ProgressRight>
                        <ProgressBar><Progress $width={chapter.progressPercent}></Progress></ProgressBar>
                        <div style={{ width: "60px", fontSize: "14px" }}>{chapter.progressPercent}%</div>
                        <SubjectToggle onClick={() => onClickShowingItems(chapterIndex)}>{chapter.showingItems ? <IoIosArrowDropleft size="22" /> : <IoIosArrowDropdown size="22" />}</SubjectToggle>
                        <EditBtn onClick={(e) => onClickEdit(e, chapterIndex)} ><FiEdit size="20" /></EditBtn>
                        <SubjectDelete onClick={() => onClickDeleteChapter(chapterIndex)} style={{ position: "relative", top: "-2px", display: "flex", justifyContent: "start", flexDirection: "column" }}><TiDeleteOutline size="24" /></SubjectDelete>
                    </ProgressRight>
                </ProgressContainer>
                {chapter.showingItems ?
                    <Items subjectIndex={subjectIndex} chapterIndex={chapterIndex} userId={userId} />
                    : null}
            </li>
        </ProgressWrapper>
    );
}
function Items({ subjectIndex, chapterIndex, userId }) {
    const dispatch = useDispatch();
    const subjects = useSelector(state => state.list.subjects);
    const chapter = subjects[subjectIndex].chapters[chapterIndex];
    const [itemInput, setItemInput] = React.useState([]);

    const onChangeItemInput = (value, chapterIndex) => {
        const updatedItemInput = [...itemInput];
        if (updatedItemInput[chapterIndex] === undefined) updatedItemInput[chapterIndex] = ""
        updatedItemInput[chapterIndex] = value
        setItemInput(updatedItemInput);
    }
    const dispatchProgressPercent = (subjectIndex, chapterIndex) => {
        dispatch({
            type: 'listSlice/setChapterPercent',
            subjectIndex: subjectIndex,
            chapterIndex: chapterIndex
        });
        dispatch({
            type: 'listSlice/setSubjectProgressPercent',
            subjectIndex: subjectIndex
        })
    }
    const onSubmitItemInput = (event, chapterIndex) => {
        event.preventDefault();
        if (itemInput[chapterIndex] === undefined) return;
        dispatch({
            type: 'listSlice/addItem',
            userId: userId,
            subjectIndex: subjectIndex,
            chapterIndex: chapterIndex,
            itemInput: itemInput[chapterIndex]
        })
        dispatchProgressPercent(subjectIndex, chapterIndex);
        setItemInput("");
    }
    const onClickDeleteItem = (chapterIndex, itemIndex) => {
        dispatch({
            type: 'listSlice/deleteItem',
            userId: userId,
            subjectIndex: subjectIndex,
            chapterIndex: chapterIndex,
            itemIndex: itemIndex
        })
        dispatchProgressPercent(subjectIndex, chapterIndex);
    }
    const onClickItemChecked = (chapterIndex, itemIndex) => {
        dispatch({
            type: 'listSlice/convertItemChecked',
            userId: userId,
            subjectIndex: subjectIndex,
            chapterIndex: chapterIndex,
            itemIndex: itemIndex
        })
        dispatchProgressPercent(subjectIndex, chapterIndex);
    }
    return (
        <div>
            <form onSubmit={(event) => onSubmitItemInput(event, chapterIndex)} style={{ color: "rgb(89,88,103)", marginLeft: "7%", marginBottom: "10px" }}>
                <FaPlus style={{ marginRight: "5px" }}></FaPlus>
                <Input type="Text"
                    placeholder='입력'
                    value={itemInput[chapterIndex] || ""}
                    onChange={(event) => onChangeItemInput(event.target.value, chapterIndex)} />
            </form>
            <ul >{chapter.items.map((item, itemIndex) => (chapter.showingItems &&
                <li key={itemIndex}>
                    <ProgressContainer style={{ marginLeft: "10%", width: "700px" }}>
                        <ProgressLeft >
                            <SubjectCheckbox onClick={() => onClickItemChecked(chapterIndex, itemIndex)}>{item.checked ? <MdOutlineCheckBox size="24" /> : <MdCheckBoxOutlineBlank size="24" />}</SubjectCheckbox>
                            <div>{item.itemName}</div></ProgressLeft>
                        <span>
                            <SubjectDelete onClick={() => onClickDeleteItem(chapterIndex, itemIndex)}><TiDeleteOutline size="24" /></SubjectDelete>
                        </span>
                    </ProgressContainer>
                </li>
            ))}
            </ul>
        </div>
    );
}
export default SubjectArea;