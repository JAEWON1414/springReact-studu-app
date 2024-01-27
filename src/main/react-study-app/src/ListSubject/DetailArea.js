
import React from 'react';
import styled from 'styled-components';
import SubjectArea from './SubjectArea';
import TaskArea from './TaskArea';


const AreaDetail = styled.div`
    min-width:710px;
    width:65%;
    margin-left:15px;
`;
const DetailWraper = styled.div`
    background-color: ${({theme})=>theme.color.lightGray};
    border: 10px solid ${({theme})=>theme.color.lightGray};
    border-radius:25px;
    box-shadow : 5px 5px 5px rgba(0,0,0,0.2);
    &:hover {
        box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.3);
      }
`;

const DetailHeader = styled.div`
    margin-top:2%;
    margin-left:3%;
    margin-bottom:10px;
    font-size:25px;
    font-weight:900;
`;

const DetailBody = styled.div`
    display:flex;
    justify-content:space-around;
    flex-direction:row;
`;

function DetailArea({ subjectIndex, list, changeList, userId }) {
    const subject = list.subjects[subjectIndex];

    return (subject !== undefined && (
        <AreaDetail>
            <DetailWraper>
                <DetailHeader>{subject.name}</DetailHeader>
                <DetailBody>
                    <SubjectArea subjectIndex={subjectIndex} list={list} changeList={changeList} userId={userId}/>
                    <TaskArea subjectIndex={subjectIndex} list={list} changeList={changeList} userId={userId}/>
                </DetailBody>
            </DetailWraper>
        </AreaDetail>)
    );
}

export default DetailArea;