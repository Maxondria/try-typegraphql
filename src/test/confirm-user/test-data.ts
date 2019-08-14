export const confirmUserQuery = `
    mutation UserConfirmation($token: String!) {
        confirmUser(
        token: $token
        )
    }`;

export const WrongToken = { token: "wrongTokenWillOfCourseFail" };

export const CorrectToken = {
  token: "confirm-user-account:8252a0b3-bdbd-4f92-a861-c2412fd5b098"
};
