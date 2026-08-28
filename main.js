const fileInput = document.getElementById("fileInput");
const processButton = document.getElementById("processButton");
const status = document.getElementById("status");
const download = document.getElementById("download");

fileInput.addEventListener("change", () => {
    processButton.disabled = !fileInput.files.length;
    download.hidden = true;
    status.textContent = "";
});

processButton.addEventListener("click", async () => {
    const file = fileInput.files[0];

    if (!file) {
        return;
    }

    status.textContent = "Processing...";
    download.hidden = true;

    try {
        const text = await file.text();
        const result = processLog(text);

        const blob = new Blob(
            [result.text],
            { type: "text/plain;charset=utf-8" }
        );

        const url = URL.createObjectURL(blob);

        download.href = url;
        download.download = `${file.name}`; //TODO change filename as this contains device name
        download.textContent = "Download";
        download.hidden = false;

        status.textContent =`Found ${result.names.length} identifiers to redact..`;
        console.log(result.names)

    } catch (error) {
        console.error(error);
        status.textContent = `Error processing file: ${error.message}`;
    }
});