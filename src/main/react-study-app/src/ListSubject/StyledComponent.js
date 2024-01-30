import styled from "styled-components";


const SubjectName = styled.div`

    background-color:inherit;
    color:${({theme})=>theme.color.black};
    font-size:19px;
    font-weight:900;
`;
const SubjectDelete = styled.button`
    padding:0px;
    border:none;
    background-color: inherit;
    position:relative;
    top:1px;

`;
const SubjectEdit = styled.button`
    padding:0px;
    border:none;
    background-color: inherit;
`;

const SubjectCheckbox = styled.button`
    border:none;
    background-color: inherit;
    display:flex;
    flex-direction:column;
    justify-content:start;
    position:relative;
    top:-3px;
`;
const SubjectToggle = styled.button`
    border:none;
    background-color: inherit;
    position:relative;
    bottom:2px;
    display:flex;
    flex-direction:column;
    justify-content:start;
`;

export {
 SubjectName, SubjectDelete,
    SubjectEdit, SubjectCheckbox, SubjectToggle
};