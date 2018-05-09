"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by sashkoboom on 30. 4. 2018.
 */

var taskList = document.querySelector(".tasks");

var Task = function () {
    function Task() {
        var txt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";

        _classCallCheck(this, Task);

        this.text = txt;
        this.__state_div = true;

        this.create_main_div();

        this.create_editing_form();

        this.render_div();
    }

    _createClass(Task, [{
        key: "create_main_div",
        value: function create_main_div() {
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
    }, {
        key: "create_editing_form",
        value: function create_editing_form() {
            this.form = document.createElement("form");

            //  text field with pre-defined value
            this.input = document.createElement("input");
            this.input.type = "text";
            this.input.value = this.text;

            // saving icon_pencil
            var save_i = document.createElement("i");
            save_i.classList.add("fa");
            save_i.classList.add("fa-save");
            save_i.addEventListener("click", this.submit.bind(this));

            this.form.appendChild(this.input);
            this.form.appendChild(save_i);
            this.form.addEventListener("submit", this.submit.bind(this));
        }
    }, {
        key: "render_div",
        value: function render_div() {

            this.txt_span.innerHTML = this.text;
            this.div.appendChild(this.icon_circle);
            this.div.appendChild(this.txt_span);
            this.div.appendChild(this.icon_pencil);
        }
    }, {
        key: "render",
        value: function render() {
            taskList.appendChild(this.div);
        }
    }, {
        key: "click",
        value: function click() {
            this.__state_div ? this.div_to_input() : void 0;
        }
    }, {
        key: "circle_to_check",
        value: function circle_to_check() {
            this.icon_circle.classList.remove("fa-circle");
            this.icon_circle.classList.add("fa-check-circle");
        }
    }, {
        key: "check_to_circle",
        value: function check_to_circle() {
            this.icon_circle.classList.remove("fa-check-circle");
            this.icon_circle.classList.add("fa-circle");
        }
    }, {
        key: "check",
        value: function check() {
            this.icon_circle.removeEventListener("mouseleave", this.check_to_circle.bind(this));
            this.txt_span.classList.add("strikethrough");
            this.circle_to_check();
            //for animation
            setTimeout(function () {
                tm.removeTask(this);
            }.bind(this), 1500);
        }
    }, {
        key: "submit",
        value: function submit() {
            var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

            if (e) e.preventDefault();
            this.text = this.input.value;
            this.input_to_div();
        }
    }, {
        key: "div_to_input",
        value: function div_to_input() {
            this.div.innerHTML = "";
            this.div.appendChild(this.icon_circle);
            this.div.appendChild(this.form);
            tm.refresh();
            this.input.focus();
            this.__state_div = false;
        }
    }, {
        key: "input_to_div",
        value: function input_to_div() {
            this.div.innerHTML = "";
            this.render_div();
            tm.refresh();
            this.__state_div = true;
        }
    }]);

    return Task;
}();

var TaskManager = function () {
    function TaskManager() {
        var tasks = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

        _classCallCheck(this, TaskManager);

        this.tasks = tasks.map(function (txt) {
            return new Task(txt);
        });

        this.render();

        this.task_form = document.querySelector("#task_form");
        this.task_form.addEventListener("submit", this.submitTask.bind(this));
        this.task_field = document.querySelector("#task_field");
    }

    _createClass(TaskManager, [{
        key: "render",
        value: function render() {
            this.tasks.forEach(function (task) {
                task.render();
            });
        }
    }, {
        key: "refresh",
        value: function refresh() {
            while (taskList.firstElementChild) {
                taskList.removeChild(taskList.firstElementChild);
            }this.render();
        }
    }, {
        key: "submitTask",
        value: function submitTask(e) {
            e.preventDefault();
            if (this.task_field.value === "") return;
            this.tasks.unshift(new Task(this.task_field.value));
            this.task_field.value = "";
            this.refresh();
        }
    }, {
        key: "removeTask",
        value: function removeTask(task) {
            this.tasks.splice(this.tasks.indexOf(task), 1);
            this.refresh();
        }
    }]);

    return TaskManager;
}();

var tm = new TaskManager(["Be brave", "Fight the bad guys", "Make Mom Proud"]);
var task = new Task("I am task");