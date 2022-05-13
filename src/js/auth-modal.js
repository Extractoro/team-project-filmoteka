const refs = {
  openModal: document.querySelector('.open_auth-js'),
  closeModalBtn: document.querySelector('.auth-modal-close'),
  modal: document.querySelector('.auth-modal'),
  body: document.querySelector('body'),
  openModalWatched: document.getElementById('add-watched-js'),
  openModalQueue: document.getElementById('add-queue-js')
};

refs.openModalWatched.addEventListener('click', openModal);
refs.openModalQueue.addEventListener('click', openModal);
refs.openModal.addEventListener('click', openModal);

function closeModal(e) {
  modalAddHidden();
  refs.closeModalBtn.removeEventListener('click', closeModal);
  refs.modal.removeEventListener('click', onBackdropClick);
  refs.body.removeEventListener('keydown', onEscClick);
  scroll();
}
function openModal() {
  refs.openModal.classList.remove('open_auth-js')

  modalRemoveHidden();
  scroll();
  refs.modal.addEventListener('click', onBackdropClick);
  refs.body.addEventListener('keydown', onEscClick);
  refs.closeModalBtn.addEventListener('click', closeModal);
}
function onBackdropClick(e) {
  if (e.currentTarget !== e.target) {
    return;
  }
  closeModal();
}
function onEscClick(e) {
  modalIsClose = refs.modal.classList.contains('visually-hidden');
  if (modalIsClose) {
    return;
  }
  if (e.key === 'Escape') {
    closeModal();
  }
}
function modalRemoveHidden() {
  refs.modal.classList.remove('visually-hidden');
}
function modalAddHidden() {
  refs.modal.classList.add('visually-hidden');
}

