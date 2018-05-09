/**
 * Created by sashkoboom on 30. 4. 2018.
 */

let taskList = document.querySelector(".tasks");

class Task {


    constructor(txt = ""){
        this.text = txt;
        this.__state_div = true;

        this.create_main_div();

        this.create_editing_form();

        this.render_div();

    }

    create_main_div(){
        this.div = document.createElement("div");
        this.div.classList.add("task");

        this.txt_span = document.createElement("span");
        this.txt_span.addEventListener("click", this.click.bind(this));


        this.icon_pencil = document.createElement("i");
        this.icon_pencil.classList.add("fa");
        this.icon_pencil.classList.add("fa-pencil");
        this.icon_pencil.addEventListener("click", this.click.bind(this));

        this.icon_circle = document.createElement("i");
        this.icon_circle.classList.add("fa");
        this.icon_circle.classList.add("fa-circle");
        this.icon_circle.addEventListener("click", this.check.bind(this));
        this.icon_circle.addEventListener("mouseover", this.circle_to_check.bind(this));
        this.icon_circle.addEventListener("mouseleave", this.check_to_circle.bind(this));
    }

    create_editing_form(){
        this.form = document.createElement("form");

        //  text field with pre-defined value
        this.input = document.createElement("input");
        this.input.type = "text";
        this.input.value = this.text;

        // saving icon_pencil
        const save_i = document.createElement("i");
        save_i.classList.add("fa");
        save_i.classList.add("fa-save");
        save_i.addEventListener("click", this.submit.bind(this));

        this.form.appendChild(this.input);
        this.form.appendChild(save_i);
        this.form.addEventListener("submit", this.submit.bind(this));
    }

    render_div(){


        this.txt_span.innerHTML = this.text;
        this.div.appendChild(this.icon_circle);
        this.div.appendChild(this.txt_span);
        this.div.appendChild(this.icon_pencil);

    }

    render() {  taskList.appendChild(this.div); }

    click(){  this.__state_div ? this.div_to_input() :  void 0;  }

    circle_to_check(){
        this.icon_circle.classList.remove("fa-circle");
        this.icon_circle.classList.add("fa-check-circle");
    }

    check_to_circle(){
        this.icon_circle.classList.remove("fa-check-circle");
        this.icon_circle.classList.add("fa-circle");
    }

    check(){
        this.icon_circle.removeEventListener("mouseleave", this.check_to_circle.bind(this));
        this.txt_span.classList.add("strikethrough");
        this.circle_to_check();
        //for animation
        setTimeout(function () {   tm.removeTask(this) }.bind(this), 1500);
    }

    submit(e = null){
        if(e)   e.preventDefault();
        this.text = this.input.value;
        this.input_to_div();
    }

    div_to_input() {
        this.div.innerHTML = "";
        this.div.appendChild(this.icon_circle);
        this.div.appendChild(this.form);
        tm.refresh();
        this.input.focus();
        this.__state_div = false;
    }

    input_to_div(){
        this.div.innerHTML="";
        this.render_div();
        tm.refresh();
        this.__state_div = true;
    }
}

class TaskManager {
    constructor(tasks = []){
        this.tasks = tasks.map(
            txt => new Task(txt)
        );

        this.render();

        this.task_form = document.querySelector("#task_form");
        this.task_form.addEventListener("submit", this.submitTask.bind(this));
        this.task_field = document.querySelector("#task_field");
    }


    render(){this.tasks.forEach((task) => {task.render()})}

    refresh(){
        while(taskList.firstElementChild) taskList.removeChild(taskList.firstElementChild);
        this.render();
    }

    submitTask(e){
        e.preventDefault();
        if(this.task_field.value === "") return;
        this.tasks.unshift(new Task(this.task_field.value));
        this.task_field.value = "";
        this.refresh();
    }

    removeTask(task){
        this.tasks.splice(this.tasks.indexOf(task), 1);
        this.refresh();
    }
}


let tm = new TaskManager(["Be brave", "Fight the bad guys", "Make Mom Proud"]);
let task = new Task("I am task");
