export function validate_password(value){
    // let regPassword = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/;
    let regPassword = /$/;
    return regPassword.test(value);
}