
class Subjects {
    constructor() {
        this.subjects = [];
    }
    addSubject(subjectName) {
        this.subjects.push({
            name: subjectName,
            progressPercent: 0,
            taskPercent:0,
            chapters: [],
            tasks: []
        });
    }
    addChapter(subjectsIndex, chapterName) {
        this.subjects[subjectsIndex].chapters.push({
            name: chapterName,
            showingItems: false,
            progressPercent: 0,
            checked: false,
            items: []
        });
    }
    addTask(subjectsIndex, taskName, year, month, day) {
        this.subjects[subjectsIndex].tasks.push({
            name: taskName,
            deadLine: new Date(year, month - 1, day),
            checked: false,
        });
    }
    addItem(subjectIndex, chapterIndex, itemName) {
        this.subjects[subjectIndex].chapters[chapterIndex].items.push({
            name: itemName,
            checked: false
        });
    }
    deleteSubject(subjectIndex) {
        this.subjects.splice(subjectIndex, 1);
    }
    deleteChapter(subjectIndex, chapterIndex) {
        this.subjects[subjectIndex].chapters.splice(chapterIndex, 1);
    }
    deleteTask(subjectIndex, taskIndex) {
        this.subjects[subjectIndex].tasks.splice(taskIndex, 1);
    }
    deleteItem(subjectIndex, chapterIndex, itemIndex) {
        this.subjects[subjectIndex].chapters[chapterIndex].items.splice(itemIndex, 1);
    }
    findSubjectIndex(subjectName) {

        for (let i = 0; i < this.subjects.length; i++) {
            if (this.subjects[i].name === subjectName) {
                return i;
            }
        }
        return -1;
    }
    setChapterProgressPercent(subjectIndex, chapterIndex) {
        let count = 0;
        this.subjects[subjectIndex].chapters[chapterIndex].items.map((item) => {
            if (item.checked) count = count + 1;
            return item;
        })
        if (count === 0 && this.subjects[subjectIndex].chapters[chapterIndex].checked === false)
            this.subjects[subjectIndex].chapters[chapterIndex].progressPercent = 0;
        else if (count === 0 && this.subjects[subjectIndex].chapters[chapterIndex].checked === true)
            this.subjects[subjectIndex].chapters[chapterIndex].progressPercent = 100;
        else
            this.subjects[subjectIndex].chapters[chapterIndex].progressPercent = Math.round(100 * count / this.subjects[subjectIndex].chapters[chapterIndex].items.length);

    }
    setTotalProgressPercent(subjectIndex) {
        let sum = 0;
        this.subjects[subjectIndex].chapters.map((chapter, chapterIndex) => {
            sum = sum + chapter.progressPercent;
            return chapter;
        })
        if (this.subjects[subjectIndex].chapters.length === 0) this.subjects[subjectIndex].progressPercent = 0;
        else this.subjects[subjectIndex].progressPercent = Math.round(sum / this.subjects[subjectIndex].chapters.length);
    }
    convertShowingChapters(subjectIndex) {
        this.subjects[subjectIndex].showingChapters ?
            this.subjects[subjectIndex].showingChapters = false :
            this.subjects[subjectIndex].showingChapters = true;
    }
    convertShowingItems(subjectIndex, chapterIndex) {
        this.subjects[subjectIndex].chapters[chapterIndex].showingItems ?
            this.subjects[subjectIndex].chapters[chapterIndex].showingItems = false :
            this.subjects[subjectIndex].chapters[chapterIndex].showingItems = true;
    }
    countCheckedTask(subjectIndex) {
        let count = 0;
        this.subjects[subjectIndex].tasks.map(task => {
            if (task.checked) { count = count + 1; }
            return task;
        })
        return count;
    }
    countTask(subjectIndex){
        let sum = 0;
        this.subjects[subjectIndex].tasks.map(task => {
            sum = sum + 1;
            return task;
        })
        return sum;
    }
    setTaskPercent(subjectIndex){
        let sum = this.countTask(subjectIndex);
        if (sum === 0) {this.subjects[subjectIndex].taskPercent = 0;}
        
        let checked = this.countCheckedTask(subjectIndex);
        this.subjects[subjectIndex].taskPercent
         = Math.round(checked/sum*100);
    }
}
export default Subjects;