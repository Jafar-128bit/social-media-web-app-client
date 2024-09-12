const masterURI: string = 'http://localhost:5000/api/v1';
const subURI: string[] = ['auth', 'post', 'comment', 'reply', 'hashtag', 'mention', 'profile'];

export const apiEndpointMap = {
    signIn: `${masterURI}/${subURI[0]}/signIn`,
    signUp: `${masterURI}/${subURI[0]}/signUp`
};