document.addEventListener("DOMContentLoaded", () => {
    // Populate country codes
    const countryCodeSelect = document.getElementById("countryCode");
    const countryCodes = [
        { name: "UN", code: "+1" },
        { name: "UK", code: "+44" },
        { name: "Ca", code: "+1" },
        { name: "Au", code: "+61" },
        { name: "Ind", code: "+91" },
        { name: "Ger", code: "+49" },
        { name: "Fr", code: "+33" },
        { name: "Ch", code: "+86" },
        { name: "Ja", code: "+81" },
        { name: "Me", code: "+52" },
        { name: "Br", code: "+55" },
        { name: "SA", code: "+27" },
        { name: "Ru", code: "+7" },
        { name: "It", code: "+39" },
        { name: "Sp", code: "+34" },
        { name: "Pak", code: "+92" },
    ];

    // Append options to the select element
    countryCodes.forEach((country) => {
        const option = document.createElement("option");
        option.value = country.code;
        option.textContent = `${country.name} (${country.code})`;
        countryCodeSelect.appendChild(option);
    });

    // Handle form submission
    document
        .getElementById("dealershipForm")
        .addEventListener("submit", async function (e) {
            e.preventDefault();

            // Collect form data
            const formData = {
                name: document.getElementById("name").value,
                email: document.getElementById("email").value,
                phone: document.getElementById("phone").value,
                website: document.getElementById("website").value,
                distributionType: document.getElementById("distributionType").value,
                message: document.getElementById("message").value,
            };

            try {
                const response = await fetch("/dealer", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                document.getElementById("responseMessage").textContent = "Inquiry submitted successfully!";
            } catch (error) {
                console.error("Error:", error);
                document.getElementById("responseMessage").textContent =
                    "Failed to send your inquiry. Please try again later.";
            }
        });
});
