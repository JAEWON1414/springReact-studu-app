import React from 'react';
import DetailArea from './DetailArea';
import Subjects from './Subjects';
import OverviewArea from './OverviewArea';
import styled from 'styled-components';
import axios from "axios";
import { FaPlus } from "react-icons/fa6";

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
    const [subject, setSubject] = React.useState("");
    const [list, setList] = React.useState(new Subjects());
    const [showingIndex, setShowingIndex] = React.useState(0);
    const onChangeSubject = (event) => {
        setSubject(event.target.value);
    }
    const onChangeShowingIndex = (updatedShowingIndex) => {
        setShowingIndex(updatedShowingIndex);
    }
    const onSubmitSubject = (event) => {
        event.preventDefault();
        if (subject === "") return;
        else {
            axios.post('/api/subjects/create', {
                userId: userId,
                name: subject
            })
                .then((res) => {
                    if (!res.data) {
                        alert("중복된 과목 이름입니다");
                        return;
                    }
                    else {
                        setList(prevList => {
                            const updatedList = new Subjects();
                            updatedList.subjects = [...prevList.subjects];
                            updatedList.addSubject(subject);
                            return updatedList;
                        })
                    }
                })
        }

        setSubject("");
    }
    const changeList = (updatedList) => {
        setList(updatedList);
    }
    const fetchData = async () => {
        try {
            const subjectsResponse = await axios.post('/api/subjects', userId);
            const subjectsFromServer = subjectsResponse.data;
            const updatedList = new Subjects([...list.subjects]);
            for (let subjectIndex = 0; subjectIndex < subjectsFromServer.length; subjectIndex++) {
                const subject = subjectsFromServer[subjectIndex];
                updatedList.addSubject(subject.name);
                const chaptersResponse = await axios.post('/api/chapters', {
                    userId: userId,
                    subjectName: subject.name,
                });
                const chaptersFromServer = chaptersResponse.data;
                for (let chapterIndex = 0; chapterIndex < chaptersFromServer.length; chapterIndex++) {
                    const chapter = chaptersFromServer[chapterIndex];
                    updatedList.addChapter(subjectIndex, chapter.chapterName);
                    updatedList.subjects[subjectIndex].chapters[chapterIndex].checked = chapter.checked;
                    const itemResponse = await axios.post('/api/items', {
                        userId: userId,
                        subjectName: subject.name,
                        chapterName: chapter.chapterName,
                    });
                    const itemsFromServer = itemResponse.data;
                    for (let itemIndex = 0; itemIndex < itemsFromServer.length; itemIndex++) {
                        const item = itemsFromServer[itemIndex];
                        updatedList.addItem(subjectIndex, chapterIndex, item.itemName);
                        updatedList.subjects[subjectIndex].chapters[chapterIndex].items[itemIndex].checked = item.checked;
                    }
                    updatedList.setChapterProgressPercent(subjectIndex, chapterIndex);
                }
                
                updatedList.setTotalProgressPercent(subjectIndex);
                const taskResponse = await axios.post('/api/tasks',{
                    userId: userId,
                    subjectName: subject.name,
                })
                const tasksFromServer = taskResponse.data;
                for(let taskIndex = 0; taskIndex < tasksFromServer.length; taskIndex++){
                    const task = tasksFromServer[taskIndex];
                    updatedList.addTask(subjectIndex,task.taskName, task.year, task.month, task.day);
                    updatedList.subjects[subjectIndex].tasks[taskIndex].checked = task.checked;
                }
                updatedList.setTaskPercent(subjectIndex);
            }
            setList(updatedList);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    React.useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <div>
            <SubjectAddForm onSubmit={onSubmitSubject}>
                <SubjectAddBtn><FaPlus></FaPlus></SubjectAddBtn>
                <SubjectInput style={{ width: "150px" }} type="Text"
                    value={subject} placeholder="과목명" onChange={onChangeSubject} />
            </SubjectAddForm>
            <AreaContainer>
                <OverviewArea list={list} changeList={changeList} showingIndex={showingIndex} changeShowingIndex={onChangeShowingIndex} userId={userId} />
                {showingIndex !== -1 ?
                    <DetailArea subjectIndex={showingIndex} list={list} changeList={changeList} userId={userId} /> : null}
            </AreaContainer>
        </div>
    );
}
export default ListSubject;