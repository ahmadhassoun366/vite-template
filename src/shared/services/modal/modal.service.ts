// import { BehaviorSubject } from 'rxjps';

import { Signal, signal } from '@preact/signals-react';
import APP_MODALS from 'src/static/enums/app.modals';
import { ModalData } from 'src/shared/models/modals/modals.model';
import { APP_EVENTS } from 'src/static/enums/app.events';

export default class ModalService {
	// array of opened modals, current is the last item -> modals[modals.length - 1]
	private modals: Signal<ModalData[]> = signal([]);
	number = signal(0);

	private showGlassPanel: Signal<boolean> = signal(false);

	constructor() {
		const handleModalsChange = (e: CustomEvent<ModalData[]>) => {
			this.showGlassPanel.value = e.detail.length > 0;
			const html = document.querySelector('html') as HTMLElement;
			html.style.overflow = this.showGlassPanel.value ? 'hidden' : 'auto';
		};

		document.addEventListener(APP_EVENTS.MODALS_CHANGED, handleModalsChange as EventListener);
	}

	// *~~~ getters & setters ~~~* //
	getGlassPanel() {
		return this.showGlassPanel.value;
	}

	getOpenModals() {
		return this.modals.value;
	}

	getModalData(modalId: APP_MODALS) {
		const modal = this.modals.value.find((m) => m.id === modalId);
		return modal ? modal.data : undefined;
	}

	// *~~~ svc api ~~~* //

	open(modalId: APP_MODALS, data?: any) {
		// don't do anything if modal is already opened
		if (this.modals.value.map((m) => m.id).includes(modalId)) return;

		const _modalDetails = {
			id: modalId,
			show: true,
			data,
		};

		this.modals.value = [...this.modals.value, _modalDetails];

		// this.number.value = Math.random();

		this.emitModalsChanged();
	}

	closeModal(modalId: APP_MODALS) {
		const newModals = this.modals.value.filter((m) => m.id !== modalId);

		this.modals.value = [...newModals];

		this.emitModalsChanged();
	}

	emitModalsChanged() {
		const modalsEvent = new CustomEvent<ModalData[]>(APP_EVENTS.MODALS_CHANGED, {
			detail: this.modals.value,
		});

		document.dispatchEvent(modalsEvent);
	}

	closeCurrentModal() {
		if (this.modals.value.length === 0) return;

		const arr = this.modals.value;

		arr.pop() as ModalData;

		this.modals.value = [...arr];

		this.emitModalsChanged();
	}

	closeAllModals() {
		this.modals.value = [];
	}

	// goBackToPreviousModal(): void {
	//     this.closeCurrentModal();
	//     this.openModal(this._modals[this._modals.length - 1]);
	// }
}
