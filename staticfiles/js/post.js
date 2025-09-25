document.addEventListener("DOMContentLoaded", function () {
    const postForm = document.getElementById("postForm");
    if (!postForm) return;

    // base path จาก FORCE_SCRIPT_NAME
    const BASE_PATH = "/s65114540451";

    postForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const formData = new FormData(postForm);
        fetch(`${BASE_PATH}/create_post/`, {   // ✅ ใช้ BASE_PATH
            method: "POST",
            body: formData,
            headers: {
                "X-CSRFToken": document.querySelector("[name=csrfmiddlewaretoken]").value
            },
        })
        .then(response => {
            if (!response.ok) throw new Error("HTTP " + response.status);
            return response.json();
        })
        .then(data => {
            if (data.success) {
                window.location.reload();
            } else {
                alert("โพสต์ไม่สำเร็จ: " + data.message);
            }
        })
        .catch(error => console.error("Error:", error));
    });
});
