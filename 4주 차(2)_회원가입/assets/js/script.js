document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signupForm');
    const checkUsernameBtn = document.getElementById('checkUsernameBtn');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const usernameCheckMsg = document.getElementById('usernameCheckMsg');
    const passwordCheckMsg = document.getElementById('passwordCheckMsg');
    const confirmPasswordCheckMsg = document.getElementById('confirmPasswordCheckMsg');
    const successMsg = document.getElementById('successMsg');

    let existingEntries = [];
    let usernameChecked = false;

    const preventKoreanInput = (input) => {
        input.addEventListener('input', () => {
            if (/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(input.value)) {
                input.value = input.value.replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g, '');
            }
        });
    };

    preventKoreanInput(usernameInput);
    preventKoreanInput(passwordInput);
    preventKoreanInput(confirmPasswordInput);

    checkUsernameBtn.addEventListener('click', () => {
        const username = usernameInput.value.trim();
        const isUsernameTaken = existingEntries.some(entry => entry.username === username);

        if (isUsernameTaken) {
            usernameCheckMsg.textContent = '이미 사용 중인 아이디입니다.';
            usernameChecked = false;
        } else {
            usernameCheckMsg.textContent = '사용 가능한 아이디입니다.';
            usernameChecked = true;
        }
    });

    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();
        const confirmPassword = confirmPasswordInput.value.trim();
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*]).{1,12}$/;

        if (!usernameChecked) {
            usernameCheckMsg.textContent = '아이디 중복 체크를 해주세요.';
            return;
        }

        if (!passwordRegex.test(password)) {
            passwordCheckMsg.textContent = '비밀번호는 영어, 숫자, 기호를 포함한 12자 이하이어야 합니다.';
            return;
        } else {
            passwordCheckMsg.textContent = '';
        }

        if (password !== confirmPassword) {
            confirmPasswordCheckMsg.textContent = '비밀번호가 일치하지 않습니다.';
            return;
        } else {
            confirmPasswordCheckMsg.textContent = '';
        }

        existingEntries.push({ username, password });
        successMsg.classList.remove('hidden');
        setTimeout(() => {
            successMsg.classList.add('hidden');
        }, 3000);
        signupForm.reset();
        usernameChecked = false;
        usernameCheckMsg.textContent = '';
        passwordCheckMsg.textContent = '';
        confirmPasswordCheckMsg.textContent = '';
    });

    window.addEventListener('load', () => {
        usernameCheckMsg.textContent = '';
        passwordCheckMsg.textContent = '';
        confirmPasswordCheckMsg.textContent = '';
        successMsg.classList.add('hidden');
    });
});
