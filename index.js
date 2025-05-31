async function generateNewPrompt() {
    const siteName = document.getElementById('site-name').value;
    const siteTheme = document.getElementById('site-theme').value;
    const colorPalette = document.getElementById('color-palette').value;
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
    
    const prompt = `${htmlContent}
            
Создай новый одностраничный лендинг на тему книги "${siteName}", сохранив текущую бизнес-логику и функциональность (форма, действия, ссылки), но полностью изменив дизайн и структуру а также главное чтобы кнопка формы не работала пока пользователь полностю не заполнит все поля.

🎨 Требования к стилю и дизайну:
Тематика: ${siteTheme}

Цветовая палитра: ${colorPalette}

Не использовать большие картинки для фона.

Добавь современные UX-элементы: автоскролл-секции, анимации, микроинтеракции, но не переусердствуй.

Сделай сайт полностью адаптивным (мобильные/планшеты/десктоп).

Используй базовые блоки:

Шапка

Подвал

🧠 Содержание и текст:
Логика (форма, ссылки и структура данных) — оставить без изменений.

Тексты: переформулируй все абзацы так, чтобы они отличались от оригинала, но передавали ту же суть. Особенно важно — соблюдение рекламной политики Google Ads: избегать агрессивных обещаний ("гарантированный успех", "заработай миллион") и использовать нейтральный, правдивый тон.

📖 Книга:
Название: ${siteName}

Подзаголовок: "${subtitle}"

⚠️ Важно:
Новый сайт не должен быть похожим на предыдущий ни визуально, ни в текстах.

Сделай сайт лёгким и быстрым, избегай тяжёлых изображений и лишнего JS.

Все названия классов и структура кода должны быть чистыми и понятными.`;
            
    document.getElementById('new-prompt').textContent = prompt;
    copyToClipboard(prompt);
}
        
function generateTransformPrompt() {
    const currentCode = document.getElementById('current-code').value;
    const referenceCode = document.getElementById('reference-code').value;
    const siteName = document.getElementById('transform-site-name').value;
    
    const prompt = `${currentCode}

нужно взять этот код и изменить сделать маленькие изменения в контенте страницы а дизайн сделать похожим на эту страницу - 

${referenceCode}

- только не нужно делать подвал и шапку сайта на шапке достаточно сделать ссылку на главную страницу и запомни сайт называется ${siteName} а также стоит сделать маленькие изменения в контенте (текстах) страницы`;
    
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