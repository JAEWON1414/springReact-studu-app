import React from 'react';

import { MdOutlineCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import { TiDeleteOutline } from "react-icons/ti";
import Subjects from './Subjects';
import { Header, Title, Input } from './SubjectArea';
import { FaPlus } from "react-icons/fa6";
import styled from 'styled-components';
import axios from 'axios';

const Form = styled.form`
    display:flex;
    justify-content:start;
    flex-direction:column;
    border:1px solid rgb(56,55,67);
    border-radius:10px;
    // background-color:rgb(179,178,199);
    font-family: "kim-jung-chul-myungjo", sans-serif;
    padding:10px;
    margin-top:10px;
`;
const SelectContainer = styled.div`
    display:flex;
    justify-content:space-around;
    flex-direction:row;
`;

const TaskContainer = styled.div`
    display:flex;
    justify-content:space-around;
    flex-direction:row;
    background-color:${({ theme }) => theme.color.darkGray};
    border-radius:10px;
    border:10px solid ${({ theme }) => theme.color.darkGray};
    margin-bottom:10px;
`;
const TaskName = styled.div`
    font-size:16px;
    width:150px;
`;

const TaskBody = styled.div`
        width:100%;
    `;
    const DeadLine = styled.div`
        color:${({theme})=>theme.color.white};
        font-size:12px;
        width:100%;
    `;
    const CheckBox = styled.button`
        border:none;
        background-color: inherit;
        position:relative;
        top:-8px;
    `;
    const DeleteBtn = styled.button`
        border:none;
        background-color: inherit;
        position:relative;
        top:-8px;
    `;
    
function TaskArea({ subjectIndex, list, changeList, userId }) {
    const subject = list.subjects[subjectIndex];
    const tasks = subject.tasks;
    const [taskInput, setTaskInput] = React.useState("");
    const months = Array.from({ length: 12 }, (_, index) => index + 1);
    const days = Array.from({ length: 31 }, (_, index) => index + 1);
    const [selectedYear, setSelectedYear] = React.useState("2024");
    const [selectedMonth, setSelectedMonth] = React.useState("1");
    const [selectedDay, setSelectedDay] = React.useState("1");
    const now = new Date();

    const onChangeTaskInput = (e) => { setTaskInput(e.target.value); }
    const onChangeYear = (e) => { setSelectedYear(e.target.value); }
    const onChangeMonth = (e) => { setSelectedMonth(e.target.value); }
    const onChangeDay = (e) => { setSelectedDay(e.target.value); }

    const onSubmitTask = (event) => {
        event.preventDefault();
        axios.post('/api/tasks/create',{
            userId:userId,
            subjectName:subject.name,
            taskName:taskInput,
            // deadLine: new Date(selectedYear, selectedMonth - 1, selectedDay).toISOString(),
            year:selectedYear,
            month:selectedMonth,
            day:selectedDay
        })
        const updatedList = new Subjects();
        updatedList.subjects = [...list.subjects];
        updatedList.addTask(subjectIndex, taskInput, selectedYear, selectedMonth, selectedDay);
        updatedList.setTaskPercent(subjectIndex);
        changeList(updatedList);
        setTaskInput("");
    }
    const onClickTaskChecked = (taskIndex) => {
        const updatedList = new Subjects();
        updatedList.subjects = [...list.subjects];
        updatedList.subjects[subjectIndex].tasks[taskIndex].checked = !updatedList.subjects[subjectIndex].tasks[taskIndex].checked
        updatedList.setTaskPercent(subjectIndex);
        changeList(updatedList);
    }
    const onClickDeleteTask = (taskIndex) => {
        axios.post('/api/tasks/delete',{
            userId: userId,
            subjectName: subject.name,
            taskName:tasks[taskIndex].name,
        })
        const updatedList = new Subjects();
        updatedList.subjects = [...list.subjects];
        updatedList.deleteTask(subjectIndex, taskIndex);
        updatedList.setTaskPercent(subjectIndex);
        changeList(updatedList);
    }

    
    return (
        <div style={{ width: "45%", borderLeft: "2px solid", paddingLeft: "20px" }}>
            <Header>
                <Title>과제관리</Title>
                <Form onSubmit={onSubmitTask} >
                    <div style={{ marginBottom: "5px" }}>
                        <FaPlus style={{ marginRight: "5px" }}></FaPlus>
                        <Input type="text" value={taskInput} placeholder="입력" maxLength={10}
                            onChange={onChangeTaskInput} />
                    </div>
                    <SelectContainer>
                        기한
                        <select onChange={onChangeYear}>
                            <option value="2024">2024</option>
                            <option value="2025">2025</option></select>년
                        <select onChange={onChangeMonth}>
                            {months.map(month => (
                                <option key={month} value={month}>{month}</option>
                            ))}</select>월
                        <select onChange={onChangeDay}>
                            {days.map(day => (
                                <option key={day} value={day}>{day}</option>
                            ))}</select>일
                    </SelectContainer>
                </Form>
            </Header>

            <ul style={{ padding: "0" }}>{tasks.map((task, taskIndex) => (
                <li key={taskIndex}>
                    <TaskContainer>
                        <CheckBox onClick={() => onClickTaskChecked(taskIndex)}>{task.checked === true ? <MdOutlineCheckBox size="24" /> : <MdCheckBoxOutlineBlank size="24" />}</CheckBox>
                        <TaskBody>
                            <TaskName>{task.name}</TaskName>
                            <DeadLine>
                                {task.deadLine.toLocaleDateString('ko-KR', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })+" "}
                                ({Math.round((now - task.deadLine) / (24 * 60 * 60 * 1000) - 1) > 0 ?
                                    "D+" + Math.round((now - task.deadLine) / (24 * 60 * 60 * 1000) - 1)
                                    : Math.round((now - task.deadLine) / (24 * 60 * 60 * 1000) - 1) !== 0 ?
                                        "D-" + (-1) * Math.round((now - task.deadLine) / (24 * 60 * 60 * 1000) - 1)
                                        : "D-day"
                                })
                            </DeadLine>
                        </TaskBody>
                        <div className='d-flex justify-content-start'>
                            <DeleteBtn onClick={() => onClickDeleteTask(taskIndex)}><TiDeleteOutline size="24" /></DeleteBtn>
                        </div>
                    </TaskContainer>
                </li>
            ))}

            </ul>
        </div>

    );
}

export default TaskArea;