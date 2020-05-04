let classList = ["Jake", "Jill", "Zach"];
for (let i = 0; i < 3; i++){
    let newStudent = prompt("Enter new student name");
    classList.push(newStudent);
}
for (let j = 0; j < classList.length; j++){
    console.log(classList[j]);
}