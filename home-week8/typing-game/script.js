const quotes = [
    // 'When you have eliminated the impossible, whatever remains, howeverimprobable, must be the truth.',
    //     'There is nothing more deceptive than an obvious fact.',
    //     'I ought to know by this time that when a fact appears to be opposed to along train of deductions it invariably proves to be capable of bearing some other interpretation.',
    //     'I never make exceptions. An exception disproves the rule.',
    //     'What one man can invent another can discover.',
    //     'Nothing clears up a case so much as stating it to another person.',
    //     'Education never ends, Watson. It is a series of lessons, with the greatest for the last.',
        '그대가 꺾어준 꽃 시들 때까지 들여다보았네 그대가 남기고 간 시든 꽃 다시 필 때까지',
        '얼굴 하나야 손가락 둘로 푹 가리지만 보고 싶은 마음 호수만 하니 눈 감을 수밖에',
        '자세히 보아야 예쁘다 오래 보아야 사랑스럽다 너도 그렇다', 
        '연탄재 함부로 발로 차지 마라 너는 누구에게 한 번이라도 뜨거운 사람이었느냐',
        '죽는 날까지 하늘을 우러러 한 점 부끄럼이 없기를',
        '가장 넓은 길은 언제나 내 마음속에',
        '나의 꿈은 맑은 바람이 되어',
        '넓은 하늘로의 비상을 꿈꾸며',
        '많고 많은 사람 중에 그대 한 사람',
        '너무 맑고 초롱한 그중 하나 별이여',
        '그대만큼 사랑스러운 사람을 본 일이 없다',
        '사람이 온다는 건 실은 어마어마한 일이다',
        '흙에서 자란 내 마음 파란 하늘빛',
        '밝은 마음으로 오늘을 열어 가자',
        '넓음과 깊음을 가슴에 채우며',
    ];
    
    // let 은 고정값이 아니라서 사용
    let words = [];
    let wordIndex = 0;
    let startTime = Date.now();

    // 돔을 바꾸지 않는 한 바뀔 일이 없어서 const 사용
    const quoteElement = document.getElementById('quote');
    const messageElement = document.getElementById('message');
    const typedValueElement = document.getElementById('typed-value');
    const startButton = document.getElementById('start');

    // 모달을 위한
    const modal = document.querySelector('.modal');
    const modalPopup = document.querySelector('.modal_popup');
    // btn 잘보기!! bnt라 적어서 하루종일 오류 못찾음..
    const modalCloseBtn = document.querySelector('.modal_close_btn');

    // 최고 점수를 위한
    const bestScoreElement = document.getElementById('best_score');

    // 모달 닫기 버튼 이벤트 리스너
    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', () => {
            modal.style.display = 'none';
            typedValueElement.disabled = false;
            typedValueElement.value = '';
            messageElement.innerText = '';
            quoteElement.innerText = '';
        });
    }

    // 페이지 로드 시 최고 점수 초기화
    function initBestScore() {
        const bestScore = localStorage.getItem('bestScore'); // betstScore value 읽어오기
        if (bestScore) {
            bestScoreElement.textContent = `최고 기록: ${bestScore}초`;
        }
    }

    // 페이지 로드 시 최고 점수 표기되게
    initBestScore();

    document.getElementById('start').addEventListener('click', onClickFunction)
    
    function onClickFunction() {
        // 무작위 인덱스 생성
        const quoteIndex = Math.floor(Math.random() * quotes.length);
        
        console.log(quoteIndex);

        // 무작위 인덱스 값으로 인용문 선택
        const quote = quotes[quoteIndex];
        // 공백 문자를 기준으로 words 배열에 저장
        words = quote.split(' ');
        // 초기화 위에도 있지만 한번 더 
        wordIndex = 0;

        // span 태그로 감싼 후 배열에 저장
        const spanWords = words.map (function(word) { return `<span>${word} </span>`});
        // 하나의 문자열로 결합 및 설정
        quoteElement.innerHTML = spanWords.join('');
        // 첫번째 단어 강조
        quoteElement.childNodes[0].className = 'highlight';
        // 메시지 요소 초기화
        messageElement.innerText = '';

        // 입력 필드 초기화
        typedValueElement.value = '';
        // 포커스 설정
        typedValueElement.focus();

        // 타이핑 시작 시간 기록
        startTime = new Date().getTime();

        // !!!! 게임 시작 시 start 버튼 비활성화 !!!!
        startButton.disabled = true;

        typedValueElement.disabled = false;


    };

    typedValueElement.addEventListener('input', () => {
        // 현재 타이핑할 단어를 currentWord에 저장
        const currentWord = words[wordIndex];
        // 입력한 값을 typedValue에 저장
        const typedValue = typedValueElement.value;

        // 마지막 단어까지 정확히 입력했는 지 체크?
        if (typedValue === currentWord && wordIndex === words.length - 1) {
            // 타이핑에 소요된 시간 계산
            const elapsedTime = new Date().getTime() - startTime;
            // 점수(소수점 둘째자리까지)
            const currentScore = (elapsedTime/1000).toFixed(2);

            // 최고 점수 업데이트
            const bestScore = localStorage.getItem('bestScore');
            if (!bestScore || parseFloat(currentScore) < parseFloat(bestScore)) {
                localStorage.setItem('bestScore', currentScore);
                bestScoreElement.textContent = `최고 기록: ${currentScore}초`;

                // 신기록 축하 메세지
                const message = `축하합니다!! 신기록 달성!\n${currentScore}초`;
                modalPopup.querySelector('h3').textContent = '🎉 새로운 기록! 🎉';

                modalPopup.querySelector('p').textContent = message;

            } else {
                const message = `완료 시간: ${currentScore}초\n최고 기록: ${bestScore}초`;
                modalPopup.querySelector('h3').textContent = '게임 완료!';

                modalPopup.querySelector('p').textContent = message;
            }

            typedValueElement.value = '';
            messageElement.innerText = '';

            // 모달 표시
            modal.style.display = 'block';
            // 게임 완료 시 텍스트 상자 비활성화
            typedValueElement.disabled = true;
            // 게임 완료 시 start 버튼 활성화
            startButton.disabled = false;


            // 입력된 값이 공백으로 끝났는지와 공백을 제거한 값이 현재 단어와 일치하는 지 확인
        } else if (typedValue.endsWith(' ') && typedValue.trim() === currentWord) {
            // 입력 필드 초기화하여 다음 단어 입력 준비
            typedValueElement.value = '';
            // 다음 단어로 이동
            wordIndex++;
            // 모든 강조 표시 제거
            for (const wordElement of quoteElement.childNodes) {
                // 클래스 제거
                wordElement.className = '';
            }
            // 다음으로 타이핑할 단어에 클래스 추가
            quoteElement.childNodes[wordIndex].className = 'highlight';
        } else if (currentWord.startsWith(typedValue)) { // 현재 단어의 일부를 맞게 입력하고 있는 지 확인
            typedValueElement.className = ''; // 올바르면 클래스 제거
        } else {
            typedValueElement.className = 'error'; // 틀리면 error 클래스 추가
        }
    });

