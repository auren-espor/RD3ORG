const totalSlots = 16;
let registeredSlots = {};

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
        div.innerHTML = `
            <span>SLOT ${i}</span>
            <span>${isTaken ? isTaken.teamName : 'BOŞ'}</span>
        `;
        container.appendChild(div);
    }
}

document.getElementById('slotForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const teamName = document.getElementById('teamName').value;
    const captainContact = document.getElementById('captainContact5' in window ? 'captainContact' : 'captainContact').value;
    const selectedSlot = document.getElementById('slotSelect').value;

    if (!selectedSlot || registeredSlots[selectedSlot]) return;

    registeredSlots[selectedSlot] = {
        teamName: teamName,
        contact: captainContact
    };

    alert(`${teamName} takımı için Slot ${selectedSlot} başarıyla alındı!`);
    
    document.getElementById('teamName').value = '';
    document.getElementById('captainContact').value = '';
    
    updateSlotUI();
});

updateSlotUI();
