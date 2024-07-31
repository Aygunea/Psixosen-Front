import { configureStore } from "@reduxjs/toolkit"
import userReducer from '../slices/userSlice'
import conversationsReducer from "../slices/conversations.slice";
import messagesReducer from "../slices/messages.slice";
import roleReducer from "../slices/role.slice";
import themeReducer from "../slices/theme.slice";
import MenuReducer from "../slices/menu.slice";
import MusicReducer from "../slices/music.slice";
import listenerRducer from "../slices/listener.slice";
import contactsRducer from "../slices/contacts.slice";
import notificationReducer from '../slices/notifications.slice'
import requestReducer from "../slices/requests.slice";
import formReducer from '../slices/form.slice'

const store = configureStore({
    reducer: {
        user: userReducer,
        conversation: conversationsReducer,
        messages: messagesReducer,
        role: roleReducer,
        theme: themeReducer,
        menu: MenuReducer,
        music: MusicReducer,
        listener: listenerRducer,
        contacts: contactsRducer,
        notifications: notificationReducer,
        request:requestReducer,
        form:formReducer
    }
})
export default store  