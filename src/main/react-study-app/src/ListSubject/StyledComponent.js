import styled from "styled-components";

const SubjectInput = styled.input`
    background-color:white;
    border:none;
    outline: none;
    border-radius:5px;
    padding:5px;
    border:1px solid rgba(88,89,103,0.5);
    font-family: "kim-jung-chul-myungjo", sans-serif;
`;
const SubjectName = styled.button`
    margin-top:0px;
    width:120px;
    height:100%;
    border:none;
    background-color:rgb(195,194,213);
    font-family: "kim-jung-chul-myungjo", sans-serif;
    font-size:17px;
    border-radius:13px;
    // &:hover {
    //     box-shadow: 6px 6px 6px rgba(0, 0, 0, 0.3);
    //   }
`;
const SubjectDelete = styled.button`
    margin-top:0px;
    padding:0px;
    width:25px;
    height:100%;
    font-size:30px;
    border:none;
    background-color: inherit;
`;
const SubjectEdit = styled.button`
    margin-top:0px;
    padding-top:0px;
    width:25px;
    height:100%;
    border:none;
    background-color: inherit;
`;

const SubjectCheckbox = styled.button`
    border:none;
    background-color: inherit;
`;
const SubjectToggle = styled.button`
    border:none;
    background-color: inherit;
`;

export {
    SubjectInput, SubjectName, SubjectDelete,
    SubjectEdit, SubjectCheckbox, SubjectToggle
};