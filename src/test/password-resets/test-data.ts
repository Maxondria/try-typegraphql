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

export const ChangePassQuery = `
    mutation NewPassword($data: ChangePasswordInput!) {
        changePassword(
        data: $data
        ) {
        name
        email
        id
        firstName
        lastName
        }
    }`;

export const wrongChangePasswordArgs = {
  data: {
    password: "bob",
    token: "ThisTokenWontPassAnyway"
  }
};

export const correctChangePasswordArgs = {
  data: {
    password: "passwordpassesvalidation",
    token: "forgot-password:2010cec6-b0b2-42da-85ec-fae4a247d4a8"
  }
};
