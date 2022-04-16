module.exports.SignAndLogErrors = (errMessage, email = "", username = "") => {
  console.log("USER INPUT", username, email);

  let errors = { username: "", email: "", password: "", message: "" };

  if (errMessage === "none") {
    errors.message = "Please Provide Credentials";
    errors.username = username;
    errors.email = email;
  }
  if (errMessage === "whiteSpace") {
    errors.message = "Credentials can not contains white space";
    errors.username = username;
    errors.email = email;
  }
  if (errMessage === "email") {
    errors.message = ` "${email}" is not a valid email address.`;
    errors.username = username;
    errors.email = email;
  }

  if (errMessage === "password") {
    errors.message = "Password must have at least 6 characters.";
  }

  if (errMessage === "exist") {
    errors.message = ` User with this email address already exist. ("${email}") `;
    errors.email = email;
  }

  if (errMessage === "notFound") {
    errors.message = ` No user registered with this email address ("${email}") `;
    errors.email = email;
  }

  if (errMessage === "wrong") {
    errors.message =
      "Wrong credentials, please check email address and password";
    errors.email = email;
  }

  //   if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("pseudo"))
  //     errors.pseudo = "Ce pseudo est déjà pris";

  //   if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("email"))
  //     errors.email = "Cet email est déjà enregistré";
  return errors;
};
