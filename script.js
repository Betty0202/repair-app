document.addEventListener('DOMContentLoaded', () => {
    const equipmentItems = document.querySelectorAll('.equipment-item');
    const problemTypeSelect = document.getElementById('problem-type');
    const descriptionInput = document.getElementById('description');
    const submitButton = document.getElementById('submit-button');
    const resetButton = document.getElementById('reset-button');
    const confirmationMessage = document.getElementById('confirmation-message');

    equipmentItems.forEach(item => {
        item.addEventListener('click', () => {
            equipmentItems.forEach(i => i.classList.remove('highlight'));
            item.classList.add('highlight');
        });
    });

    submitButton.addEventListener('click', () => {
        // 修正：querySelectorAll 回傳的 NodeList 沒有 .find()，改用 querySelector
        const selectedItem = document.querySelector('.equipment-item.highlight');
        const selectedEquipment = selectedItem ? selectedItem.dataset.equipment : '';
        const problemType = problemTypeSelect.value;
        const description = descriptionInput.value.trim();

        if (selectedEquipment && problemType && description) {
            confirmationMessage.className = 'success';
            confirmationMessage.textContent =
                `✅ 已提交報修：設備＝${selectedEquipment}，問題類型＝${problemType}，描述＝${description}`;
        } else {
            confirmationMessage.className = 'error';
            confirmationMessage.textContent = '⚠️ 請選擇設備和問題類型，並填寫問題描述。';
        }
    });

    resetButton.addEventListener('click', () => {
        equipmentItems.forEach(item => item.classList.remove('highlight'));
        problemTypeSelect.value = '';
        descriptionInput.value = '';
        confirmationMessage.className = '';
        confirmationMessage.textContent = '';
    });
});
