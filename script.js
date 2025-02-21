// Digital Clock and Date
function updateDigitalClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    document.getElementById('digitalTime').innerText = `${hours}:${minutes}:${seconds}`;

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById("date").innerText = now.toLocaleDateString(undefined, options);
}
setInterval(updateDigitalClock, 1000);
updateDigitalClock();

// Analog Clock
setInterval(() => {
    let d = new Date();
    let htime = d.getHours();
    let mtime = d.getMinutes();
    let stime = d.getSeconds();
    let hrotation = 30 * htime + mtime / 2;
    let mrotation = 6 * mtime;
    let srotation = 6 * stime;

    document.getElementById("hour").style.transform = `rotate(${hrotation}deg)`;
    document.getElementById("minute").style.transform = `rotate(${mrotation}deg)`;
    document.getElementById("second").style.transform = `rotate(${srotation}deg)`;
}, 1000);

async function fetchQuote() {
    try {
        const url = "https://api.allorigins.win/get?url=" + encodeURIComponent("https://zenquotes.io/api/random") + "&timestamp=" + new Date().getTime();

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const quoteData = JSON.parse(data.contents)[0]; // Parse JSON from the response

        document.getElementById("quote").innerText = `"${quoteData.q}" - ${quoteData.a}`;
    } catch (error) {
        console.error("Error fetching quote:", error);
        setTimeout(fetchQuote, 5000); // Retry after 5 seconds
    }
}

// Fetch immediately on load
fetchQuote();

// Refresh quote every 60 seconds
setInterval(fetchQuote, 20000);

