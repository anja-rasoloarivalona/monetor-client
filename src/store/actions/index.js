export {
    setText
} from './text'

export {
    setTheme,
    setBackgroundImage
} from './theme'

export {
    setLocale,
    setCurrency,
    setSocket,
    setUnit,
    setDefaultBackgroundImage
} from './settings'

export {
    setUser,
    clearUser,
    setCheckedUserToken,
    addWallet,
    addBudget,
    addTransaction,
    setOnlineContacts,
    toggleDraggableMessage,
    setUserBalance,
    getUserCurrentLocation,
    getUserLocations
    // setTodoBoardLabels,
    // updateTodoLits,
    // setTodoLists,
} from './user'

export {
    initApp,
    logoutUser
} from './middlewares'

export { 
     setForm
} from './form'

export {
    setFinancialFilters
} from './finance'

export {
    setWeather,
    getWeather,
    initWeatherData
} from './home'

export {
    setMessages,
    addMessage
} from './messages'

export {
    getUserNotes,
    toggleNotes,
    setNotes,
    addNote,
    addNoteFolder,
    editNoteFolder,
    deleteNoteFolder,
    editNote,
    removeNote,
    saveNote
} from './notes'

export {
    setLayouts
} from './dashboard'

export {
    getUserTodos,
    setTodoBoardLabels,
    updateTodoLits,
    setTodoLists,
    setActiveTodoBoard,
    setTodoBoard
} from './todos'