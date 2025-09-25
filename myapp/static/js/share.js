// static/js/share.js
import { apiFetch } from "./api.js";

document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ share.js Loaded!");

    const shareButtons = document.querySelectorAll(".share-btn");

    shareButtons.forEach((button) => {
        button.addEventListener("click", async function () {
            const postId = this.getAttribute("data-post-id");

            try {
                const data = await apiFetch(`/s65114540451/post/${postId}/share/`, {
                    method: "POST",
                });

                if (data.success) {
                    alert("✅ แชร์โพสต์เรียบร้อยแล้ว!");
                    location.reload(); // refresh feed
                } else {
                    alert("❌ เกิดข้อผิดพลาด: " + (data.message || "ไม่ทราบสาเหตุ"));
                }
            } catch (error) {
                console.error("❌ Share Error:", error);
                alert("❌ ไม่สามารถแชร์โพสต์ได้");
            }
        });
    });
});
