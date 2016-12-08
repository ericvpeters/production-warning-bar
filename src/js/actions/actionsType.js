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


export function enableWarningBar(value) {
    return {
        type: "ENABLE_WARNING_BAR",
        enable: value
    };
}

export function loadPreferences(preferences) {
    return {
        type: "LOAD_PREFERENCES",
        preferences: preferences
    };
}

export function addDomain(domain) {
    return {
        type: "ADD_DOMAIN",
        domain: domain
    };
}
export function modifyDomain(newDomain, oldDomain) {
    return {
        type: "MODIFY_DOMAIN",
        newDomain: newDomain,
        oldDomain: oldDomain
    };
}

export function removeDomain(domain) {
    return {
        type: "REMOVE_DOMAIN",
        domain: domain
    };
}