async function generateNewPrompt() {
    const siteName = document.getElementById('site-name').value;
    const siteTheme = document.getElementById('site-theme').value;
    // const colorPalette = document.getElementById('color-palette').value;
    const subtitle = document.getElementById('subtitle').value;

    // Загружаем содержимое html.txt
    let htmlContent = '';
    try {
        const response = await fetch('html.txt');
        if (!response.ok) throw new Error('File not found');
        htmlContent = await response.text();
    } catch (error) {
        console.error('Error loading html.txt:', error);
        htmlContent = '<!-- Could not load html.txt -->';
    }
    
    const prompt = `          
Создай новый одностраничный лендинг на тему книги "${siteName}", сохранив бизнес-логику и функциональность (форма, действия, ссылки), но сделав дизайн и структуру красивым и профессиональным а также главное чтобы кнопка формы не работала пока пользователь полностю не заполнит все поля.

🎨 Требования к стилю и дизайну:
Тематика: ${siteTheme}

Добавь современные UX-элементы: автоскролл-секции, анимации, микроинтеракции и т.д.

Сделай сайт полностью адаптивным (мобильные/планшеты/десктоп).

Используй базовые блоки:

Header

Hero Section (для фотографии в секции героя потсавь эту ссылку ./uploads/photo.jpg)

Learning Phases

Why Choose Us

Testimonials 

Form Section

FAQ 

Contact (не добавляй Send Us a Message)

Footer 

Cookie Banner

также в контактах укажи рандомный канадский номер но про страну ничего оне указывай

не добавляй ссылки на социальные сети

не упоминай на странице что либо связанное с названием дизайна

ссылки на страницы Cookie Policy (./pages/cookies/cookies.html), Privacy Policy (./pages/privacy-policy/privacy-policy.html), Terms of Service (./pages/terms/terms.html), Legal Notice (./pages/imprint/imprint.html) должны быть рабочими

под фоткой книги обьязательно укажи это - This is a digital product (PDF). You will receive it by email immediately after filling out the form.

🧠 Содержание и текст:
в форме указать два поля для имени, email и I agree to the Privacy Policy и пока пользователь не заполнит все данные кнопка получить книгу не сработает а если все заполнено то при нажатии на получить книгу пользователя отправит на страницу ./pages/thank/thank.html

Тексты: Особенно важно — соблюдение рекламной политики Google Ads: избегать агрессивных обещаний ("гарантированный успех", "заработай миллион") и использовать нейтральный, правдивый тон.

📖 Книга:
Название: ${siteName}

Подзаголовок: "${subtitle}"

Сделай сайт лёгким и быстрым, избегай тяжёлых изображений.

Для стилей используй tailwindcss

Все названия классов и структура кода должны быть чистыми и понятными.`;
    document.getElementById('new-prompt').textContent = prompt;
    copyToClipboard(prompt);
}

async function generateTransformPrompt() {
    const selectedFile = document.querySelector('input[name="file-selection"]:checked');
    const referenceCode = document.getElementById('reference-code').value;
    const siteName = document.getElementById('transform-site-name').value;

    let currentCode = '';

    if (selectedFile) {
        try {
            const response = await fetch(`${selectedFile.value}.txt`);
            if (!response.ok) throw new Error(`File ${selectedFile.value}.txt not found`);
            const content = await response.text();
            currentCode = `\n\n=== ${selectedFile.value.toUpperCase()} ===\n\n${content}`;
        } catch (error) {
            console.error(`Error loading ${selectedFile.value}.txt:`, error);
            currentCode = `\n\n=== ${selectedFile.value.toUpperCase()} ===\n\n<!-- Could not load ${selectedFile.value}.txt -->`;
        }
    }
    
    const prompt = `${currentCode}

нужно взять этот код и изменить сделать маленькие изменения в контенте страницы а дизайн сделать похожим на эту страницу - 

${referenceCode}

- только не нужно делать подвал и шапку сайта на шапке достаточно сделать ссылку на главную страницу (../../index.html) и запомни сайт называется ${siteName} а также стоит сделать маленькие изменения в контенте (текстах) страницы`;
    
    document.getElementById('transform-prompt').textContent = prompt;
    copyToClipboard(prompt);
}
        
async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        console.log('Текст скопирован в буфер обмена');
    } catch (err) {
        console.error('Ошибка при копировании: ', err);
        // Fallback для старых браузеров
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        document.body.appendChild(textarea);
        textarea.select();
        try {
            document.execCommand('copy');
            console.log('Текст скопирован (fallback method)');
        } catch (err) {
            console.error('Fallback метод тоже не сработал: ', err);
        }
        document.body.removeChild(textarea);
    }
}