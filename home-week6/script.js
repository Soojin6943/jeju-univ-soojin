function allowDrop(ev) {
    ev.preventDefault();
    ev.dataTransfer.dropEffect = "move";
}

// function drop(ev) {
//     ev.preventDefault();
    
//     try {
//         // 부모 요소의 id를 저장해서 plant-holder div가 이동하게
//         const data = ev.dataTransfer.getData("text");
//         const draggedElement = document.getElementById(data);

//         if (!draggedElement) { // if dragElement is null
//             console.log('Element not found:', data);
//             return;
//         }

//         // 드롭 대상의 위치와 크기 정보 가져옴
//         const rect = ev.target.getBoundingClientRect();
//         // 실제 드롭 위치 계산
//         const x = ev.clientX - rect.left;
//         const y = ev.clientY - rect.top;

//         // 드래그된 식물 부모 요소
//         const plantHolder = draggedElement.closest('.plant-holder');

//         if (!plantHolder) {
//             return;
//         }

//         plantHolder.style.position = 'absolute';
//         plantHolder.style.left = x +'px';
//         plantHolder.style.top = y + 'px';

//         // z-index 관리 (+ 가장 최근에 드롭된 식물이 위에 보이도록 설정)
//         const plants = document.querySelectorAll('.plant-holder');
//         let maxZIndex = 0;
//         plants.forEach(plant => {
//             const zIndex = parseInt(window.getComputedStyle(plant).zIndex) || 0;
//             maxZIndex = Math.max(maxZIndex, zIndex);
//         });
//         plantHolder.style.zIndex = maxZIndex + 1;

//         // 테라리움 내부 드롭인지 확인
//         const terrarium = document.getElementById('terrarium');
//         if (terrarium.contains(ev.target) || ev.target === terrarium) {
//             terrarium.appendChild(plantHolder);
//         }
//     } catch (error) {
//         console.error('Error in drop handler:', error);
//     }
// }

// function drag(ev) {
//     ev.stopPropagation();

//     // 드래그되는 식물의 id 저장
//     if (ev.target.classList.contains('plant')) {
//         ev.dataTransfer.setData("text", ev.target.id);

//         ev.dataTransfer.effectAllowed = "move";
//     }
// }

function drop(ev) {
    ev.preventDefault();
    
    try {
        const data = ev.dataTransfer.getData("text");
        const draggedElement = document.getElementById(data);

        if (!draggedElement) {
            return;
        }

        // 드롭 대상 요소 찾기
        let dropTarget = ev.target;
        while (dropTarget && !dropTarget.classList.contains('container') && dropTarget.id !== 'terrarium') {
            dropTarget = dropTarget.parentElement;
        }

        if (!dropTarget) return;

        // 드롭 위치 계산 수정
        const rect = dropTarget.getBoundingClientRect();
        const x = ev.clientX - rect.left;
        const y = ev.clientY - rect.top;

        // plant-holder 찾기
        const plantHolder = draggedElement.closest('.plant-holder');
        if (!plantHolder) return;

        // 위치 설정
        plantHolder.style.position = 'absolute';
        plantHolder.style.left = `${x - (plantHolder.offsetWidth / 2)}px`;
        plantHolder.style.top = `${y - (plantHolder.offsetHeight / 2)}px`;

        // z-index 관리
        const plants = document.querySelectorAll('.plant-holder');
        let maxZIndex = 0;
        plants.forEach(plant => {
            const zIndex = parseInt(window.getComputedStyle(plant).zIndex) || 0;
            maxZIndex = Math.max(maxZIndex, zIndex);
        });
        plantHolder.style.zIndex = maxZIndex + 1;

        // 요소 추가
        dropTarget.appendChild(plantHolder);
    } catch (error) {
        console.error('Error in drop handler:', error);
    }
}

function drag(ev) {
    ev.stopPropagation();
    
    // 드래그되는 요소의 ID 저장 방식 수정
    const plantHolder = ev.target.closest('.plant-holder');
    if (plantHolder) {
        ev.dataTransfer.setData("text", plantHolder.id);
        ev.dataTransfer.effectAllowed = "move";
    }
}

document.querySelectorAll('.plant-holder').forEach(plant => {
    plant.addEventListener('dblclick', function(e) {
        const plants = document.querySelectorAll('.plant-holder');
        let maxZIndex = 0;
        plants.forEach(p => {
            const zIndex = parseInt(window.getComputedStyle(p).zIndex) || 0;
            maxZIndex = Math.max(maxZIndex, zIndex);
        });
        this.style.zIndex = maxZIndex + 1;
    });
});


