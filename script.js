const totalSlots = 25;
let registeredSlots = JSON.parse(localStorage.getItem('rd3_slots')) || {};
let isAdmin = false;

function saveToStorage() {
    localStorage.setItem('rd3_slots', JSON.stringify(registeredSlots));
}

function updateSlotUI() {
    const select = document.getElementById('slotSelect');
    const container = document.getElementById('slotsContainer');
    
    select.innerHTML = '';
    container.innerHTML = '';

    for (let i = 1; i <= totalSlots; i++) {
        const isTaken = registeredSlots[i];
        
        if (!isTaken) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = `Slot ${i} (Boş)`;
            select.appendChild(option);
        }

        const div = document.createElement('div');
        div.className = 'slot-item';
        
        let deleteButtonHTML = '';
        if (isAdmin && isTaken) {
            deleteButtonHTML = `<button class="delete-btn" onclick="deleteSlot(${i})">Sil</button>`;
        }

        div.innerHTML = `
            <span>SLOT ${i}: <b>${isTaken ? isTaken.teamName + ' (' + isTaken.contact + ')' : 'BOŞ'}</b></span>
            ${deleteButtonHTML}
        `;
        container.appendChild(div);
    }
}

document.getElementById('slotForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const teamName = document.getElementById('teamName').value;
    const captainContact = document.getElementById('captainContact').value;
    const selectedSlot = document.getElementById('slotSelect').value;

    if (!selectedSlot || registeredSlots[selectedSlot]) return;

    registeredSlots[selectedSlot] = {
        teamName: teamName,
        contact: captainContact
    };

    saveToStorage();
    alert(`${teamName} takımı için Slot ${selectedSlot} başarıyla alındı!`);
    
    document.getElementById('teamName').value = '';
    document.getElementById('captainContact').value = '';
    
    updateSlotUI();
});

function adminLogin() {
    const pass = document.getElementById('adminPass').value;
    // İstediğin şifre kontrolü (rd3.4 veya rd3.1)
    if (pass === 'rd3.4' || pass === 'rd3.1') {
        isAdmin = true;
        document.getElementById('loginArea').classList.add('hidden');
        document.getElementById('adminPanel').classList.remove('hidden');
        document.getElementById('adminPass').value = '';
        updateSlotUI();
        alert('Yönetici girişi başarılı!');
    } else {
        alert('Hatalı şifre!');
    }
}

function adminLogout() {
    isAdmin = false;
    document.getElementById('loginArea').classList.remove('hidden');
    document.getElementById('adminPanel').classList.add('hidden');
    updateSlotUI();
}

function deleteSlot(slotNumber) {
    if (confirm(`Slot ${slotNumber} üzerindeki kaydı silmek istediğinize emin misiniz?`)) {
        delete registeredSlots[slotNumber];
        saveToStorage();
        updateSlotUI();
    }
}

function resetAllSlots() {
    if (confirm('TÜM SLOTLARI sıfırlamak istediğinize emin misiniz? Bu işlem geri alınamaz!')) {
        registeredSlots = {};
        saveToStorage();
        updateSlotUI();
        alert('Tüm slotlar sıfırlandı.');
    }
}

updateSlotUI();
