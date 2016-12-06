export function savePreferences() {
    return {
        type: "SAVE_PREFERENCES"
    };
}

export function changeWarningBarColor(color) {
    return {
        type: "CHANGE_WARNING_BAR_COLOR",
        color: color
    };
}

export function changeWarningBarMessage(message) {
    return {
        type: "CHANGE_WARNING_BAR_MESSAGE",
        message: message
    };
}