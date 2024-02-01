import { createSlice, configureStore } from '@reduxjs/toolkit';
import axios from 'axios';

const listSlice = createSlice({
    name: 'listSlice',
    initialState: {
        subjects: [],
    },
    reducers: {
        fetchSubjects: (state, action) => {
            state.subjects.push({
                subjectName: action.subjectName,
                progressPercent: 0,
                taskPercent: 0,
                chapters: [],
                tasks: [],
            });
        },
        fetchChapters: (state, action) => {
            state.subjects[action.subjectIndex].chapters.push({
                chapterName: action.chapterName,
                showingItems: false,
                progressPercent: 0,
                checked: action.checked,
                items: []
            });
        },
        fetchItems: (state, action) => {
            state.subjects[action.subjectIndex].chapters[action.chapterIndex].items.push({
                itemName: action.itemName,
                checked: action.checked
            })
        },
        fetchTasks: (state, action) => {
            
            state.subjects[action.subjectIndex].tasks.push({
                taskName: action.taskName,
                year: action.year,
                month: action.month,
                day: action.day,
                checked: action.checked
            })
        },
        addSubject: (state, action) => {
            const subjectInput = action.subjectInput;
            const userId = action.userId;
            console.log(subjectInput);
            if (subjectInput === "") return;
            else {
                axios.post('/api/subjects/create', {
                    userId: userId,
                    name: subjectInput
                })
                // .then((res) => {
                //     if (!res.data) {
                //         alert("중복된 과목 이름입니다");
                //         return;
                //     }
                //     else {
                //         state.subjects.push({
                //             subjectName: action.subjectName,
                //             progressPercent: 0,
                //             taskPercent: 0,
                //             chapters: [],
                //             tasks: [],
                //         });
                //     }
                // })
            }
        },
        addChapter: (state, action) => {
            const subject = state.subjects[action.subjectIndex];
            axios.post('/api/chapters/create', {
                userId: action.userId,
                subjectName: subject.subjectName,
                chapterName: action.chapterInput
            })
            console.log("chapter input = " + action.chapterInput);
            console.log("subject name = "+ subject.subjectName);
            if (action.chapterInput === "") return;
            subject.chapters.push({
                chapterName: action.chapterInput,
                showingItems: false,
                progressPercent: 0,
                checked: false,
                items: []
            })
        },
        addItem: (state, action) => {
            const subject = state.subjects[action.subjectIndex];
            const chapter = subject.chapters[action.chapterIndex];
            axios.post('/api/items/create', {
                userId: action.userId,
                subjectName: subject.subjectName,
                chapterName: chapter.chapterName,
                itemName: action.itemInput
            })
            chapter.items.push({
                itemName: action.itemInput,
                checked: false
            })
        },
        addTask: (state, action) => {
            const subject = state.subjects[action.subjectIndex];
            axios.post('/api/tasks/create', {
                userId: action.userId,
                subjectName: subject.name,
                taskName: action.taskInput,
                year: action.year,
                month: action.month,
                day: action.day
            })
            subject.tasks.push({
                taskName: action.taskInput,
                deadLine: new Date(action.year, action.month - 1, action.day),
                checked: false
            })
        },
        deleteSubject: (state, action) => {
            axios.post('/api/subjects/delete', {
                userId: action.userId,
                name: state.subjects[action.subjectIndex].subjectName,
            });
            state.subjects.splice(action.subjectIndex, 1);
        },
        deleteChapter: (state, action) => {
            const subject = state.subjects[action.subjectIndex];
            axios.post('/api/chapters/delete', {
                userId: action.userId,
                subjectName: subject.subjectName,
                chapterName: subject.chapters[action.chapterIndex].chapterName
            });
            subject.chapters.splice(action.chapterIndex, 1);
        },
        deleteItem: (state, action) => {
            const subject = state.subjects[action.subjectIndex];
            const chapter = subject.chapters[action.chapterIndex];
            const item = chapter.items[action.itemIndex];
            axios.post('/api/items/delete', {
                userId: action.userId,
                subjectName: subject.subjectName,
                chapterName: chapter.chapterName,
                itemName: item.itemName
            });
            chapter.items.splice(action.itemIndex, 1);
        },
        deleteTask: (state, action) => {
            const subject = state.subjects[action.subjectIndex];
            const task = subject.tasks[action.taskIndex];
            axios.post('/api/tasks/delete', {
                userId: action.userId,
                subjectName: subject.subjectName,
                taskName: task.taskName,
            });
            subject.tasks.splice(action.taskindex, 1);
        },
        setChapterPercent: (state, action) => {
            const chapter = state.subjects[action.subjectIndex].chapters[action.chapterIndex];
            let count = 0;
            chapter.items.map((item) => {
                if (item.checked) count = count + 1;
                return item;
            })
            if (chapter.checked === true)
                chapter.progressPercent = 100;
            else if (chapter.items.length === 0)
                chapter.progressPercent = 0;
            else
                chapter.progressPercent = Math.round(100 * count / chapter.items.length);
        },
        setSubjectProgressPercent: (state, action) => {
            const subject = state.subjects[action.subjectIndex];
            let sum = 0;
            subject.chapters.map(chapter => {
                sum = sum + chapter.progressPercent;
                return chapter;
            })
            if (subject.chapters.length === 0) subject.progressPercent = 0;
            else subject.progressPercent = Math.round(sum / subject.chapters.length);
        },
        setSubjectTaskPercent: (state, action) => {
            const subject = state.subjects[action.subjectIndex];
            let sum = 0;
            let checked = 0;
            subject.tasks.map(task => {
                sum = sum + 1;
                if (task.checked) { checked = checked + 1; }
                return task;
            })
            if (sum === 0) { subject.taskPercent = 0; }
            else { subject.taskPercent = Math.round(checked / sum * 100); }
        },
        editSubjectName: (state, action) => {
            axios.post('/api/subjects/update', {
                userId: action.userId,
                name: state.subjects[action.subjectIndex].subjectName,
                newName: action.newName,
            })
            state.subjects[action.subjectIndex].subjectName = action.newName;
        },
        editChapterName: (state, action) => {
            const subject = state.subjects[action.subjectIndex];
            const chapter = subject.chapters[action.chapterIndex];
            axios.post('/api/chapters/update', {
                userId: action.userId,
                subjectName: subject.name,
                name: chapter.name,
                newName: action.newName
            })
            chapter.chapterName = action.newName;
        },
        editTaskName: (state, action) => {
            const subject = state.subjects[action.subjectIndex];
            const task = subject.tasks[action.taskIndex];
            axios.post('/api/tasks/update', {
                userId: action.userId,
                subjectName: subject.subjectName,
                taskName: task.taskName,
                newName: action.newName
            })
        },
        convertShowingItems: (state, action) => {
            state.subjects[action.subjectIndex].chapters[action.chapterIndex].showingItems =
                !state.subjects[action.subjectIndex].chapters[action.chapterIndex].showingItems;
        },
        convertChapterChecked: (state, action) => {
            const subject = state.subjects[action.subjectIndex];
            const chapter = subject.chapters[action.chapterIndex];
            //수정해야할듯.
            axios.post('/api/chapters/updateCheck', {
                userId: action.userId,
                subjectName: subject.subjectName,
                chapterName: chapter.chapterName,
                checked: !chapter.checked,
            });
            if (chapter.progressPercent === 100) {
                chapter.items.map(item => { item.checked = false; return item; })
                chapter.checked = false
            } else {
                chapter.items.map(item => { item.checked = true; return item; })
                chapter.checked = true;
            }
        },
        convertItemChecked: (state, action) => {
            const subject = state.subjects[action.subjectIndex];
            const chapter = subject.chapters[action.chapterIndex];
            const item = chapter.items[action.itemIndex];
            axios.post('/api/items/updateCheck', {
                userId: action.userId,
                subjectName: subject.subjectName,
                chapterName: chapter.chapterName,
                itemName: item.itemName,
                checked: !item.checked,
            });
            item.checked = !item.checked;
        },
        convertTaskChecked: (state, action) => {
            const task = state.subjects[action.subjectIndex].tasks[action.taskIndex];
            task.checked = !task.checked;
        }

    }
})
const store = configureStore({
    reducer: {
        list: listSlice.reducer
    }
});

export default store;