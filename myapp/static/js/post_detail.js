document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".like-btn").forEach(button => {
        button.addEventListener("click", function () {
            let postId = this.dataset.postId;
            let likeCount = document.getElementById(`like-count-${postId}`);

            fetch(`/s65114540451/like/${postId}/`, {
                method: "POST",
                headers: {
                    "X-CSRFToken": getCSRFToken(),
                    "X-Requested-With": "XMLHttpRequest"
                }
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    likeCount.textContent = data.like_count;
                    this.textContent = data.liked ? "❤️ Liked" : "👍 Like";
                }
            })
            .catch(error => console.error("Error:", error));
        });
    });

    document.querySelectorAll(".save-btn").forEach(button => {
        button.addEventListener("click", function () {
            let postId = this.dataset.postId;

            fetch(`/s65114540451/save/${postId}/`, {
                method: "POST",
                headers: {
                    "X-CSRFToken": getCSRFToken(),
                    "X-Requested-With": "XMLHttpRequest"
                }
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    this.textContent = data.saved ? "✅ Saved" : "💾 Save";
                }
            })
            .catch(error => console.error("Error:", error));
        });
    });

    document.querySelectorAll(".share-btn").forEach(button => {
        button.addEventListener("click", function () {
            let postId = this.dataset.postId;

            fetch(`/s65114540451/post/${postId}/s65114540451/share/`, {
                method: "POST",
                headers: {
                    "X-CSRFToken": getCSRFToken(),
                    "X-Requested-With": "XMLHttpRequest"
                }
            })
            .then(response => {
                if (response.ok) {
                    alert("✅ Post shared successfully!");
                }
            })
            .catch(error => console.error("Error:", error));
        });
    });

    function getCSRFToken() {
        return document.querySelector("[name=csrfmiddlewaretoken]").value;
    }
});

