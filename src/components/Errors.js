import {popupError, popupWarning} from "./Notifier";

export function notifyErrResponse(err) {
    const {response} = err;
    const errMsg = err?.response?.data?.error
    if (errMsg) {
        alert(errMsg)
        return
    }
    // TODO: fix this mess
    if (!response) {
        return popupError({
            title: "error",
            text: "Inicia tu sesion",
        });
    }
    const {data, status} = response;
    const payload = {message: data.error, status};
    switch (status) {
        default:
            return popupWarning({
                title: "error",
                confirmButtonText: "Continuar",
                text: payload.message,
                timer: 2000,
            });
    }
}

export function notifyError(err) {
    let msg = err.toString()
    if (err.response?.data?.message) {
        msg = err.response?.data?.message
    }
    return popupWarning({
        title: "Error",
        confirmButtonText: "Continuar",
        text: msg,
        timer: 2000,
    });
}
