async function getAdvice() {
    try {
        const response = await fetch('https://api.adviceslip.com/advice');
        if (!response.ok) {
            throw new Error('조언을 불러올 수 없습니다.');
        }
        const data = await response.json();
        const advice = data.slip.advice;

        // DOM 요소 업데이트
        document.getElementById('advice-text').textContent = advice;
    } catch (error) {
        console.error('오류 발생:', error);
        document.getElementById('advice-text').textContent = '조언을 가져오는 데 실패했습니다. 다시 시도하세요!';
    }
}

// 버튼 클릭 이벤트 등록
document.getElementById('get-advice-btn').addEventListener('click', getAdvice);

// 확장 프로그램이 로드될 때 조언 가져오기
getAdvice();
