import { BackgroundColorSnackBar } from "../enums/background-color-snack-bar";

export interface SnackBarConfig {
    duration: number;
    type: BackgroundColorSnackBar;
    action: string;
    message: string;
}
