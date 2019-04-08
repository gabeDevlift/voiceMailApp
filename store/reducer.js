import { combineReducers } from 'redux';

console.log("hello")

const initialState = {
    messages: [
        {
            name: "Contact #1",
            number: "(555) 555-5555",
            date: "02/08/15",
            message: "sample1",
            favourited: true,
            archived: false,
            trashed: false,
            listened: false
        },
        {
            name: "Contact #2",
            number: "(555) 555-5555",
            date: "02/08/14",
            message: "sample2",
            favourited: false,
            archived: true,
            trashed: false,
            listened: false
        },
        {
            name: "Contact #3",
            number: "(555) 555-5555",
            date: "02/08/13",
            message: "sample3",
            favourited: false,
            archived: false,
            trashed: true,
            listened: false
        },
        {
            name: "Contact #4",
            number: "(555) 555-5555",
            date: "02/08/12",
            message: "sample4",
            favourited: true,
            archived: false,
            trashed: false,
            listened: false
        },
        {
            name: "Contact #5",
            number: "(555) 555-5555",
            date: "02/08/11",
            message: "sample1",
            favourited: false,
            archived: true,
            trashed: false,
            listened: false
        },
        {
            name: "Contact #6",
            number: "(555) 555-5555",
            date: "02/08/10",
            message: "sample1",
            favourited: false,
            archived: false,
            trashed: true,
            listened: false
        },
        {
            name: "Contact #7",
            number: "(555) 555-5555",
            date: "02/08/09",
            message: "sample1",
            favourited: true,
            archived: false,
            trashed: false,
            listened: false
        },
        {
            name: "Contact #8",
            number: "(555) 555-5555",
            date: "02/08/08",
            message: "sample1",
            favourited: false,
            archived: true,
            trashed: false,
            listened: false
        },
        {
            name: "Contact #9",
            number: "(555) 555-5555",
            date: "02/08/07",
            message: "sample1",
            favourited: false,
            archived: false,
            trashed: true,
            listened: false
        },
        {
            name: "Contact #10",
            number: "(555) 555-5555",
            date: "02/08/06",
            message: "sample1",
            favourited: true,
            archived: false,
            trashed: false,
            listened: false
        },
        {
            name: "Contact #11",
            number: "(555) 555-5555",
            date: "02/08/05",
            message: "sample1",
            favourited: false,
            archived: true,
            trashed: false,
            listened: false
        },
        {
            name: "Contact #12",
            number: "(555) 555-5555",
            date: "02/08/04",
            message: "sample1",
            favourited: false,
            archived: false,
            trashed: true,
            listened: false
        },
        {
            name: "Contact #13",
            number: "(555) 555-5555",
            date: "02/08/03",
            message: "sample1",
            favourited: true,
            archived: false,
            trashed: false,
            listened: false
        },
        {
            name: "Contact #14",
            number: "(555) 555-5555",
            date: "02/08/02",
            message: "sample1",
            favourited: false,
            archived: true,
            trashed: false,
            listened: false
        },
        {
            name: "Contact #15",
            number: "(555) 555-5555",
            date: "02/08/01",
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
        return state;
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