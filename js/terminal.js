const terminal = document.querySelector(".terminal");
const base = `byouku<span style="color: #ff0707">.works</span>:<span style="color: rgb(255, 16, 16)">~</span>$ `;
let array = [];
let input = "";
let lastIdx = -1;
let lastCmd = "";
let index = 0;
let sw = true;

function updateConsole() {
	document.querySelector(".new-line").innerHTML = sw ? index === 0 ? base + input + "|" : base + input.slice(0, index) + "|" + input.slice(index) : base + input
}
document.addEventListener("keydown", function(a) {
	a = a || window.event;
	const b = a.key;
	if ((a.metaKey || a.ctrlKey) && a.key === "v" && navigator.userAgent.search("Firefox") === -1) {
		navigator.clipboard.readText().then(function(c) {
			if (c === "" || c.trim().length === 0) return;
			if (index === 0) input += c;
			else input = input.slice(0, index) + c + input.slice(index);
			updateConsole()
		});
		a.preventDefault();
		return
	}
	if (a.ctrlKey || a.metaKey || a.altKey) return;
	if (input.length + index <= 0) index = -input.length;
	if (index > 0) index = 0;
	if (b.length === 1) {
		if (index === 0) input += b;
		else input = input.slice(0, index) + b + input.slice(index);
		updateConsole();
		a.preventDefault();
		return
	}
	switch (b) {
		case "Enter":
			let d = input.length !== 0;
			if (d) {
				const e = input.trim().split(" ");
				const f = e.shift().toLowerCase();
				switch (f) {
					case "clear":
						clear();
						break;
					case "info":
					case "neofetch":
						info();
						break;
					default:
						d = false;
						writeLine(`zsh: command not found: ${f}`);
						break
				}
			}
			switchToNewLine(d);
			terminal.scrollTop = terminal.scrollHeight - terminal.clientHeight;
			break;
		case "Backspace":
			if (input.length <= 0) return;
			if (index === 0) input = input.slice(0, -1);
			else input = input.slice(0, index - 1) + input.slice(index);
			updateConsole();
			break;
		case "Delete":
			if (input.length <= 0 || index === 0) return;
			input = input.slice(0, index) + (index === -1 ? "" : input.slice(index + 1));
			index = index >= 0 ? 0 : index + 1;
			updateConsole();
			break;
		case "ArrowLeft":
			if (input.length === 0 || input.length + index <= 0) index = -input.length;
			else index--;
			updateConsole();
			break;
		case "ArrowRight":
			index = index >= 0 ? 0 : index + 1;
			updateConsole();
			break;
		case "ArrowUp":
			if (array.length === 0) return;
			if (lastIdx === -1) {
				lastIdx = array.length;
				lastCmd = input
			}
			lastIdx--;
			if (lastIdx <= 0) lastIdx = 0;
			input = array[lastIdx];
			updateConsole();
			break;
		case "ArrowDown":
			if (lastIdx === -1) return;
			lastIdx++;
			if (lastIdx >= array.length) {
				lastIdx = -1;
				input = lastCmd;
				return
			}
			input = array[lastIdx];
			updateConsole();
			break
	}
	a.preventDefault()
}, false);
inputLine("info");
info();
switchToNewLine(true);
setInterval(function g() {
	if (index === 0) sw = !sw;
	else sw = true;
	updateConsole();
	return g
}(), 500);

function switchToNewLine(h) {
	if (input.length !== 0) array.push(input);
	lastIdx = -1;
	input = "";
	const i = document.querySelector(".new-line");
	if (i) {
		if (h) i.style.paddingBottom = "5px";
		i.classList.remove("new-line");
		if (i.innerHTML.endsWith("|")) i.innerHTML = i.innerHTML.slice(0, -1)
	}
	index = 0;
	inputLine()
}

function print404() {
	const j = document.querySelector(".new-line");
	j.classList.remove("new-line");
	if (j.innerHTML.endsWith("|")) j.innerHTML = j.innerHTML.slice(0, -1);
	j.innerHTML += "urmomgay";
	writeLine(`zsh: <span>404</span> - Page not found. Redirected to the main page in <span>24h</span>.......`);
	inputLine("./main");
	switchToNewLine()
}

function inputLine(k) {
	terminal.innerHTML += `\n<div class=\"new-line\">byouku<span style=\"color: #ff0707\">.works</span>:<span style=\"color: crimsonred\">~</span>$ ${k?k:""}</div>`
}

function writeLine(l) {
	terminal.innerHTML += `<div>${l}</div>`
}

function clear() {
	terminal.innerHTML = ""
}

function info() {
	terminal.innerHTML += '\n<img alt="icon" class="img" src="static/icon.png">\n' + "  <div><span>byouku<span>.works</span></div>\n" + "  <div>---------------------</div>\n" + "  <div><span>OS</span>: Bloatdoze</div>\n" + "  <div><span>Ages</span>: Skid</div>\n" + "  <div><span>Twitter</span>: <a href=\"https://twitter.com/BY0UKU\" target='_blank'>@BY0UKU</a></div>\n" + "  <div><span>Discord</span>: <a href=\"https://discord.com/users/919063489052557393\" target='_blank'>xbyouku.#0001</a></div>\n" + "  <div><span>Youtube</span>: <a href=\"https://www.youtube.com/channel/UCL3SUPQoQes7wjhaenTiR7A\" target='_blank'>xByouku.</a></div>\n" + "  <div><span>Behance</span>: <a href=\"https://www.behance.net/byouku\" target='_blank'>Trung Hieu</a></div>\n" + "  <div><span>osu!</span>: <a href=\"https://osu.ppy.sh/users/11730136\" target='_blank'>CatBynbonb</a></div>\n" + '  <div style="padding-bottom:10px; clear: both;">'
}
