import Swal from "sweetalert2";
import "@sweetalert2/theme-dark/dark.css"
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

type Params = {
    title: string;
    text: string;
    confirmButtonText?: boolean;
    timer?: number;
};

function popupWarning({
                          title,
                          text,
                          confirmButtonText,
                          timer = 1500,
                      }: Params) {
    return MySwal.fire({
        title: title,
        text: text,
        icon: "warning",
        timer: timer,
        showConfirmButton: confirmButtonText,
    })
}

function popupError({title, text, confirmButtonText, timer = 1500}: Params) {
    return MySwal.fire({
        title: title,
        text: text,
        icon: "error",
        timer: timer,
        showConfirmButton: confirmButtonText,
    });

}


export {
    popupError,
    popupWarning,
};
