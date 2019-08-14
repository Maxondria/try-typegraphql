export const forgotPasswordQuery = ` 
    mutation ForgotPassword($email: String!) {
     forgotPassword(email: $email)
   }`;

export const invalidEmail = {
  email: "email@doesnot.exist"
};

export const correctEmail = {
  email: "bob@bob.com"
};
