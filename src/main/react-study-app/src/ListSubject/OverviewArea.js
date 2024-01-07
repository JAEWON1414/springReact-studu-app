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
    height:37px;`;

const SubjectWrapper = styled.div`
    height:150px;
    width:150px;
    background-color: rgba(167, 155, 243,0.7);
    display:flex;
    justify-content: space-between;
    flex-direction: column;
    padding-top:0px;
    pading-bottom:30px;
    border:4px solid rgb(167, 155, 243);
    box-shadow : 5px 5px 5px rgba(0,0,0,0.2);
    border-radius:25px;
    &:hover {
        box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.3);
      }
`;

const AreaOverview = styled.ul`
    display:grid;
    grid-template-columns: repeat(auto-fill, 180px);
    grid-row-gap: 20px;
    grid-auto-rows: 180px;
    width: min(calc(100% - 300px), 70%);`;
function OverviewArea({ list, changeList, showingIndex, changeShowingIndex, userId }) {
    const CircularProgressBar = ({ percentage }) => {
        return (
            <div style={{ width: '90px', margin: 'auto' }}>
                <CircularProgressbar
                    value={percentage}
                    text={`${percentage}%`}
                    styles={buildStyles({
                        textColor: 'black',
                        pathColor: 'rgb(139, 123, 244);',
                        trailColor: '#d6d6d6',
                        height: '30%',
                    })}
                />
            </div>
        );
    };

    const onClickDeleteSubject = (index) => {
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
    const onClickShowing = (index) => {
        changeShowingIndex(index);
    }
    return (
        <AreaOverview>
            {list.subjects.map((subject, index) => (
                (<li key={index}>
                    <SubjectWrapper>
                        <SubjectHeader>
                            <SubjectName onClick={() => onClickShowing(index)}> {index + 1 + ". " + subject.name}</ SubjectName>
                            <span>
                                <SubjectEdit> <FiEdit size="20" /> </SubjectEdit>
                                <SubjectDelete onClick={() => onClickDeleteSubject(index)}><TiDeleteOutline size="24" /></SubjectDelete>
                            </span>
                        </SubjectHeader>
                        <CircularProgressBar percentage={subject.progressPercent} />
                    </SubjectWrapper>
                </li>)
            ))}
        </AreaOverview>
    )
}

export default OverviewArea;