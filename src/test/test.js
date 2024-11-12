// function generateRandomCode(length = 16) {
//     const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
//     let result = '';
//     for (let i = 0; i < length; i++) {
//         const randomIndex = Math.floor(Math.random() * characters.length);
//         result += characters[randomIndex];
//     }
//     return result;
// }
//
// for (let i = 0; i < 10; i++) {
//     console.log(generateRandomCode());
// }

function generateRandomTimestampsIn2024(count = 10) {
    const startDate = new Date('2024-01-01T00:00:00');
    const endDate = new Date('2024-12-31T23:59:59');

    for (let i = 0; i < count; i++) {
        const randomTime = new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()));
        console.log(randomTime.toISOString());
    }
}

generateRandomTimestampsIn2024();

//
//
//
//
//
//
//
//
//
//


// const list1 = [
//     {
//         id: 1,
//         following: [2,3,4,6],
//     },
//     {
//         id: 2,
//         following: [1,4,6,5],
//     }
// ];
//
// const list2 = [
//     {id: 1, content: "hello world"},
//     {id: 2, content: "hello world"},
//     {id: 3, content: "hello world"},
//     {id: 4, content: "hello world"},
//     {id: 5, content: "hello world"},
//     {id: 6, content: "hello world"},
// ];
//
// const getData2 = (currentProfileData = [], postData = []) => {
//     const filteredData = postData.filter(value => currentProfileData.following.includes(value.id));
//     console.log(filteredData);
// };
//
// getData2(list1[0], list2);

// const timestamps = [
//     "2024-11-01T00:11:42.173Z",
//     "2024-11-02T00:11:42.173Z",
//     "2024-10-23T00:11:42.173Z"
// ];
//
// const today = new Date().getTime();
// const sortedTimestamps = timestamps.sort((a, b) => {
//     const diffA = Math.abs(new Date(a).getTime() - today);
//     const diffB = Math.abs(new Date(b).getTime() - today);
//     return diffA - diffB;
// });
//
// console.log(sortedTimestamps);
