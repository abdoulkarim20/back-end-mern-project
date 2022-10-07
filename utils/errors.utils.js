module.exports.signUpErrors = (error) => {
    let errors = { pseudo: '', email: '', password: '' };

    if (error.message.includes('pseudo'))
        errors.pseudo = 'pseudo incorrect il doit avoir au moins 3 caracteres';

    if (error.message.includes('email'))
        errors.email = 'email inccorrect';

    if (error.message.includes('password'))
        errors.password = 'Le mot de passe doit avoir au moins 6 caracteres';

    if (error.code === 11000 && Object.keys(error.keyValue)[0].includes('pseudo'))
        errors.pseudo = 'pseudo est deja pris';

    if (error.code === 11000 && Object.keys(error.keyValue)[0].includes('email'))
        errors.email = 'Cet email est deja pris';

    return errors
}
module.exports.signInErros = (error) => {
    let errors = { email: '', password: '' };
    if (error.message.includes('email')) errors.email = 'Le login est inccorrect';
    if (error.message.includes('password')) errors.password = 'Le mot de passe est inccorrect';
    return errors;
}
/*Error for uploding file*/
module.exports.uploadErrrors = (error) => {
    let errors = { format: "", maxSize: "" }
    if (error.message.includes('Invalid file'))
        errors.format = "Le format de l'image est incompatible";
    if (error.message.includes('max size'))
        errors.maxSize = "La taille de l'image doit pas depasser 500ko"
    return errors;
}