import {getRole,getToken} from "./common";
const Notifications = {
    notlogin: "Not login, please check",
    loginsuccess: "Login successfully",
    regsuccess: "Register successfully",
    regerror: "Registration failed",
    addedsuccess: "Data added successfully",
    updatedsuccess: "Data updated successfully",
    notupdatedsuccess: "Not updated successfully",
    notaddfailed: "Not data added please check",
    notaligible: "You are Customer",
    deletedsuccess: "Deleted successfully",
    notdeletedsuccess: "Not deleted successfully",
    invalidcred: "Invalid credentials",
    resetpass: "Reset password successfully",
    notpasswordsame: "Not password same",
    useraddedsuccess: "User added successfully",
    usernotaddedsuccess: "User added successfully",
    userdeletedsuccess: "User Deleted successfully",
    userupdatedsuccess: "User updated successfully",
    employeeaddedsuccess: "Employee added successfully",
    employeedeletedsuccess: "Employee deleted successfully",
    employeeupdatedsuccess: "Employee updated successfully",
    activesuccess: "Medicine active successfully",
    failedrecheck: "Failed please check!",
    token:getToken("token"),
    role:getRole("token")
  }
  export default Notifications;
