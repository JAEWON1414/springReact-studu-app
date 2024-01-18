import React from 'react';
import DetailArea from './DetailArea';
import Subjects from './Subjects';
import OverviewArea from './OverviewArea';
import { SubjectInput } from './StyledComponent';
import { } from './style.module.css';
import styled from 'styled-components';
import axios from "axios";
import { FaPlus } from "react-icons/fa6";
const AreaContainer = styled.div`
    display:flex;
    justify-content: space-between;
    flex-direction: row;`;
const SubjectAddBtn = styled.button`
    margin-left:12%;
    color:rgb(89,88,103);
    border:none;
    width:20px;
    height:20px;
    margin-right:5px;
`;
const SubjectAddForm = styled.form`
    margin-top:10px;
    height:20px;
`;

function ListSubject({ userId }) {
    const [subject, setSubject] = React.useState("");
    const [list, setList] = React.useState(new Subjects());
    const [showingIndex, setShowingIndex] = React.useState(-1);
    const onChangeSubject = (event) => {
        setSubject(event.target.value);
    }
    const onChangeShowingIndex = (updatedShowingIndex) => {
        setShowingIndex(updatedShowingIndex);
    }
    const onSubmitSubject = (event) => {
        event.preventDefault();
        axios.post('/api/subjects/create', {
            userId: userId,
            name: subject
        })
            .then((res) => {
                if (!res.data) {
                    alert("중복된 과목 이름입니다");
                }
            })
        if (subject === "") return;
        setList(prevList => {
            const updatedList = new Subjects();
            updatedList.subjects = [...prevList.subjects];
            updatedList.addSubject(subject);
            return updatedList;
        })
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
                <SubjectInput style={{width:"150px"}}type="Text"
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