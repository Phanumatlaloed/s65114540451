// JavaScript for group deletion functionality
document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ Group Deletion System Loaded!");

    // ===== DELETE GROUP =====
    document.addEventListener("click", async function (event) {
        const btn = event.target.closest(".delete-btn[data-group-id]");
        if (!btn) return; // Exit if not a group delete button
        
        // Prevent the default behavior
        event.preventDefault();
        
        // Get the group ID
        const groupId = btn.dataset.groupId;
        
        console.log("🔍 ตรวจสอบค่า Group ID:", groupId);
        
        if (!groupId || groupId === "undefined") {
            console.error("❌ groupId is undefined. Check if the button has data-group-id.");
            alert("เกิดข้อผิดพลาด: ไม่พบ Group ID");
            return;
        }
        
        // Confirmation with clear warning
        if (confirm("คุณต้องการลบกลุ่มนี้ใช่หรือไม่? การดำเนินการนี้จะลบทุกโพสต์และความคิดเห็นในกลุ่มและไม่สามารถย้อนกลับได้")) {
            const csrfToken = document.querySelector("[name='csrfmiddlewaretoken']").value;
            
            try {
                // Use the URL format that matches exactly what you're trying to access
                const response = await fetch(`/s65114540451/community/group/${groupId}/delete/`, {
                    method: "POST",
                    headers: {
                        "X-CSRFToken": csrfToken,
                        "Content-Type": "application/json"
                    }
                });
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const data = await response.json();
                
                if (data.success) {
                    alert("กลุ่มถูกลบเรียบร้อยแล้ว!");
                    // Redirect to community home page
                    window.location.href = "/community/";
                } else {
                    alert("เกิดข้อผิดพลาด: " + (data.message || "ไม่สามารถลบกลุ่มได้"));
                }
            } catch (error) {
                console.error("❌ เกิดข้อผิดพลาดในการลบกลุ่ม:", error);
                alert("เกิดข้อผิดพลาดในการลบกลุ่ม: " + error.message);
            }
        }
    });
});