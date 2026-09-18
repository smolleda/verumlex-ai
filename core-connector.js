// --- VERUMLEX AI — CORE CONNECTOR SHORT v1.0 ---
const DICT = {
    ES: { u: "Inyección de Comando // Operador", ai: "Respuesta Núcleo // VERUMLEX CORE", err: "ERROR CRÍTICO // CONMUTADOR DE RED." },
    EN: { u: "Command Injection // Operator", ai: "Core Response // VERUMLEX CORE", err: "CRITICAL ERROR // NETWORK SWITCHER." },
    PT: { u: "Injeção de Comando // Operador", ai: "Resposta Núcleo // VERUMLEX CORE", err: "ERRO CRÍTICO // INTERRUPTOR DE REDE." },
    ZH: { u: "指令注入 // 操作员", ai: "核心响应 // VERUMLEX CORE", err: "关键错误 // 网络切换器。" },
    DE: { u: "Befehlseinspeisung // Bediener", ai: "Core-Antwort // VERUMLEX CORE", error: "KRITISCHER FEHLER // NETZWERKSWITCHER." }
};

if (typeof execBtn !== 'undefined') {
    const nBtn = execBtn.cloneNode(true);
    execBtn.parentNode.replaceChild(nBtn, execBtn);
    
    nBtn.addEventListener("click", async () => {
        const p = cmdInput.value.trim(); if (!p) return;
        const lbl = DICT[langSelect.value] || DICT.ES;
        
        mainText.style.fontSize = "13px"; mainText.style.color = "#80868b"; consoleOutput.style.marginBottom = "5px";
        
        const uBox = document.createElement("div");
        uBox.style = "font-size:16px; line-height:1.6; color:#1f1f1f; border-left:4px solid #64748b; padding-left:16px; margin-bottom:16px;";
        uBox.innerHTML = `<div><small style="font-size:10px; font-weight:800; color:#64748b; text-transform:uppercase; display:block; margin-bottom:4px;">${lbl.u}</small><div>${p}</div></div>`;
        chatHistory.appendChild(uBox);
        
        cmdInput.value = ""; cmdInput.style.height = "28px";
        
        const aBox = document.createElement("div");
        aBox.style = "font-size:15px; line-height:1.6; color:#3c4043; mt:12px; margin-bottom:16px; background:#f8f9fa; padding:14px; border-radius:8px; border-left:4px solid #0f2d59;";
        aBox.innerHTML = `<div><small style="font-size:10px; font-weight:800; color:#0f2d59; text-transform:uppercase; display:block; margin-bottom:4px;">${lbl.ai}</small><div class="txt">...</div></div>`;
        chatHistory.appendChild(aBox); chatHistory.scrollTop = chatHistory.scrollHeight;
        
        const txt = aBox.querySelector(".txt");
        try {
            const r = await fetch("http://localhost:8080/api/v1/chat/completions", {
                method: "POST", headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ model: "dual-resilient", messages: [{ role: "user", content: p }], temperature: 0.3, roleMode: roleSelect.value })
            });
            if (!r.ok) throw new Error();
            const d = await r.json(); txt.innerText = d.choices.message.content;
            if (studioLog) studioLog.innerHTML += `<br>[${new Date().toLocaleTimeString()}] INFERENCIA COMPLETE`;
        } catch (e) {
            txt.style.color = "#ea4335"; txt.innerText = lbl.err;
        }
        chatHistory.scrollTop = chatHistory.scrollHeight;
    });
}
