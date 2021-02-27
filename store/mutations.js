export default {

    // PUSH_HISTORY: (state, historyItem) => {
    //     state.history.push(historyItem);
    // },
    // POP_HISTORY: (state) => {
    //     state.history.pop();
    // },
    /**
     * Show snackbar if it is inactive
     */
    SET_SNACKBAR_ACTIVE: (state) => {
        state.isSnackbarActive = true;
    },
    /**
     * Set snackbar inactive so it can react to next SET_SNACKBAR_ACTIVE call
     */
    SET_SNACKBAR_INACTIVE: (state) => {
        state.isSnackbarActive = false;
    },
};
