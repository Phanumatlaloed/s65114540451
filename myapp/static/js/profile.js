document.addEventListener("DOMContentLoaded", () => {
    console.log("✅ profile.js Loaded!");

    // ✅ Handle Like Button Click
    document.body.addEventListener("click", function(event) {
        if (event.target.classList.contains("like-btn")) {
            event.preventDefault();
            event.stopPropagation();

            const buttonElement = event.target;
            const postId = buttonElement.dataset.postId;
            const likeCountElement = document.getElementById(`like-count-${postId}`);

            if (!postId) {
                console.error("❌ postId not found!");
                return;
            }

            fetch(`/s65114540451/like/${postId}/`, {
                method: "POST",
                headers: {
                    "X-CSRFToken": getCSRFToken(),
                    "X-Requested-With": "XMLHttpRequest",
                    "Content-Type": "application/json"
                }
            })
            
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    console.log(`👍 Post ${postId} liked: ${data.liked}, Total Likes: ${data.like_count}`);

                    likeCountElement.textContent = `${data.like_count} Likes`;

                    if (data.liked) {
                        buttonElement.innerHTML = `<i class="fas fa-thumbs-down"></i> Unlike`;
                        buttonElement.classList.add("btn-danger");
                        buttonElement.classList.remove("btn-outline-primary");
                    } else {
                        buttonElement.innerHTML = `<i class="fas fa-thumbs-up"></i> Like`;
                        buttonElement.classList.add("btn-outline-primary");
                        buttonElement.classList.remove("btn-danger");
                    }
                } else {
                    console.error("❌ Error updating like:", data);
                }
            })
            .catch(error => console.error("❌ AJAX Error:", error));
        }
    });

    // ✅ Handle Post Creation
    document.getElementById("postForm")?.addEventListener("submit", function(event) {
        event.preventDefault();
        const formData = new FormData(this);

        fetch(this.action, {
            method: "POST",
            body: formData,
            headers: { "X-Requested-With": "XMLHttpRequest" }
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("✅ โพสต์ถูกสร้างเรียบร้อยแล้ว!");
                location.reload(); // รีเฟรชเฉพาะโพสต์
            } else {
                alert(`⚠️ ${data.message}`);
            }
        })
        .catch(error => console.error("❌ AJAX Error:", error));
    });

    // ✅ CSRF Token Helper
    function getCSRFToken() {
        return document.querySelector("[name=csrfmiddlewaretoken]")?.value;
    }
});