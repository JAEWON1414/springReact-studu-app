
import React from 'react';
import Subjects from './Subjects';
import { IoIosArrowDropleft, IoIosArrowDropdown } from "react-icons/io";
import { MdOutlineCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import { TiDeleteOutline } from "react-icons/ti";
import { SubjectCheckbox, SubjectToggle, SubjectInput, SubjectName, SubjectDelete } from './StyledComponent';
import styled from 'styled-components';
import axios from "axios";


const AreaDetail = styled.div`
    // background-color: rgb(195,194,213);
    width :850px;
    margin-left:30px;
    // border:10px solid rgb(195,194,213);
    // border-radius:25px;
`;
const DetailWraper = styled.div`
background-color: rgb(195,194,213);
width :750px;
border:10px solid rgb(195,194,213);
border-radius:25px;
`;

const DetailHeader = styled.div`
    display:flex;
    justify-content:center;
    flex-direction:row;
    margin-bottom:20px;
    font-family: "kim-jung-chul-myungjo", sans-serif;
    font-size:25px;
    font-weight:900;
`;

const DetailBody = styled.div`
    display:flex;
    justify-content:space-around;
    flex-direction:row;
    width:84%;
    margin-left:8%;
`;

const LineProgressbar = styled.progress`
    // background-color:rgb(139, 123, 244);
    width:70px;
`;
function DetailArea({ subjectIndex, list, changeList, userId }) {
    const subject = list.subjects[subjectIndex];
    const chapters = list.subjects[subjectIndex].chapters;
    const [chapterInput, setChapterInput] = React.useState("");
    const [itemInput, setItemInput] = React.useState([]);
    const onClickShowingItems = (chapterIndex) => {
        const updatedList = new Subjects();
        updatedList.subjects = [...list.subjects];
        updatedList.convertShowingItems(subjectIndex, chapterIndex);
        changeList(updatedList);
    }
    const onChangechapterInput = (event) => {
        setChapterInput(event.target.value);
    };
    const onChangeItemInput = (value, chapterIndex) => {
        const updatedItemInput = [...itemInput];
        if (updatedItemInput[chapterIndex] === undefined) updatedItemInput[chapterIndex] = ""
        updatedItemInput[chapterIndex] = value
        setItemInput(updatedItemInput);
    }
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

    return (subject !== undefined && (
        <AreaDetail>
            <DetailWraper>

                <DetailHeader>{subject.name} ({subject.progressPercent}%)</DetailHeader>

                <DetailBody>
                    <div style={{width:"42%"}}>
                        진도관리
                        <form onSubmit={onSubmitChapterInput}>
                            <SubjectInput
                                type="text"
                                placeholder='Write name'
                                value={chapterInput}
                                onChange={onChangechapterInput} />
                        </form>
                        <ul>{chapters.map((chapter, chapterIndex) => (
                            <li key={chapterIndex}>
                                <span style={{ height: "100px" }}>
                                    <SubjectName>{chapterIndex + 1 + ". " + chapter.name} ({chapter.progressPercent}%) <LineProgressbar value={chapter.progressPercent} max="100"></LineProgressbar></SubjectName>
                                    <SubjectToggle onClick={() => onClickShowingItems(chapterIndex)}>{chapter.showingItems ? <IoIosArrowDropleft size="24" /> : <IoIosArrowDropdown size="24" />}</SubjectToggle>
                                    <SubjectCheckbox onClick={() => onClickChapterChecked(chapterIndex)}>{chapter.progressPercent === 100 ? <MdOutlineCheckBox size="24" /> : <MdCheckBoxOutlineBlank size="24" />}</SubjectCheckbox>
                                    <SubjectDelete onClick={() => onClickDeleteChapter(chapterIndex)}><TiDeleteOutline size="24" /></SubjectDelete>
                                </span>
                                {chapter.showingItems ?
                                    <form onSubmit={(event) => onSubmitItemInput(event, chapterIndex)}>
                                        <SubjectInput type="Text"
                                            placeholder='Write Item'
                                            value={itemInput[chapterIndex] || ""}
                                            onChange={(event) => onChangeItemInput(event.target.value, chapterIndex)} />
                                    </form> : null}
                                <ul>{chapter.items.map((item, itemIndex) => (chapter.showingItems &&
                                    <li key={itemIndex}>
                                        <SubjectName>{chapterIndex + 1}-{itemIndex + 1}. {item.name}</SubjectName>
                                        <SubjectCheckbox onClick={() => onClickItemChecked(chapterIndex, itemIndex)}>{item.checked ? <MdOutlineCheckBox size="24" /> : <MdCheckBoxOutlineBlank size="24" />}</SubjectCheckbox>
                                        <SubjectDelete onClick={() => onClickDeleteItem(chapterIndex, itemIndex)}><TiDeleteOutline size="24" /></SubjectDelete>
                                    </li>
                                ))}
                                </ul>
                            </li>
                        ))}
                        </ul>
                    </div>
                    <div style={{width:"42%",borderLeft:"2px solid", paddingLeft:"20px"}}>
                        과제관리

                    </div>
                </DetailBody>
            </DetailWraper>
        </AreaDetail>)
    );
}

export default DetailArea;