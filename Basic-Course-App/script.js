class Course {
  constructor(title, instructor, image) {
    this.courseId = 0;
    this.title = title;
    this.instructor = instructor;
    this.image = image;
  }
}

class UI {
  addCourseToList(course) {
    const list = document.getElementById("course-list");
    let html = `
            <tr class="text-center"> 
                <td><img class="img-fluid img-thumbnail image" src="images/${course.image}"/></td>
                <td class="text-wrap text-capitalize" >${course.title}</td>
                <td class="text-wrap text-capitalize" >${course.instructor}</td>
                <td><a data-id="${course.courseId}" href="#" class="btn btn-danger btn-sm delete">Delete</a></td>
            </tr>
        `;

    list.innerHTML += html;
  }

  showAlert(message, className) {
    let html = `
        <div class="alert alert-${className}">
            ${message}
        </div>
    `;

    const row = document.querySelector(".row");
    row.insertAdjacentHTML("afterbegin", html);

    setTimeout(() => {
      document.querySelector(".alert").remove();
    }, 1500);
  }

  clearList() {
    const title = (document.getElementById("title").value = "");
    const instructor = (document.getElementById("instructor").value = "");
    const image = (document.getElementById("image").value = "");
  }

  deleteCourse(element) {
    if (element.classList.contains("delete")) {
      element.parentElement.parentElement.remove();
      return true;
    }
  }
}

class Storage {
  static getCourses() {
    let courses =
      localStorage.getItem("courses") !== null
        ? JSON.parse(localStorage.getItem("courses"))
        : [];

    return courses;
  }

  static showCourses() {
    const courses = Storage.getCourses() ?? [];

    courses.forEach((element) => {
      const ui = new UI();
      ui.addCourseToList(element);
    });
  }

  static addCourse(course) {
    const courses = Storage.getCourses() ?? [];
    const updatedCourse = {
      ...course,
      courseId: Math.floor(Math.random() * 10000),
    };
    courses.push(updatedCourse);
    localStorage.setItem("courses", JSON.stringify(courses));
  }

  static deleteCourse(element) {
    if (element.classList.contains("delete")) {
      const removeCourseId = element.getAttribute("data-id");
      const courses = Storage.getCourses() ?? [];

      const updatedCourses = courses.filter((course) => {
        return course.courseId !== parseInt(removeCourseId);
      });

      localStorage.setItem("courses", JSON.stringify(updatedCourses));
    }
  }
}

document.addEventListener("DOMContentLoaded", Storage.showCourses);

document.getElementById("course-list").addEventListener("click", function (e) {
  const ui = new UI();
  const isDeleted = ui.deleteCourse(e.target);

  if (isDeleted) {
    Storage.deleteCourse(e.target);
    ui.showAlert("The course has been deleted", "danger");
  }
});

document.getElementById("new-course").addEventListener("submit", function (e) {
  const title = document.getElementById("title").value;
  const instructor = document.getElementById("instructor").value;
  const image = document.getElementById("image").value;

  const course = new Course(title, instructor, image);

  const ui = new UI();

  if (title === "" || instructor === "" || image === "") {
    ui.showAlert("Please complete the form", "warning");
  } else {
    ui.addCourseToList(course);
    Storage.addCourse(course);
    ui.clearList();
    ui.showAlert("The course has been added", "success");
  }

  e.preventDefault();
});
