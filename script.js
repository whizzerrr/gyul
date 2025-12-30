// 상수
const PRICE_PER_BOX = 15000;

// DOM 요소
const quantityInput = document.getElementById('quantity');
const decreaseBtn = document.getElementById('decreaseBtn');
const increaseBtn = document.getElementById('increaseBtn');
const totalPriceElement = document.getElementById('totalPrice');
const orderForm = document.getElementById('orderForm');

// 가격 포맷팅 함수
function formatPrice(price) {
    return price.toLocaleString('ko-KR') + '원';
}

// 총 가격 업데이트
function updateTotalPrice() {
    const quantity = parseInt(quantityInput.value);
    const totalPrice = PRICE_PER_BOX * quantity;
    totalPriceElement.textContent = formatPrice(totalPrice);
}

// 수량 감소
decreaseBtn.addEventListener('click', function() {
    const currentValue = parseInt(quantityInput.value);
    if (currentValue > 1) {
        quantityInput.value = currentValue - 1;
        updateTotalPrice();
    }
});

// 수량 증가
increaseBtn.addEventListener('click', function() {
    const currentValue = parseInt(quantityInput.value);
    if (currentValue < 10) {
        quantityInput.value = currentValue + 1;
        updateTotalPrice();
    }
});

// 전화번호 포맷팅
function formatPhoneNumber(value) {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 3) {
        return numbers;
    } else if (numbers.length <= 7) {
        return numbers.slice(0, 3) + '-' + numbers.slice(3);
    } else {
        return numbers.slice(0, 3) + '-' + numbers.slice(3, 7) + '-' + numbers.slice(7, 11);
    }
}

// 전화번호 입력 처리
const phoneInput = document.getElementById('phone');
phoneInput.addEventListener('input', function(e) {
    e.target.value = formatPhoneNumber(e.target.value);
});

// 폼 제출 처리
orderForm.addEventListener('submit', function(e) {
    e.preventDefault();

    // 입력값 가져오기
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const address = document.getElementById('address').value.trim();
    const addressDetail = document.getElementById('addressDetail').value.trim();
    const memo = document.getElementById('memo').value.trim();
    const quantity = parseInt(quantityInput.value);

    // 유효성 검사
    if (!name) {
        alert('이름을 입력해주세요.');
        document.getElementById('name').focus();
        return;
    }

    if (!phone || phone.length < 12) {
        alert('올바른 전화번호를 입력해주세요.');
        document.getElementById('phone').focus();
        return;
    }

    if (!address) {
        alert('배송 주소를 입력해주세요.');
        document.getElementById('address').focus();
        return;
    }

    // 주문 정보 확인
    const totalPrice = PRICE_PER_BOX * quantity;
    const fullAddress = addressDetail ? `${address} ${addressDetail}` : address;

    const confirmMessage = `
주문 정보를 확인해주세요.

[주문 상품]
제주 노지 감귤 (5kg) x ${quantity}박스
총 결제금액: ${formatPrice(totalPrice)}

[배송 정보]
받는 분: ${name}
연락처: ${phone}
주소: ${fullAddress}
${memo ? `배송메모: ${memo}` : ''}

주문하시겠습니까?`;

    if (confirm(confirmMessage)) {
        alert('주문이 완료되었습니다!\n감사합니다.');
        orderForm.reset();
        quantityInput.value = 1;
        updateTotalPrice();
    }
});
