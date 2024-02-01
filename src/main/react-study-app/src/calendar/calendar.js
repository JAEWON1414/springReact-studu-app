import React, { useState } from 'react';
import { format, addMonths, subMonths } from 'date-fns';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from 'date-fns';
// import { isSameMonth, isSameDay, addDays, parse } from 'date-fns';
import { isSameMonth, isSameDay, addDays } from 'date-fns';
// import { Icon } from '@iconify/react';
import './Calendar.css';
import { useSelector } from 'react-redux';

/*

    date-fns 설치 명령어*
    npm install date-fns --save

    Icon 설치 명령어(Icon사용 부분을 주석처리하고 버튼으로 대체하였기 때문에 필요 없음)
    npm install --save-dev @iconify/react

 */

//연, 월 표시부 + 월/연 변환부

const RenderTodoInCell = ({ todos }) => {
    return (
        <div>
            {todos && (
                <ul>
                    {todos.map((key, index) => (
                        <span key={index} className='todo-in-cell'>{key}</span>
                    ))}
                </ul>
            )}
        </div>
    );
};

const RenderHeader = ({ currentMonth, nextMonth, prevMonth, prevYear, nextYear }) => {
    return (
        <div className='header row'>
            <div className='col col-start'>
                <span className='text'>
                    <span className='text month'>
                        {format(currentMonth, 'M')}월
                    </span>
                    {format(currentMonth, 'yyyy')}
                </span>
            </div>
            <div className='col col-end'>
                {/* <Icon onClick = {prevMonth} icon="bi:arrow-left-circle-fill"/>
                <Icon onClick = {nextMonth} icon="bi:arrow-right-circle-fill"/>
                <Icon onClick = {prevYear} icon="bi:arrow-down-circle-fill"/>
                <Icon onClick = {nextYear} icon="bi:arrow-up-circle-fill"/> */}
                <button onClick={prevMonth}>{'<'}</button>
                <button onClick={nextMonth}>{'>'}</button>
                <button onClick={prevYear}>{'v'}</button>
                <button onClick={nextYear}>{'^'}</button>
            </div>
        </div>
    );
};


//SUN MON ... SAT 표시부
const RenderDays = () => {
    const days = [];
    const date = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

    for (let i = 0; i < 7; i++) {
        days.push(
            <div className='col' key={i}>
                {date[i]}
            </div>
        );
    }

    return <div className='days row'>{days}</div>
};


//날짜 표시부
const RenderCells = ({ currentMonth, selectedDate, onDateClick, todos }) => {
    // monthStart/monthEnd : 선택된 달의 첫 번째 날짜/마지막 날짜
    // startDate/endDate : 캘린더에 표시될 이전 달의/다음 달의 날짜(startDate: 일요일, endDate : 토요일)
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    const isTodonotNull = (date) => {
        return ((todos[date]) ? true : false);
    }

    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = '';

    while (day <= endDate) {
        for (let i = 0; i < 7; i++) {
            formattedDate = format(day, 'd');
            const cloneDay = day;
            days.push(
                <div className={`col cell ${!isSameMonth(day, monthStart)
                        ? 'disabled'
                        : isSameDay(day, selectedDate)
                            ? 'selected'
                            : format(currentMonth, 'M') !== format(day, 'M')
                                ? 'not-valid'
                                : 'valid'
                    } ${isTodonotNull(day) ? 'todo-exist' : null}`}
                    key={day}
                    onClick={() => onDateClick((cloneDay))}>
                    <span className={
                        format(currentMonth, 'M') !== format(day, 'M')
                            ? 'text-not-valid'
                            : ''}
                    >
                        {formattedDate}
                    </span>
                    <RenderTodoInCell
                        todos={todos[day]} />
                </div>
            );
            day = addDays(day, 1);
        }
        rows.push(
            <div className='row' key={day}>
                {days}
            </div>
        );
        days = [];
    }
    return <div className='body'>{rows}</div>

};


//todo 등록 + 표시부
//todos에 모든 일정 저장. 저장 형식은 {[날짜] : [value1, value2, ...], [날짜2] : [value1, ...]}
const RenderTodos = ({ todos, onTodoChange, currentDate }) => {
    const [newTodo, setNewTodo] = useState("");
    const onChange = (event) => {
        setNewTodo(event.target.value);
    }
    const onSubmit = (event) => {
        event.preventDefault();
        if (newTodo === "") {
            return;
        }
        setNewTodo("");
        onTodoChange(currentDate, newTodo);
    }
    return (
        <div>
            {/* todo 입력칸 */}
            <div className="inputTodos" >
                <form onSubmit={onSubmit}>
                    <input value={newTodo} onChange={onChange} />
                    <button>register</button>
                </form>
            </div>

            {/* 입력된 todo 표시칸 */}
            <div className='todoList'>
                {todos[currentDate] && (
                    <ul>
                        {todos[currentDate].map((todo, index) => (
                            <li key={index}>{todo}</li>
                        ))}
                    </ul>
                )}
            </div>

        </div>
    );
}

const Calendar = () => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [todos, setTodos] = useState({});


    ////subjects
    const subjects = useSelector(state => state.list.subjects);
    console.log(subjects);
    //이산수학-증명법-연역법 일 때
    //이산수학 가져오려면 subjects[이산수학 index].subjectName;
    //증명법 가져오려면 subjects[이산수학 index].chapteers[증명법 index].chapterName;
    //연역법 가져오려면 subjects[이산수학 index].chapters[증명법 index].items[연역법 index].itemName;
    //이산수학-과제1 가져오려면 subjects[이산수학 index].task[0].taskName;
    //이산수학-과제1 마감날짜 가져오려면 subjects[이산수학 index].task.year(month랑 day도 똑같이 가져오면 됨);
    //////
    const prevMonth = () => {
        setCurrentMonth(subMonths(currentMonth, 1));
    }
    const nextMonth = () => {
        setCurrentMonth(addMonths(currentMonth, 1));
    }
    const onDateClick = (day) => {
        setSelectedDate(day);
    }
    const prevYear = () => {
        setCurrentMonth(subMonths(currentMonth, 12));
    }
    const nextYear = () => {
        setCurrentMonth(addMonths(currentMonth, 12));
    }
    const onTodoChange = (date, value) => {
        setTodos((prevTodos) => {
            if (prevTodos[date]) {
                return { ...prevTodos, [date]: [...prevTodos[date], value] };
            } else {
                return { ...prevTodos, [date]: [value] };
            }
        });
    }

    return (
        <div>
            <div className='calendar'>
                <RenderHeader
                    currentMonth={currentMonth}
                    prevMonth={prevMonth}
                    nextMonth={nextMonth}
                    prevYear={prevYear}
                    nextYear={nextYear} />
                <RenderDays />
                <RenderCells
                    currentMonth={currentMonth}
                    selectedDate={selectedDate}
                    onDateClick={onDateClick}
                    todos={todos} />
            </div>
            <div className='todos'>
                <RenderTodos
                    todos={todos}
                    onTodoChange={onTodoChange}
                    currentDate={selectedDate} />
            </div>
        </div>
    );
};



export default Calendar;