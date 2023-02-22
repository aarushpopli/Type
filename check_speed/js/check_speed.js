const select = e => document.querySelector(e);
const selectAll = e => document.querySelectorAll(e);
const input = select('#textInput');
const output = select('#textOutput');
const inputFull = select('#textFull');
const _timer = select('#timer');
const _wpm = select('#wpm');
const _cpm = select('#cpm');
const _errors = select('#errors');
const _accuracy = select('#accuracy');
const _totalWords = select('#totalWords');
const _writtenWords = select('#writtenWords');
const btnPaly = select('#btnPlay');
const btnRefresh = select('#btnRefresh');

const allQuotes = [];
fetch('js/quotes.json')
    .then(response => response.json())
    .then(data => allQuotes.push(...data))
    .catch(error => console.error('Error:', error));

const random = array => array[Math.floor(Math.random() * array.length)];

class speedTyping {
    constructor() {
        this.index = 0; // Main index
        this.words = 0; // Completed words index
        this.errorIndex = 0; // Errors index
        this.correctIndex = 0; // Correct index
        this.accuracyIndex = 0; // Accuracy counter
        this.cpm = 0; // CPM
        this.wpm = 0; // WPM
        this.interval = null; // interval counter
        this.duration = 60; // Test duration
        this.typing = false; // Check if typing
        this.quote = []; // Quotes array
        this.author = []; // Authors array
    }

    timer() {
        if (typeof (this.interval) === 'number')
            return;
        const now = Date.now();
        const done = now + this.duration * 1000;
        _timer.innerHTML = `${this.duration}<span class="small">s</span>`;
        this.interval = setInterval(() => {
            const secondsLeft = Math.round((done - Date.now()) / 1000);
            _timer.innerHTML = `${secondsLeft}<span class="small">s</span>`;
            if (secondsLeft === 0) {
                this.stop();
                this.finish();
            }
        }, 1000);
    }

    start() {
        const filterdQuotes = allQuotes.filter(item => item.level !== 'Easy');
        const getQuote = filterdQuotes.map(item => item.quote);
        const getAuthor = filterdQuotes.map(item => item.author);
        this.author = random(getAuthor);
        this.quote = random(getQuote);
        const quoteWords = this.quote.split(' ').filter(i => i).length; // Count words
        _totalWords.textContent = quoteWords; // Display total words
 
        this.timer(); // Set timer
        btnPaly.classList.add('active'); 
        input.setAttribute('tabindex', '0'); // Enable typing area
        input.removeAttribute('disabled');
        input.focus();
        input.classList.add('active');

        // Check if typing
        if (!this.typing) {
            this.typing = true;
            input.textContent = this.quote; // Display quotes

            // Start the event listener
            input.addEventListener('keypress', event => {
                event.preventDefault();
                event = event || window.event;
                const charCode = event.which || event.keyCode; // Get the pressed key code
                const charTyped = String.fromCharCode(charCode);
                // Compare the pressed key to the quote letter
                if (charTyped === this.quote.charAt(this.index)) { 
                    if (charTyped === " " && charCode === 32) {
                        this.words++;
                        _writtenWords.textContent = this.words;
                    }
                    this.index++;
                    const currentQuote = this.quote.substring(this.index, this.index + this.quote.length);
                    input.textContent = currentQuote;
                    output.innerHTML += charTyped;
                    // Increment correct keys
                    this.correctIndex++;
                    if (this.index === this.quote.length) {
                        this.stop();
                        this.finish();
                        return;
                    }
                } else {
                    // Add errors
                    output.innerHTML += `<span class="text-danger">${charTyped}</span>`;
                    // Increment wrong keys
                    this.errorIndex++;
                    // Add accuracy error
                    _errors.textContent = this.errorIndex;
                    // Decrement correct keys
                    this.correctIndex--;
                }
                // CPM counter
                this.cpm = this.correctIndex > 5 ? Math.floor(this.correctIndex / this.duration * 60) : 0;
                _cpm.textContent = this.cpm;
                this.wpm = Math.round(this.cpm / 5);
                _wpm.textContent = this.wpm;
                this.accuracyIndex = this.correctIndex > 5 ? Math.round((this.correctIndex * 100) / this.index) : 0;
                if (this.accuracyIndex > 0 && Number.isInteger(this.accuracyIndex))
                    _accuracy.innerHTML = `${this.accuracyIndex}<span class="small">%</span>`;
            });
        }
    }

    stop() {
        clearInterval(this.interval); // Clear Interval
        this.interval = null; // Set interval to null
        this.typing = false;
        _timer.textContent = '0'; // Reset timer to 0
        btnPaly.remove(); // Remove start button
        input.remove(); // Remove input area
        inputFull.classList.remove('d-none'); // Show quote
        inputFull.innerHTML = `&#8220;${this.quote}&#8221; <span class="d-block small text-muted text-right pr-3">&ndash; ${this.author}</span></div> `;
        return;
    }

    finish() {
        const wpm = this.wpm;
        const cpm = this.cpm;
        const ei = this.errorIndex;
        const ai = this.accuracyIndex;
        // Save values to localStorage
        localStorage.setItem('WPM', wpm);
        localStorage.setItem('CPM', cpm);
        localStorage.setItem('EI', ei);
        localStorage.setItem('AI', ai);
    }
}

const typingTest = new speedTyping();
btnPaly.addEventListener('click', () => typingTest.start());

// Save last WPM result to Local storage
const savedWPM = localStorage.getItem('WPM') || 0;
select('#result').innerHTML = `<li>${savedWPM}</li>`;
