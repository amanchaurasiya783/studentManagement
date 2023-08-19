//constants
const form = document.getElementById('form');
const inputs = form.querySelectorAll("input");
const submit = document.getElementById('submit');
const searchInput = document.getElementById('searchInput');
const tbody = document.getElementById('tableData');
const editBtn = document.getElementById('editBtn');
const deleteBtn = document.getElementById('deleteBtn');
const students = [
    {
        id: 1,
        name: 'Alice',
        age: 21,
        grade: 2,
        degree: 'Btech',
        email: 'alice@example.com'
    },
    {
        id: 2,
        name: 'Charlie',
        age: 20,
        grade: 2,
        degree:'Arts',
        email: 'charlie@example.com'
    }
];

showStudents();

// main logics
form.addEventListener("submit", function(event){
    event.preventDefault();
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].value.trim();
        if(inputs[i].value == ""){
            return;
        }
    }
    addStudent(submit.value);
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].value = "";
    }
    submit.innerHTML = "Add Student";
    submit.value = -1;
});

//function to Add Data to Array
function addStudent(i){
    if(i != -1){
        inputs.forEach(function(input) {
            students[i][input.name] = input.value;
        });
    }
    else{
        let formData = {};
        formData["id"] = students.length+1;
        inputs.forEach(function(input) {
            formData[input.name] = input.value;
        });
        students.push(formData);
    }
    showStudents();
}

//function to Edit Data to Array
function editStudent(i){
    console.log(i);
    form.name.value = students[i].name;
    form.email.value = students[i].email;
    form.grade.value = students[i].grade;
    form.age.value = students[i].age;
    form.degree.value = students[i].degree;
    submit.innerHTML = "Edit Student";
    submit.value = i;
}

//function to Delete Data from Array
function deleteStudent(i){
    students.splice(i, 1);
    showStudents();
}

//function to Show Data in Table
function showStudents(){
    tbody.innerHTML = "";
    students.forEach((element, i) => {
        const tr = document.createElement('tr');
        const data = `
        <td>${element.id}</td>
        <td>${element.name}</td>
        <td>${element.email}</td>
        <td>${element.grade}</td>
        <td>${element.age}</td>
        <td>
            <div id="degreeCol">
            ${element.degree}
            <div>
                <span class="material-symbols-outlined" onclick="editStudent(${i})" id="editBtn">edit_square</span>
                &nbsp;&nbsp;
                <span class="material-symbols-outlined" onclick="deleteStudent(${i})" id="deleteBtn">delete</span>
            </div>
            </div>
        </td>`;
        tr.innerHTML = data;
        tbody.appendChild(tr);
    })
};


//function to search Students
searchInput.addEventListener('keydown', function(event){
    searchfunction();
});

const searchfunction = () =>{
	let filter = document.getElementById('searchInput').value.toUpperCase();
	let tr = tbody.getElementsByTagName('tr');

	for(var i=0; i<tr.length; i++){
		let td = tr[i].getElementsByTagName('td')[1];
		let td2 = tr[i].getElementsByTagName('td')[2];
		let td5 = tr[i].getElementsByTagName('td')[5];

		if(td || td2 || td5){
			let studentName = td.textContent || td.innerHTML;
			let studentEmail = td2.textContent || td2.innerHTML;
			let studentDegree = td5.textContent || td5.innerHTML;

			if(studentName.toUpperCase().indexOf(filter) > -1 || studentEmail.toUpperCase().indexOf(filter) > -1 || studentDegree.toUpperCase().indexOf(filter) > -1){
				tr[i].style.display = "";
			}else{
				tr[i].style.display = "none";
			}
		}
	}
}