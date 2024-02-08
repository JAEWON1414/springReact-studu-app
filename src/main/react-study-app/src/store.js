import { createSlice, configureStore } from '@reduxjs/toolkit';
import axios from 'axios';

//TODO
//과제 체크

const listSlice = createSlice({
    name: 'listSlice',
    initialState: {
        subjects: [],
    },
    reducers: {
        //fetch//
        fetchSubjects: (state, action) => {
            state.subjects.push({
                subjectName: action.subjectName,
                progressPercent: 0,
                taskPercent: 0,
                checkedTasks: 0,
                priority: action.priority,
                chapters: [],
                tasks: [],
            });
        },
        fetchChapters: (state, action) => {
            state.subjects[action.subjectIndex].chapters.push({
                chapterName: action.chapterName,
                showingItems: false,
                chapterPercent: action.chapterPercent,
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
        //add//
        addSubject: (state, action) => {
            const subjectInput = action.subjectInput;
            const userId = action.userId;
            if (subjectInput === "") return;
            else {
                const priority = new Date().getTime();
                axios.post('/api/subjects/create', {
                    userId: userId,
                    name: subjectInput,
                    priority: priority
                })
                state.subjects.push({
                    subjectName: subjectInput,
                    progressPercent: 0,
                    taskPercent: 0,
                    checkedTasks: 0,
                    priority: priority,
                    chapters: [],
                    tasks: [],
                })
            }
        },
        addChapter: (state, action) => {
            const subject = state.subjects[action.subjectIndex];
            if (action.chapterInput === "") return;
            axios.post('/api/chapters/create', {
                userId: action.userId,
                subjectName: subject.subjectName,
                chapterName: action.chapterInput,
                chapterPercent: 0
            })
            subject.chapters.push({
                chapterName: action.chapterInput,
                showingItems: false,
                chapterPercent: 0,
                checked: false,
                items: []
            })
        },
        addItem: (state, action) => {
            const subject = state.subjects[action.subjectIndex];
            const chapter = subject.chapters[action.chapterIndex];
            const itemInput = action.itemInput;
            if (itemInput === "") return;
            axios.post('/api/items/create', {
                userId: action.userId,
                subjectName: subject.subjectName,
                chapterName: chapter.chapterName,
                itemName: itemInput
            })
            chapter.items.push({
                itemName: itemInput,
                checked: false
            })
        },
        addTask: (state, action) => {
            const subject = state.subjects[action.subjectIndex];
            axios.post('/api/tasks/create', {
                userId: action.userId,
                subjectName: subject.subjectName,
                taskName: action.taskInput,
                year: action.year,
                month: action.month,
                day: action.day
            })
            subject.tasks.push({
                taskName: action.taskInput,
                year: action.year,
                month: action.month - 1,
                day: action.day,
                checked: false
            })
        },
        //delete
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
        //set Percent//
        setChapterPercent: (state, action) => {
            const chapter = state.subjects[action.subjectIndex].chapters[action.chapterIndex];
            let count = 0;
            chapter.items.map((item) => {
                if (item.checked) count = count + 1;
                return item;
            })
            if (chapter.items.length === 0)
                chapter.chapterPercent = 0;
            else
                chapter.chapterPercent = Math.round(100 * count / chapter.items.length);
        },
        setSubjectProgressPercent: (state, action) => {
            const subject = state.subjects[action.subjectIndex];
            let sum = 0;
            subject.chapters.map(chapter => {
                sum = sum + chapter.chapterPercent;
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
            subject.checkedTasks = checked;
            if (sum === 0) { subject.taskPercent = 0; }
            else { subject.taskPercent = Math.round(checked / sum * 100); }
        },
        //convert check//
        convertChapterChecked: (state, action) => {
            const subject = state.subjects[action.subjectIndex];
            const chapter = subject.chapters[action.chapterIndex];
            if (chapter.chapterPercent === 100) {
                chapter.items.map(item => { item.checked = false; return item; })
                axios.post('/api/items/updateCheckByChapterName', {
                    userId: action.userId,
                    subjectName: subject.subjectName,
                    chapterName: chapter.chapterName,
                    checked : false
                });
                chapter.chapterPercent = 0;
            } else {
                chapter.items.map(item => { item.checked = true; return item; })
                axios.post('/api/items/updateCheckByChapterName', {
                    userId: action.userId,
                    subjectName: subject.subjectName,
                    chapterName: chapter.chapterName,
                    checked : true
                });
                chapter.chapterPercent = 100;
            }
            axios.post('/api/chapters/updateCheck', {
                userId: action.userId,
                subjectName: subject.subjectName,
                chapterName: chapter.chapterName,
                chapterPercent: chapter.chapterPercent
            });
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
            const subject = state.subjects[action.subjectIndex];
            const task = state.subjects[action.subjectIndex].tasks[action.taskIndex];
            axios.post('/api/tasks/updateCheck',{
                userId:action.userId,
                subjectName:subject.subjectName,
                taskName:task.taskName,
                checked : !task.checked
            })
            task.checked = !task.checked;
        },
        //edit name//
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
        
        //Priority
        changePriority: (state, action) => {
            const subject = state.subjects[action.subjectIndex];
            if (subject.priority > 0)
                subject.priority = (4102444800000 - subject.priority) * -1;
            else
                subject.priority = 4102444800000 + subject.priority;
            axios.post('/api/subjects/updatePriority', {
                userId: action.userId,
                name: subject.subjectName,
                priority: subject.priority
            })
        },
        sortByPriority: (state) => {
            const subjects = state.subjects;
            for (let i = subjects.length - 1; i > 0; i--) {
                for (let j = 0; j < i; j++) {
                    if (subjects[j].priority > subjects[j + 1].priority) {
                        const temp = JSON.parse(JSON.stringify(subjects[j]));
                        subjects[j] = JSON.parse(JSON.stringify(subjects[j + 1]));
                        subjects[j + 1] = JSON.parse(JSON.stringify(temp));
                    }
                }
            }
        },
        sortTask : (state, action)=>{
            console.log("ok")
            const tasks = state.subjects[action.subjectIndex].tasks;
            for (let i = tasks.length - 1; i > 0; i--) {
                for (let j = 0; j < i; j++) {

                    if (new Date(tasks[j].year, tasks[j].month, tasks[j].day).getTime()
                     > new Date(tasks[j+1].year, tasks[j+1].month, tasks[j+1].day).getTime()) {
                        const temp = JSON.parse(JSON.stringify(tasks[j]));
                        tasks[j] = JSON.parse(JSON.stringify(tasks[j + 1]));
                        tasks[j + 1] = JSON.parse(JSON.stringify(temp));
                    }
                }
            }
        },
        //toggle//
        convertShowingItems: (state, action) => {
            state.subjects[action.subjectIndex].chapters[action.chapterIndex].showingItems =
                !state.subjects[action.subjectIndex].chapters[action.chapterIndex].showingItems;
        }

    }
})
const store = configureStore({
    reducer: {
        list: listSlice.reducer
    }
});

export default store;
