document.addEventListener("DOMContentLoaded", () => {
    const userAgent = navigator.userAgent;
    
    let os = "Невідома ОС";
    if (userAgent.includes("Win")) os = "Windows";
    else if (userAgent.includes("Mac")) os = "MacOS";
    else if (userAgent.includes("Linux")) os = "Linux";
    else if (userAgent.includes("Android")) os = "Android";
    else if (userAgent.includes("iPhone") || userAgent.includes("iPad")) os = "iOS";

    let browser = "Невідомий браузер";
    if (userAgent.includes("Edg")) browser = "Edge";
    else if (userAgent.includes("Firefox")) browser = "Firefox";
    else if (userAgent.includes("Chrome")) browser = "Chrome";
    else if (userAgent.includes("Safari") && !userAgent.includes("Chrome")) browser = "Safari";

    localStorage.setItem("userOS", os);
    localStorage.setItem("userBrowser", browser);
    localStorage.setItem("userAgentRaw", userAgent);

    const footer = document.querySelector("footer");
    if (footer) {
        let storageOutput = "<div style='margin-top: 20px; font-size: 14px; border-top: 1px dashed gray; padding-top: 10px;'><strong>Всі дані з localStorage:</strong><br>";
        
        for (let i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i);
            let value = localStorage.getItem(key);
            storageOutput += `<span><b>${key}</b>: ${value}</span><br>`;
        }
        
        storageOutput += "</div>";
        footer.innerHTML += storageOutput;
    }

    const variantNumber = 1;
    const apiUrl = `https://jsonplaceholder.typicode.com/posts/${variantNumber}/comments`;
    const commentsList = document.getElementById("comments-list");

    if (commentsList) {
        fetch(apiUrl)
            .then(response => response.json())
            .then(comments => {
                commentsList.innerHTML = "";
                comments.forEach(comment => {
                    commentsList.innerHTML += `
                        <div style="border-left: 3px solid gray; padding-left: 10px; margin-bottom: 15px;">
                            <strong>${comment.name}</strong><br><small>Користувач</small>
                            <p>${comment.body}</p>
                        </div>`;
                });
            })
            .catch(() => {
                commentsList.innerHTML = "<p>Помилка завантаження коментарів.</p>";
            });
    }

    const modal = document.getElementById("feedback-modal");
    const closeBtn = document.querySelector(".close-btn");

    if (modal && closeBtn) {
        setTimeout(() => {
            modal.style.display = "block";
        }, 60000);

        closeBtn.onclick = () => {
            modal.style.display = "none";
        };

        window.onclick = (event) => {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        };
    }
    const themeToggleBtn = document.getElementById("theme-toggle");
    const bodyElement = document.body;
    const currentHour = new Date().getHours();

    if (currentHour < 7 || currentHour >= 21) {
        bodyElement.classList.add("dark-theme");
        if (themeToggleBtn) themeToggleBtn.innerText = "☀️ Денний режим";
    }

    if (themeToggleBtn) {
        themeToggleBtn.onclick = () => {
            bodyElement.classList.toggle("dark-theme");
            if (bodyElement.classList.contains("dark-theme")) {
                themeToggleBtn.innerText = "☀️ Денний режим";
            } else {
                themeToggleBtn.innerText = "🌙 Нічний режим";
            }
        };
    }
});