import { combineReducers } from 'redux';

console.log("hello")

const initialState = {
    messages: [
        {
            id: 1,
            name: "Contact #1",
            number: "(555) 555-5555",
            date: "15/08/19",
            message: "sample1",
            favourited: true,
            archived: false,
            trashed: false,
            listened: false
        },
        {
            id: 2,
            name: "Contact #2",
            number: "(555) 555-5555",
            date: "14/08/19",
            message: "sample4",
            favourited: false,
            archived: true,
            trashed: false,
            listened: false
        },
        {
            id: 3,
            name: "Contact #3",
            number: "(555) 555-5555",
            date: "13/08/19",
            message: "sample3",
            favourited: false,
            archived: false,
            trashed: true,
            listened: false
        },
        {
            id: 4,
            name: "Contact #4",
            number: "(555) 555-5555",
            date: "12/08/19",
            message: "sample4",
            favourited: true,
            archived: false,
            trashed: false,
            listened: false
        },
        {
            id: 5,
            name: "Contact #5",
            number: "(555) 555-5555",
            date: "11/08/19",
            message: "sample1",
            favourited: false,
            archived: true,
            trashed: false,
            listened: false
        },
        {
            id: 6,
            name: "Contact #6",
            number: "(555) 555-5555",
            date: "10/08/19",
            message: "sample1",
            favourited: false,
            archived: false,
            trashed: true,
            listened: false
        },
        {
            id: 7,
            name: "Contact #7",
            number: "(555) 555-5555",
            date: "09/08/19",
            message: "sample1",
            favourited: true,
            archived: false,
            trashed: false,
            listened: false
        },
        {
            id: 8,
            name: "Contact #8",
            number: "(555) 555-5555",
            date: "08/08/19",
            message: "sample1",
            favourited: false,
            archived: true,
            trashed: false,
            listened: false
        },
        {
            id: 9,
            name: "Contact #9",
            number: "(555) 555-5555",
            date: "07/08/19",
            message: "sample1",
            favourited: false,
            archived: false,
            trashed: true,
            listened: false
        },
        {
            id: 10,
            name: "Contact #10",
            number: "(555) 555-5555",
            date: "06/08/19",
            message: "sample1",
            favourited: true,
            archived: false,
            trashed: false,
            listened: false
        },
        {
            id: 11,
            name: "Contact #11",
            number: "(555) 555-5555",
            date: "05/08/19",
            message: "sample1",
            favourited: false,
            archived: true,
            trashed: false,
            listened: false
        },
        {
            id: 12,
            name: "Contact #12",
            number: "(555) 555-5555",
            date: "04/08/19",
            message: "sample1",
            favourited: false,
            archived: false,
            trashed: true,
            listened: false
        },
        {
            id: 13,
            name: "Contact #13",
            number: "(555) 555-5555",
            date: "03/08/19",
            message: "sample1",
            favourited: true,
            archived: false,
            trashed: false,
            listened: false
        },
        {
            id: 14,
            name: "Contact #14",
            number: "(555) 555-5555",
            date: "02/08/19",
            message: "sample1",
            favourited: false,
            archived: true,
            trashed: false,
            listened: false
        },
        {
            id: 15,
            name: "Contact #15",
            number: "(555) 555-5555",
            date: "01/08/19",
            message: "sample1",
            favourited: false,
            archived: false,
            trashed: true,
            listened: false
        },
    ]
};

const reducer = (state = initialState, action) => {
    let temp
    let tempMessage
  switch (action.type) {
    case "favourite":
        temp = state.messages;
        tempMessage = state.messages[action.payload]
        tempMessage.favourited = !tempMessage.favourited
        temp.splice(action.payload, 1, tempMessage)
        return {
            ...state,
            messages: temp
        }
        break;
    case "archive":
        temp = state.messages;
        tempMessage = state.messages[action.payload]
        tempMessage.archived = true
        temp.splice(action.payload, 1, tempMessage)
        return {
            ...state,
            messages: temp
        }
        break;
    case "trash":
        temp = state.messages;
        tempMessage = state.messages[action.payload]
        tempMessage.trashed = true
        temp.splice(action.payload, 1, tempMessage)
        return {
            ...state,
            messages: temp
        }
        break;
    case "restore":
        temp = state.messages;
        tempMessage = state.messages[action.payload]
        tempMessage.trashed = false
        temp.splice(action.payload, 1, tempMessage)
        return {
            ...state,
            messages: temp
        }
        break;
    case "deleteForever":
        temp = state.messages;
        temp.splice(action.payload, 1)
        return {
            ...state,
            messages: temp
        }
        break;
    case "markListened":
        temp = state.messages;
        tempMessage = state.messages[action.payload]
        tempMessage.listened = true
        temp.splice(action.payload, 1, tempMessage)
        return {
            ...state,
            messages: temp
        }
        break;
    default:
        return state;
  }
};

export default combineReducers({
  messages: reducer,
});