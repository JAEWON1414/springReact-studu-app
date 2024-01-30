import { IoIosArrowDropleft, IoIosArrowDropdown } from "react-icons/io";
import { MdOutlineCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import { TiDeleteOutline } from "react-icons/ti";
import { SubjectCheckbox, SubjectToggle, SubjectDelete } from './StyledComponent';
import axios from "axios";
import Subjects from './Subjects';
import React from 'react';
import styled from 'styled-components';
import { FaPlus } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";

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
function SubjectArea({ subjectIndex, list, changeList, userId }) {
    const chapters = list.subjects[subjectIndex].chapters;
    const [chapterInput, setChapterInput] = React.useState("");
    const onChangechapterInput = (event) => {
        setChapterInput(event.target.value);
    };
    const onSubmitChapterInput = (event) => {
        event.preventDefault();
        if (chapterInput === "") return;
        axios.post('/api/chapters/create', {
            userId: userId,
            subjectName: list.subjects[subjectIndex].name,
            chapterName: chapterInput
        })
        const updatedList = new Subjects();
        updatedList.subjects = [...list.subjects];
        updatedList.addChapter(subjectIndex, chapterInput);
        updatedList.setTotalProgressPercent(subjectIndex);
        changeList(updatedList);
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
                <Chapter key={chapterIndex} list={list} changeList={changeList} subjectIndex={subjectIndex} chapter={chapter} chapterIndex={chapterIndex} userId={userId} />
            ))}
            </ul>
        </div>

    );
}

function Chapter({ list, changeList, subjectIndex, chapter, chapterIndex, userId }) {
    const subject = list.subjects[subjectIndex];
    const chapters = list.subjects[subjectIndex].chapters;
    const [editInput, setEditInput] = React.useState([]);
    const [isOpenEdit, setIsOpenEdit] = React.useState(Array(chapters.length).fill(false));
    const onClickShowingItems = (chapterIndex) => {
        const updatedList = new Subjects();
        updatedList.subjects = [...list.subjects];
        updatedList.convertShowingItems(subjectIndex, chapterIndex);
        changeList(updatedList);
    }
    const onClickDeleteChapter = (chapterIndex) => {
        axios.post('/api/chapters/delete', {
            userId: userId,
            subjectName: subject.name,
            chapterName: chapters[chapterIndex].name,
        });
        const updatedList = new Subjects();
        updatedList.subjects = [...list.subjects];
        updatedList.deleteChapter(subjectIndex, chapterIndex);
        updatedList.setTotalProgressPercent(subjectIndex);
        changeList(updatedList);
    }

    const onClickChapterChecked = (chapterIndex) => {
        axios.post('/api/chapters/updateCheck', {
            userId: userId,
            subjectName: subject.name,
            chapterName: chapters[chapterIndex].name,
            checked: !chapters[chapterIndex].checked,
        });
        const updatedList = new Subjects();
        updatedList.subjects = [...list.subjects];
        const updatedChapter = updatedList.subjects[subjectIndex].chapters[chapterIndex];
        if (updatedChapter.progressPercent === 100) {
            updatedChapter.items.map((item, itemIndex) => {
                item.checked = false;
                return item;
            })
            updatedChapter.checked = false;
        } else {
            updatedChapter.items.map((item, itemIndex) => {
                item.checked = true;
                return item;
            })
            updatedChapter.checked = true;
        }
        updatedList.setChapterProgressPercent(subjectIndex, chapterIndex);
        updatedList.setTotalProgressPercent(subjectIndex);
        changeList(updatedList);
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
    const onSubmitEdit = (event, index) => {
        event.preventDefault();
        axios.post('/api/chapters/update',{
            userId:userId,
            subjectName:subject.name,
            name: chapters[index].name,
            
            newName: editInput[index]
        })
        const updatedList = new Subjects();
        updatedList.subjects = [...list.subjects];
        updatedList.subjects[subjectIndex].chapters[index].name = editInput[index];
        changeList(updatedList);
        onClickEdit(event, index);
    }
    React.useEffect(() => {
        const handleClickOutside = (event) => {
            if (event.target.className !== 'edit-input') {
                const updatedIsOpenEdit = Array(list.subjects[subjectIndex].chapters.length).fill(false);
                setIsOpenEdit(updatedIsOpenEdit);
            }
        };
        document.addEventListener('click', handleClickOutside);
        let updatedEditInput = [];
        chapters.map((chapter, index) => {
            updatedEditInput[index] = chapter.name;
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
                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", width:"170px"}}>
                        <ProgressLeft>
                            <SubjectCheckbox onClick={() => onClickChapterChecked(chapterIndex)}>{chapter.progressPercent === 100 ? <MdOutlineCheckBox size="24" /> : <MdCheckBoxOutlineBlank size="24" />}</SubjectCheckbox>
                            {!isOpenEdit[chapterIndex]
                                ? <div style={{ position: "relative", top: "-3px", height:"100%", fontSize:"16px" }}>{chapter.name}</div>
                                : <form onSubmit={(event) => onSubmitEdit(event, chapterIndex)}>
                                    <EditInput className="edit-input" type="text" value={editInput[chapterIndex] || ""}
                                    onChange={(event) => onChangeEditInput(event.target.value, chapterIndex)} 
                                    onClick={(event)=> event.stopPropagation()}/>
                                
                                </form>}
                        </ProgressLeft>
                    </div>
                    <ProgressRight>
                        <ProgressBar><Progress $width={chapter.progressPercent}></Progress></ProgressBar>
                        <div style={{ width: "60px", fontSize: "14px"}}>{chapter.progressPercent}%</div>
                        <SubjectToggle onClick={() => onClickShowingItems(chapterIndex)}>{chapter.showingItems ? <IoIosArrowDropleft size="22" /> : <IoIosArrowDropdown size="22" />}</SubjectToggle>
                        <EditBtn onClick={(e) => onClickEdit(e,chapterIndex)} ><FiEdit size="20" /></EditBtn>
                        <SubjectDelete onClick={() => onClickDeleteChapter(chapterIndex)} style={{ position: "relative", top: "-2px", display: "flex", justifyContent: "start", flexDirection: "column" }}><TiDeleteOutline size="24" /></SubjectDelete>
                    </ProgressRight>
                </ProgressContainer>
                {chapter.showingItems ?
                    <Items list={list} changeList={changeList} subjectIndex={subjectIndex} chapter={chapter} chapterIndex={chapterIndex} userId={userId} />
                    : null}
            </li>
        </ProgressWrapper>
    );
}
function Items({ list, changeList, subjectIndex, chapter, chapterIndex, userId }) {
    const subject = list.subjects[subjectIndex];
    const chapters = list.subjects[subjectIndex].chapters;
    const [itemInput, setItemInput] = React.useState([]);
    const onChangeItemInput = (value, chapterIndex) => {
        const updatedItemInput = [...itemInput];
        if (updatedItemInput[chapterIndex] === undefined) updatedItemInput[chapterIndex] = ""
        updatedItemInput[chapterIndex] = value
        setItemInput(updatedItemInput);
    }
    const onSubmitItemInput = (event, chapterIndex) => {
        event.preventDefault();
        if (itemInput[chapterIndex] === undefined) return;
        axios.post('/api/items/create', {
            userId: userId,
            subjectName: list.subjects[subjectIndex].name,
            chapterName: list.subjects[subjectIndex].chapters[chapterIndex].name,
            itemName: itemInput[chapterIndex]
        })
        const updatedList = new Subjects();
        updatedList.subjects = [...list.subjects];
        updatedList.addItem(subjectIndex, chapterIndex, itemInput[chapterIndex]);
        updatedList.setTotalProgressPercent(subjectIndex);
        changeList(updatedList);
        setItemInput("");
    }
    const onClickDeleteItem = (chapterIndex, itemIndex) => {
        axios.post('/api/items/delete', {
            userId: userId,
            subjectName: subject.name,
            chapterName: chapters[chapterIndex].name,
            itemName: chapters[chapterIndex].items[itemIndex].name,
        });
        const updatedList = new Subjects();
        updatedList.subjects = [...list.subjects];
        updatedList.deleteItem(subjectIndex, chapterIndex, itemIndex);
        updatedList.setChapterProgressPercent(subjectIndex, chapterIndex);
        updatedList.setTotalProgressPercent(subjectIndex);
        changeList(updatedList);
    }
    const onClickItemChecked = (chapterIndex, itemIndex) => {
        axios.post('/api/items/updateCheck', {
            userId: userId,
            subjectName: subject.name,
            chapterName: chapters[chapterIndex].name,
            itemName: chapters[chapterIndex].items[itemIndex].name,
            checked: !chapters[chapterIndex].items[itemIndex].checked,
        });
        const updatedList = new Subjects();
        updatedList.subjects = [...list.subjects];
        updatedList.subjects[subjectIndex].chapters[chapterIndex].items[itemIndex].checked = !updatedList.subjects[subjectIndex].chapters[chapterIndex].items[itemIndex].checked;
        updatedList.setChapterProgressPercent(subjectIndex, chapterIndex);
        updatedList.setTotalProgressPercent(subjectIndex);
        changeList(updatedList);
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
                    <ProgressContainer style={{ marginLeft: "10%", width:"700px" }}>
                        <ProgressLeft >
                            <SubjectCheckbox onClick={() => onClickItemChecked(chapterIndex, itemIndex)}>{item.checked ? <MdOutlineCheckBox size="24" /> : <MdCheckBoxOutlineBlank size="24" />}</SubjectCheckbox>
                            <div>{item.name}</div></ProgressLeft>
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