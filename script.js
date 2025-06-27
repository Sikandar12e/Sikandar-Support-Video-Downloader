document.getElementById("downloadBtn").addEventListener("click", async () => {
    const videoUrl = document.getElementById("videoUrl").value.trim();
    const mode = document.querySelector('input[name="mode"]:checked').value;
    const resultBox = document.getElementById("result");

    resultBox.innerHTML = "";

    if (!videoUrl) {
        resultBox.innerHTML =
            "<p class='text-red-400'>❌ कृपया वीडियो का URL दर्ज करें।</p>";
        return;
    }

    resultBox.innerHTML = `<div class="flex justify-center"><div class="loader"></div></div>`;

    try {
        const response = await fetch("/download", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url: videoUrl, mode: mode }),
        });

        const data = await response.json();

        if (data.success) {
            const label =
                mode === "audio"
                    ? "🎵 ऑडियो डाउनलोड करें (MP3)"
                    : "🎥 वीडियो डाउनलोड करें";
            resultBox.innerHTML = `
                <div class="mt-6 animate-fade-in text-center">
                    <img src="${data.thumbnail}" alt="Thumbnail" class="w-full rounded-lg mb-4 max-h-64 object-cover mx-auto">
                    <h2 class="text-lg font-semibold mb-2">${data.title}</h2>
                    <div class="flex flex-col sm:flex-row gap-4 justify-center">
                        <a href="${data.download_url}" class="bg-green-600 hover:bg-green-700 px-6 py-2 rounded-lg text-white font-semibold inline-block" target="_blank" download>
                            ${label}
                        </a>
                        <a href="${data.thumbnail}" class="bg-yellow-500 hover:bg-yellow-600 px-6 py-2 rounded-lg text-white font-semibold inline-block" target="_blank" download>
                            🖼️ थंबनेल डाउनलोड करें
                        </a>
                    </div>
                </div>
            `;
        } else {
            resultBox.innerHTML =
                "<p class='text-red-400'>❌ डाउनलोड नहीं हो सका।</p>";
        }
    } catch (error) {
        console.error(error);
        resultBox.innerHTML =
            "<p class='text-red-400'>❌ कुछ गड़बड़ हो गई। कृपया फिर से प्रयास करें।</p>";
    }
});
