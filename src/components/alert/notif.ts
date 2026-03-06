import Swal, { type SweetAlertIcon } from "sweetalert2";

type ToastOptions = {
	title: string;
	icon?: SweetAlertIcon;
	timer?: number;
	position?:
		| "top"
		| "top-start"
		| "top-end"
		| "center"
		| "center-start"
		| "center-end"
		| "bottom"
		| "bottom-start"
		| "bottom-end";
};

export const alertService = {
	toast({
		title,
		icon = "success",
		timer = 1500,
		position = "top-end",
	}: ToastOptions) {
		return Swal.fire({
			toast: true,
			position,
			icon,
			title,
			showConfirmButton: false,
			timer,
			timerProgressBar: true,
		});
	},

	success(message: string, delay: number) {
		return this.toast({ title: message, icon: "success", timer: delay });
	},

	error(message: string, delay?: number) {
		return this.toast({ title: message, icon: "error", timer: delay });
	},

	warning(message: string) {
		return this.toast({ title: message, icon: "warning" });
	},

	confirm(title: string, text?: string) {
		return Swal.fire({
			title,
			text,
			icon: "question",
			showCancelButton: true,
			confirmButtonText: "Yes",
			cancelButtonText: "Cancel",
			reverseButtons: true,
		});
	},
};
