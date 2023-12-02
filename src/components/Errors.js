import Notifier from "./Notifier";

export function notifyErrResponse(err) {
    const {response} = err;
    if (!response) {
        return Notifier.popupError({
            title: "API error",
            text: "No hay respuesta del servidor",
        });
    }
    const {data, status} = response;
    const payload = {message: data.error, status};
    switch (status) {
        default:
            return Notifier.popupWarning({
                title: "API error",
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
    return Notifier.popupWarning({
        title: "Error",
        confirmButtonText: "Continuar",
        text: msg,
        timer: 2000,
    });
}
